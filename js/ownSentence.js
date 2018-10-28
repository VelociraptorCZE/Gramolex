/**
 * Gramolex
 * Copyright (C) Simon Raichl 2018
 * MIT License
 * Use this as you want, share it as you want, do basically whatever you want with this :)
*/

import {Alert}  from "./alerts.js";
import {Core}   from "./core.js";
import {Parser} from "./parser.js";

export class OwnSentence{
    constructor(){
        this.parseButton = document.getElementById("js-parse-own-sentence");
        this.init();
    }
    init(){
        this.parseButton.addEventListener("click", _ => {
            if (!Core.getAlertOverlay()){
                let input = prompt("Insert your sentence", "");
                input ? this.parse(input) : null;
            }
        });
    }
    parse(param) {
        let buffer = new Parser().parseSentence(param);
        let params = "Lexemes: <strong>" + buffer.lexemes + "</strong><br>Phonemes: <strong>" + buffer.phonemes + "</strong><br>Graphemes: <strong>" + buffer.graphemes + "</strong>";
        let phonemes = "<h4>Graphemes:</h4>" + buffer.graphemeArray.map(x => " " + x);
        new Alert({
                title: "Your sentence",
                text: params + phonemes
            },
            {
                first: {
                    text: "<strong>Dismiss</strong>",
                }
            },
            {
                fade: 500,
                noescape: true
            }).show();
    }
}