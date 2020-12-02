import Drawable from "./drawable";

class Background implements Drawable {
    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "#cceefc";
        context.fillRect(0, 0, 1280, 720);
    }
}

export default Background;