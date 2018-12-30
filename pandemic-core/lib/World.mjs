import City from './City';
import Deck from './Deck';
import constants from './constants';
import events from './events';

class World {

  constructor(cities, diseases, infectionDeck, playerDeck, eventQ) {
    this.cities = cities || {};
    this.cured = {};
    this.agents = {};
    this.outbreakCount = 0;
    this.infectionDeck = infectionDeck || new Deck();
    this.playerDeck = playerDeck || new Deck();
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

  infect(city, disease, outbreakSet) {
    if (this.isQuarantined(city)) {
      return this;
    }
    disease = disease || city.coreDisease;
    outbreakSet = outbreakSet || {};
    if (city.getDiseaseCount(disease) >= 3 && !outbreakSet[city.name]) {
      this.applyEvent(new events.Outbreak(disease, city));
      outbreakSet[city.name] = true;
      city.connections.map((c) => {
        this.infect(c, disease, outbreakSet);
      });
    } else if (city.getDiseaseCount(disease) < 3) {
      this.applyEvent(new events.Infect(disease, city));
    }
    return this;
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
    return this;
  }

  addCardToAgent(card, agent) {
    let hand = agent.getHand();
    let index = hand.count();
    this.applyEvent(new events.Insert(card, hand, index));
    return this;
  }

  _cure(disease) {
    this.cured[disease] = true;
    return this;
  }

  _reverseCure(disease) {
    delete this.cured[disease];
    return this;
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

  revertEventQ(qIndex) {
    for (let i=this.eventQ.length; i>qIndex; i--) {
      let event = this.eventQ.pop();
      event.invert().apply(this);
    }
  }

  static loadWorld(graphJson) {
    const cityNames = Object.keys(graphJson);
    const cities = {};
    const diseases = {};
    for (let i=0; i<cityNames.length; i++) {
      let cityName = cityName[i];
      let disease = graphJson[cityName].disease;
      let city = new City(cityNames[i], disease);
      cities[cityNames] = city;
      if (diseases[disease] === undefined) {
        diseases[disease] = 0;
      }
    }
    for (let i=0; i<cityNames.length; i++) {
      let cityName = cityNames[i];
      let city = cities[cityName];
      let connections = graphJson[cityName];
      for (let j=0; j<connections.length; j++) {
        let c = cities[cityName];
        city.addConnection(c);
      }
    }
    const world = new World(cities, diseases);
    return world;
  }
}

export default World;
