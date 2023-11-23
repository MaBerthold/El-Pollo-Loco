class Coin extends CollectableObject {
  height = 80;
  width = 80;
  soundCollectCoin = new Audio('audio/collect-coin.mp3');


  IMAGES_COIN = [
    'img/8_coin/coin_1.png',
    'img/8_coin/coin_2.png'
  ];

  constructor() {
    super();
    this.loadImage('img/8_coin/coin_2.png');
    this.loadImages(this.IMAGES_COIN);
    this.animate();
    this.x = 300 + Math.random() * 2300;
    this.y = 155 + Math.random() * 200;
    this.checkMuteState();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 200);
  }

/**
* Removes a coin from the array 'coins', and plays a coin sound
* @param {object} co - collectable object (coin)
*/
  collect(co) {
    const index = this.world.level.coins.indexOf(co);
    if (index > -1) {
      this.world.level.coins.splice(index, 1);
    }
    this.soundCollectCoin.play();
  }

  /**
 * checks if the mute button is clicked in an interval of 20 ms
 */
  checkMuteState() {
    setInterval(() => {
      this.updateThrowSound(this.soundCollectCoin);
    }, 20);
  }
}