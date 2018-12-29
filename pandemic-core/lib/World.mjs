import City from './City';
import constants from './constants';

class World {

  constructor(cities, diseases) {
    this.cities = cities || {};
    this.diseases = diseases || {};
    this.isCured = {};
    this.agents = {};
    this.outbreakCount = 0;
  }

  addCity(city) {
    this.cities[city.name] = city;
    if (!this.diseases[city.coreDisease]) {
      this.diseases[city.coreDisease] = 0;
    }
    return this;
  }

  addAgent(agent) {
    this.agents[agent.name] = agent;
    return this;
  }

  getCity(cityName) {
    return this.cities[cityName];
  }

  infect(cityName, disease, outbreakSet) {
    const city = this.cities[cityName];
    outbreakSet = outbreakSet || {};
    disease = disease || city.coreDisease;
    const isOutbreak = city.infect(disease);
    if (isOutbreak && !outbreakSet[cityName]) {
      this.outbreakCount++;
      outbreakSet[cityName] = true;
      city.connections.map((c) => {
        this.infect(c.name, disease, outbreakSet);
      });
    } else if (!isOutbreak) {
      this._increaseDiseaseCount(disease);
    }
    return this;
  }
  
  doMove(agent, moveType, sourceCity, targetCity) {
    agent.setLocation(targetCity);
    if (moveType === constants.moves.CHARTER) {
      agent.removeCard(sourceCity.name);
    } else if (moveType === constants.moves.DIRECT) {
      agent.removeCard(targetCity.name);
    }
    // Medic special clear
    if (agent.type === constants.agents.MEDIC) {
      for (let disease in this.isCured) {
        if (this.isCured[disease]) {
          targetCity.clear(disease);
        }
      }
    }
    return this;
  }

  doBuild(agent, targetCity) {
    targetCity.buildStation();
    if (agent.type !== constants.agents.OPERATIONS_EXPERT) {
      agent.removeCard(targetCity.name);
    }
    return this;
  }

  doTreat(agent, disease, targetCity) {
    if (agent.type === constants.agents.MEDIC || this.isCured(disease)) {
      targetCity.clear(disease);
    } else {
      targetCity.treat(disease);
    }
    return this;
  }

  doCure(agent, disease, cards) {
    for (let i=0; i<cards.length; i++) {
      agent.remainingActions(cards.length);
    }
    this.createCure(disease);
    return this;
  }

  treat(cityName, disease) {
    const city = this.cities[cityName];
    disease = disease || city.coreDisease;
    city.treat(disease);
    this._decreaseDiseaseCount(disease);
    return this;
  }

  clear(cityName, disease) {
    const city = this.cities[cityName];
    disease = disease || city.coreDisease;
    const count = city.clear(disease);
    this._decreaseDiseaseCount(disease, count);
    return this;
  }

  buildStation(cityName) {
    const city = this.cities[cityName];
    city.buildStation();
    return this;
  }

  removeStation(cityName) {
    const city = this.cities[cityName];
    city.removeStation();
    return this;
  }

  createCure(disease) {
    this.isCured[disease] = disease;
    return this;
  }

  isCured(disease) {
    return this.isCured[disease];
  }
  
  _increaseDiseaseCount(disease, count) {
    count = count || 1;
    if (!this.diseases[disease]){
      this.diseases[disease] = 1;
    } else {
      this.diseases[disease]++;
    }
  }

  _decreaseDiseaseCount(disease, count) {
    count = count || 1;
    if (!this.diseases[disease]){
      this.diseases[disease] = 0;
    } else {
      this.diseases[disease]--;
    }
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
    return this.diseases[disease] || 0;
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
