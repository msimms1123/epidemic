import City from '../../lib/City.mjs';
import Agent from '../../lib/City.mjs';
import World from '../../lib/World.mjs';
import TF from '../testframe.mjs';

import * as cityJsonData from '../../data/cityGraph.json';
import * as playerCardJsonData from '../../data/playerDeck.json';
import * as infectionCardJSONData from '../../data/infectionDeck.json';
const cityJson = cityJsonData.default;
const playerCardJson = playerCardJsonData.default;
const infectionCardJSON = infectionCardJSONData.default;

const tf = new TF('World Test');

let city1, city2, city3, city4, world;

let basicAgent = {};

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
    .addCity(city3)
    .addCity(city4);
});

tf.test('Get cities', () => {
  let cities = world.getCities();
  tf.compare(cities.length, 4);
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
    ._infect(city1)
    ._infect(city2)
    ._infect(city3);

  tf.compare(city1.getDiseaseCount(), 1);
  tf.compare(city2.getDiseaseCount(), 1);
  tf.compare(city3.getDiseaseCount(), 1);
  tf.compare(city4.getDiseaseCount(), 0);
});

tf.test('Cause outbreak in city', () => {
  world
    ._infect(city1)
    ._infect(city1);
  tf.compare(city1.getDiseaseCount(), 3);
  world._infect(city1);
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
  world.treat(basicAgent, city3, disease);
  tf.compare(world.getDiseaseCount(disease), 4);
  tf.compare(city3.getDiseaseCount(disease), 0);
});

tf.test('Chain outbreak', () => {
  let disease = city1.coreDisease;
  world._infect(city2, disease);
  world._infect(city2, disease);
  tf.compare(city1.getDiseaseCount(disease), 3);
  tf.compare(city2.getDiseaseCount(disease), 3);
  tf.compare(city3.getDiseaseCount(disease), 0);
  tf.compare(city4.getDiseaseCount(disease), 0);
  tf.compare(world.getDiseaseCount(disease), 6);

  world._infect(city2, disease);

  tf.compare(city1.getDiseaseCount(disease), 3);
  tf.compare(city2.getDiseaseCount(disease), 3);
  tf.compare(city3.getDiseaseCount(disease), 2);
  tf.compare(city4.getDiseaseCount(disease), 0);
  tf.compare(world.getDiseaseCount(disease), 8);
});

tf.test('Should revert q', () => {
  let disease = city1.coreDisease;
  const qIndex = world.getQIndex();
  tf.compare(city1.getDiseaseCount(disease), 3);
  tf.compare(city2.getDiseaseCount(disease), 3);
  tf.compare(city3.getDiseaseCount(disease), 2);
  tf.compare(city4.getDiseaseCount(disease), 0);
  tf.compare(world.getDiseaseCount(disease), 8);
  tf.compare(world.getOutbreakCount(), 3);

  world._infect(city3, disease);
  world._infect(city3, disease);
  tf.compare(city1.getDiseaseCount(disease), 3);
  tf.compare(city2.getDiseaseCount(disease), 3);
  tf.compare(city3.getDiseaseCount(disease), 3);
  tf.compare(city4.getDiseaseCount(disease), 1);
  tf.compare(world.getDiseaseCount(disease), 10);
  tf.compare(world.getOutbreakCount(), 6);

  world.revertEventQ(qIndex);
  tf.compare(city1.getDiseaseCount(disease), 3);
  tf.compare(city2.getDiseaseCount(disease), 3);
  tf.compare(city3.getDiseaseCount(disease), 2);
  tf.compare(city4.getDiseaseCount(disease), 0);
  tf.compare(world.getDiseaseCount(disease), 8);
  tf.compare(world.getOutbreakCount(), 3);
  tf.compare(world.getQIndex(), qIndex);

});

tf.test('Should create a city map from an imported json', () => {
  const cities = World.buildCities(cityJson);
  //console.log(cities);

  const atlanta = cities['Atlanta'];
  tf.ok(atlanta);
  tf.compare(atlanta.coreDisease, 'blue');
  tf.ok(atlanta.getConnection('Chicago'));
  tf.ok(atlanta.getConnection('Miami'));
  tf.ok(atlanta.getConnection('Washington'));
  
  tf.ok( ! atlanta.getConnection('Hong_Kong'));
  tf.ok( ! atlanta.getConnection('fake'));

  const hongKong = cities['Hong_Kong'];
  tf.ok(hongKong);
  tf.compare(hongKong.coreDisease, 'red');
  tf.ok(hongKong.getConnection("Shanghai"));
  tf.ok(hongKong.getConnection("Taipei"));
  tf.ok(hongKong.getConnection("Kolkata"));
  tf.ok(hongKong.getConnection("Bangkok"));
  tf.ok(hongKong.getConnection("Ho_Chi_Minh_City"));
  tf.ok(hongKong.getConnection("Manila"));

  tf.ok( ! hongKong.getConnection('Atlanta'));
  tf.ok( ! hongKong.getConnection('fake'));
});

tf.test('Should create a player deck from an imported json', () => {
  const cards = World.buildDeckFromCards(playerCardJson);
  let hkCard = cards.getCard('Hong_Kong');
  tf.ok(hkCard);
  tf.compare(hkCard.disease, 'red');
  tf.compare(hkCard.type, 'location');
});

tf.end();

