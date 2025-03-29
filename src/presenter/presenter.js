import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import {render, replace} from '../framework/render.js';
import EmptyListView from '../view/empty-point-view.js';

export default class Presenter {
  #pointListComponent = new PointListView();

  #filterContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = null;

  constructor(filterContainer, tripEventsContainer, pointsModel, destinationsModel, offersModel) {
    this.#filterContainer = filterContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#points = this.#pointsModel.getPoints();

    this.#renderBoard();
  }

  #renderPoint(point, destinations, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape'){
        evt.preventDefault();
        replaceEditToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const onOpenEditButtonClick = () => {
      replacePointToEdit();
      document.addEventListener('keydown',escKeyDownHandler);
    };

    const onCloseEditButtonClick = () => {
      replaceEditToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const onSubmitButtonClick = () => {
      replaceEditToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const pointCompanent = new PointView(
      point,
      destinations,
      offers,
      onOpenEditButtonClick
    );

    const editPointCompanent = new EditPointView(
      point,
      destinations,
      offers,
      onCloseEditButtonClick,
      onSubmitButtonClick
    );

    function replaceEditToPoint () {
      replace(pointCompanent, editPointCompanent);
    }

    function replacePointToEdit () {
      replace(editPointCompanent, pointCompanent);
    }

    render(pointCompanent, this.#pointListComponent.element);
  }

  #renderBoard (){
    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#tripEventsContainer);

    render(this.#pointListComponent, this.#tripEventsContainer);
    if (this.#points.length !== 0){
      for (let i = 0; i < this.#points.length; i++) {
        const destination = this.#destinationsModel.getDestinationById(this.#points[i].destination);
        const offer = this.#points[i].offers.map((offerId) => this.#offersModel.getOfferById(offerId));
        this.#renderPoint(this.#points[i], destination, offer);
      }
    } else{
      render(new EmptyListView(), this.#tripEventsContainer);
    }
  }
}
