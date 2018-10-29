/**
 * Gramolex
 * Copyright (C) Simon Raichl 2018
 * MIT License
 * Use this as you want, share it as you want, do basically whatever you want with this :)
 */

export class RNG{
    getNumber(bounds){
        return parseInt((Math.random() * bounds).toFixed());
    }
}