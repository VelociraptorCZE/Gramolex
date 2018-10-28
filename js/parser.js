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
        this.exceptions = new Graphemes().getExceptions();
    }

    newSentence(limit){
        let rn = null;
        while (limit.includes(rn) || rn === null){
            rn = new RNG().getNumber(this.senteces.length - 1);
        }
        return {
            result:     this.parseSentence(this.senteces[rn]),
            sentenceId: rn
        };
    }

    parseSentence(sentence){
        let lexemes = this.getLexemes(sentence), graphemes = [], phonemes = 0, buffer;
        lexemes.forEach(lexeme => {
            buffer = lexeme.toLowerCase();
            this.graphemes.forEach(grapheme => {
                let items = buffer.match(new RegExp(grapheme, "g"));
                if (items !== null){
                    this.exceptions.forEach(exception => {
                        let check = lexeme.toLowerCase().slice(0, exception.length);
                        if (check === exception && items.includes(check)){
                            items.shift();
                        }
                    });
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

    getLexemes(sentence){
        sentence = sentence.replace(/[:;?!,<>\/()$@#&*+{}\-]|[0-9]/g, "").replace(/'/g, " ");
        return sentence[sentence.length-1] === "." ? sentence.slice(0, sentence.length-1).split(" ") : sentence.split(" ");
    }
}