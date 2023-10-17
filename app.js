/*
	Copyrights by Lobo
*/

//set localStorage database name!
let localStorageDataBaseName = "lobo"

//if http force to https
if(location.protocol == "http:"){
	location.href = location.href.replace("http://", "https://");
}

//localStorage database class
class database{
	constructor(dbname){
        	this.dbname = dbname;
        	this.read = JSON.parse(localStorage.getItem(dbname)) || []
	}

	load(){
		let test = this.read.sort((a, b) => b.date - a.date)
		return test
	}

	save(obj){
		this.read.push(obj)
		localStorage.setItem(this.dbname, JSON.stringify(this.read))
	}

	saveAll(){
		localStorage.setItem(this.dbname, JSON.stringify(this.read))
	}

	clearAll(){
		localStorage.clear()
	}

	restore(obj){
		localStorage.setItem(this.dbname, JSON.stringify(JSON.parse(obj)))
	}

	backup(){
		return JSON.stringify(this.read)
	}
}

let db = new database(localStorageDataBaseName)

//elements by id
let read = document.getElementById("read")
let submit = document.getElementById("submit")
let text = document.getElementById("text")
let search = document.getElementById("search")
let title = document.getElementById("title")

//get Date
function setDate(){
	const dato = Date.now()

	return dato
}

//load div boxes
function load(){
	read.innerText = ""

	db.load().forEach((e,index) =>{
		let createBox = document.createElement("div")
		let createTitle = document.createElement("p")
		let deleteButton = document.createElement("IMG")
		let createText = document.createElement("p")

		//box
		createBox.style.minWidth = "150px"
		createBox.style.width = "1fr"
		createBox.style.backgroundColor = "#eee"
		createBox.className = "border-0 align-def padding-def radius-def"

		//title
		createTitle.style.color = "#666"
		createTitle.style.fontSize = "1.5em"
		createTitle.className = "wrap align-def word-break"
		createTitle.innerText = e.title || "no title found"

		//delete button
		deleteButton.src = "icons/delete-25.png"
		deleteButton.className = "cursor"
		deleteButton.ident = index
		deleteButton.id = "deleteButton"

		//text
		createText.id = "editText"
		createText.ident = index
		createText.innerText = e.text
		createText.className = "wrap word-break outline-0 border-def align-left"
		createText.contentEditable = true
		createText.style.backgroundColor = "#fff"
		createText.style.color = "#000"
		createText.style.fontSize = "1.2em"
		createText.style.width = "100%"
		createText.style.height = "100%"
		createText.style.padding = "5px"

		//append
		read.append(createBox)
		createBox.append(createTitle)
		createBox.append(deleteButton)
		createBox.append(createText)
	})

	if(db.load().length == 0)
	{
		read.innerText = "localStorage is emty, add new task.."
	}
}

//on click on box, delete
document.addEventListener("click",(e) =>{
	if(e.target.id == "deleteButton"){
		db.load().splice(e.target.ident,1)
		db.saveAll()
		load()
	}
})

//on key inside box
document.addEventListener("keyup",(e) =>{
	if(e.target.id == "editText"){
		db.load().forEach((get,index) =>{
			if(index == e.target.ident)
			{
				get.text = e.target.innerText.toLowerCase()
				db.saveAll()
			}
		})
	}
})


//on press Enter key save message..
document.getElementById("create").addEventListener("click",(e) =>
{
	db.save({
		title: title.value.toLowerCase(),
		ident: db.load().length,
		text: "",
		date: setDate()
	})

	load()

	title.value = ""
})

//delete all database

document.getElementById("deleteLocalStorage").addEventListener("click",(e) =>{
	db.clearAll()
	location.reload()
})

load()