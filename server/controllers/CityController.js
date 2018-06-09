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
    const block = new Block(this.city);
    block.parseCity();
    return block.prepareResponse();

  }
}