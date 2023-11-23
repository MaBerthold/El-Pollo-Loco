class ThrowableObject extends MovableObject {
    height = 100;
    width = 60;
    throwSound = new Audio('audio/throw.mp3');
    splashSound = new Audio('audio/splash.mp3');
    splash = false;
    mute = false;


    IMAGES_BOTTLE_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',

    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',

    ];

    constructor(x, y) {
        super();
        this.world = world;
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_THROW);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.throw(x, y);
    }

    /**
     * Starts the splash animation if the throwable object has splashed.
     * @param {string} splash - The splash type.
     * @param {number} x - The x-coordinate for the splash animation.
     * @param {number} y - The y-coordinate for the splash animation.
     */
      startSplashAnimation(splash, x, y) {
        if (splash === 'splash') {
            this.splash = true;
            setInterval(() => {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                this.speedY = 0;
                this.y = y;
                this.x = x;
            }, 100);
            this.splashSound.play();
        }
    }

    /**
     * Throws the throwable object with specified coordinates.
     * @param {number} x - The x-coordinate for the throw.
     * @param {number} y - The y-coordinate for the throw.
     */
    throw(x, y) {
        const Timeout = setTimeout(() => {
            this.x = x;
            this.y = y;
            this.speedY = 20;
            this.applyGravity();
            this.updateThrowSound();
            this.throwInterval();
        })
        this.throwSound.play();
    }

    /**
     * Sets up intervals for gravity and throw animation.
     */
    throwInterval() {
        const gravityInterval =
            setInterval(() => {
                this.x += 10;
            }, 25);

        const throwInterval =
            setInterval(() => {
                this.playAnimation(this.IMAGES_BOTTLE_THROW);
            }, 100);

        setInterval(() => {
            if (this.splash === true) {
                clearInterval(gravityInterval);
                clearInterval(throwInterval);
            }
        }, 200);
    }

    /**
     * Updates the throw sound based on mute status.
     */
    updateThrowSound() {
        let muteBtn = document.getElementById('mute-icon');
        (muteBtn.src.includes('volume-mute-fill')) ? 
        (this.throwSound.muted = true, this.splashSound.muted = true) : 
        (this.throwSound.muted = false, this.splashSound.muted = false);
    }
}