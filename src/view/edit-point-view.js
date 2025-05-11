import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getFormatFullDate } from '../utils/points.js';

function createEditPointTemplate({point, destination, offers}, allDestinations) {
  const pointTypeIsChecked = (pointType) => pointType === point.type ? 'checked' : '';
  const startDate = getFormatFullDate(point.dateFrom);
  const endDate = getFormatFullDate(point.dateTo);
  return `
    <li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${pointTypeIsChecked('taxi')}>
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${pointTypeIsChecked('bus')}>
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${pointTypeIsChecked('train')}>
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${pointTypeIsChecked('ship')}>
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${pointTypeIsChecked('drive')}>
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${pointTypeIsChecked('flight')}>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${pointTypeIsChecked('check-in')}>
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${pointTypeIsChecked('sighteeing')}>
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${pointTypeIsChecked('restaurant')}>
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${point.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${allDestinations.map((dest) => `<option value="${dest.name}"></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    ${offers.map((offer) => `<div class="event__offer-selector">
                      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox" name="event-offer-${offer.title}" checked>
                      <label class="event__offer-label" for="event-offer-${offer.title}-1">
                        <span class="event__offer-title">${offer.title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${offer.price}</span>
                      </label>
                    </div>`).join('')}
                    </div>
                  </section>

                  ${destination?.description ? `
                    <section class="event__section  event__section--destination">
                      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                      <p class="event__destination-description">${destination.description}</p>
                    </section>
                  ` : ''}
                </section>
              </form>
            </li>
  `;
}

export default class EditPointView extends AbstractStatefulView{
  #point = null;
  #destination = null;
  #offers = null;
  #allDestinations = null;
  #allOffers = null;
  #onCloseEditButtonClick = null;
  #onSubmitButtonClick = null;

  constructor(point, destination, offers, allDestinations, allOffers, onCloseEditButtonClick,onSubmitButtonClick){
    super();
    this.#point = point;
    this._setState(EditPointView.parsePointToState(point, destination, offers));
    this.#destination = destination;
    this.#offers = offers;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#onCloseEditButtonClick = onCloseEditButtonClick;
    this.#onSubmitButtonClick = onSubmitButtonClick;
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#allDestinations);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#submitButtonClickHandler);
    this.element.querySelector('form').addEventListener('reset', this.#closeEditButtonClickHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click',this.#closeEditButtonClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeEditButtonClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeListChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);

  }

  #typeListChangeHandler = (evt)=> {

    const newType = evt.target.value;
    const newOffers = this.#allOffers.find((offer) => offer.type === newType)?.offers || [];

    this.updateElement({
      point: {
        ...this._state.point,
        type: newType,
        offers: []
      },
      offers: newOffers
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = evt.target.value;
    const newDestination = this.#allDestinations.find((item) => item.name === targetDestination);

    this.updateElement({
      destination: newDestination
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    const newPrice = evt.target.value;
    this._state = {point: {
      basePrice: newPrice
    }};
  };

  #closeEditButtonClickHandler = (evt) => {
    evt.preventDefault(evt);
    this.#onCloseEditButtonClick();
  };

  #submitButtonClickHandler = (evt) => {
    evt.preventDefault(evt);
    this.#onSubmitButtonClick(this.#point);
  };

  static parsePointToState(point, destination, offers) {
    return {
      point,
      destination,
      offers
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    return point;
  }
}
