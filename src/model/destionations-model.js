import { destinationsMock } from '../mock/destinations.js';
import Observable from '../framework/observable.js';

export default class DestionationsModel extends Observable{
  destinations = destinationsMock;

  getDestinations() {
    return this.destinations;
  }

  getDestinationById (destinationId) {
    return this.destinations.find((destination) => destination.id === destinationId);
  }
}
