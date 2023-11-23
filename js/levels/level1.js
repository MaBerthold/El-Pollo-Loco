/**
 * Sets the level with enemies, background objects and collectable objects
 */

const chickens = Array.from({ length: 5 }, () => new Chicken());
const smallChickens = Array.from({ length: 5 }, () => new SmallChicken());
const clouds = [new Cloud()];
const coins = Array.from({ length: 12 }, () => new Coin());
const bottles = Array.from({ length: 8 }, () => new Bottle());
const backgroundObjects = [];
for (let i = -719; i <= 719 * 12; i += 719) {
  const airLayer = new BackgroundObject('img/5_background/layers/air.png', i);
  const thirdLayer = new BackgroundObject('img/5_background/layers/3_third_layer/' + ((i % 1438 === 0) ? '2' : '1') + '.png', i);
  const secondLayer = new BackgroundObject('img/5_background/layers/2_second_layer/' + ((i % 1438 === 0) ? '2' : '1') + '.png', i);
  const firstLayer = new BackgroundObject('img/5_background/layers/1_first_layer/' + ((i % 1438 === 0) ? '2' : '1') + '.png', i);

  backgroundObjects.push(airLayer, thirdLayer, secondLayer, firstLayer);
  level1 = new Level([...chickens, ...smallChickens], clouds, backgroundObjects, coins, bottles);
}


