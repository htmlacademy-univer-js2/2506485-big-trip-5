import AbstractView from '../framework/view/abstract-view.js';

const createTripInfoTemplate = ({route, duration, totalCost}) => `
  <section class="trip-main__trip-info trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>
      <p class="trip-info__dates">${duration.start}&nbsp;&mdash;&nbsp;${duration.end}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
    </p>
  </section>
`;

export default class TripInfoView extends AbstractView {
  #route = '';
  #duration = { start: '', end: '' };
  #totalCost = 0;

  constructor({route, duration, totalCost}) {
    super();
    this.#route = route;
    this.#duration = duration;
    this.#totalCost = totalCost;
  }

  get template() {
    return createTripInfoTemplate({
      route: this.#route,
      duration: this.#duration,
      totalCost: this.#totalCost
    });
  }
}
