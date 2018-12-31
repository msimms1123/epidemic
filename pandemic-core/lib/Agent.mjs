import Deck from './Deck';
import constants from './constants.mjs';

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

  getHand() {
    return this.cards;
  }
}



export default Agent;
