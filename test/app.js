/*
    JS by Fliro.org
*/
document.getElementById("logo_text_click").addEventListener("click",() =>{
    document.getElementById("menu").innerText = ""

    let menuCreate = document.createElement("div")

    menuCreate.id = "menuCreate"
    menuCreate.innerHTML = `
        <a href='mailto:post@ali-trafikkskole.org'>Kundeservice</a>
    `

    document.getElementById("menu").appendChild(menuCreate)
})