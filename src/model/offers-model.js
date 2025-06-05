import Observable from '../framework/observable.js';
import { UpdateType } from '../utils/const.js';

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
    let isError = false;
    try {
      this.#offers = await this.#apiService.offers;
    } catch(err) {
      this.#offers = [];
      isError = true;
    }
    this._notify(UpdateType.INIT, { isError });
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  getOffersByIds(type, id) {
    const offerGroup = this.getByType(type);
    if (!offerGroup) {
      return null;
    }
    return offerGroup.offers.find((offer) => offer.id === id);
  }
}
