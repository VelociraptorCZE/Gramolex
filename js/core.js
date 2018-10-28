/**
 * Gramolex
 * Copyright (C) Simon Raichl 2018
 * MIT License
 * Use this as you want, share it as you want, do basically whatever you want with this :)
 */

import {Alert}       from "./alerts.js";
import {Sentences}   from "./sentences.js";
import {Parser}      from "./parser.js";
import {Intro}       from "./intro.js";
import {Inputs}      from "./inputs.js";
import {Validation}  from "./validation.js";
import {OwnSentence} from "./ownSentence.js";

/**
 * MAIN
 */

new Intro();

let sentences = new Sentences().get();
let parser = new Parser(sentences);

new OwnSentence();
new Validation();

/**
 * CORE
 */

export class Core{
    constructor(){
        this.score = 0;
        this.correctAnswer = 0;
        this.timeout = false;
        this.data = {};
        this.elems = {
            name:     document.getElementById("js-name"),
            sentence: document.getElementById("js-sentence"),
            task:     document.getElementById("js-task"),
            score:    document.getElementById("js-score"),
            submit:   document.getElementById("js-submit")
        };
        this.alert = {
                separated: [{
                    text:  "<h4>That is wrong, check these values: </h4>",
                    title: "Wrong answer",
                    color: "danger"
                },
                {
                    text:  "<h4>That is correct!</h4>",
                    title: "Correct answer",
                    color: "green"
                }]
        };
        this.inputs = new Inputs().get();
        this.initListeners();
    }
    static getAlertOverlay(){
        return document.querySelector(".alert--overlay");
    }
    init(){
        this.inputs.lexemes.focus();
        this.data = parser.newSentence();
        this.elems.sentence.innerText = this.data.sentence;
        this.elems.task.innerHTML = "<strong>Task:</strong> find all lexemes, graphemes and phonemes";
        Object.values(this.inputs).forEach(input => {
            input.value = "";
        });
    }
    initListeners(){
        let events = [["keypress", "click"], [window, this.elems.submit]];
        events[1][0].addEventListener(events[0][0], e => {
            if (Core.getAlertOverlay() && e.which === 13) {
                Core.getAlertOverlay().remove();
                this.timeout = true;
                setTimeout(_ => {
                    this.timeout = false
                }, 2000);
            }
        });
        for (let i = 0; i < events[0].length; i++){
            events[1][i].addEventListener(events[0][i], e => {
                if (!Core.getAlertOverlay() && !this.timeout && (e.which === 13 || e.which === 1)){
                    let answer = {
                        lexemes:   parseInt(this.inputs.lexemes.value),
                        phonemes:  parseInt(this.inputs.phonemes.value),
                        graphemes: parseInt(this.inputs.graphemes.value)
                    };
                    if (answer.lexemes === this.data.lexemes && answer.phonemes === this.data.phonemes && answer.graphemes === this.data.graphemes){
                        this.score++;
                        this.correctAnswer = 1;
                    }
                    else{
                        this.correctAnswer = 0;
                    }
                    this.elems.score.innerText = this.elems.score.innerText.replace(this.score-1 + "", this.score);
                    this.onAnswer();
                    this.init();
                }
            });
        }
    }
    onAnswer()
    {
        let current = this.alert.separated[this.correctAnswer];
        new Alert({
                title: current.title,
                text: current.text + "Lexemes: <strong>" + this.data.lexemes + "</strong><br> Graphemes: <strong>" + this.data.graphemes + "</strong>" + "</strong><br> Phonemes: <strong>" + this.data.phonemes + "</strong>"
            },
            {
                first: {
                    text: "<strong>Ok</strong>",
                    color: current.color
                }
            },
            {
                fade: 1500,
                noescape: true,
                color: current.color
            }).show();
    }
}