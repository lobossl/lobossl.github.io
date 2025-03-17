/* fliro.org */
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
        `
        cE.style.width = "100%"
        cE.style.backgroundColor = "#222222"
        cE.style.paddingTop = "5px"
        cE.style.paddingBottom = "5px"
        document.getElementById("meny").appendChild(cE)
        clicked = true
    }
})