import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getFormatFullDate } from '../utils/points.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

function createEditPointTemplate({point, destination, isNew, allDestinations, allOffers, isSaving, isDisabled, isDeleting}) {
  const pointTypeIsChecked = (pointType) => pointType === point.type ? 'checked' : '';
  const startDate = isNew ? '' : (point.dateFrom ? getFormatFullDate(point.dateFrom) : '');
  const endDate = isNew ? '' : (point.dateTo ? getFormatFullDate(point.dateTo) : '');
  const currentTypeOffers = allOffers.find((offerGroup) => offerGroup.type === point.type)?.offers || [];

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" ${isDisabled ? 'disabled' : ''} type="checkbox">
            

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'].map((type) => `
                    <div class="event__type-item">
                      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${pointTypeIsChecked(type)} ${isDisabled ? 'disabled' : ''}>
                      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
                    </div>
                  `).join('')}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${he.encode(point.type)}
            </label>
            <input class="event__input  event__input--destination" 
                  id="event-destination-1" 
                  type="text" 
                  name="event-destination" 
                  value="${he.encode(destination?.name || '')}" 
                  list="destination-list-1"
                  required
                  autocomplete="off" 
                  ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
              ${allDestinations.map((dest) =>
    `<option value="${he.encode(dest.name)}">${he.encode(dest.name)}</option>`
  ).join('')}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}" >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}" >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(String(point.basePrice))}" min="1" max="100000" step="1" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'Saving...' : 'Save'}
          </button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
            ${isNew ? 'Cancel' : (isDeleting ? 'Deleting...' : 'Delete')}
          </button>
          ${!isNew ? `
            <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
              <span class="visually-hidden">Open event</span>
            </button>
          ` : ''}
        </header>
            <section class="event__details">
            ${currentTypeOffers.length > 0 ? `
              <section class="event__section event__section--offers">
                <h3 class="event__section-title event__section-title--offers">Offers</h3>
                <div class="event__available-offers">
                  ${currentTypeOffers.map((offer) => `
                    <div class="event__offer-selector">
                      <input class="event__offer-checkbox visually-hidden" 
                            id="event-offer-${offer.id}-1" 
                            type="checkbox" 
                            name="event-offer-${offer.id}" 
                            data-offer-id="${offer.id}"
                            ${point.offers?.includes(offer.id) ? 'checked' : ''}
                            ${isDisabled ? 'disabled' : ''}>
                      <label class="event__offer-label" for="event-offer-${offer.id}-1">
                        <span class="event__offer-title">${offer.title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${offer.price}</span>
                      </label>
                    </div>
                `).join('')}
                </div>
              </section>

             ${destination ? `
              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                ${destination.description ? `
                  <p class="event__destination-description">${destination.description}</p>
                ` : ''}
                ${destination.pictures?.length ? `
                  <div class="event__photos-container">
                    <div class="event__photos-tape">
                      ${destination.pictures.map((picture) => `
                        <img class="event__photo" src="${picture.src}" alt="${picture.description || 'Destination photo'}">
                      `).join('')}
                    </div>
                  </div>
                ` : ''}
              </section>
            ` : ''}
          </section>
        ` : ''}
      </form>
    </li>
  `;
}

