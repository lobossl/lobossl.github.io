/*
	//1.0.0
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
    localStorageClass.PUSH({
        text: value,
        note: "",
        ident: null
    })

    document.getElementById("textTask").value = ""
}

function openNoteWindow(ident,id)
{
    let createNoteDiv = document.createElement("div")
    let createTextArea = document.createElement("textarea")
    let createSaveBtn = document.createElement("button")
    let createCloseBtn = document.createElement("button")

    createCloseBtn.id = "closeBtn"
    createCloseBtn.innerText = "Close"

    createSaveBtn.id = "saveNote"
    createSaveBtn.innerText = "Save"

    createTextArea.value = localStorageClass.GET()[ident].note
    createTextArea.className = "margin-0 padding-0 border-0 outline-0 resize-0 font-size-med"
    createTextArea.style.width = "100%"
    createTextArea.style.height = "50vh"
    createTextArea.style.backgroundColor = "#6e1818"
    createTextArea.style.color = "#eee"
    createTextArea.style.padding = "1px"
    createTextArea.placeholder = "Notes.."

    createNoteDiv.className = "border-0"
    createNoteDiv.style.padding = "5px"
    createNoteDiv.style.position = "absolute"
    createNoteDiv.style.top = "1px"
    createNoteDiv.style.left = "1px"
    createNoteDiv.style.right = "1px"
    createNoteDiv.style.height = "300px"
    createNoteDiv.style.backgroundColor = "#222"

    createNoteDiv.append(createTextArea)
    createNoteDiv.append(createSaveBtn)
    createNoteDiv.append(createCloseBtn)

    document.getElementById("new").append(createNoteDiv)

    createSaveBtn.addEventListener("click",(e) =>
    {
        saveNote(createTextArea.value,ident)
    })
}

function saveNote(value,ident)
{
    document.getElementById("new").innerText = ""

    let Data = localStorageClass.GET()

    Data[ident].note = value

    localStorageClass.SAVE(Data)
}

function onLoadPage()
{
    document.getElementById("main").innerText = ""

    let storageGetData = localStorageClass.GET()

    for(let i = 0;i < storageGetData.length;i++)
    {
        let mainDiv = document.createElement("div")
        let iconDiv = document.createElement("div")
        let noteIcon = document.createElement("span")
        let deleteIcon = document.createElement("span")
        let textDiv = document.createElement("div")

        mainDiv.className = "border-0 margin-def radius-def"
        mainDiv.style.backgroundColor = "#6e1818"
        mainDiv.style.display = "inline-block"

        noteIcon.innerText = "..."
        noteIcon.className = "cursor"
        noteIcon.id = "noteIcon"
        noteIcon.ident = i
        noteIcon.style.marginRight = "15px"

        deleteIcon.innerText = "X"
        deleteIcon.className = "cursor"
        deleteIcon.id = "deleteIcon"
        deleteIcon.ident = i
        deleteIcon.style.marginRight = "10px"

        textDiv.innerText = storageGetData[i].text || "//no text added"
        textDiv.className = "padding-def align-left word-break"
        textDiv.style.color = "#fff"

        iconDiv.className = "align-right"
        iconDiv.style.padding = "2px"
        iconDiv.style.backgroundColor = "#611111"
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
    onLoadPage()
})