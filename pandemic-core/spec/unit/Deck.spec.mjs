import Deck from '../../lib/Deck.mjs';
import TF from '../testframe.mjs';

const tf = new TF('Deck Test');

let deck, cards, card;

// Create new Deck
tf.test('Create Deck', () => {
  deck = new Deck();
  tf.ok(deck);
});

tf.test('Add cards to deck', () => {
  deck.addCard({name: 'test3'});
  deck.addCard({name: 'test2'});
  deck.addCard({name: 'test1'});
  tf.ok(deck.getCard('test1'));
  tf.ok(deck.getCard('test2'));
  tf.ok(deck.getCard('test3'));
});

tf.test('Get card from deck', () => {
  let card = deck.getCard('test1');
  tf.ok(card);
  tf.compare(card.name, 'test1');
});

tf.test('Draw from top', () => {
  card = deck.drawCardTop('test1');
  tf.ok(card);
  tf.compare(deck.count(), 2);
  tf.compare(card.name, 'test1');  
});

tf.test('Add to top', () => {
  deck.addCardTop(card);
  tf.compare(deck.count(), 3);
});

tf.test('Draw from bottom', () => {
  card = deck.drawCardBottom('test3');
  tf.ok(card);
  tf.compare(deck.count(), 2);
  tf.compare(card.name, 'test3');  
});

tf.test('Add to bottom', () => {
  deck.addCardBottom(card);
  tf.compare(deck.count(), 3);
});

tf.test('Should shuffle the cards', () => {
  console.log('Pre shuffle:', deck);
  deck.shuffle();
  console.log('Post shuffle:', deck);
});

tf.end();
