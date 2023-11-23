class Bottle extends CollectableObject {
  height = 100;
  width = 80;
  y = 340;
  SoundCollectBottle = new Audio('audio/collect-bottle.mp3');

  /**
   * Defines a random x for each instance and load the image of a new bottle
   */
  constructor() {
    super();
    this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    this.x = 100 + Math.random() * 200;
    this.checkMuteState();
  }


  /**
   * Removes a bottle from the array 'bottles', and plays a bottle sound
   * @param {object} co - collectable object (bottle)
   */
  collect(co) {
    const index = this.world.level.bottles.indexOf(co);
    if (index > -1) {
      this.world.level.bottles.splice(index, 1);
    }
    this.SoundCollectBottle.play();
  }


/**
 * checks if the mute button is clicked in an interval of 20 ms
 */
  checkMuteState() {
    setInterval(() => {
      this.updateThrowSound(this.SoundCollectBottle);
    }, 20);
  }
}