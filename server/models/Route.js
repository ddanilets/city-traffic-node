import Transport from './Transport';
import Point from './Point';

export default class Route {
  constructor({ points, transport }) {
    this.points = points.map((p) => new Point(p));
    this.transport = new Transport(transport);
  }
}