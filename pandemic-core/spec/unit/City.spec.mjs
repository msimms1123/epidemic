import City from '../../lib/City.mjs';
import TF from '../testframe.mjs';

const tf = new TF('City Test');

let city1, city2, city3;

// Create new Deck
tf.test('Create new city', () => {
  city1 = new City('city1', 'blue');
  tf.ok(city1);
  console.log(city1);
});

tf.test('Connect cities', () => {
  city2 = new City('city2', 'yellow');
  city3 = new City('city3', 'red');
  city1.addConnection(city2);
  city1.addConnection(city3);
  city2.addConnection(city3);
  tf.ok(city1.getConnection('city2'));
  tf.ok(city1.getConnection('city3'));
  tf.ok(city2.getConnection('city1'));
  tf.ok(city2.getConnection('city3'));
  tf.ok(city3.getConnection('city2'));
});

tf.test('Build a new station', () => {
  tf.compare(city1.hasStation(), false);
  city1.buildStation();
  tf.compare(city1.hasStation(), true);
});

tf.test('Infect with default disease', () => {
  city1.infect();
  tf.compare(city1.getDiseaseCount(city1.coreDisease), 1);
});

tf.test('Infect with any disease', () => {
  city1.infect('red');
  tf.compare(city1.getDiseaseCount(city1.coreDisease), 1);
  tf.compare(city1.getDiseaseCount('red'), 1);
});

tf.test('Outbreak with default disease', () => {
  city1.infect();
  let noOutbreak = city1.infect();
  tf.compare(city1.getDiseaseCount(city1.coreDisease), 3);
  tf.ok(!noOutbreak);
  let outbreak = city1.infect();
  tf.ok(outbreak);
  tf.compare(city1.getDiseaseCount(city1.coreDisease), 3);
});

tf.test('Treat the default disease', () => {
  tf.compare(city1.getDiseaseCount(city1.coreDisease), 3);
  city1.treat();
  tf.compare(city1.getDiseaseCount(city1.coreDisease), 2);
});

tf.test('Treat a specific disease', () => {
  tf.compare(city1.getDiseaseCount('red'), 1);
  city1.treat('red');
  tf.compare(city1.getDiseaseCount('red'), 0);
  tf.compare(city1.getDiseaseCount(city1.coreDisease), 2);
});

tf.test('Clear a specific disease', () => {
  city1.infect('red');
  city1.infect('red');
  tf.compare(city1.getDiseaseCount('red'), 2);
  city1.clear('red');
  tf.compare(city1.getDiseaseCount('red'), 0);
  tf.compare(city1.getDiseaseCount(city1.coreDisease), 2);
});

tf.end();
