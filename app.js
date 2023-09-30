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
		let createEditBox = document.createElement("p")

		createEditBox.id = "createEditBox"
		createEditBox.className = "padding-big radius-def cursor word-break border-1 outline-0"
		createEditBox.innerText = e.text
		createEditBox.contentEditable = "true"
		createEditBox.ident = index
		createEditBox.style.backgroundColor = "#eee"
		createEditBox.style.color = "#222"
		createEditBox.style.minWidth = "150px"

		read.append(createEditBox)
	})

	if(db.load().length == 0)
	{
		read.innerText = "Nothing added yet.."
	}
}

//on double click on box, delete
document.addEventListener("dblclick",(e) =>{
	if(e.target.id == "createEditBox"){
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