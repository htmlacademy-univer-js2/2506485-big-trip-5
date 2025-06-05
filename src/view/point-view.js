import AbstractView from '../framework/view/abstract-view.js';
import { getFormatDay } from '../utils/points.js';
import { getFormatTime } from '../utils/points.js';
import { getDuration } from '../utils/points.js';

function createPointTemplate(point, destinations, allOffers) {
  const startDate = getFormatDay(point.dateFrom);
  const startTime = getFormatTime(point.dateFrom);
  const endTime = getFormatTime(point.dateTo);
  const duration = getDuration(point.dateFrom, point.dateTo);

  const destination = destinations.find((dest) => dest.id === point.destination);
  const offersForType = allOffers.find((offerGroup) => offerGroup.type === point.type)?.offers || [];
  const selectedOffers = point.offers || [];
  const activeOffers = offersForType.filter((offer) => selectedOffers.includes(offer.id));

  const favorite = point.isFavorite ? 'event__favorite-btn--active' : '';

  return `        
    <ul class="trip-events__list">
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="${point.dateFrom}">${startDate}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${point.type} ${destination?.name || ''}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${point.dateFrom}">${startTime}</time>
              &mdash;
              <time class="event__end-time" datetime="${point.dateTo}">${endTime}</time>
            </p>
            <p class="event__duration">${duration}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${activeOffers.map((offer) => `
              <li class="event__offer">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </li>
            `).join('')}
          </ul>
          <button class="event__favorite-btn ${favorite}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
    </ul>
  `;
}

export default class PointView extends AbstractView{
  #point = null;
  #destination = null;
  #offers = null;
  #onOpenEditButtonClick = null;
  #onFavoriteClick = null;

  constructor({point, allDestination, allOffers, onOpenEditButtonClick, onFavoriteClick}){
    super();
    this.#point = point;
    this.#destination = allDestination;
    this.#offers = allOffers;
    this.#onOpenEditButtonClick = onOpenEditButtonClick;
    this.#setEventListeners();
    this.#onFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#destination, this.#offers);
  }

  #setEventListeners () {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#OpenEditButtonClickHandler);
  }

  #OpenEditButtonClickHandler = (evt) => {
    evt.preventDefault(evt);
    this.#onOpenEditButtonClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavoriteClick();
  };
}
