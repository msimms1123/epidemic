import Deck from './Deck';
import Agent from './Agent';
import World from './World';
import constants from './constants';

const actions = constants.actions;

// Default data
import cityJson from '../data/cityGraph.json';
import playerCardJson from '../data/playerDeck.json';
import infectionCardJson from '../data/infectionDeck.json';

class Game {

  constructor(world, agents, controller, currentTurn) {
    this.world = world;
    this.agents = agents;
    this.controller = controller;
    this.currentTurn = currentTurn || 0;
  }

  init() {
    this.initAgents();
  }

  initAgents() {
    const startingCardCount = constants.starting_card_count[this.agents.length];
    const startingCity = this.world.getCity(constants.start_location);
    for (let i=0; i<this.agents.length; i++) {
      let a = this.agents[i];
      this.getStartingCards(a, startingCardCount);
      a.setLocation(startingCity);
    }
  }
  
  getStartingCards(agent, startingCardCount) {
    const playerDeck = this.world.playerDeck;
    while (agent.cards.count() < startingCardCount) {
      let card = playerDeck.draw();
      if (card.type !== constants.cards.EPIDEMIC) {
        agent.cards.addCard(card);
      } else {
        playerDeck.addCardBottom(card);
      }
    }
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
      console.log(agent.name);
      await this.turn(agent);
      agentIndex = (agentIndex + 1) % this.agents.length;
      if (turnCallback) {
        await turnCallback(this);
      }
    }
  }

  async turn(agent) {
    console.log('At doAction');
    await this.doActions(agent);
    if (this.done) return;
    console.log('At draw');
    await this.drawPlayerCards(agent);
    if (this.done) return;
    console.log('At discard');
    await this.discard(agent);
    if (this.done) return;
    console.log('At infect');
    this.infectCities();
  }

  async doActions(agent) {
    await this.controller._doActions(agent, this.world);
    await this.checkFinalState();
  }

  async drawPlayerCards(agent) {
    const cards = this.world.drawPlayerCards(2);
    if (cards.length < 2) {
      return await this.controller._lose(this.world, constants.loss_conditions.NO_PLAYER_CARDS);
    }
    for (let i=0; i<cards.length; i++) {
      if (cards[i].type === constants.cards.EPIDEMIC) {
        let location = this.world.epidemic();
        await this.controller._epidemic(agent, this.world, location);
      } else {
        this.world.addCardToAgent(cards[i], agent);
      }
    }
    await this.controller._cardDraw(agent, this.world, cards);
    await this.checkFinalState();
  }

  async discard(agent) {
    console.log(`AGENT CARDS ${agent.cards.count()}`);
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

  static getAgents(players) {
    const agentTypes = Object.keys(constants.agents);
    shuffle(agentTypes);
    const agents = [];
    for (let i=0; i<players; i++) {
      agents.push(new Agent(agentTypes[i]));
    }
    return agents;
  }

  static getStandardGame(players, controller) {
    const agents = Game.getAgents(players);
    const world = World.loadWorld(cityJson, playerCardJson, infectionCardJson);
    const game = new Game(world, agents, controller, 0);
    game.init();
    return game;
  }
  
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return this;
}




export default Game;
