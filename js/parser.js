/**
 * Gramolex
 * Copyright (C) Simon Raichl 2018
 * MIT License
 * Use this as you want, share it as you want, do basically whatever you want with this :)
 */

import {Graphemes}   from "./graphemes.js";
import {RNG}         from "./rng.js";

export class Parser{
    constructor(sentences){
        this.senteces = sentences;
        this.graphemes = new Graphemes().get();
    }

    newSentence(){
        let rn = new RNG().getNumber(this.senteces.length - 1);
        return this.parseSentence(this.senteces[rn]);
    }

    parseSentence(sentence){
        let lexemes = this.getLexemes(sentence), graphemes = [], phonemes = 0, buffer;
        lexemes.forEach(lexeme => {
            buffer = lexeme;
            this.graphemes.forEach(grapheme => {
                let items = buffer.match(new RegExp(grapheme, "g"))
                || buffer.match(new RegExp(this.getGrapheme(grapheme), "g"));
                if (items !== null){
                    items.forEach(item => {
                        buffer = buffer.replace(item, "");
                        graphemes.push(item);
                    });
                }
            });
            buffer.split("").forEach(char => {
                graphemes.push(char);
            });
        });
        graphemes.forEach(grapheme => {
            grapheme === "x" ? phonemes++ : null;
        });
        phonemes += graphemes.length;
        return {
            lexemes:       lexemes.length,
            lexemeArray:   lexemes,
            graphemes:     graphemes.length,
            graphemeArray: graphemes,
            phonemes:      phonemes,
            sentence:      sentence
        };
    }

    getGrapheme(grapheme){
        return grapheme[0].toUpperCase() + grapheme.slice(1, grapheme.length);
    }

    getLexemes(sentence){
        sentence = sentence.replace(/[:;?!,<>\/()$@#&*+\-]|[0-9]/g, "").replace(/'/g, " ");
        return sentence[sentence.length-1] === "." ? sentence.slice(0, sentence.length-1).split(" ") : sentence.split(" ");
    }
}