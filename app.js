/*
    JS BY FLIRO.ORG
*/

let getYear = new Date().getFullYear()

document.getElementById("bottom").innerHTML = `<p>Utviklet av <a href='https://fliro.org'>Fliro.org</a> &#169; ${getYear}</p>`

let clicked = false

document.getElementById("btn_menu").addEventListener("click",() =>{
    document.getElementById("btn_menu").innerText = "="

    if(clicked === false){
        document.getElementById("btn_menu").innerText = ""

        let newDiv = document.createElement("span")

        newDiv.innerHTML = `
            <a href='#kontakt'>kontakt</a>
        `
        newDiv.style.textAlign = "center"
        newDiv.style.padding = "15px"

        document.getElementById("btn_menu").appendChild(newDiv)

        clicked = true
    }
    else{
        clicked = false
    }
})