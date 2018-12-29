import City from '../../lib/City.mjs';
import Agent from '../../lib/City.mjs';
import World from '../../lib/World.mjs';
import TF from '../testframe.mjs';

const tf = new TF('World Test');

let city1, city2, city3, city4, world;

tf.test('Pretest - Create cities', () => {
  city1 = new City('city1', 'blue');
  city2 = new City('city2', 'yellow');
  city3 = new City('city3', 'red');
  city4 = new City('city4', 'red');
  city1.addConnection(city2);
  city1.addConnection(city3);
  city2.addConnection(city3);
  city3.addConnection(city4);
  city1.buildStation();
});

// Create new Deck
tf.test('Create new world', () => {
  world = new World();
  tf.ok(world);
  tf.ok(city1);
  tf.ok(city2);
  tf.ok(city3);
  world
    .addCity(city1)
    .addCity(city2)
    .addCity(city3);
});

tf.test('Get cities', () => {
  let cities = world.getCities();
  tf.compare(cities.length, 3);
});

tf.test('Get station cities', () => {
  let cities = world.getStationCities();
  tf.compare(cities.length, 1);
  tf.compare(cities[0].name, city1.name);
});

tf.test('Infect cities with default disease', () => {
  tf.compare(city1.getDiseaseCount(), 0);
  tf.compare(city2.getDiseaseCount(), 0);
  tf.compare(city3.getDiseaseCount(), 0);

  world
    .infect('city1')
    .infect('city2')
    .infect('city3');

  tf.compare(city1.getDiseaseCount(), 1);
  tf.compare(city2.getDiseaseCount(), 1);
  tf.compare(city3.getDiseaseCount(), 1);
  tf.compare(city4.getDiseaseCount(), 0);
});

tf.test('Cause outbreak in city', () => {
  world
    .infect('city1')
    .infect('city1');
  tf.compare(city1.getDiseaseCount(), 3);
  world.infect('city1');
  let disease = city1.coreDisease;
  tf.compare(city1.getDiseaseCount(disease), 3);
  tf.compare(city2.getDiseaseCount(disease), 1);
  tf.compare(city3.getDiseaseCount(disease), 1);
  tf.compare(city4.getDiseaseCount(disease), 0);
});

tf.test('Treat disease in city', () => {
  let disease = city1.coreDisease;
  tf.compare(world.getDiseaseCount(disease), 5);
  tf.compare(city3.getDiseaseCount(disease), 1);
  world.treat('city3', disease);
  tf.compare(world.getDiseaseCount(disease), 4);
  tf.compare(city3.getDiseaseCount(disease), 0);
});

tf.test('Chain outbreak', () => {
  let disease = city1.coreDisease;
  world.infect('city2', disease);
  world.infect('city2', disease);
  tf.compare(city1.getDiseaseCount(disease), 3);
  tf.compare(city2.getDiseaseCount(disease), 3);
  tf.compare(city3.getDiseaseCount(disease), 0);
  tf.compare(city4.getDiseaseCount(disease), 0);
  tf.compare(world.getDiseaseCount(disease), 6);

  world.infect('city2', disease);

  tf.compare(city1.getDiseaseCount(disease), 3);
  tf.compare(city2.getDiseaseCount(disease), 3);
  tf.compare(city3.getDiseaseCount(disease), 2);
  tf.compare(city4.getDiseaseCount(disease), 0);
  tf.compare(world.getDiseaseCount(disease), 8);
});

tf.end();
