import constants from './constants';

class Controller {

  // Controller callback methods that must be overriden

  async getActions(agent, world) {
    throw new Error('Must implement \'getActions\' method');
  }

  async cardDraw(agent, cards) {
    throw new Error('Must implement \'cardDraw\' method');
  }

  async epidemic(agent, location) {
    throw new Error('Must implement \'epidemic\' method');
  }

  async lose(cause) {
    throw new Error('Must implement \'lose\' method');
  }

  async win(cause) {
    throw new Error('Must implement \'win\' method');
  }

  // Information retrieval methods - Call these to get information about the controller state.

  getLocation() {
    return this.location;
  }
  
  getAllMoves() {
    const moves = {};
    moves[constants.moves.LOCAL] = this.getLocalMoves();
    moves[constants.moves.DIRECT] = this.getDirectFlightMoves();
    moves[constants.moves.CHARTER] = this.getCharterFlightMoves();
    moves[constants.moves.SHUTTLE] = this.getShuttleMoves();
    return moves;
  }

  getLocalMoves() {
    return this.location.connections;
  }

  getDirectFlightMoves() {
    const cards = this.agent.cards;
    const locations = [];
    for (let i=0; i<cards.count(); i++) {
      let c = cards.getCardAtIndex(i);
      if (c.type === constants.cards.LOCATION) {
        locations.push(this.world.getCity(c.name));
      }
    }
    return locations;
  }

  getCharterFlightMoves() {
    if (this._validCharter(this.agent, this.location)) {
      return this.world.getCities();
    } else {
      return [];
    }
  }

  getShuttleMoves() {
    if (this.location.hasStation() || this.newStations[this.location.name]) {
      return this.world.getStationCities();
    } else {
      return [];
    }
  }

  getActions() {
    return this.actions;
  }

  getRemainingActions() {
    return this.availableActions;
  }

  getWorld() {
    return this.world;
  }

  getGame() {
    return this.game;
  }

  // Action methods. Call these to add an action to the controller for the current event.
  
  doMove(city) {
    if (this.availableActions <= 0) {
      throw new Error('Invalid move: No remaining actions');
    } if (!this._validMove(this.location, city)) {
      throw new Error(`Invalid move: Cannot move from ${this.location.name} to ${city.name}`);
    } else {
      this.location = city;
      this.availableActions--;
      this.actions.push({
        action: constants.actions.MOVE,
        type: constants.moves.LOCAL,
        agent: this.agent,
        targetCity: city,
        sourceCity: this.location
      });
    }
  }

  doDirectFlight(city) {
    if (this.availableActions <= 0) {
      throw new Error('Invalid move: No remaining actions');
    } if (!this._validDirect(this.agent, city)) {
      throw new Error(`Invalid move: Cannot fly direct from ${this.location.name} to ${city.name}`);
    } else {
      this.location = city;
      this.availableActions--;
      this.actions.push({
        action: constants.actions.MOVE,
        type: constants.moves.DIRECT,
        agent: this.agent,
        targetCity: city,
        sourceCity: this.location
      });
    }
  }

  doCharterFlight(city) {
    if (this.availableActions <= 0) {
      throw new Error('Invalid move: No remaining actions');
    } if (!this._validCharter(this.agent, this.location)) {
      throw new Error(`Invalid move: Cannot charter flight from ${this.location.name} to ${city.name}`);
    } else {
      this.location = city;
      this.availableActions--;
      this.actions.push({
        action: constants.actions.MOVE,
        type: constants.moves.CHARTER,
        agent: this.agent,
        targetCity: city,
        sourceCity: this.location
      });
    }
  }

  doShuttle(city) {
    if (this.availableActions <= 0) {
      throw new Error('Invalid move: No remaining actions');
    } if (!this._validCharter(this.agent, this.location)) {
      throw new Error(`Invalid move: Cannot shuttle from ${this.location.name} to ${city.name}`);
    } else {
      this.location = city;
      this.availableActions--;
      this.actions.push({
        action: constants.actions.MOVE,
        type: constants.moves.SHUTTLE,
        agent: this.agent,
        targetCity: city,
        sourceCity: this.location
      });
    }
  }

  doBuildStation() {
    if (this.availableActions <= 0) {
      throw new Error('Invalid build: No remaining actions');
    } if (!this._validateBuild(this.agent, this.location)) {
      throw new Error(`Invalid build: Cannot build station at ${this.location.name}`);
    } else {
      this.newStations[this.location.name] = true;
      this.availableActions--;
      this.actions.push({
        action: constants.actions.BUILD,
        targetCity: this.location,
        agent: this.agent
      });
    }
  }

