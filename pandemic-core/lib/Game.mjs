import Deck from './Deck';
import constants from './constants';

const actions = constants.actions;

class Game {

  constructor(world, agents, infectionDeck, playerDeck, controller, turn) {
    this.world = world;
    this.agents = agents;
    this.controller = controller;
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

  async play(turnCallback) {
    let agentIndex = 0;
    while(!this.done) {
      let agent = this.agents[agentIndex];
      await turn(agent);
      agentIndex = agentIndex + 1 % this.agents.length;
      await turnCallback(this);
    }
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
    await this.checkFinalState();
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
    await this.checkFinalState();
  }

  async discard(agent) {
    while (agent.cards.count() > constants.MAX_CARDS) {
      await this.controller._discard(agent, this.world);
    }
  }

  async infectCities() {
    this.world.infect();
    await this.checkFinalState();
  }

  async checkFinalState() {
    // Check for win
    await this.checkWin();
    if (!this.done) {
      await this.checkLose();
    }
  }

  async checkWin() {
    let cureCount = 0;
    for (let c in this.world.cured) {
      if (this.world.cured[c]) {
        cureCount++;
      }
    }
    if (cureCount === 4) {
      this.done = true;
      await this.controller._win(this.world, constants.win_conditions.ALL_CURES);
    }
  }

  async checkLose() {
    let diseases = this.world.getAllDiseaseCounts();
    for (let d in diseases) {
      if (diseases[d] > constants.MAX_DISEASE_COUNT) {
        this.done = true;
        await this.controller._lose(this.world, constants.loss_conditions.DISEASE_COUNT);
        return;
      }
    }
    if (this.world.getOutbreakCount() > constants.MAX_OUTBREAKS) {
      this.done = true;
      await this.controller._lose(this.world, constants.loss_conditions.OUTBREAK_COUNTER);
      return;
    }
  }
}

export default Game;
