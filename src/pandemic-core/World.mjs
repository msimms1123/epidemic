import City from './City';
import Deck from './Deck';
import constants from './constants';
import events from './events';

class World {

  constructor(cities, infectionDeck, playerDeck, infectionDiscard, playerDiscard, eventQ) {
    this.cities = cities || {};
    this.cured = {};
    this.agents = {};
    this.outbreakCount = 0;
    this.infectionRateCounter = 0;
    this.infectionDeck = infectionDeck || new Deck();
    this.infectionDiscard = infectionDiscard || new Deck();
    this.playerDeck = playerDeck || new Deck();
    this.playerDiscard = playerDiscard || new Deck();
    this.eventQ = eventQ || [];
  }

  addCity(city) {
    this.cities[city.name] = city;
    return this;
  }

  addAgent(agent) {
    this.agents[agent.name] = agent;
    return this;
  }

  setPlayerDeck(deck) {
    this.playerDeck = deck;
    return this;
  }

  setInfectionDeck(deck) {
    this.infectionDeck = deck;
    return this;
  }

  getCity(cityName) {
    return this.cities[cityName];
  }

  _infect(city, disease, outbreakSet) {
    if (this.isQuarantined(city)) {
      return this;
    }
    disease = disease || city.coreDisease;
    outbreakSet = outbreakSet || {};
    if (city.getDiseaseCount(disease) >= 3 && !outbreakSet[city.name]) {
      this.applyEvent(new events.Outbreak(disease, city));
      console.log('outbreak in ',city.name);
      outbreakSet[city.name] = true;
      city.connections.map((c) => {
        this._infect(c, disease, outbreakSet);
      });
    } else if (city.getDiseaseCount(disease) < 3) {
      this.applyEvent(new events.Infect(disease, city));
    }
    return this;
  }

  getInfectionRate() {
    return constants.infectionRateValues[this.infectionRateCounter];
  }

  infect() {
    const infectionCount = this.getInfectionRate();
    for (let i=0; i<infectionCount; i++) {
      let targetCard = this.infectionDeck.drawCardTop();
      console.log('Drew infect card ', targetCard.name);
      this.saveEvent(new events.Discard(targetCard, this.infectionDeck, this.infectionDeck.count()));
      this.applyEvent(new events.Insert(targetCard, this.infectionDiscard, this.infectionDiscard.count()));
      const targetCity = this.getCity(targetCard.name);
      console.log(targetCard)
      const disease = targetCity.coreDisease;
      this._infect(targetCity, disease);
    }
  }

  epidemic() {
    let targetCard = this.infectionDeck.drawCardBottom();
    this.saveEvent(new events.Discard(targetCard, this.infectionDeck, 0));
    this.applyEvent(new events.Insert(targetCard, this.infectionDiscard, this.infectionDiscard.count()));
    let targetCity = this.getCity(targetCard.name);
    let disease = targetCity.coreDisease;
    this.applyEvent(new events.Epidemic(disease, targetCity));
    if (!this.cured[disease]) {
      // Take advantage of the outbreakSet to limit to a single outbreak;
      //   Infection will never increase the disease count above 3, and
      //   outbreaks will only occur if city is not in outbreak set.
      const outbreakSet = {};
      outbreakSet[targetCity.name] = true;
      this._infect(targetCity, disease, outbreakSet); // No outbreak
      this._infect(targetCity, disease, outbreakSet); // No outbreak
      this._infect(targetCity, disease); // Allow outbreak on final infection
    }
    this.intensify();
    return targetCity;
  }

  intensify() {
    const newDiscard = new Deck();
    const discardClone = this.infectionDiscard.clone();
    discardClone.shuffle();
    const count = discardClone.count();
    for (let i=0; i<count; i++) {
      let c = discardClone.getCardAtIndex(i);
      this.applyEvent(new events.Insert(c, this.infectionDeck, this.infectionDeck.count()));
    }
    this.applyEvent(new events.SetDeck(constants.decks.INFECTION_DISCARD, this.infectionDiscard, newDiscard));
  }
  
  move(agent, moveType, sourceCity, targetCity) {
    this.applyEvent(new events.Move(agent, moveType, sourceCity, targetCity));
    if (moveType === constants.moves.CHARTER) {
      this.removeCardFromAgent(sourceCity.name, agent);
    } else if (moveType === constants.moves.DIRECT) {
      this.removeCardFromAgent(targetCity.name, agent);
    }
    // Medic special clear
    if (agent.type === constants.agents.MEDIC) {
      for (let disease in this.cured) {
        if (this.cured[disease]) {
          this.clear(targetCity, disease);
        }
      }
    }
    return this;
  }

  build(agent, targetCity) {
    this.applyEvent(new events.Build(agent, targetCity));
    if (agent.type !== constants.agents.OPERATIONS_EXPERT) {
      this.removeCardFromAgent(targetCity.name, agent);
    }
    return this;
  }

  treat(agent, targetCity, disease) {
    if (agent.type === constants.agents.MEDIC || this.cured[disease]) {
      this.clear(targetCity, disease);
    } else {
      this.applyEvent(new events.Treat(disease, targetCity));
    }
    return this;
  }

  cure(agent, disease, cards) {
    for (let i=0; i<cards.length; i++) {
      this.removeCardFromAgent(cards[i].name, agent);
    }
    this.applyEvent(new events.Cure(disease));
    return this;
  }

  trade(sourceAgent, targetAgent, card) {
    this.removeCardFromAgent(card.name, sourceAgent);
    this.addCardToAgent(card, targetAgent);
  }

  clear(city, disease) {
    disease = disease || city.coreDisease;
    const count = city.getDiseaseCount(disease);
    for (let i=0; i<count; i++) {
      this.applyEvent(new events.Treat(disease, city));
    }
    return this;
  }

