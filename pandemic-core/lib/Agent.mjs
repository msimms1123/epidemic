import Deck from './Deck';

class Agent {

  constructor(type) {
    this.name = type;
    this.type = type;
    this.cards = new Deck();
  }

  addCard(card) {
    this.cards.addCard(card);
    return this;
  }

  removeCard(cardName) {
    return this.cards.removeCard(cardName);
  }

  setLocation(city) {
    this.location = city;
    return this;
  }

  getLocation() {
    return this.location;
  }

  hasCard(cardName) {
    return this.cards.getCard(cardName);
  }
}

export default Agent;
