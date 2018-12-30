import Deck from './Deck';
import constants from './constants';

const actions = constants.actions;

class Game {

  constructor(world, agents, infectionDeck, playerDeck, controller, turn) {
    this.world = world;
    this.agents = agents;
    this.infectionDeck = infectionDeck || new Deck();
    this.playerDeck = playerDeck || new Deck();
    this.controller = controller;
    this.infectionRateCounter = 0;
    this.turn = turn || 0;
  }

  setWorld(world) {
    this.world = world;
    return this;
  }

  setController(controller) {
    this.controller = controller;
    return this;
  }

  async turn(agent) {
    await this.doActions(agent);
    await this.drawPlayerCards(agent);
    await this.discard(agent);
    this.infectCities();
  }

  async doActions(agent) {
    await this.controller._doActions(agent, this.world);
  }

  drawPlayerCards(agent) {
    
  }

  infectCities() {
    
  }

  async discard(agent) {
    while (agent.cards.count() > constants.MAX_CARDS) {
      let actions = await this.controller._discard(agent, this.world);
      this.executeActions(actions);
    }
  }
}

export default Game;
