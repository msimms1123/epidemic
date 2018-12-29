
class Deck {

  constructor(cards) {
    this.cards = cards || [];
    this._mapCards();
  }

  _mapCards() {
    this.cardMap = {};
    if (this.cards.length) {
      for (let i=0; i<this.cards.length; i++) {
        let c = this.cards[i];
        this.cardMap[c.name] = c;
      }
    }
  }

  addCard(card) {
    return this.addCardTop(card);
  }  

  addCardTop(card) {
    this.cards.push(card);
    this.cardMap[card.name] = card;
    return this;
  }

  addCardBottom(card) {
    this.cards.unshift(card);
    this.cardMap[card.name] = card;
    return this;
  }

  draw() {
    return this.drawTop();
  }

  drawCardTop() {
    const c = this.cards.pop();
    delete this.cardMap[c.name];
    return c;
  }

  drawCardBottom() {
    const c = this.cards.shift();
    delete this.cardMap[c.name];
    return c;
  }

  count() {
    return this.cards.length;
  }

  getCard(cardName) {
    return this.cardMap[cardName];
  }

  removeCard(cardName) {
    let card;
    let cards = [];
    for (let i=0; i<this.cards.length; i++) {
      if (this.cards[i].name === cardName) {
        card = this.cards[i];
        delete this.cardMap[cardName];
      } else {
        cards.push(card);
      }
    }
    this.cards = cards;
    return card;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    return this;
  }

  getCardAtIndex(i) {
    return this.cards[i];
  }
}

export default Deck;
