import City from '../models/City';

export default class CityController {
  setCity(city) {
    this.city = new City(city);
    return this;
  }
  
  getCity() {
    return this.city;
  }
}