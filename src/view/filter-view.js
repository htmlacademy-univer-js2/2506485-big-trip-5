import AbstractView from '../framework/view/abstract-view.js';

function createFilterTemplate(filters, currentFilterType, hasNoPoints) {
  return (`<form class="trip-filters" action="#" method="get">
    ${filters.map((filter) => `<div class="trip-filters__filter">
      <input id="filter-${filter.type}" 
             class="trip-filters__filter-input visually-hidden" 
             type="radio" 
             name="trip-filter" 
             value="${filter.type}"
             ${filter.type === currentFilterType ? 'checked' : ''}
             ${hasNoPoints && filter.type !== 'everything' ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${filter.type}">
        ${filter.type}
      </label>
    </div>`).join('')}
  </form>`);
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #onFilterTypeChange = null;
  #hasNoPoints = false;

  constructor(filters, currentFilterType, onFilterTypeChange, hasNoPoints = false) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#onFilterTypeChange = onFilterTypeChange;
    this.#hasNoPoints = hasNoPoints;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType, this.#hasNoPoints);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.disabled) {
      return;
    }
    evt.preventDefault();
    this.#onFilterTypeChange(evt.target.value);
  };
}
