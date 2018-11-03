/**
 * Gramolex
 * Copyright (C) Simon Raichl 2018
 * MIT License
 * Use this as you want, share it as you want, do basically whatever you want with this :)
 */

import {Core} from "./core.js"

export class Intro{
    constructor(){
        this.elems = {
            container:       document.getElementById("js-intro"),
            taskContainer:   document.getElementById("js-task-container"),
            inputContainer:  document.getElementById("js-input-container"),
            play:            document.getElementById("js-play-button"),
            sentence:        document.getElementById("js-sentence"),
            name:            document.getElementById("js-name"),
            inputName:       document.getElementById("js-input-name"),
            canvasContainer: document.getElementById("js-canvas-container")
        };
        this.playButtonClass = "gramolex-show-button";
        this.elems.inputName.focus();
        this.checkInputOnChange();
        this.onIntroEnd();
    }

    checkInputOnChange(){
        let events = ["keyup", "keydown"];
        events.forEach(event => {
            this.elems.inputName.addEventListener(event, e => {
                e.target.value !== "" ? this.showPlayButton() : this.elems.play.classList.remove(this.playButtonClass);
            });
        });
    }

    showPlayButton(){
        let elem = this.elems.play;
        !elem.classList.contains(this.playButtonClass) ? elem.classList.add(this.playButtonClass) : null;
    }

    onIntroEnd(){
        let events = [["click", "keypress"], [this.elems.play, this.elems.inputName]];
        for (let i = 0; i < events[0].length; i++){
            events[1][i].addEventListener(events[0][i], (e) => {
                if ((e.which === 13 || e.which === 1) && this.elems.inputName.value !== "" && !Core.getAlertOverlay()){
                    this.elems.container.classList.add("gramolex-intro-container-hide");
                    let visibleItems = [this.elems.inputContainer, this.elems.taskContainer];
                    setTimeout(_ => {
                        visibleItems.forEach(item => {
                            item.style.opacity = "1";
                        });
                        this.elems.name.innerText = this.elems.inputName.value;
                        this.elems.container.remove();
                        this.elems.sentence.parentElement.classList.add("gramolex-sentence-show");
                        this.elems.canvasContainer.style.height = "fit-content";
                        new Core().init();
                    }, 1000);
                }
            });
        }
    }
}