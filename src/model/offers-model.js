import {offersMock} from '../mock/offers.js';
import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  offers = offersMock;

  getOffers() {
    return this.offers;
  }

  getOfferById(offerId) {
    for (const offerGroup of this.offers) {
      const foundOffer = offerGroup.offers.find((offer) => offer.id === offerId);
      if (foundOffer) {
        return foundOffer;
      }
    }
    return null;
  }

  getOffersByIds(offerIds) {
    return offerIds
      .map((id) => this.getOfferById(id))
      .filter((offer) => offer !== null);
  }
}
