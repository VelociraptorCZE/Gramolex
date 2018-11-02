export class Canvas{
    get(){
        let elem = document.getElementById("js-canvas");
        return {
            elem: elem,
            context: elem.getContext("2d")
        };
    }
}