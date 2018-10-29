/**
 * Gramolex
 * Copyright (C) Simon Raichl 2018
 * MIT License
 * Use this as you want, share it as you want, do basically whatever you want with this :)
 */

import {Inputs} from "./inputs.js";

export class Validation{
    constructor(){
        this.inputs = new Inputs().get();
        let events = ["keydown", "keyup"];
        Object.values(this.inputs).forEach(input => {
            events.forEach(event => {
                input.addEventListener(event, e => this.validate(e));
            });
        });
    }
    validate(e){
        let max = parseInt(e.target.getAttribute("max"));
        e.target.value = e.target.value < 0 ? -e.target.value : e.target.value > max ? max : e.target.value;
    }
}