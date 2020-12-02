import Drawable from "./drawable";
import { KeyPressListener, KeyPress } from './keypress_listener';

enum Facing {
    LEFT, RIGHT
};

const GRAVITY = 3;
const TERMINAL_VELOCITY = 10;
class MyBlob implements Drawable, KeyPressListener {

    private x: number; 
    private y: number;
    private radius = 40;
    private functions: Map<KeyPress, Function> = new Map(); 
    private image: any; 
    private reversedImage: any; 
    private imageLoaded: boolean = false;

    private charWidth = 32;
    private charHeight = 32;
    private charrOffset = 32;
    private frameOffset = 32;
    private frameNumber = 0;
    private charSelected = 2;
    private frameCount = 0;
    private charScale = 2;


    private xAccel = 0; 
    private yAccel = 0;
    private yVelocity = 0.0;
    private xVelocity = 0.0;
    private charFacing : Facing = Facing.RIGHT;
    private jumping = false;

    constructor(x: number,y: number) {
        this.x = x;
        this.y = y;

        // Set up movement handlers
        this.functions.set(KeyPress.UP, this.handleUp);
        this.functions.set(KeyPress.DOWN, this.handleDown);
        this.functions.set(KeyPress.LEFT, this.handleLeft);
        this.functions.set(KeyPress.RIGHT, this.handleRight);

        // Load image element 
        this.image = new Image(); 
        this.image.src = 'images/characters_6.png';
        this.image.onload = () => {
            this.imageLoaded = true;
        };
        this.reversedImage = new Image(); 
        this.reversedImage.src = 'images/characters_6_reversed.png';
        this.reversedImage.onload = () => {
            this.imageLoaded = true;
        };

    }

    handleUp = () => {
        if(!this.jumping) {
            this.yAccel = -55;
            // this.yVelocity -= 40;
            this.jumping = true;
        }
    }
    handleDown = () =>  {
        // this.y++;
    }
    handleLeft = () => {
        this.xVelocity = -4;
        this.charFacing = Facing.LEFT;
    }
    handleRight = () => {
        this.xVelocity = 4;
        this.charFacing = Facing.RIGHT;
    }

    onKeyPressed(keyPress: KeyPress) {
        if(this.functions.has(keyPress))
            this.functions.get(keyPress)();
    }

    drawFrame(context, frameNumber) {

        // If facing other direction, pick from the reversed sprite. 
        const frameOffset =  this.charFacing == Facing.LEFT ? 
            this.frameOffset * (22 - this.frameNumber) :
            this.frameOffset * this.frameNumber;

        const image = this.charFacing == Facing.LEFT ? this.reversedImage : this.image;

        context.drawImage(
            image,
            frameOffset,
            this.charrOffset * this.charSelected ,
            this.charWidth     , this.charHeight, 
            this.x, this.y,
            this.charWidth * this.charScale, this.charHeight * this.charScale, );

    }
    draw(context: CanvasRenderingContext2D) {
        if(this.imageLoaded) {

            // v = u + a (1)
            this.yVelocity = this.yVelocity + (this.yAccel + GRAVITY); // gravity

            if(this.yVelocity > 0) {
                this.yVelocity = Math.max(this.yVelocity, TERMINAL_VELOCITY);
            }

            this.yAccel *= 0.5; // DECAY ACCELERATION

            if(!this.jumping) // no friction in air duh
                this.xVelocity *= 0.8; // friction

            this.x += this.xVelocity; 
            this.y += this.yVelocity * 0.1;

            // DON"T FALL DOWN LEL
            if(this.y > 585) {
                this.y = 585; 
                this.yVelocity = 0;
                this.jumping = false;
            }
            // Stationary frame.
            if(Math.abs(this.xVelocity) < 0.01 && Math.abs(this.yVelocity) < 0.01) {
                this.drawFrame(context, 0);
            }
            
            // Jumping frame
            else if(Math.abs(this.yVelocity) > 0.01) {
                this.drawFrame(context, 5);
            }

            // Moving frame.
            else {
                this.drawFrame(context, this.frameNumber);
                this.frameCount++;
                if(this.frameCount >= 10) {
                    this.frameNumber = (this.frameNumber + 1) % 4;
                    this.frameCount = 0;
                }
            }
        }
    }

}

export default MyBlob; 