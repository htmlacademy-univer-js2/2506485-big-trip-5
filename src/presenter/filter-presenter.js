import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { generateFilters } from '../utils/filter.js';
import { UpdateType } from '../utils/const.js';

export default class FilterPresenter{
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, pointsModel){
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#onModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.getPoints();
    const hasNoPoints = points.length === 0;
    const filters = generateFilters(points);

    return {
      filters,
      hasNoPoints
    };
  }

  init() {
    const {filters, hasNoPoints} = this.filters;
    const prevFiltersComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(
      filters,
      this.#filterModel.filter,
      this.#onFilterTypeChange,
      hasNoPoints
    );

    if (prevFiltersComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
    } else {
      replace(this.#filterComponent, prevFiltersComponent);
      remove(prevFiltersComponent);
    }
  }

  #onModelEvent = () => {
    this.init();
  };

  #onFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}

