/*
	//1.0.14
*/

class STORAGE {
    constructor(dbName)
    {
        this.dbName = dbName
    }

    GET()
    {
        let getItem = JSON.parse(localStorage.getItem(this.dbName) || "[]")

        return getItem
    }

    SAVE(data)
    {
        localStorage.setItem(this.dbName,JSON.stringify(data))
    }

    PUSH(obj)
    {
        let data = this.GET()

        data.push(obj)
    
        localStorage.setItem(this.dbName, JSON.stringify(data))
    }

    DELETE(id,data)
    {
        data.splice(id,1)

        localStorage.setItem(this.dbName, JSON.stringify(data))
    }

    BACKUP()
    {
        let Data = localStorage.getItem(this.dbName);
  
        let blob = new Blob([Data], { type: 'application/octet-stream' });
        let url = window.URL.createObjectURL(blob);
        let link = document.createElement("a");
      
        link.href = url;
        link.download = "backup.json";
      
        document.body.appendChild(link);
      
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
}

let localStorageClass = new STORAGE("test");

function restoreData(e)
{
    let selectedFile = e.target.files[0]

    if(selectedFile)
    {
        const reader = new FileReader()

        reader.onload = function(event) {
            let data = event.target.result

            localStorageClass.SAVE(JSON.parse(data))
        }

        reader.readAsText(selectedFile);
    }
}

function addNewTask(value)
{
    if(value.length > 0)
    {
        localStorageClass.PUSH({
            text: value,
            note: "",
            ident: null
        })

        document.getElementById("textTask").value = ""
    }
}

function openNoteWindow(ident)
{
    document.getElementById("main").innerText = ""

    let createNoteDiv = document.createElement("div")
    let createTextArea = document.createElement("p")
    let createSaveBtn = document.createElement("button")
    let createCloseBtn = document.createElement("button")
    let space = document.createElement("p")

    createCloseBtn.id = "closeBtn"
    createCloseBtn.innerText = "Close"

    createSaveBtn.id = "saveNote"
    createSaveBtn.innerText = "Save"

    createTextArea.innerHTML = localStorageClass.GET()[ident].note
    createTextArea.className = "align-left margin-0 padding-def border-def outline-0 resize-0 font-size-def"
    createTextArea.style.height = "75%"
    createTextArea.style.backgroundColor = "#181515"
    createTextArea.style.color = "#eee"
    createTextArea.style.padding = "5px"
    createTextArea.style.margin = "0 auto"
    createTextArea.placeholder = "text.."
    createTextArea.style.overflow = "auto"
    createTextArea.contentEditable = true

    createNoteDiv.className = "border-def padding-def"
    createNoteDiv.style.position = "absolute"
    createNoteDiv.style.top = "0px"
    createNoteDiv.style.left = "0px"
    createNoteDiv.style.right = "0px"
    createNoteDiv.style.bottom = "0px"
    createNoteDiv.style.backgroundColor = "#000000"

    createNoteDiv.append(createTextArea)
    createNoteDiv.append(space)
    space.append(createSaveBtn)
    space.append(createCloseBtn)

    document.getElementById("new").append(createNoteDiv)

    createSaveBtn.addEventListener("click",() =>
    {
        saveNote(createTextArea.innerHTML,ident)
    })

    createTextArea.addEventListener("paste",(paste) =>
    {
        let items = paste.clipboardData.items

        pasteImage(createTextArea,items,ident)
    })
}

function saveNote(value,ident)
{
    document.getElementById("new").innerHTML = ""

    let Data = localStorageClass.GET()

    Data[ident].note = value

    localStorageClass.SAVE(Data)

    onLoadPage()
}

function onLoadPage()
{
    document.getElementById("main").innerText = ""

    let storageGetData = localStorageClass.GET()

    for(let i = storageGetData.length - 1;i >= 0;i--)
    {
        let mainDiv = document.createElement("div")
        let iconDiv = document.createElement("div")
        let noteIcon = document.createElement("span")
        let deleteIcon = document.createElement("span")
        let textDiv = document.createElement("div")

        mainDiv.className = "user-select-0 flex-size-auto border-0 margin-def radius-def"
        mainDiv.style.backgroundColor = "#222"
        mainDiv.style.minWidth = "150px"

        noteIcon.innerText = "edit"
        noteIcon.className = "cursor font-size-med"
        noteIcon.id = "noteIcon"
        noteIcon.ident = i
        noteIcon.style.marginRight = "15px"
        noteIcon.style.color = "orange"

        deleteIcon.innerText = "X"
        deleteIcon.className = "cursor font-size-med"
        deleteIcon.id = "deleteIcon"
        deleteIcon.ident = i
        deleteIcon.style.marginRight = "10px"
        deleteIcon.style.color = "#ff0000"

        textDiv.innerText = storageGetData[i].text
        textDiv.className = "padding-def align-center word-break font-size-med bold-def"
        textDiv.style.color = "#cccccc"

        iconDiv.className = "align-right"
        iconDiv.style.padding = "2px"
        iconDiv.style.backgroundColor = "#333"
        iconDiv.style.color = "#fff"

        mainDiv.append(iconDiv)
        iconDiv.append(noteIcon)
        iconDiv.append(deleteIcon)
        mainDiv.append(textDiv)

        document.getElementById("main").append(mainDiv)
    }
}

function deleteTask(ident)
{
    let Data = localStorageClass.GET()

    Data.splice(ident,1)

    localStorageClass.SAVE(Data)
}

function closeNoteWindow()
{
    document.getElementById("new").innerText = ""
    onLoadPage()
}

function forceHTTPS()
{
    if(location.protocol !== "https:")
    {
        location.protocol = "https:"
    }
}

document.getElementById("addTask").addEventListener("click",(e) =>
{
    addNewTask(document.getElementById("textTask").value)

    onLoadPage()
})

document.getElementById("restore").addEventListener("change",(e) =>
{
    restoreData(e)

    document.getElementById("main").innerText = "LOADING.."

    setTimeout(() =>
    {
        onLoadPage()
    },3000)
})

document.addEventListener("click",(e) =>
{
    if(e.target.id == "backup")
    {
        localStorageClass.BACKUP()
    }

    if(e.target.id == "closeBtn")
    {
        closeNoteWindow()
    }

    if(e.target.id === "deleteIcon")
    {
        deleteTask(e.target.ident)

        onLoadPage()
    }

    if(e.target.id === "noteIcon")
    {
        openNoteWindow(e.target.ident,e.target.id)
    }
})

document.addEventListener("DOMContentLoaded",() =>
{
    forceHTTPS()

    onLoadPage()
})