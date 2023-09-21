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
let color = document.getElementById("color")
let read = document.getElementById("read")
let submit = document.getElementById("submit")
let text = document.getElementById("text")
let deleteAll = document.getElementById("deleteAll")

let setColor = color.value

//get Date
function setDate(){
	const dato = Date.now()

	return dato
}

//load div boxes
function load(){
	read.innerText = ""

	db.load().forEach((e,index) =>{
		let createDiv = document.createElement("div")

		createDiv.id = "colorBoxes"
		createDiv.className = "padding-def wrap align-left radius-def border-0 cursor"
		createDiv.innerText = e.text
		createDiv.ident = index

		createDiv.style.backgroundColor = e.color
		createDiv.style.color = "#eeeeee"

		read.append(createDiv)
	})
}

//on color change set new color
color.addEventListener("change",(e) =>{
	setColor = e.target.value
})

//on double click on box, delete
document.addEventListener("dblclick",(e) =>{
	if(e.target.id == "colorBoxes"){
		db.load().splice(e.target.ident,1)
		db.saveAll()
		load()
	}
})

//on submit click button, save to database
submit.addEventListener("click",(e) =>{
	if(text.value.length > 0){
		db.save({
			text: text.value,
			date: setDate(),
			color: setColor
		})

		load()

		text.value = ""
	}
})

//clear database
deleteAll.addEventListener("click",(e) =>{
	db.clearAll()

	location.reload()
})

console.log("https://github.com/lobossl/")

load()