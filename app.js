//1.0.0
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

		createRadio.type = "checkbox"
		createRadio.name = e.text
		createRadio.value = e.text
		createRadio.ident = index
		createRadio.className = "margin-def"

		createLabel.innerText = e.text

		boxes.appendChild(createNewBox)

		createNewBox.appendChild(createRadio)
		createNewBox.appendChild(createLabel)

		createRadio.addEventListener("click",(x) =>
		{
			if(db.load()[x.target.ident].underline === false)
			{
				db.load()[x.target.ident].underline = true
				createNewBox.style.textDecoration = "line-through"
				createNewBox.style.color = "red"
			}
			else{
				db.load()[x.target.ident].underline = false
				createNewBox.style.textDecoration = "none"
				createNewBox.style.color = "black"
			}

			db.saveAll()
		})
	})
}

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
	let monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]
	let d = new Date()

	db.save({
		ident: null,
		underline: false,
		date: monthNames[d.getMonth()],
		text: document.getElementById("inputText").value
	})

	loadResult()
	
	document.getElementById("inputText").value = ""
})

window.onload = () => {
	loadResult()
}