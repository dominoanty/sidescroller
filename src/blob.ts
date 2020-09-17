import Drawable from "./drawable";
import { KeyPressListener } from './keypress_listener';

class MyBlob implements Drawable, KeyPressListener {

    private x: number; 
    private y: number;
    private radius = 40;

    constructor(x: number,y: number) {
        this.x = x;
        this.y = y;
    }

    onKeyPressed(keyPress: string) {
        switch(keyPress) {
            case "ArrowUp": 
                this.y--;
            case "ArrowDown": 
                this.y++;
            case "ArrowLeft": 
                this.x--;
            case "ArrowRight": 
                this.x++;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
    }

}

export default MyBlob; 