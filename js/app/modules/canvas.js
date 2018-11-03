/**
 * Gramolex
 * Copyright (C) Simon Raichl 2018
 * MIT License
 * Use this as you want, share it as you want, do basically whatever you want with this :)
 */

export class Canvas{
    get(){
        let elem = document.getElementById("js-canvas");
        return {
            elem: elem,
            context: elem.getContext("2d")
        };
    }
    clearCanvas(){
        let canvas = this.get();
        canvas.context.clearRect(0, 0, parseInt(canvas.elem.getAttribute("width")),
            parseInt(canvas.elem.getAttribute("height")));
    }
}