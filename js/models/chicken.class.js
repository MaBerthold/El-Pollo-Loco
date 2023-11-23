class Chicken extends MovableObject {
  height = 100;
  width = 100;
  y = 330;
  speed = Math.random() * 3;
  paused;

  IMAGES_WALK = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  constructor() {
    super();
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALK);
    this.x = 400 + Math.random() * 1500;
    this.animate();
  }

  /**
* Initiates the character walking animation and sets up intervals for movement and animation.
*/
  animate() {
    let animationRunning = false;

    const walkInterval = setInterval(() => {
      this.walkAnimationStep(animationRunning);
    }, 100);

    const checkStatusInterval = setInterval(() => {
      this.checkStatusAndPause(animationRunning, walkInterval, checkStatusInterval);
    }, 20);
  }

  /**
  * Handles a step in the character walking animation.
  * @param {boolean} animationRunning - Flag indicating whether the animation is already running.
  */
  walkAnimationStep(animationRunning) {
    if (!this.paused && !animationRunning) {
      this.moveLeft();
      this.playAnimation(this.IMAGES_WALK);
    }
  }

  /**
  * Checks character status and pauses the animation if dead or the game is paused.
  * Also resumes the animation if the game is paused and animation is not running.
  * @param {boolean} animationRunning - Flag indicating whether the animation is already running.
  * @param {number} walkInterval - Interval ID for walking animation.
  * @param {number} checkStatusInterval - Interval ID for checking character status.
  */
  checkStatusAndPause(animationRunning, walkInterval, checkStatusInterval) {
    if (this.img.src.includes('dead') || this.paused) {
      clearInterval(walkInterval);
      clearInterval(checkStatusInterval);

      if (this.paused && !animationRunning) {
        this.resumeAnimation();
      }
    }
  }

  /**
  * Resumes the character animation after a pause.
  */
  resumeAnimation() {
    this.animate();
  }
}


