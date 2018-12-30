import constants from './constants';

class Controller {

  // Controller callback methods that must be overriden

  async doActions(agent, world) {
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
    return this.activeAgent.getLocation();
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
    return this.getLocation().connections;
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
    if (this._validCharter(this.agent, this.getLocation())) {
      return this.world.getCities();
    } else {
      return [];
    }
  }

  getShuttleMoves() {
    if (this.getLocation().hasStation()) {
      return this.world.getStationCities();
    } else {
      return [];
    }
  }

  getRemainingActions() {
    return this.availableActions;
  }

  getWorld() {
    return this.world;
  }

  // Action methods. Call these to add an action to the controller for the current event.
  
  doMove(city) {
    if (this.availableActions <= 0) {
      throw new Error('Invalid move: No remaining actions');
    } if (!this._validMove(this.getLocation(), city)) {
      throw new Error(`Invalid move: Cannot move from ${this.getLocation().name} to ${city.name}`);
    } else {
      this.availableActions--;
      this._saveFallback(1);
      this.world.move(this.activeAgent, constants.moves.LOCAL, this.getLocation(), city);
    }
  }

  doDirectFlight(city) {
    if (this.availableActions <= 0) {
      throw new Error('Invalid move: No remaining actions');
    } if (!this._validDirect(this.agent, city)) {
      throw new Error(`Invalid move: Cannot fly direct from ${this.getLocation().name} to ${city.name}`);
    } else {
      this.availableActions--;
      this._saveFallback(1);
      this.world.move(this.activeAgent, constants.moves.DIRECT, this.getLocation(), city);
    }
  }

  doCharterFlight(city) {
    if (this.availableActions <= 0) {
      throw new Error('Invalid move: No remaining actions');
    } if (!this._validCharter(this.agent, this.getLocation())) {
      throw new Error(`Invalid move: Cannot charter flight from ${this.getLocation().name} to ${city.name}`);
    } else {
      this.availableActions--;
      this._saveFallback(1);
      this.world.move(this.activeAgent, constants.moves.CHARTER, this.getLocation(), city);
    }
  }

  doShuttle(city) {
    if (this.availableActions <= 0) {
      throw new Error('Invalid move: No remaining actions');
    } if (!this._validShuttle(this.agent, this.getLocation())) {
      throw new Error(`Invalid move: Cannot shuttle from ${this.getLocation().name} to ${city.name}`);
    } else {
      this.availableActions--;
      this._saveFallback(1);
      this.world.move(this.activeAgent, constants.moves.SHUTTLE, this.getLocation(), city);
    }
  }

  doBuildStation() {
    if (this.availableActions <= 0) {
      throw new Error('Invalid build: No remaining actions');
    } if (!this._validateBuild(this.agent, this.getLocation())) {
      throw new Error(`Invalid build: Cannot build station at ${this.getLocation().name}`);
    } else {
      this.availableActions--;
      this._saveFallback(1);
      this.world.build(this.activeAgent, this.getLocation());
    }
  }

  doTreat(disease) {
    disease = disease || this._getLocalDisease(this.getLocation());
    if (this.availableActions <= 0) {
      throw new Error('Invalid treat: No remaining actions');
    } else {
      this.availableActions--;
      this._saveFallback(1);
      this.world.treat(this.agent, this.getLocation(), disease);
    }
  }

  doDiscoverCure(disease, cards) {
    if (this.availableActions <= 0) {
      throw new Error('Invalid move: No remaining actions');
    } if (!this._validateCure(this.agent, disease, this.getLocation(), cards)) {
      throw new Error(`Invalid cure: ${this.agent.name} cannot cure disease from ${this.getLocation().name}`);
    } else {
      this.availableActions--;
      this._saveFallback(1);
      this.world.cure(this.agent, disease, cards);
    }
  }

  switchAgent(targetAgent) {
    if (!this.agent.type === constants.agents.DISPATCHER) {
      throw new Error('Only the dispatcher can switch units');
    } else {
      this.activeAgent = targetAgent;
    }
  }

  undoAction() {
    if (this.fallbackQIndex.length) {
      let { qIndex, actions } = this.fallbackQIndex.pop();
      this.world.revertEventQ(qIndex);
      this.availableActions += actions;
    } else {
      throw new Error('No actions remaining to undo!');
    }
  }

  // Internal methods. Should not be called

  _setupState(world, agent) {
    if (agent) {
      this.agent = agent;
      this.activeAgent = agent;
      this.availableActions = 4;
    } else {
      this.agent = null;
      this.activeAgent = null;
      this.availableActions = 0;
    }
    this.world = world;
    this.fallbackQIndex = [];
  }
  
  async _doActions(agent, world) {
    this._setupState(world, agent);
    await this.doActions(agent, world);
    return this.actions;
  }

  async _cardDraw(agent, world, cards) {
    this._setupState(world, agent);
    await this.cardDraw(agent, cards);
    return this.actions;
  }

  async _epidemic(agent, world, location) {
    this._setupState(world, agent);
    this.epidemic(agent, location);
    return this.actions;
  }

  async _lose(world, cause) {
    this._setupState(world);
    this.lose(cause);
  }

  async _win(world, cause) {
    this._setupState(world);
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
    const sourceHasStation = sourceCity.hasStation();
    const targetHasStation = targetCity.hasStation();
    return Boolean(sourceHasStation && targetHasStation);
  }

  _validateBuild(agent, city) {
    // TODO, allow moving of stations
    const agentCanBuild = agent.type === 'OPERATIONS_EXPERT' || agent.hasCard(city.name);
    return Boolean(agentCanBuild);
  }

  _vaildateCure(agent, disease, city, cards) {
    if (!city.hasStation()) {
      return false;
    }
    for (let i=0; i<cards.length; i++) {
      if (!agent.hasCard(cards[i].name) || cards[i].disease !== disease) {
        return false;
      }
    }
    if (agent.type === constants.agents.SCIENTIST) {
      return cards.length >= 4;
    } else {
      return cards.length >= 5;
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

  _saveFallback(actions) {
    this.fallbackQIndex.push({
      qIndex: this.world.getQIndex(),
      actions: actions
    });
  }
}



export default Controller;
