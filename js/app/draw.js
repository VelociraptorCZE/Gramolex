import {Canvas} from "./modules/canvas.js";

let canvas = new Canvas().get();

export class Draw {
    constructor(){
        window.active = false;
        this.events = [
            ["mousedown", "mouseup"],
            [true, false],
            [canvas.elem, window]
        ];
        for (let i = 0; i < this.events[0].length; i++){
            this.events[2][i].addEventListener(this.events[0][i], _ => window.active = this.events[1][i]);
        }
        this.drawEvents = ["mousemove", "touchmove"];
        this.drawEvents.forEach(event => {
            canvas.elem.addEventListener(event, e => {
                this.draw(e, event === "touchmove");
            });
        });
        window.requestAnimationFrame(this.draw);
    }

    draw(e, touch){
        if (active || touch){
            try {
                let rect = document.body.getBoundingClientRect();
                let x = e.offsetX || e.targetTouches[0].clientX;
                let y = e.offsetY || e.targetTouches[0].clientY - rect.height / 7;
                canvas.context.beginPath();
                canvas.context.arc(x, y, 3, 0, Math.PI * 2);
                canvas.context.fillStyle = "#00a";
                canvas.context.fill();
                canvas.context.closePath();
            }
            catch{}
        }
    }
}