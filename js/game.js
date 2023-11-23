let canvas;
let canvasStart;
let world;
let keyboard;

/**
 * Initiates the game by hiding the start container and displaying the game container. Calls the init() function.
 */
function startGame() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    init();
}

/**
 * Initializes the game by setting up the canvas, hiding the restart button, and creating a new World object and new keyboard object.
 */
async function init() {
    let btn = document.getElementById('restart-button');
    btn.classList.add('d-none');
    keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Toggles the mute state of the game audio and updates the mute button icon accordingly.
 */
function mute() {
    let muteBtn = document.getElementById('mute-icon');
    muteBtn.src = muteBtn.src.includes('volume-mute-fill') ? 'img/icons/volume-up-fill.svg' : 'img/icons/volume-mute-fill.svg';
    if (muteBtn.src.includes('volume-mute-fill')) {
        world.mute(true);
    } else {
        world.mute(false);
    }
}

/**
 * Pauses or resumes the game, updating the pause button icon accordingly. Pausing stops the animation frame loop.
 */
function pauseGame() {
    world.paused = !world.paused;
    let pausedBtn = document.getElementById('pause-icon');
    pausedBtn.src = pausedBtn.src.includes('play-btn') ? 'img/icons/pause-btn.svg' : 'img/icons/play-btn.svg';

    if (world.paused) {
        cancelAnimationFrame(world.animationFrameId);
    } else {
        world.repeatDrawFunction();
    }
}

/**
 * Displays the key control screen by hiding the start container and showing the key screen.
 */
function showKeyControl() {
    let startScreen = document.getElementById('start-container');
    startScreen.classList.add('d-none');
    let keyScreen = document.getElementById('key-screen');
    keyScreen.style.display = 'flex';
}

/**
 * Closes the key control screen by showing the start container and hiding the key screen.
 */
function closeKeyControl() {
    document.getElementById('start-container').classList.remove('d-none');
    document.getElementById('key-screen').style.display = 'none';
}

/**
 * Reloads the page, effectively restarting the game.
 */
function restartGame() {
    location.reload();
}

/**
 * Draws the start screen background image on the specified canvas.
 */
function drawStartscreen() {
    let canvasStart = document.getElementById('canvas-start');
    let ctx = canvasStart.getContext('2d');

    let backgroundImage = new Image();
    backgroundImage.src = 'img/9_intro_outro_screens/start/startscreen_2.png';
    backgroundImage.onload = function () {
        ctx.drawImage(backgroundImage, 0, 0, canvasStart.width, canvasStart.height);
    };
}

/**
 *  Simulates a left movement input for a specified duration.
 */
function moveLeft() {
    keyboard.LEFT = true;
    setTimeout(() => {
        keyboard.LEFT = false;
    }, 300);
}

/**
 * Simulates a right movement input for a specified duration.
 */
function moveRight() {
    keyboard.RIGHT = true;
    setTimeout(() => {
        keyboard.RIGHT = false;
    }, 300);
}

/**
 * Simulates a jump input for a short duration.
 */
function jump() {
    keyboard.UP = true;
    setTimeout(() => {
        keyboard.UP = false;
    }, 20);
}

/**
 * Simulates a bottle throwing input for a short duration.
 */
function throwBottle() {
    keyboard.D = true;
    setTimeout(() => {
        keyboard.D = false;
    }, 20);
}


