import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { generateFilters } from '../mock/filter.js';
import EmptyListView from '../view/empty-point-view.js';
import PointPresenter from './point-presenter.js';
import { updatePointData } from '../utils/points.js';
import { SortTypes, sortByDay, sortByPrice, sortByTime } from '../utils/sort.js';

export default class Presenter {
  #pointListComponent = null;
  #filterContainer = null;
  #tripEventsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #points = null;
  #sortComponent = null;
  #currentSortType = SortTypes.DAY;
  #pointPresenters = new Map();

  constructor(filterContainer, tripEventsContainer, pointsModel, destinationsModel, offersModel) {
    this.#filterContainer = filterContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointListComponent = new PointListView();
  }

  init() {
    this.#points = this.#pointsModel.getPoints();
    render(new FilterView(generateFilters(this.#points)), this.#filterContainer);
    this.#renderSort();
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#pointListComponent, this.#tripEventsContainer);
    this.#renderPoints();
  }

  #clearPointViews = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#sortComponent);
  };

  #renderPoints() {
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

  #sortPoints(sortType) {
    switch (sortType) {
      case SortTypes.PRICE:
        this.#points.sort(sortByPrice);
        break;
      case SortTypes.TIME:
        this.#points.sort(sortByTime);
        break;
      default:
        this.#points.sort(sortByDay);
    }

    this.#currentSortType = sortType;
  }

  #renderSort(){
    this.#sortComponent = new SortView(this.#onSortTypeChange, this.#currentSortType);
    render(this.#sortComponent, this.#tripEventsContainer, RenderPosition.AFTERBEGIN);
  }

  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointViews();
    this.#renderSort();
    this.#renderPoints();
  };

  #onModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #onPointChange = (updatedPoint) => {
    this.#points = updatePointData(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };
}
