
class World {
    character = new Character();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    paused = false;
    isMuted = false;
    to_x;
    to_y;
    camera_x = 0;
    gameOver = new GameOver();
    gameWin = new GameWin();
    throwableObjects = [];
    amountOfBottles = [];
    coins = [];
    statusBarEndboss = new StatusBarEndboss();
    statusBarCharacter = new StatusBarCharacter();
    statusBarCoin = new StatusbarCoin();
    statusBarBottle = new StatusBarBottle();
    winSound = new Audio('audio/game-win.mp3');
    looseSound = new Audio('audio/game-over.mp3');
    deadChickenSound = new Audio('audio/popping-chicken.mp3');

    /**
     * Constructor for the World class.
     * @param {HTMLCanvasElement} canvas - The game canvas element.
     * @param {Object} keyboard - The keyboard input object.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.pause();
        this.stopAnimate();
    }

    /**
     * Mutes or unmutes various audio elements based on the provided key.
     * @param {boolean} key - The mute key.
     */
    mute(key) {
        this.isMuted = key;
        this.muteAudio(key, [this.winSound, this.looseSound, this.deadChickenSound]);
        this.muteObjectArray(key, this.level.coins, 'sound_collect_coin');
        this.muteObjectArray(key, this.level.bottles, 'sound_collect_bottle');

        if (this.isMuted) {
            this.muteThrowableObjects();
        }

        this.muteCharacterSounds(key);
        this.muteEndbossSounds(key);
    }

    /**
     * Mutes or unmutes an array of audio elements.
     * @param {boolean} key - The mute key.
     * @param {Audio[]} audioArray - The array of audio elements to mute/unmute.
     */
    muteAudio(key, audioArray) {
        audioArray.forEach(audio => audio.muted = key);
    }

    /**
     * Mutes or unmutes the sound property of an array of game objects.
     * @param {boolean} key - The mute key.
     * @param {Object[]} objectArray - The array of game objects.
     * @param {string} soundProperty - The sound property to mute/unmute.
     */
    muteObjectArray(key, objectArray, soundProperty) {
        objectArray.forEach(object => {
            if (object[soundProperty]) {
                object[soundProperty].muted = key;
            }
        });
    }
    
    

    /**
     * Mutes throwable objects in the game.
     */
    muteThrowableObjects() {
        this.throwableObjects.forEach(to => to.mute = true);
    }

    /**
     * Mutes or unmutes character-related sounds.
     * @param {boolean} key - The mute key.
     */
    muteCharacterSounds(key) {
        const characterSounds = [
            this.character.walkingSound,
            this.character.jumpingSound,
            this.character.hurtingSound,
            this.character.deadSound
        ];
        this.muteAudio(key, characterSounds);
    }

    /**
     * Mutes or unmutes endboss-related sounds.
     * @param {boolean} key - The mute key.
     */
    muteEndbossSounds(key) {
        const endbossSounds = [
            this.endboss.soundDead,
            this.endboss.soundHurt
        ];
        this.muteAudio(key, endbossSounds);
    }

    /**
     * Sets the world reference for various game elements.
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
        this.statusBarEndboss.world = this;
        this.level.coins.forEach((coin) => {
            coin.world = this;
        })
        this.level.bottles.forEach((bottle) => {
            bottle.world = this;
        })
        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        })
        this.throwableObjects.forEach((to) => {
            to.world = this;
        })
    }

    /**
     * Initiates the game loop.
     */
    run() {
        setInterval(() => {
            if (!this.paused) {
                this.checkCollectingObjects();
                this.checkThrowObjects();
                this.checkCollisions();
                this.checkBottleHit();
                this.checkJumpingOn();
            }
        }, 200);
    }

    /**
     * Pauses or unpauses the game elements.
     */
    pause() {
        setInterval(() => {
            if (this.paused) {
                this.character.paused = true;
                this.level.enemies.forEach(enemy => enemy.paused = true);
                this.endboss.paused = true;
            } else {
                this.character.paused = false;
                this.level.enemies.forEach(enemy => enemy.paused = false);
                this.endboss.paused = false;
            }
        }, 20);
    }

    /**
     * Stops the animation loop when the endboss is dead.
     */
    stopAnimate() {
        setInterval(() => {
            if (this.endboss.isDead()) {
                this.pause();
            }
        }, 20);
    }

    /**
     * Checks for collecting objects in the game.
     */
    checkCollectingObjects() {
        this.checkCollectingCoins();
        this.checkCollectingBottles();
    }

