/**
 * Gramolex
 * Copyright (C) Simon Raichl 2018
 * MIT License
 * Use this as you want, share it as you want, do basically whatever you want with this :)
 */

export class App{
    getInfo(){
        return {
            name:    "GRAMOLEX",
            version: "beta 0.4.1",
            author:  "Šimon Raichl"
        }
    }
    setTitle(param){
        document.title = param;
    }
    setAuthor(param){
        document.getElementById("js-author").innerText = param;
    }
    setVersion(param){
        document.getElementById("js-version").innerText = param;
    }
}