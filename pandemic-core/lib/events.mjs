import constants from './constants';

class Event {

  apply(world) {
    throw new Error('No "apply" implemented for this event!');
  }

  invert() {
    throw new Error('No inverse action for this event!');
  }
}

class Move extends Event {
  constructor(agent, type, sourceCity, targetCity) {
    super();
    this.agent = agent;
    this.type = type;
    this.sourceCity = sourceCity;
    this.targetCity = targetCity;
  }

  apply(world) {
    this.agent.setLocation(this.targetCity);
  }

  invert() {
    return new Move(this.agent, this.type, this.targetCity, this.sourceCity);
  }
}

class Build extends Event {
  constructor(agent, targetCity) {
    super();
    this.agent = agent;
    this.targetCity = targetCity;
  }

  apply(world) {
    this.targetCity.buildStation();
  }

  invert() {
    return new Dismantle(this.agent, this.targetCity);
  }
}

class Dismantle extends Event {
  constructor(agent, targetCity) {
    super();
    this.agent = agent;
    this.targetCity = targetCity;
  }

  apply(world) {
    this.targetCity.removeStation();
  }

  invert() {
    return new Build(this.agent, this.targetCity);
  }
}

class Treat extends Event {
  constructor(disease, targetCity) {
    super();
    this.disease = disease;
    this.targetCity = targetCity;
  }

  apply(world) {
    this.targetCity.treat(this.disease);
  }

  invert() {
    return new Infect(this.disease, this.targetCity);
  }
}

class Infect extends Event {
  constructor(disease, targetCity) {
    super();
    this.disease = disease;
    this.targetCity = targetCity;
  }

  apply(world) {
    this.targetCity.infect(this.disease);
  }

  invert() {
    return new Treat(this.disease, this.targetCity);
  }
}

class Outbreak extends Event {
  constructor(disease, targetCity) {
    super();
    this.disease = disease;
    this.targetCity = targetCity;
  }

  apply(world) {
    world.outbreakCount++;
  }

  invert() {
    return new ClearOutbreak(this.disease, this.targetCity);
  }
}

class ClearOutbreak extends Event {
  constructor(disease, targetCity) {
    super();
    this.disease = disease;
    this.targetCity = targetCity;
  }

  apply(world) {
    world.outbreakCount--;
  }

  invert() {
    return new Outbreak(this.disease, this.targetCity);
  }
}

class Cure extends Event {
  constructor(disease) {
    super();
    this.disease = disease;
  }

  apply(world) {
    world._cure(this.disease);
  }

  invert() {
    return new ReverseCure(this.disease);
  }
}

class ReverseCure extends Event {
  constructor(disease) {
    super();
    this.disease = disease;
  }

  apply(world) {
    world._reverseCure(this.disease);
  }

  invert() {
    return new Cure(this.disease);
  }
}

class Discard extends Event {
  constructor(card, deck, index) {
    super();
    this.card = card;
    this.deck = deck;
    this.index = index;
  }

  apply(world) {
    this.deck.removeCard(this.card.name);
  }

  invert() {
    return new Insert(this.card, this.deck, this.index);
  }
}

class Insert extends Event {
  constructor(card, deck, index) {
    super();
    this.card = card;
    this.deck = deck;
    this.index = index;
  }

  apply(world) {
    this.deck.insertCard(this.card, this.index);
  }

  invert() {
    return new Discard(this.card, this.deck, this.index);
  }
}

class Epidemic extends Event {
  constructor(disease, targetCity) {
    super();
    this.disease = disease;
    this.targetCity = targetCity;
  }

  apply(world) {
    world.infectionRateCounter++;
  }

  invert() {
    return new ClearEpidemic(this.disease, this.targetCity);
  }
}

class ClearEpidemic extends Event {
  constructor(disease, targetCity) {
    super();
    this.disease = disease;
    this.targetCity = targetCity;
  }

  apply(world) {
    world.infectionRateCounter--;
  }

  invert() {
    return new Epidemic(this.disease, this.targetCity);
  }
}

class SetDeck extends Event {
  constructor(target, oldDeck, newDeck) {
    super();
    this.target = target;
    this.oldDeck = oldDeck;
    this.newDeck = newDeck;
  }

  apply(world) {
    world._setDeck(this.target, this.newDeck);
  }

  invert() {
    return new SetDeck(this.target, this.newDeck, this.oldDeck);
  }  
}

// To invert informational events (i.e. events that have no world impact)
class NoOp extends Event {
  constructor() {}

  apply(world) {
    // Do Nothing
  }

  invert() {
    return new NoOp();
  }
}

const events = {
  Move,
  Build,
  Dismantle,
  Treat,
  Infect,
  Epidemic,
  ClearEpidemic,
  SetDeck,
  Outbreak,
  ClearOutbreak,
  Cure,
  ReverseCure,
  Discard,
  Insert,
  NoOp
};

export default events;
