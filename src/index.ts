import Drawable from "./drawable";
import MyBlob from "./blob";
import Terrain from './terrain';
import { KeyPressListener, translateKeyPress } from "./keypress_listener";
import Background from "./background";

const REFRESH_TIMER = 30;

class DrawingApp {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private gameItems: (Drawable | KeyPressListener)[];

    constructor() {
        let canvas = document.getElementById('canvas') as HTMLCanvasElement;
        let context = canvas.getContext("2d");

        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;

        this.canvas = canvas;
        this.context = context;

 
        // Create drawables! 
        this.createDrawables();   

        // Create event handlers! 
        this.createUserEvents();

        // // Setup the game loop! 
        // this.gameloop();
    }

    private createDrawables() {
        this.gameItems = [
            new Background(),
            new Terrain(),
            new MyBlob(50, 585),
        ];
    }

    gameloop = () => {
        // clear the canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //draw the elements
        this.redraw();

        requestAnimationFrame(this.gameloop);
    }

    private redraw() {
        this.context.beginPath();
        this.gameItems
            .filter(item => 'draw' in item )
            .forEach(drawable => {
                (<Drawable>drawable).draw(this.context);
            });
    }

    private createUserEvents() {
        let canvas = this.canvas;
    
        // canvas.addEventListener('keypress', this.handleKeyPress)
        canvas.addEventListener('keydown', this.handleKeyPress)
        canvas.addEventListener("mousedown", this.pressEventHandler);
        
        // canvas.addEventListener("mousemove", this.dragEventHandler);
        // canvas.addEventListener("mouseup", this.releaseEventHandler);
        // canvas.addEventListener("mouseout", this.cancelEventHandler);
    
        // canvas.addEventListener("touchstart", this.pressEventHandler);
        // canvas.addEventListener("touchmove", this.dragEventHandler);
        // canvas.addEventListener("touchend", this.releaseEventHandler);
        // canvas.addEventListener("touchcancel", this.cancelEventHandler);
    
        // document.getElementById('clear')
        //         .addEventListener("click", this.clearEventHandler);
    }

    private pressEventHandler = (event: any) => {
        console.log(event);
    }
    private handleKeyPress = (event: KeyboardEvent) => {
        
        this.gameItems
            .filter(item => 'onKeyPressed' in item )
            .forEach(keyPressListener => {
                (<KeyPressListener>keyPressListener).onKeyPressed(translateKeyPress(event));
            });
    }
}

var dr = new DrawingApp();
window.requestAnimationFrame(dr.gameloop);