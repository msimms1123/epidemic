import api from './lib/index';
import Controller from './lib/Controller';
import events from './lib/events';

class EmptyController extends Controller {
  
  async doActions(agent, world) {
    console.log('do action');
    console.log('Outbreak count:', world.getOutbreakCount());
    console.log('Card count:', agent.cards.count());
    console.log('Disease count:', world.getAllDiseaseCounts());
    // do nothing
  }

  async cardDraw(agent, cards) {
    console.log('do draw');
    // do nothing
  }

  async epidemic(agent, location) {
    console.log('do epidemic');
    console.log(`Epidemic location: ${location.name}`);
    // do nothing
  }
  
  async discard(agent) {
    console.log('do discard');
    //for (let i=0; i<cards.length; i++) {
    //  this.doDiscard(cards[i]);
    //}
    const cards = this.getCards();
    //console.log(this.agent.cards);
    //console.log(cards);
    this.doDiscard(cards[0]);
    this.doDiscard(cards[1]);
    //throw new Error('Must implement \'discard\' method');
  }

  async lose(cause, world) {
    console.log(cause);
    console.log(this.world.getAllDiseaseCounts());
    for (let i=0; i<this.world.eventQ.length; i++) {
      let e = this.world.eventQ[i];
      if (e instanceof events.Outbreak) {
        console.log(`Outbreak occured at ${e.targetCity.name}`);
      }
    } 
    throw new Error('Must implement \'lose\' method');
  }

  async win(cause, world) {
    throw new Error('Must implement \'win\' method');
  }
}

//console.log(api.Game);
const game = api.Game.getStandardGame(2, new EmptyController());

game.play()
  .then(() => {
    console.log('Play is complete!');
  })
  .catch(err => {
    console.log('Play failed!');
    console.log(err);
  });