  removeCardFromAgent(cardName, agent) {
    let hand = agent.getHand();
    let card = hand.getCard(cardName);
    let index = hand.getCardIndex(cardName);
    this.applyEvent(new events.Discard(card, hand, index));
    this.applyEvent(new events.Insert(card, this.playerDiscard, this.playerDiscard.count()));
    return this;
  }

  addCardToAgent(card, agent) {
    let hand = agent.getHand();
    let index = hand.count();
    this.applyEvent(new events.Insert(card, hand, index));
    return this;
  }

  drawPlayerCards(n) {
    let cards = [];
    for (let i=0; i<n; i++) {
      let index = this.playerDeck.count() - 1;
      let c = this.playerDeck.drawCardTop();
      if (c) {
        this.saveEvent(new events.Discard(c, this.playerDeck, index));
        cards.push(c);
      }
    }
    return cards;
  }

  _cure(disease) {
    this.cured[disease] = true;
    return this;
  }

  _reverseCure(disease) {
    delete this.cured[disease];
    return this;
  }

  _setDeck(target, deck) {
    switch (target) {
    case constants.decks.PLAYER:
      this.playerDeck = deck;
      break;
    case constants.decks.INFECTION:
      this.infectionDeck = deck;
      break;
    case constants.decks.PLAYER_DISCARD:
      this.playerDiscard = deck;
      break;
    case constants.decks.INFECTION_DISCARD:
      this.infectionDiscard = deck;
      break;
    default:
      throw new Error(`Unknown deck "${target}"`);
    }
  }

  _removeFromPlayerDeck(card) {
    const index = this.playerDeck.getCardIndex(card.name);
    this.applyEvent(new events.Discard(card, this.playerDeck, index));
  }

  isCured(disease) {
    return this.cured[disease];
  }

  isQuarantined(city) {
    let qAgent = this.agents[constants.agents.QUARANTINE_SPECIALIST];
    if (qAgent) {
      const qCity = qAgent.getLocation().name;
      if (city.name === qCity || city.getConnection(qCity)) {
        return true;
      }
    }
    return false;
  }

  getConnections(cityName) {
    if (this.cities[cityName]) {
      return this.cities.connections.map((c) => c.name);
    } else {
      return null;
    }
  }

  getCities() {
    return Object.values(this.cities);
  }

  getStationCities() {
    return Object.values(this.cities).filter((city) => {
      return city.hasStation();
    });
  }

  getDiseaseCount(disease) {
    let count = 0;
    for (let cityName in this.cities) {
      let city = this.cities[cityName];
      count += city.getDiseaseCount(disease);
    }
    return count;
  }

  getAllDiseaseCounts() {
    const diseases = {};
    for (let cityName in this.cities) {
      let c = this.cities[cityName];
      let ds = c.getDiseases();
      for (let i=0; i<ds.length; i++) {
        let d = ds[i];
        let count = c.getDiseaseCount(d);
        if (!diseases[d]) {
          diseases[d] = count;
        } else {
          diseases[d] += count;
        }
      }
    }
    return diseases;
  }

  getOutbreakCount() {
    return this.outbreakCount;
  }

  getQIndex() {
    return this.eventQ.length;
  }

  applyEvent(event) {
    event.apply(this);
    this.eventQ.push(event);
  }

  saveEvent(event) {
    this.eventQ.push(event);
  }

  revertEventQ(qIndex) {
    for (let i=this.eventQ.length; i>qIndex; i--) {
      let event = this.eventQ.pop();
      event.invert().apply(this);
    }
  }

  getRecentEvents(qIndex) {
    const recentEvents = [];
    for (let i=qIndex; i<this.eventQ.length; i++) {
      recentEvents.push(this.eventQ[i]);
    }
    return recentEvents;
  }

  static loadWorld(graphJson, playerCardJson, infectionCardJson) {
    const cities = World.buildCities(graphJson);
    const playerDeck = World.buildDeckFromCards(playerCardJson, 'player');
    const infectionDeck = World.buildDeckFromCards(infectionCardJson, 'infection');
    playerDeck.shuffle();
    infectionDeck.shuffle();
    const world = new World(cities, infectionDeck, playerDeck);
    return world;
  }

  static buildCities(graphJson) {
    const cityNames = Object.keys(graphJson);
    const cities = {};
    for (let i=0; i<cityNames.length; i++) {
      let cityName = cityNames[i];
      let disease = graphJson[cityName].disease;
      let city = new City(cityNames[i], disease);
      cities[cityName] = city;
    }
    for (let i=0; i<cityNames.length; i++) {
      let cityName = cityNames[i];
      let city = cities[cityName];
      let connections = graphJson[cityName].connections;
      for (let j=0; j<connections.length; j++) {
        let c = cities[connections[j]];
        city.addConnection(c);
      }
    }
    return cities;
  }

  static buildDeckFromCards(cardsJson, deck) {
    const d = new Deck();
    for (let cardName in cardsJson) {
      let cardData = cardsJson[cardName];
      let cardType = constants.cards.LOCATION;
      if (cardData.type === 'epidemic') {
        cardType = constants.cards.EPIDEMIC;
      } else if (cardData.type === 'event') {
        cardType = constants.cards.EVENT;
      }
      if (cardData.quantity > 1) {
        for (let i=0; i<cardData.quantity; i++) {
          d.addCard({
            name: `${cardName}_${i}`,
            disease: cardData.disease,
            description: cardData.description,
            type: cardType,
            deck
          });
        }
      } else {
        d.addCard({
          name: cardName,
          disease: cardData.disease,
          description: cardData.description,
          type: cardType,
          deck
        });
      }
    }
    return d;
  }
}

export default World;
