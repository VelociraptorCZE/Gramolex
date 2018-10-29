/**
 * Gramolex
 * Copyright (C) Simon Raichl 2018
 * MIT License
 * Use this as you want, share it as you want, do basically whatever you want with this :)
 */

export class Inputs{
    get(){
        return {
            lexemes:   document.getElementById("js-input-lexemes"),
            graphemes: document.getElementById("js-input-graphemes"),
            phonemes:  document.getElementById("js-input-phonemes")
        };
    }
}