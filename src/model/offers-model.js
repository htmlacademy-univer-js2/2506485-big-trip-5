import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offers = [];
  #apiService = null;

  constructor({ apiService }) {
    super();
    this.#apiService = apiService;
  }

  getOffers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#apiService.offers;
    } catch(err) {
      this.#offers = [];
    }
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  getOffersById(type, id) {
    const offerGroup = this.getByType(type);
    if (!offerGroup) {
      return null;
    }
    return offerGroup.offers.find((offer) => offer.id === id);
  }
}
