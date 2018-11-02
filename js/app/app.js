export class App{
    getInfo(){
        return {
            name:    "GRAMOLEX",
            version: "beta 0.3.7",
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