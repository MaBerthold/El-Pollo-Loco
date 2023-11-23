class Statusbar extends DrawableObject {
  IMAGES_HEALTH = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
  ];


  percentage;

  constructor() {
    super();
    this.loadImage(this.IMAGES_HEALTH[0]);
    this.loadImages(this.IMAGES_HEALTH);
    this.setPercentage(100);
    this.y = 0;
    this.x = 20;
    this.width = 200;
    this.height = 60;
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
  * Resolves the image index based on the percentage value.
  * @returns {number} - The resolved image index.
  */
  resolveImageIndex() {
    switch (this.percentage) {
      case 100:
        return 5;
      case 80:
        return 4;
      case 60:
        return 3;
      case 40:
        return 2;
      case 20:
        return 1;
      case 0:
        return 0;
      default:
        return 100;
    }
  }
}