import Observable from '../framework/observable.js';
import { UpdateType } from '../utils/const.js';

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
    let isError = false;
    try {
      this.#destinations = await this.#apiService.destinations;
    } catch(err) {
      isError = true;
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT, { isError });
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  getDestinationByName(name) {
    return this.#destinations.find((destination) => destination.name === name);
  }
}
