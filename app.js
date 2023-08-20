/*
    https://github.com/lobossl/todo
*/

let ldbName = "todo"

let todo = document.getElementById("todo")
let done = document.getElementById("done")
let add = document.getElementById("add")
let remove = document.getElementById("remove")
let download = document.getElementById("download")

let getOBJ = JSON.parse(localStorage.getItem(ldbName)) || []

function setItems(e)
{
    if(getOBJ === null)
    {
        getOBJ = []

        getOBJ.push(e)

        localStorage.setItem(ldbName,JSON.stringify(getOBJ))
    }
    else
    {
        getOBJ.push(e)

        localStorage.setItem(ldbName,JSON.stringify(getOBJ))
    }
}

download.addEventListener("click",() =>
{
    let blob = new Blob([JSON.stringify(getOBJ)], { type: 'application/json' })

    let link = document.createElement('a')

    link.href = URL.createObjectURL(blob)
    link.download = "backup.json"

    link.click();
})

function loadItems()
{
    todo.innerHTML = "<h3>TODO</h3>"
    done.innerHTML = "<h3>DONE</h3>"

    let setID = 0

    getOBJ.forEach((e) =>
    {
        let frame = document.createElement("p")
        frame.className = "frame"
        frame.id = "frame"

        let checkBox = document.createElement("INPUT")
        let text = document.createElement("p")
        let insideBox = document.createElement("div")

        if(e.checked == true)
        {
            text.id = "text"
            text.className = "text"
            text.contentEditable = "false"
            text.innerText = e.text
            text.count = setID
            text.style.textDecorationLine = "line-through"
            text.style.color = "#CCCCCC"

            frame.append(text)
            done.append(frame)
        }
        else if(e.checked == false)
        {
            checkBox.type = "checkbox"
            checkBox.id = "checkbox"
            checkBox.name = "checkbox"
            checkBox.className = "checkbox"
            checkBox.count = setID

            text.id = "text"
            text.className = "text"
            text.contentEditable = "true"
            text.spellcheck = "false"
            text.innerText = e.text
            text.type = "text"
            text.style.borderLeft = "2px dotted #ccc"
            text.count = setID

            insideBox.id = "insideBox"
            insideBox.className = "insideBox"

            insideBox.append(text)
            insideBox.append(checkBox)

            frame.append(insideBox)

            todo.append(frame)
        }

        setID += 1
    })
}

document.addEventListener("keyup",(e) =>
{
    if(e.target.id == "text")
    {
        getOBJ[e.target.count].text = e.target.innerText

        localStorage.setItem(ldbName,JSON.stringify(getOBJ))
    }
})

document.addEventListener("click",(e) =>
{
    if(e.target.id == "checkbox")
    {
        if(e.target.checked)
        {
            getOBJ[e.target.count].checked = true

            localStorage.setItem(ldbName,JSON.stringify(getOBJ))

            setTimeout(() =>
            {
                loadItems()
            },100)
        }
    }
})

add.addEventListener("click",(e) =>
{
    let obj = {
        text: "Text..",
        checked: false
    }

    setItems(obj)

    loadItems()

    window.scrollTo(0, document.body.scrollHeight);
})

remove.addEventListener("click",(e) =>
{
    getOBJ.filter(x => x.checked === true).forEach(x => getOBJ.splice(getOBJ.indexOf(x), 1))

    localStorage.setItem(ldbName,JSON.stringify(getOBJ))

    loadItems()
})

window.addEventListener("load",() =>
{
    loadItems()
})