//1.0.3
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
		createRadio.underline = e.underline
		createRadio.className = "margin-def"

		createLabel.innerText = e.text

		boxes.appendChild(createNewBox)

		createNewBox.appendChild(createRadio)
		createNewBox.appendChild(createLabel)

		if(e.underline == true)
		{
			createLabel.style.textDecoration = "line-through red"
			createLabel.style.color = "#CCCCCC"
		}
		else
		{
			createLabel.style.textDecoration = "none"
			createLabel.style.color = "#888888"
		}

		//
		createRadio.addEventListener("click",(x) =>
		{
			if(x.target.underline)
			{
				db.load()[x.target.ident].underline = false
			}
			else
			{
				db.load()[x.target.ident].underline = true
			}

			db.saveAll()

			loadResult()
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
	if(document.getElementById("inputText").value.length > 0)
	{
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
	}
})

window.onload = () => {
	loadResult()
}