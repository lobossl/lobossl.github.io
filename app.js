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

//my colors
function createColor()
{
	let array = ["#0d94bd","#0d1cbd","#770dbd","#bd0da3","#bd0d0d","#0db4bd","#0dbd8b","#0dbd27","#36bd0d","#a0bd0d","#bdb70d","#bd8e0d","#383828"]

	let randomIndex = Math.floor(Math.random() * array.length)

	let randomColor = array[randomIndex]

	return randomColor
}

//load div boxes
function load(){
	read.innerText = ""

	db.load().forEach((e,index) =>{
		let createDiv = document.createElement("div")

		createDiv.id = "colorBoxes"
		createDiv.className = "padding-big radius-def cursor word-break"
		createDiv.innerText = e.text
		createDiv.ident = index

		createDiv.style.backgroundColor = e.color

		read.append(createDiv)
	})

	if(db.load().length == 0)
	{
		read.innerText = "Nothing added yet.."
	}
}

//on double click on box, delete
document.addEventListener("dblclick",(e) =>{
	if(e.target.id == "colorBoxes"){
		db.load().splice(e.target.ident,1)
		db.saveAll()
		load()
	}
})

//on press Enter key save message..
text.addEventListener("keyup",(e) =>
{
	if(e.key == "Enter")
	{
		if(text.value.length > 0){
			db.save({
				text: text.value,
				date: setDate(),
				color: createColor()
			})
	
			load()
	
			text.value = ""
		}
	}
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