export default class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleDeleteClick = null;
  #handleCloseClick = null;
  #datepickerStart = null;
  #datepickerEnd = null;
  #isNew = false;
  #isSaving = false;
  #isDeleting = false;
  #isDisabled = false;

  constructor({point,allDestinations, allOffers, isNew = false, onSubmit, onDeleteClick, onCloseClick, isDisabled=false, isSaving = false, isDeleting=false,}) {
    super();
    this._setState(EditPointView.parsePointToState(point, allDestinations, allOffers, isNew, isDisabled, isSaving, isDeleting));
    this.#isNew = isNew;
    this.#isDeleting = isDeleting;
    this.#isDisabled = isDisabled;
    this.#isSaving = isSaving;
    this.#handleFormSubmit = onSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleCloseClick = onCloseClick;
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate({
      point: this._state.point,
      destination: this._state.destination,
      isNew: this.#isNew,
      allDestinations: this._state.destinations,
      allOffers: this._state.offersByType,
      isSaving: this.#isSaving,
      isDisabled: this.#isDisabled,
      isDeleting: this.#isDeleting,
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetButtonHandler);
    if (!this.#isNew) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    }

    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeToggleHandler);
    const destinationInput = this.element.querySelector('.event__input--destination');
    destinationInput.addEventListener('change', this.#destinationChangeHandler);
    destinationInput.addEventListener('input', this.#validateDestinationInput);
    destinationInput.addEventListener('blur', this.#validateDestinationInput);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);

    const offersContainer = this.element.querySelector('.event__available-offers');
    if (offersContainer) {
      offersContainer.addEventListener('change', this.#offerToggleHandler);
    }

    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  #validateDestinationInput = (evt) => {
    const input = evt.target;
    const inputValue = input.value.trim();

    const isValid = this._state.destinations.some(
      (dest) => dest.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (!isValid && inputValue) {
      input.setCustomValidity('Please select a destination from the list');
    } else {
      input.setCustomValidity('');
    }
    input.reportValidity();
  };

  #destinationChangeHandler = (evt) => {
    const inputValue = evt.target.value.trim();
    const selectedDestination = this._state.destinations.find(
      (destination) => destination.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (!selectedDestination) {
      evt.target.setCustomValidity('Please select a destination from the list');
      evt.target.reportValidity();
      return;
    }

    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestination.id
      },
      destination: selectedDestination
    });
  };


  #formSubmitHandler = async (evt) => {
  evt.preventDefault();
  
  if (!this._state.point.dateFrom || !this._state.point.dateTo) {
    alert('Please fill in both date fields');
    return;
  }
  
  try {
    this.updateElement({
      isSaving: true,
      isDisabled: true
    });
    
    const pointData = EditPointView.parseStateToPoint(this._state);
    await this.#handleFormSubmit(pointData);
  } catch (err) {
    this.updateElement({
      isSaving: false,
      isDisabled: false
    });
  }
};
  #resetButtonHandler = (evt) => {
    evt.preventDefault();
    if (this.#isNew) {
      this.#handleCloseClick();
    } else {
      this.#handleDeleteClick(this._state.point);
    }
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #typeToggleHandler = (evt) => {
    if (!evt.target.classList.contains('event__type-input')) {
      return;
    }

    const newType = evt.target.value;
    const newOffers = this._state.offersByType.find((offerGroup) => offerGroup.type === newType)?.offers || [];

    this.updateElement({
      point: {
        ...this._state.point,
        type: newType,
        offers: []
      },
      offers: newOffers,
      offersByType: this._state.offersByType
    });
  };

  #priceInputHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: Number(evt.target.value)
      }
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
  this._setState({
    point: {
      ...this._state.point,
      dateFrom: userDate
    }
  });
  if (userDate) {
    this.#datepickerEnd?.set('minDate', userDate);
  }
};

#dateToChangeHandler = ([userDate]) => {
  this._setState({
    point: {
      ...this._state.point,
      dateTo: userDate
    }
  });
};

  #setDatepickerStart() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.point.dateFrom,
        onChange: this.#dateFromChangeHandler.bind(this),
        maxDate: this._state.point.dateTo
      }
    );
  }

  #setDatepickerEnd() {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.point.dateTo,
        onChange: this.#dateToChangeHandler.bind(this),
        minDate: this._state.point.dateFrom
      }
    );
  }

  #offerToggleHandler = (evt) => {
  if (!evt.target.classList.contains('event__offer-checkbox')) {
    return;
  }

  const offerId = evt.target.dataset.offerId;
  const offers = [...(this._state.point.offers || [])];
  const index = offers.indexOf(offerId);

  if (index === -1) {
    offers.push(offerId);
  } else {
    offers.splice(index, 1);
  }

  this._setState({
    point: {
      ...this._state.point,
      offers,
    },
  });
};

 static parsePointToState(point, destinations, offersByType, isNew = false, isDisabled = false, isSaving = false, isDeleting = false) {
  const destination = destinations.find((item) => item.id === point.destination) || null;
  const currentTypeOffers = offersByType.find((offerGroup) => offerGroup.type === point.type)?.offers || [];

  return {
    point: isNew ? { ...point, dateFrom: null, dateTo: null } : point,
    destination,
    offers: currentTypeOffers,
    destinations,
    offersByType,
    isDisabled,
    isSaving,
    isDeleting
  };
}
  

  static parseStateToPoint(state) {
    return state.point;
  }
}
