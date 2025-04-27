import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import { render } from '../framework/render.js';
import { generateFilters } from '../mock/filter.js';
import EmptyListView from '../view/empty-point-view.js';
import PointPresenter from './point-presenter.js';
import { updatePointData } from '../utils/points.js';

export default class Presenter {
  #pointListComponent = new PointListView();

  #filterContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = null;
  #pointPresenters = new Map();

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

  #renderBoard() {
    render(new FilterView(generateFilters(this.#points)), this.#filterContainer);
    render(new SortView(), this.#tripEventsContainer);
    render(this.#pointListComponent, this.#tripEventsContainer);

    if (this.#points.length !== 0) {
      for (const point of this.#points) {
        const destination = this.#destinationsModel.getDestinationById(point.destination);
        const offers = point.offers.map((offerId) => this.#offersModel.getOfferById(offerId));
        const pointPresenter = new PointPresenter(this.#pointListComponent.element, point, destination, offers, this.#onPointChange, this.#onModeChange);
        pointPresenter.init(point);

        this.#pointPresenters.set(point.id, pointPresenter);
      }
    } else {
      render(new EmptyListView(), this.#tripEventsContainer);
    }
  }

  #onModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #onPointChange = (updatedPoint) => {
    this.#points = updatePointData(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #clearPointViews() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