  doTreat(disease) {
    disease = disease || this._getLocalDisease(this.location);
    if (this.availableActions <= 0) {
      throw new Error('Invalid treat: No remaining actions');
    } else {
      this.availableActions--;
      this.actions.push({
        action: constants.actions.TREAT,
        disease: disease,
        targetCity: this.location,
        agent: this.agent
      });
    }
  }

  doDiscoverCure(disease) {
    if (this.availableActions <= 0) {
      throw new Error('Invalid move: No remaining actions');
    } if (!this._validCure(this.location, city)) {
      throw new Error(`Invalid cure: ${this.agent.name} cannot cure disease from ${this.location.name}`);
    } else {
      this.availableActions--;
      this.actions.push({
        action: constants.actions.CURE,
        agent: this.agent,
        disease: disease
      });
    }
  }

  undoAction() {
    let action = this.actions.pop();
    if (action) {
      switch (action.action) {
        case actions.MOVE:
          this._undoMove(action);
          break;
        case actions.BUILD:
          this._undoBuild(action);
          break;
        case actions.TREAT:
          this._undoTreat(action);
          break;
        case actions.CURE:
          this._undoCure(action);
          break;
        case default:
          // Do nothing
      }
    }
    return action;
  }

  // Internal methods. Should not be called

  _setupState(game, agent) {
    if (agent) {
      this.agent = agent;
      this.location = agent.location;
      this.availableActions = 4;
    } else {
      this.agent = null;
      this.location = null;
      this.availableActions = 0;
    }
    this.game = game;
    this.world = game.world;
    this.actions = [];
    this.newStations = {};
  }
  
  async _getActions(agent, game) {
    this._setupState(game, agent);
    await this.getActions(agent, game);
    return this.actions;
  }

  async _cardDraw(agent, game, cards) {
    this._setupState(game, agent);
    await this.cardDraw(agent, cards);
    return this.actions;
  }

  async _epidemic(agent, game, location) {
    this._setupState(game, agent);
    this.epidemic(agent, location);
    return this.actions;
  }

  async _lose(game, cause) {
    this._setupState(game);
    this.lose(cause);
  }

  async _win(game, cause) {
    this._setupState(game);
    this.win(cause);
  }

  _validMove(sourceCity, targetCity) {
    return Boolean(sourceCity.getConnection(targetCity.name));
  }

  _validCharter(agent, sourceCity) {
    return Boolean(agent.hasCard(sourceCity.name));
  }

  _validDirect(agent, targetCity) {
    return Boolean(agent.hasCard(targetCity.name));
  }

  _validShuttle(sourceCity, targetCity) {
    const sourceHasStation = sourceCity.hasStation() || this.newStations[sourceCity.name];
    const targetHasStation = targetCity.hasStation() || this.newStations[targetCity.name];
    return Boolean(sourceHasStation && targetHasStation);
  }

  _validateBuild(agent, city) {
    // TODO, allow moving of stations
    const agentCanBuild = agent.type === 'OPERATIONS_EXPERT' || agent.hasCard(city.name);
    return Boolean(agentCanBuild);
  }

  _vaildateCure(agent, disease, city) {
    if (!city.hasStation() && !this.newStations[city.name]) {
      return false;
    }
    let cureCount = 0;
    for (let i=0; i<agent.cards.count(); i++) {
      let c = agent.cards.getCardAtIndex(i);
      if (c.disease === disease) {
        cureCount++;
      }
    }
    if (agent.type === constants.agents.SCIENTIST) {
      return cureCount >= 4;
    } else {
      return cureCount >= 5;
    }
  }

  _getLocalDisease(city) {
    if (city.getDiseaseCount(city.coreDisease)) {
      // Prefer local disease
      return city.coreDisease;
    } else {
      const diseases = city.getDiseases();
      const maxCount = 0;
      const disease = null;
      // Find disease with largest count
      for (let i=0; i<diseases.length; i++) {
        let c = city.getDiseaseCount(diseases[i]); 
        if (c > maxCount) {
          maxCount = c;
          disease = diseases[i];
        }
      }
      if (disease) {
        return disease;
      } else {
        // No treatable disease found. Return city core disease.
        return city.coreDisease;
      }
    }
  }

  _undoMove(action) {
    this.availableActions++;
    this.location = action.sourceCity;
  }

  _undoBuild(action) {
    this.availableActions++;
    delete this.newStations[this.location.name];
  }

  _undoTreat(action) {
    this.availableActions++;
  }

  _undoCure(action) {
    this.availableActions++;
  }

}



export default Controller;
