
class City {

  constructor(name,  coreDisease) {
    this.name = name;
    this.connections = [];
    this.connectionMap = {};
    this.coreDisease = coreDisease;
    this.diseases = {};
    this.station = false;
  }

  addConnection(city) {
    if (!this.connectionMap[city.name]) {
      this.connections.push(city);
      this.connectionMap[city.name] = city;
      city.addConnection(this);
    }
    return this;
  }

  getConnection(cityName) {
    return this.connectionMap[cityName];
  }

  getDiseases() {
    return Object.keys(this.diseases);
  }

  getDiseaseCount(disease) {
    disease = disease || this.coreDisease;
    return this.diseases[disease] || 0;
  }

  infect(disease) {
    disease = disease || this.coreDisease;
    if (!this.diseases[disease]) {
      this.diseases[disease] = 1;
      return false; 
    } else if (this.diseases[disease] < 3) {
      this.diseases[disease]++;
      return false;
    } else {
      return true;
    }
  }

  treat(disease) {
    disease = disease || this.coreDisease;
    if (!this.diseases[disease]) {
      this.diseases[disease] = 0;
    } else if (this.diseases[disease] > 0) {
      this.diseases[disease]--;
    }
  }

  clear(disease) {
    let count = 0;
    disease = disease || this.coreDisease;
    if (!this.diseases[disease]) {
      this.diseases[disease] = 0;
    } else {
      // Clear a specific disease
      count += this.diseases[disease];
      this.diseases[disease] = 0;
    }
    return count;
  }

  buildStation() {
    this.station = true;
    return this;
  }

  removeStation() {
    this.station = false;
    return this;
  }

  hasStation() {
    return this.station;
  }
}

export default City;
