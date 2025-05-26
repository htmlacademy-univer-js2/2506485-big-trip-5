import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {
  #destinations = [];
  #apiService = null;

  constructor({ apiService }) {
    super();
    this.#apiService = apiService;
  }

  getDestinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#apiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  getDestinationByName(name) {
    return this.#destinations.find((destination) => destination.name === name);
  }
}
