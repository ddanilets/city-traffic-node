import City from '../models/City';
import Block from '../models/Block';

export default class CityController {
  setCity(city) {
    this.city = new City(city);
    return this;
  }
  
  getCity() {
    return this.city;
  }
  
  getBlocks() {
    return new Block(this.city).parseCity();
  }
}