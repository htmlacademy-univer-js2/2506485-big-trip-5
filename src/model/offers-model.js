import {offersMock} from '../mock/offers.js';

export default class OffersModel {
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
}