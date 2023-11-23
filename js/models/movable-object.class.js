class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    /**
   * Applies gravity to the movable object, making it fall down.
   */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }, 1000 / 20);
    }

    /**
     * Checks if the movable object is above the ground level.
     * @returns {boolean} - True if above ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Plays the animation by updating the image based on the provided images array.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the movable object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the movable object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates a jump by setting the vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Checks if the movable object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check for collision.
     * @returns {boolean} - True if colliding, false otherwise.
     */
    isColliding(mo) {
        const paddingX = 25;

        return (
            this.x + this.width - paddingX > mo.x + paddingX &&
            this.x + paddingX < mo.x + mo.width - paddingX &&
            this.y < mo.y + mo.height &&
            this.y + this.height > mo.y
        );
    }

    /**
     * Checks if the movable object is jumping on another movable object.
     * @param {MovableObject} mo - The other movable object to check for jump collision.
     * @returns {boolean} - True if jumping on, false otherwise.
     */
    isJumpingOn(mo) {
        const offset = 15; 
    
        return (
            this.isFallingDown() &&
            this.x + this.width + offset > mo.x &&
            Math.abs(this.y + this.height - mo.y) <= 40 &&
            this.x - 30 < mo.x &&
            this.y - mo.height < mo.y + mo.height
        );
    }

    /**
     * Checks if 'this' is in a descending jump (falling) state.
     * @returns {boolean} - True if 'this' is falling, false otherwise.
     */
    isFallingDown() {
        return this.speedY < 0;
    }


    /**
     * Checks if the movable object is collecting another movable object.
     * @param {MovableObject} mo - The other movable object to check for collection.
     * @returns {boolean} - True if collecting, false otherwise.
     */
    isCollecting(mo) {
        return (
            this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y + (this.height - 100) < mo.y + mo.height
        );
    }

    /**
     * Reduces the energy level of the movable object when hit.
     * Limits the energy to a minimum of 0.
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the movable object is in a hurt state (recently hit).
     * @returns {boolean} - True if hurt, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if the movable object is dead (energy level is zero).
     * @returns {boolean} - True if dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }
}