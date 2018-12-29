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

  setPlayerDeck(deck) {
    this.playerDeck = deck;
    return this;
  }

  setInfectionDeck(deck) {
    this.infectionDeck = deck;
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
    const actions = await this.controller._getActions(agent, this);
    this.executeActions(actions);
  }

  executeActions(actions) {
    for (let i=0; i<actions.length; i++) {
      let action = actions[i];
      switch (action.action) {
      case actions.MOVE:
        this.world.doMove(action.agent, action.type, action.sourceCity, action.targetCity);
        break;
      case actions.BUILD:
        this.world.doBuild(action.agent, action.targetCity);
        break;
      case actions.TREAT:
        this.world.doTreat(action.agent, action.targetCity);
        break;
      case actions.CURE:
        this.world.doCure(action.agent, action.disease, action.cards);
        break;
      case actions.DISCARD:
        this.agent.removeCard(action.card.name);
        break;
      case actions.EVENT:
        // TODO: handle events
        break;
      default:
        throw new Error(`Invalid action: Unknown action type "${action.action}"`);
      }
    }
  }

  drawPlayerCards(agent) {
    
  }

  infectCities() {
    
  }

  async discard(agent) {
    while (agent.cards.count() > constants.MAX_CARDS) {
      let actions = await this.controller._discard(agent, this);
      this.executeActions(actions);
    }
  }
}

export default Game;
