class StatusBarEndboss extends Statusbar {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/2_statusbar_endboss/orange.png',

    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentage(100);
        this.x = 2870;
        this.y = 40;
        this.animate();
    }

    /**
  * Animates the position of the Endboss Statusbar based on the position of the game character and end boss.
  */
    animate() {
        setInterval(() => {
            if (this.world.endboss.x < this.world.character.x + 700) {
                this.x = this.world.character.x + 400;
            }
            if (this.world.endboss.x > this.world.character.x + 700 || this.world.character.x > 2500) {
                this.x = 2870;
            }
        }, 1000 / 60);
    }

}