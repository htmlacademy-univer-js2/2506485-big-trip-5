import AbstractView from '../framework/view/abstract-view.js';
import { emptyListMessages } from '../utils/const.js';

function createEmptyListTemplate(filterType) {
  return `
    <p class="trip-events__msg">${emptyListMessages[filterType]}</p>
    <button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>
  `;
}

export default class EmptyListView extends AbstractView {
  #filterType = null;
  #handleNewEventClick = null;

  constructor(filterType, onNewEventClick) {
    super();
    this.#filterType = filterType;
    this.#handleNewEventClick = onNewEventClick;
    this.element.querySelector('.trip-main__event-add-btn')
      ?.addEventListener('click', this.#newEventClickHandler);
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }

  #newEventClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewEventClick();
  };
}
