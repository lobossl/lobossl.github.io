/*
    644a21eda12751316f7f17b2bbd5df4fc11f1471
    Fliro.org web design  2025
*/
let clicked = false
document.getElementById("menu").addEventListener("click",() =>{
    if(clicked){
        document.getElementById("meny").innerText = ""
        clicked = false
    }
    else{
        let cE = document.createElement("div")
        document.getElementById("meny").innerText = ""
        cE.innerHTML = `
            <a href='index.html'>Hjem</a>
            <a href='#kontakt'>Kontakt</a>
            <a href='http://www.trafikkskilt.no/index.shtml'>Trafikkskilt</a>
        `
        cE.style.width = "100%"
        cE.style.backgroundColor = "#222222"
        cE.style.paddingTop = "5px"
        cE.style.paddingBottom = "5px"
        document.getElementById("meny").appendChild(cE)
        clicked = true
    }
})