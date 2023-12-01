//11.1.1
let localStorageDataBaseName = "lobo"

if(location.protocol == "http:") {
	location.href = location.href.replace("http://", "https://");
}

class database {
	constructor(dbname) {
        	this.dbname = dbname;
        	this.read = JSON.parse(localStorage.getItem(dbname)) || []
	}

	load() {
		let getArray = this.read
		return getArray
	}

	save(obj) {
		this.read.push(obj)
		localStorage.setItem(this.dbname, JSON.stringify(this.read))
	}

	clear() {
		this.read = []
	}

	saveAll() {
		localStorage.setItem(this.dbname, JSON.stringify(this.read))
	}

	restore(obj) {
		localStorage.setItem(this.dbname, JSON.stringify(JSON.parse(obj)))
	}

	backup() {
		return JSON.stringify(this.read)
	}
}

let db = new database(localStorageDataBaseName)

function loadResult()
{
	document.getElementById("boxes").innerText = ""

	db.load().forEach((e,index) => {
		e.ident = index

		let boxes = document.getElementById("boxes")
		let createNewBox = document.createElement("div")
		let createRadio = document.createElement("input")
		let createLabel = document.createElement("label")

		createRadio.className = "margin-def"
		createRadio.id = "radio"
		createRadio.type = "radio"
		createRadio.value = e.text
		createRadio.innerText = e.text
		createRadio.ident = index

		createLabel.className = ""
		createLabel.id = "label"
		createLabel.innerText = e.text

		boxes.append(createNewBox)
		createNewBox.append(createRadio)
		createNewBox.append(createLabel)

		if(e.underline)
		{
			createNewBox.style.textDecoration = "line-through"
			createNewBox.style.color = "red"
		}

		createRadio.addEventListener("click",(x) =>{
			db.load()[x.target.ident].underline = true
			db.saveAll()
			loadResult()
		})
	})
}

document.getElementById("delete").className = "cursor"
document.getElementById("delete").addEventListener("click",() =>
{
	let myDatabase = db.load()

	for (let i = myDatabase.length - 1; i >= 0; i--) {
		if (myDatabase[i].underline === true)
		{
			myDatabase.splice(i, 1);
		}
	}

	db.saveAll()
	loadResult()
})

document.getElementById("addButton").addEventListener("click",(e) => {
	db.save({
		ident: null,
		underline: false,
		text: document.getElementById("inputText").value
	})

	loadResult()
	
	document.getElementById("inputText").value = ""
})

window.onload = () => {
	loadResult()
}