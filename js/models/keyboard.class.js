class Keyboard {

    LEFT = false;
    RIGHT = false;
    SPACE = false;
    UP = false;
    D = false;


    constructor() {
        this.bindKeyPressEvents();
        this.bindBtsPressEvents();
    }


    /**
     * Binds touch events for mobile buttons.
     */
    bindBtsPressEvents() {
        const moveLeftButton = document.getElementById('mobile-move-left');
        if (moveLeftButton) {
            moveLeftButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.LEFT = true;
            });

            moveLeftButton.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.LEFT = false;
            });
        }

        const moveRightButton = document.getElementById('mobile-move-right');
        if (moveRightButton) {
            moveRightButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.RIGHT = true;
            });

            moveRightButton.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.RIGHT = false;
            });
        }

        const jumpButton = document.getElementById('mobile-jump');
        if (jumpButton) {
            jumpButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.UP = true;
            });

            jumpButton.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.UP = false;
            });
        }

        const throwButton = document.getElementById('mobile-throw');
        if (throwButton) {
            throwButton.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.D = true;
            });

            throwButton.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.D = false;
            });
        }
    }

    /**
     * Binds key press events for desktop keyboard keys.
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 37) {
                this.LEFT = true;
            }

            if (e.keyCode == 38) {
                this.UP = true;
            }

            if (e.keyCode == 39) {
                this.RIGHT = true;
            }

            if (e.keyCode == 32) {
                this.SPACE = true;
            }

            if (e.keyCode == 68) {
                this.D = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.keyCode == 37) {
                this.LEFT = false;
            }

            if (e.keyCode == 38) {
                this.UP = false;
            }

            if (e.keyCode == 39) {
                this.RIGHT = false;
            }

            if (e.keyCode == 32) {
                this.SPACE = false;
            }

            if (e.keyCode == 68) {
                this.D = false;
            }
        });
    }
}