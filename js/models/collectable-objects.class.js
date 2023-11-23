class CollectableObject extends MovableObject {

    constructor() {
        super();
    }

    /**
   * Checks if the collectable object is colliding with another movable object.
   * @param {MovableObject} mo - The movable object to check for collision.
   * @returns {boolean} - True if colliding, false otherwise.
   */
    isColliding(mo) {
        return (
            this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height
        );
    }

    /**
     * Updates the throw sound based on mute status.
     */
    updateThrowSound(sound) {
        let muteBtn = document.getElementById('mute-icon');
        (muteBtn.src.includes('volume-mute-fill')) ? sound.muted = true : sound.muted = false;
    }
}