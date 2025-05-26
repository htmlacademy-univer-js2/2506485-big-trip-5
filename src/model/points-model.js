import Observable from '../framework/observable.js';
import { UpdateType } from '../utils/const.js';
import { adaptToClient } from '../utils/adapter.js';

export default class PointsModel extends Observable {
  #points = [];
  #apiService = null;

  constructor({ apiService}) {
    super();
    this.#apiService = apiService;
  }

  getPoints() {
    return this.#points;
  }

  async init() {
    let isError = false;
    try {
      const points = await this.#apiService.points;
      this.#points = points.map(adaptToClient);
    } catch(err) {
      this.#points = [];
      isError = true;
    }
    this._notify(UpdateType.INIT, { isError });
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#apiService.updatePoint(update);
      const updatedPoint = adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1)
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#apiService.addPoint(update);
      const newPoint = adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#apiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1)
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }
}
