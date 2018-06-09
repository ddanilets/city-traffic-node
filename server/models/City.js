import Route from './Route';

export default class City {
  constructor({ routes, time, population }) {
    this.routes = routes.map((route) => new Route(route));
    this.time = time;
    this.population = population;
  }
}