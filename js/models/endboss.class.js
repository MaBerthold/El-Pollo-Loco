class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 60;
  x = 2500;
  speed = 10;
  soundDead = new Audio('audio/rooster-crowing.mp3');
  soundHurt = new Audio('audio/hurt-endboss.mp3');
  paused = false;

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'
  ];

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
  ];

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png'
  ];

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png'
  ];

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png'
  ];

  IMAGES_WALK_ALERT = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
  ];

  constructor() {
    super();
    this.loadingAllImages();
    this.currentX = this.x;
    this.animate();
  }

  loadingAllImages() {
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages([...this.IMAGES_WALKING, ...this.IMAGES_ALERT, ...this.IMAGES_DEAD]);
    this.loadImages([...this.IMAGES_HURT, ...this.IMAGES_ATTACK]);
  }

  /**
 * Main animation function that orchestrates the character's movement and animations.
 */
  animate() {
    let animationRunning = false;

    const checkStatusInterval = setInterval(() => {
      if (this.paused) {
        clearInterval(checkStatusInterval);
        return;
      }

      if (animationRunning) return;

      animationRunning = true;
      this.animationInterval = setInterval(() => {
        this.handleMovementAndAnimation();
        this.handleHurtAndDead();
      }, 150);
    }, 20);
  }

  /**
  * Handles character movement and walking animation.
  */
  handleMovementAndAnimation() {
    if (!this.isHurt() || !this.isDead()) {
      if (!this.paused) {
        this.currentX = this.x;
        this.moveLeft();
        this.playAnimation(this.IMAGES_WALKING);
      }
    }
  }

  /**
  * Checks and handles hurt or dead conditions.
  */
  handleHurtAndDead() {
    if (this.isHurt()) {
      this.handleHurtAnimation();
    }

    if (this.isDead()) {
      this.handleDeadAnimation();
    }
  }

  /**
  * Handles the animation when the character is hurt.
  */
  handleHurtAnimation() {
    clearInterval(this.animationInterval);
    this.soundHurt.play();

    this.animationInterval = setInterval(() => {
      this.playAnimation([...this.IMAGES_HURT, ...this.IMAGES_ATTACK, ...this.IMAGES_HURT, ...this.IMAGES_HURT]);
    }, 100);

    this.scheduleHurtContinuation();
  }

  /**
  * Schedules the continuation of hurt animation after a delay.
  */
  scheduleHurtContinuation() {
    setTimeout(() => {
      clearInterval(this.animationInterval);
      this.isHurtContinuationRunning = false;
      this.animateHurtContinuation(true);
    }, 1600);
  }

  /**
  * Handles the animation when the character is dead.
  */
  handleDeadAnimation() {
    clearInterval(this.animationInterval);

    const deadInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_DEAD);
      this.loadImage('img/4_enemie_boss_chicken/5_dead/G26.png');
      setTimeout(() => {
        this.img.src = 'img/4_enemie_boss_chicken/5_dead/G26.png';
      }, 500);
    }, 450);
    this.soundDead.play();
    this.scheduleEndOfAnimation(deadInterval);
  }

  /**
  * Schedules the end of the animation after a delay.
  */
  scheduleEndOfAnimation(deadInterval) {
    setTimeout(() => {
      clearInterval(deadInterval);
      this.world.stopRepeatDrawFunction('endboss');
    }, 1000);
  }

  /**
  * Continues the hurt animation after the initial hurt animation is complete.
  */
  animateHurtContinuation(hurt) {
    if (hurt && !this.isHurtContinuationRunning) {
      this.isHurtContinuationRunning = true;
      this.animationInterval = setInterval(() => {
        this.handleHurtContinuationMovement();
      }, 150);

      this.scheduleEndOfHurtContinuation();
    } else {
      this.animate();
    }
  }

  /**
  * Handles movement during the hurt continuation animation.
  */
  handleHurtContinuationMovement() {
    if (!this.paused) {
      this.moveLeft();
      this.playAnimation([...this.IMAGES_HURT, ...this.IMAGES_ATTACK, ...this.IMAGES_HURT, ...this.IMAGES_HURT]);
    }
  }

  /**
  * Schedules the end of the hurt continuation after a delay.
  */
  scheduleEndOfHurtContinuation() {
    setTimeout(() => {
      clearInterval(this.animationInterval);
      this.isHurtContinuationRunning = false;
      this.animate();
    }, 1600);
  }
}

