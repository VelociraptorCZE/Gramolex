import {Canvas} from "./modules/canvas.js";

let canvas = new Canvas().get();

export class Draw {
    constructor(){
        window.active = false;
        this.events = [["mousedown", "mouseup"], [true, false], [canvas.elem, window]];
        for (let i = 0; i < this.events[0].length; i++){
            this.events[2][i].addEventListener(this.events[0][i], _ => window.active = this.events[1][i]);
        }
        canvas.elem.addEventListener("mousemove", e => {
            this.draw(e);
        });
        window.requestAnimationFrame(this.draw);
    }

    draw(e){
        if (window.active){
            let x = e.offsetX;
            let y = e.offsetY;
            canvas.context.beginPath();
            canvas.context.arc(x, y, 3, 0, Math.PI * 2);
            canvas.context.fillStyle = "#00a";
            canvas.context.fill();
            canvas.context.closePath();
        }
    }
}