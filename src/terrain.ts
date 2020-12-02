import Drawable from "./drawable";

class Terrain implements Drawable {

    image: any; 
    imageLoaded: boolean = false;

    terrainHeight = 72; 
    screenWidth = 1280;
    screenHeight = 720;
    patt: any;
    contextFillStyle: any; 

    constructor() {

        // Load image element 
        this.image = new Image(); 
        this.image.src = 'https://opengameart.org/sites/default/files/sheet_7.png';
        this.image.onload = () => {
            this.patt = document.createElement('canvas');
            // set the resized width and height

            // BLOCK SIZE from the SHEET 
            // https://w3samples.com/Sprite-Get-Position

            this.patt.width = 64;
            this.patt.height = this.terrainHeight;

            this.patt.getContext('2d').drawImage(this.image, 

                // dimensions from sprite 
                165, 0, 36, 32, 

                0, 0, this.patt.width, this.patt.height);

            this.imageLoaded = true;
            this.contextFillStyle = this.patt.getContext('2d').createPattern(this.patt, 'repeat-x');

        };

    }

    draw(context: CanvasRenderingContext2D) {
        if(this.imageLoaded){
            context.rect(0, this.screenHeight - this.terrainHeight, this.screenWidth, 72);
            context.fillStyle =  this.contextFillStyle;
            context.fill();
        }

    }

}

export default Terrain;