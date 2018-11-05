/**
 * Gramolex
 * Copyright (C) Simon Raichl 2018
 * MIT License
 * Use this as you want, share it as you want, do basically whatever you want with this :)
 */

import {Canvas} from "./modules/canvas.js";

let canvasScope = new Canvas();
let canvas = canvasScope.get();
let coords = {
    x1: null,
    y1: null,
};

export class Draw {
    constructor(){
        this.elems = {
            clear:            document.getElementById("js-vanish-canvas"),
            taskContainer:    document.getElementById("js-task-container"),
            strokeColorInput: document.getElementById("js-stroke-color-input"),
            strokeColor:      document.getElementById("js-stroke-color")
        };

        this.setCanvasSize();
        this.initCanvas();

        this.elems.clear.onclick = _ => {
            canvasScope.clearCanvas();
        };

        window.active = false;

        this.events = [
            ["mousedown", "mouseup", "touchend"],
            [true, false, false],
            [canvas.elem, window, window]
        ];

        for (let i = 0; i < this.events[0].length; i++){
            this.events[2][i].addEventListener(this.events[0][i], _ => {
                window.active = this.events[1][i];
                this.setCoords(null, null);
            });
        }

        this.drawEvents = ["mousemove", "touchmove"];
        this.drawEvents.forEach(event => {
            let isTouch = event === "touchmove";
            canvas.elem.addEventListener(event, e => {
                this.draw(e, isTouch);
            }, {
                passive: isTouch
            });
        });

        this.elems.taskContainer.addEventListener("scroll", e => {
            canvas.elem.style.marginTop = -e.target.scrollTop + "px";
        });

        this.elems.strokeColor.addEventListener("click", _ => {
            this.elems.strokeColorInput.click();
        });

        this.elems.strokeColorInput.addEventListener("change", e => {
            canvas.context.strokeStyle = e.target.value;
        });

        window.addEventListener("resize", _ => {
            this.setCanvasSize();
            this.initCanvas();
        });

        window.requestAnimationFrame(this.draw);
    }

    initCanvas(){
        canvas.context.strokeStyle = this.elems.strokeColorInput.value;
        canvas.context.lineWidth = 3;
    }

    draw(e, touch){
        if (active || touch){
            try{
                let x = e.offsetX || e.targetTouches[0].clientX;
                let y = e.offsetY || e.targetTouches[0].clientY - window.getComputedStyle(canvas.elem).getPropertyValue("margin-top").replace(/[a-z]/g, "");
                if (coords.x1 === null){
                    this.setCoords(x, y);
                }
                else {
                    canvas.context.beginPath();
                    canvas.context.moveTo(...this.getCoords());
                    canvas.context.lineTo(x, y);
                    canvas.context.stroke();
                    this.setCoords(x, y);
                }
            }
            catch{}
        }
    }

    setCoords(x, y){
        coords.x1 = x;
        coords.y1 = y;
    }

    getCoords(){
        return [coords.x1, coords.y1];
    }

    setCanvasSize(){
        canvas.elem.setAttribute("width", document.body.getBoundingClientRect().width.toFixed() + "px");
    }
}