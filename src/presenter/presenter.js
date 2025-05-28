import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import EmptyListView from '../view/empty-point-view.js';
import PointPresenter from './point-presenter.js';
import { SortTypes, sortByDay, sortByPrice, sortByTime } from '../utils/sort.js';
import { UpdateType, UserAction } from '../utils/const.js';
import { filter } from '../utils/filter.js';
import { FilterType } from '../utils/const.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';

export default class Presenter {
  #pointListComponent = null;
  #tripEventsContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #points = null;
  #sortComponent = null;
  #filterType = null;
  #isLoading = true;
  #loadingComponent = new LoadingView();
  #currentSortType = SortTypes.DAY;
  #pointPresenters = new Map();
  #newPointPresenter = null;

  constructor(tripEventsContainer, pointsModel, destinationsModel, offersModel, filterModel) {
    this.#tripEventsContainer = tripEventsContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;
    this.#pointListComponent = new PointListView();

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newPointPresenter = new NewPointPresenter(
      this.#pointListComponent.element,
      this.#handleViewAction,
      this.#onModeChange,
      destinationsModel,
      offersModel,
    );
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.getPoints();
    const filteredPoints = filter[this.#filterType](points);
    switch (this.#currentSortType) {
      case SortTypes.DAY:
        filteredPoints.sort(sortByDay);
        break;
      case SortTypes.TIME:
        filteredPoints.sort(sortByTime);
        break;
      case SortTypes.PRICE:
        filteredPoints.sort(sortByPrice);
        break;
    }
    return filteredPoints;
  }

  init() {
    this.#points = this.#pointsModel.getPoints();
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortTypes.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderBoard() {
    render(this.#pointListComponent, this.#tripEventsContainer);
    this.#renderSort();
    this.#renderPoints();
  }

  #clearPointViews = ({resetSortType = false} = {}) => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  };

  #renderPoints() {
    const points = this.points;
    const emptyListElement = this.#tripEventsContainer.querySelector('.trip-events__msg');
    if (emptyListElement) {
      emptyListElement.remove();
    }
    if (points.length !== 0) {
      for (const point of points) {
        const pointDestination = this.#destinationsModel.getDestinationById(point.destination);
        const allDestinations = this.#destinationsModel.getDestinations();
        const allOffers = this.#offersModel.getOffers();

        const pointPresenter = new PointPresenter(
          this.#pointListComponent.element,
          this.#handleViewAction,
          this.#onModeChange
        );
        pointPresenter.init(point, pointDestination, allDestinations, allOffers);

        this.#pointPresenters.set(point.id, pointPresenter);
      }
    } else {
      const filterType = this.#filterModel.filter;
      render(new EmptyListView(filterType), this.#tripEventsContainer);
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
    this.#newPointPresenter.resetView();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType){
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH: {
        const point = data;
        const pointDestination = this.#destinationsModel.getDestinationById(point.destination);
        const allDestinations = this.#destinationsModel.getDestinations();
        const allOffers = this.#offersModel.getOffers();

        this.#pointPresenters.get(point.id)?.init(
          point,
          pointDestination,
          allDestinations,
          allOffers
        );
        break;
      }
      case UpdateType.MINOR:
        this.#clearPointViews();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearPointViews({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPoints();
    }
  };
}
