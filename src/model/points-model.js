import { pointsMock } from '../mock/points.js';

export default class PointsModel {
  points = pointsMock;

  getPoints() {
    return this.points;
  }
}