    /**
     * Checks for collecting coins in the game.
     */
    checkCollectingCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isCollecting(coin)) {
                if (this.coins.length < 5) {
                    this.coins.push(coin);
                    coin.collect(coin);
                }
                this.statusBarCoin.setPercentage(this.coins.length);
            }
        });
    }

    /**
     * Checks for collecting bottles in the game.
     */
    checkCollectingBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isCollecting(bottle)) {
                if (this.amountOfBottles.length < 5) {
                    this.amountOfBottles.push(bottle);
                    bottle.collect(bottle);
                }
                this.statusBarBottle.setPercentage(this.amountOfBottles.length);
            }
        });
    }

    /**
     * Checks for throwing objects in the game.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.amountOfBottles.length > 0) {
            let to = new ThrowableObject(this.character.x + 50, this.character.y + 20, this);
            to.updateThrowSound();
            this.throwableObjects.push(to);
            this.amountOfBottles.pop();
            this.statusBarBottle.setPercentage(this.amountOfBottles.length);
        }
    }

    /**
     * Checks for collisions between game elements.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) || this.character.isColliding(this.endboss)) {
                if (this.character.isJumpingOn(enemy) || this.isDead(enemy)) {
                    return;
                } else if (this.character.isDead()) {
                    this.statusBarCharacter.setPercentage(0);
                } else {
                    this.character.hit();
                    this.statusBarCharacter.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Checks for a bottle hitting the endboss.
     */
    checkBottleHit() {
        this.throwableObjects.forEach((to) => {
            if (!to.hasHitEndboss && this.endboss.isColliding(to)) {
                to.hasHitEndboss = true;
                this.to_y = to.y;
                this.to_x = to.x;
                setTimeout(() => {
                    this.throwableObjects.splice(to);
                }, 500);
                to.startSplashAnimation('splash', this.to_x, this.to_y);
                this.endboss.hit();
                this.statusBarEndboss.setPercentage(this.endboss.energy);
            }
        });
    }

    /**
     * Checks if an enemy is dead.
     * @param {Object} enemy - The enemy object.
     * @returns {boolean} - True if the enemy is dead, false otherwise.
     */
    isDead(enemy) {
        if (enemy.img.src.includes('dead')) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Checks for jumping on enemies and updates the game accordingly.
     */
    checkJumpingOn() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumpingOn(enemy)) {
                if (enemy.img.src.includes('small')) {
                    enemy.img.src = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
                } else {
                    enemy.img.src = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
                }
                this.deadChickenSound.play();
                setTimeout(() => {
                    const index = this.level.enemies.indexOf(enemy);
                    if (index > -1) {
                        this.level.enemies.splice(index, 1);
                    }
                }, 2000);
            }
        });
    }

    /**
     * Draws the game world on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.repeatDrawFunction();
    }

    /**
     * Draws various game objects on the canvas.
     */
    drawObjects() {
        this.drawBackgroundObjects();
        this.drawFixedObjects();
        this.drawStatusBarEndboss();
        this.drawCollectableObjects();
        this.drawMovableObjects();
    }

    /**
     * Draws background objects on the canvas.
     */
    drawBackgroundObjects() {
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws fixed objects on the canvas.
     */
    drawFixedObjects() {
        if (this.endboss.x < this.character.x + 700) {
            this.statusBarEndboss.x = this.character.x + 400;
        }
        this.addToMap(this.statusBarCharacter);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws the endboss status bar on the canvas.
     */
    drawStatusBarEndboss() {
        if (this.endboss.x > this.character.x + 700 || this.character.x > 2500) {
            this.statusBarEndboss.x = 7890;
        }
        this.addToMap(this.statusBarEndboss);
    }

    /**
     * Draws collectable objects on the canvas.
     */
    drawCollectableObjects() {
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
    }

    /**
     * Draws movable objects on the canvas.
     */
    drawMovableObjects() {
        this.addToMap(this.character);
        this.addToMap(this.endboss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * The ID for the animation frame.
     * @type {number}
     */
    animationFrameId;

    /**
     * Repeatedly draws the game world on the canvas.
     */
    repeatDrawFunction() {
        let self = this;
        this.animationFrameId = requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds an array of objects to the game map.
     * @param {Object[]} objects - The array of objects to add.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds an object to the game map, handling image flipping if needed.
     * @param {Object} mo - The object to add.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image for an object.
     * @param {Object} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1
    }

    /**
     * Reverts the image flipping for an object.
     * @param {Object} mo - The object to revert.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }

    /**
     * Stops the repeated drawing function and shows the end screen.
     * @param {string} person - The character associated with the end screen.
     */
    stopRepeatDrawFunction(person) {
        cancelAnimationFrame(this.animationFrameId);
        this.showEndScreen(person);
    }

    /**
     * Displays the end screen on the canvas.
     * @param {string} person - The character associated with the end screen.
     */
    showEndScreen(person) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackgroundObjects();
        this.drawEndscreen(person);
    }

    /**
     * Draws the end screen on the canvas.
     * @param {string} person - The character associated with the end screen.
     */
    drawEndscreen(person) {
        this.clearCanvasAndBackground();
        this.addToMap(person === 'pepe' ? this.gameOver : this.gameWin);
        this.toggleElementVisibility('restart-button', false);
        this.toggleElementVisibility('pause-btn', true);
        this.toggleElementVisibility('control-info-btn', true);

        const soundToPlay = person === 'pepe' ? this.looseSound : this.winSound;
        soundToPlay.play();
    }

    /**
     * Clears the canvas and draws the background objects.
     */
    clearCanvasAndBackground() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackgroundObjects();
    }

    /**
     * Toggles the visibility of an element
     * @param {string} elementId - HTML- Element wich is visible or not
     * @param {boolean} isVisible - Visible or not visible
     */
    toggleElementVisibility(elementId, isVisible) {
        const element = document.getElementById(elementId);
        element.classList.toggle('d-none', isVisible);
    }
}