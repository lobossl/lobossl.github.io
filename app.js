/*
    https://github.com/lobossl/todo
*/

let ldbName = "todo"

let todo = document.getElementById("todo")
let done = document.getElementById("done")
let add = document.getElementById("add")
let remove = document.getElementById("remove")
let download = document.getElementById("download")

let test = JSON.parse(localStorage.getItem(ldbName)) || []

function setItems(e)
{
    if(test === null)
    {
        test = []

        test.push(e)

        localStorage.setItem(ldbName,JSON.stringify(test))
    }
    else
    {
        test.push(e)

        localStorage.setItem(ldbName,JSON.stringify(test))
    }
}

download.addEventListener("click",() =>
{
    let blob = new Blob([JSON.stringify(test)], { type: 'application/json' })

    let link = document.createElement('a')

    link.href = URL.createObjectURL(blob)
    link.download = "backup.json"

    link.click();
})

function loadItems()
{
    todo.innerText = ""
    done.innerText = ""

    let setID = 0

    test.forEach((e) =>
    {
        let frame = document.createElement("p")
        frame.className = "frame"

        let hr = document.createElement("hr")
        let checkBox = document.createElement("INPUT")
        let text = document.createElement("p")
        let label = document.createElement("label")

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
            checkBox.value = "test"
            checkBox.count = setID

            text.id = "text"
            text.className = "text"
            text.contentEditable = "true"
            text.spellcheck = "false"
            text.innerText = e.text
            text.type = "text"
            text.style.borderLeft = "2px dotted #ccc"
            text.style.borderRight = "2px dotted #ccc"
            text.count = setID

            label.style.fontSize = "16px"
            label.style.color = "green"
            label.for = "checkbox"
            label.innerHTML = "&#9851;" //recycle

            hr.style.border = "1px solid #c025ff"

            frame.append(checkBox)
            frame.append(label)
            frame.append(hr)
            frame.append(text)
            todo.append(frame)
        }

        setID += 1
    })
}

document.addEventListener("keyup",(e) =>
{
    if(e.target.id == "text")
    {
        test[e.target.count].text = e.target.innerText

        localStorage.setItem(ldbName,JSON.stringify(test))
    }
})

document.addEventListener("click",(e) =>
{
    if(e.target.id == "checkbox")
    {
        if(e.target.checked)
        {
            test[e.target.count].checked = true

            localStorage.setItem(ldbName,JSON.stringify(test))

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
        text: "Example..",
        checked: false
    }

    setItems(obj)

    loadItems()

    window.scrollTo(0, document.body.scrollHeight);
})

remove.addEventListener("click",(e) =>
{
    test.filter(x => x.checked === true).forEach(x => test.splice(test.indexOf(x), 1))

    localStorage.setItem(ldbName,JSON.stringify(test))

    loadItems()
})

window.addEventListener("load",() =>
{
    loadItems()
})