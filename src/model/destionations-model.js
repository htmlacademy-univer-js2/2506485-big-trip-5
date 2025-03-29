import { destinationsMock } from '../mock/destinations.js';

export default class DestionationsModel {
  destinations = destinationsMock;

  getDestinations() {
    return this.destinations;
  }

  getDestinationById (destinationId) {
    return this.destinations.find((destination) => destination.id === destinationId);
  }
}
