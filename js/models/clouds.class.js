class Cloud extends MovableObject {

  y = 50;
  height = 200;
  width = 500;
  speed = 0.15;
  paused = false;

   /**
   * Constructor for the Cloud class, sets random x-coordinate for the cloud within a range
   */
   constructor() {
    super();
    this.loadImage('img/5_background/layers/4_clouds/1.png');
    this.x = Math.random() * 500;
    this.animate();
  }

   /**
   * Initiates the cloud animation by moving the cloud to the left.
   */
   animate() {
    if (!this.paused) {
      this.moveLeft();
    }
  }
}