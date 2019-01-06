import api from './pandemic-core/index';
import Controller from './pandemic-core/Controller';
import events from './pandemic-core/events';


class EmptyController extends Controller {
  constructor(savestate, setPhase){
    super();
    this.savestate = savestate;
    this.setPhase = setPhase;
  }
  resetMap(){
    this.savestate(this);
  }
  
  async doActions(agent, world) {
    console.log('do action');
    await new Promise((resolve, reject) => {
      this.setPhase('move', resolve, agent, this,
    )}).then(()=>{
      this.setPhase(null);
    });
    this.savestate(this);
  }

  async cardDraw(agent, cards) {
    console.log('do draw');
    await new Promise((resolve, reject) => {
      this.setPhase('draw', resolve, agent, this, cards)
    }).then(()=>{
      this.setPhase(null);
    });
    this.savestate(this);
  }

  async epidemic(agent, location) {
    console.log('do epidemic');
    console.log(`Epidemic location: ${location.name}`);
    await new Promise((resolve, reject) => {
      this.setPhase('epidemic', resolve, agent, this, location.name)
    }).then(()=>{
      this.setPhase(null);
    });
    this.savestate(this);
  }
  
  async discard(agent) {
    console.log('do discard');
    const cards = this.getCards();
    await new Promise((resolve, reject) => {
      this.setPhase('discard', resolve, agent, this)
    }).then(()=>{
      this.setPhase(null);
    });
    this.savestate(this);
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


  export default EmptyController

