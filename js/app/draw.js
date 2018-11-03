/**
 * Gramolex
 * Copyright (C) Simon Raichl 2018
 * MIT License
 * Use this as you want, share it as you want, do basically whatever you want with this :)
 */

import {Canvas} from "./modules/canvas.js";

let canvasScope = new Canvas();
let canvas = canvasScope.get();

export class Draw {
    constructor(){
        document.getElementById("js-vanish-canvas").onclick = _ => {
            canvasScope.clearCanvas();
        };
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
            try{
                let touchCoords = e.targetTouches[0];
                let yTouch = touchCoords.clientY - 130;
                console.log(yTouch);
                let x = e.offsetX || touchCoords.clientX;
                let y = e.offsetY || yTouch;
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