/*
	https://github.com/lobossl/todo/
*/

//if http change, force https
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

let db = new database("test")

//elements by id
let read = document.getElementById("read")
let submit = document.getElementById("submit")
let text = document.getElementById("text")

//get Date
function setDate(){
	const dato = Date.now()

	return dato
}

//load div boxes
function load(){
	read.innerText = ""

	db.load().forEach((e,index) =>{
		let boxOut = document.createElement("div")
		let deleteBox = document.createElement("IMG")
		let createEditBox = document.createElement("p")

		boxOut.className = "padding-big radius-def word-break border-0 outline-0 align-def"
		boxOut.style.backgroundColor = "#fff"
		boxOut.style.color = "#000"
		boxOut.style.minWidth = "100px"
		boxOut.ident = index
		boxOut.style.flex = "1 auto"
		boxOut.style.border = "1px solid #ccc"

		deleteBox.src = "icons/delete-25.png"
		deleteBox.className = "cursor"
		deleteBox.ident = index
		deleteBox.alt = index
		deleteBox.id = "deleteBox"

		createEditBox.id = "createEditBox"
		createEditBox.innerText = e.text
		createEditBox.contentEditable = "true"
		createEditBox.ident = index
		createEditBox.className = "border-0 padding-def width-max outline-0 align-left"
		createEditBox.style.borderLeft = "2px dotted #ccc"

		read.append(boxOut)
		boxOut.append(deleteBox)
		boxOut.append(createEditBox)
	})

	if(db.load().length == 0)
	{
		read.innerText = "Database emty.."
	}
}

//on double click on box, delete
document.addEventListener("click",(e) =>{
	if(e.target.id == "deleteBox"){
		db.load().splice(e.target.ident,1)
		db.saveAll()
		load()
	}
})

//on key inside box
document.addEventListener("keyup",(e) =>{
	if(e.target.id == "createEditBox"){
		db.load().forEach((get,index) =>{
			if(index == e.target.ident)
			{
				get.text = e.target.innerText
			}
		})
		db.saveAll()
	}
})

//on press Enter key save message..
document.getElementById("add").addEventListener("click",(e) =>
{
	db.save({
		ident: db.load().length,
		text: "",
		date: setDate()
	})

	load()
})

//delete all database
document.getElementById("deleteAll").addEventListener("click",(e) =>{
	db.clearAll()
	location.reload()
})
//restore all database
document.getElementById("restore").addEventListener("click",(e) =>{
	console.log("restore not added yet, please try again later.")
})
//backup all database
document.getElementById("backup").addEventListener("click",(e) =>{
	console.log("backup not added yet, please try again later.")
})


console.log("https://github.com/lobossl/")

load()