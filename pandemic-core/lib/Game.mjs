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
    if (this.done) return;
    await this.drawPlayerCards(agent);
    if (this.done) return;
    await this.discard(agent);
    if (this.done) return;
    this.infectCities();
  }

  async doActions(agent) {
    await this.controller._doActions(agent, this.world);
    this.done = this.isFinalState();
  }

  async drawPlayerCards(agent) {
    const cards = this.world.drawPlayerCards(2);
    if (cards.length < 2) {
      return await controller._lose(this.world, constants.loss_conditions.NO_PLAYER_CARDS);
    }
    for (let i=0; i<cards.length; i++) {
      if (cards[i].type === constants.cards.EPIDEMIC) {
        let location = this.world.epidemic();
        await this.controller._epidemic(agent, this.world, location);
      } else {
        this.world.addCardToAgent(cards[i], agent);
      }
    }
  }

  async discard(agent) {
    while (agent.cards.count() > constants.MAX_CARDS) {
      await this.controller._discard(agent, this.world);
    }
  }

  infectCities() {
    
  }
}

export default Game;
