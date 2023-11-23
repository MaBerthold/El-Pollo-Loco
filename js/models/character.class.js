class Character extends MovableObject {

    width = 120;
    height = 250;
    y = 180;
    x = 60;
    speed = 10;
    isKeyPressed = false;
    idle = false;
    sleep = false;
    idleTime = null;
    isFirstIdleCall = true;
    paused;
    world;
    walkingSound = new Audio('audio/walk-Character.mp3');
    jumpingSound = new Audio('audio/jump.mp3');
    hurtingSound = new Audio('audio/hurt.mp3');
    deadSound = new Audio('audio/dead.mp3');


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    constructor() {
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.applyGravity();
        this.animate();
    }

    /**
 * Initiates character animations and starts relevant intervals.
 */
    animate() {
        if (!this.paused) {
            this.walkInterval = this.startWalkingInterval();
            this.animationInterval = this.startAnimationInterval();
            this.idleCheckInterval = this.startIdleCheckInterval();
        }
    }

    /**
     * Starts the interval for handling character walking logic.
     * @returns {number} - The interval ID.
     */
    startWalkingInterval() {
        return setInterval(() => {
            this.checkKeysPressed();
            this.walkingSound.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.handleMoveRight();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.handleMoveLeft();
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.handleJump();
            }

            if (this.x < 7500) {
                this.adjustCamera();
            }
        }, 1000 / 60);
    }

    /**
     * Handles character movement to the right.
     */
    handleMoveRight() {
        this.moveRight();
        this.walkingSound.play();
    }

    /**
     * Handles character movement to the left.
     */
    handleMoveLeft() {
        this.moveLeft();
        this.otherDirection = true;
        this.walkingSound.play();
    }

    /**
     * Handles character jumping logic.
     */
    handleJump() {
        this.jumpingSound.play();
        this.jump();
    }

    /**
     * Adjusts the camera position based on character movement.
     */
    adjustCamera() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Starts the interval for handling character animations.
     * @returns {number} - The interval ID.
     */
    startAnimationInterval() {
        return setInterval(() => {
            if (this.isDead()) {
                this.handleDeadAnimation();
            } else if (this.isHurt()) {
                this.handleHurtAnimation();
            } else if (this.isWalking()) {
                this.handleWalkingAnimation();
            } else if (this.isAboveGround()) {
                this.handleJumpingAnimation();
            } else {
                this.handleIdleAnimation();
            }
        }, 200);
    }

    /**
     * Checks if the character is walking.
     * @returns {boolean} - True if walking, false otherwise.
     */
    isWalking() {
        return (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround();
    }

    /**
     * Handles dead animation logic.
     */
    handleDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.deadSound.play();
        setTimeout(() => {
            this.stopIntervals();
            this.world.stopRepeatDrawFunction('pepe');
        }, 1000);
    }

    /**
     * Handles hurt animation logic.
     */
    handleHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurtingSound.play();
    }

    /**
     * Handles walking animation logic.
     */
    handleWalkingAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Handles jumping animation logic.
     */
    handleJumpingAnimation() {
        this.walkingSound.pause();
        this.playAnimation(this.IMAGES_JUMPING);
    }

    /**
     * Handles idle animation logic.
     */
    handleIdleAnimation() {
        if (!this.sleep) {
            this.idleModus();
        }
    }

    /**
     * Starts the interval for checking idle state.
     * @returns {number} - The interval ID.
     */
    startIdleCheckInterval() {
        return setInterval(() => {
            if (this.idleTime !== null && Date.now() - this.idleTime >= 4000) {
                this.playAnimation(this.IMAGES_SLEEP);
            }
            if (this.checkKeysPressed()) {
                this.isFirstIdleCall = true;
            }
        }, 200);
    }

    /**
     * Stops all animation-related intervals.
     */
    stopIntervals() {
        clearInterval(this.walkInterval);
        clearInterval(this.animationInterval);
        clearInterval(this.idleCheckInterval);
    }

    /**
     * Handles idle state logic.
     */
    idleModus() {
        if (this.isFirstIdleCall) {
            this.idleTime = Date.now();
            this.isFirstIdleCall = false;
        }
        this.playAnimation(this.IMAGES_IDLE);
        this.idle = true;
    }

    /**
     * Checks if any keys are pressed.
     * @returns {boolean} - True if any keys are pressed, false otherwise.
     */
    checkKeysPressed() {
        if (this.world.keyboard.UP || this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE || this.world.keyboard.D) {
            this.idle = false;
            this.sleep = false;
            this.idleTime = null;
            return true;
        } else {
            return false;
        }
    }
}