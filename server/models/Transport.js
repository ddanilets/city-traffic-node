export default class Transport {
  constructor({ type }) {
    this.type = type;
    this.capacity = capacityTable[type];
  }
}

export const capacityTable = {
  bus: 25,
  trolley: 50,
  minibus: 12,
};