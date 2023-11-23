class GameOver extends MovableObject {
    height = 480;
    width =  720;   
    x =  0;   
    y = 0;
     

    constructor() {
        super();
        this.loadImage('img/9_intro_outro_screens/game_over/game over!.png');
    }
}