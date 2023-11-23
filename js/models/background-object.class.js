class BackgroundObject extends MovableObject {
/**
 * Defines the x and y coordinates for the background objects
 */
    width = 720;
    height = 480;
    constructor(imagePath, x) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}