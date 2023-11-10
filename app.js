/*
	[Copyrights by Lobo]
	version: 2.2
*/

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
		let test = this.read.sort((a, b) => b.date - a.date)
		return test
	}

	save(obj) {
		this.read.push(obj)
		localStorage.setItem(this.dbname, JSON.stringify(this.read))
	}

	saveAll() {
		localStorage.setItem(this.dbname, JSON.stringify(this.read))
	}

	clearAll() {
		localStorage.clear()
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
		let boxes = document.getElementById("boxes")
		let box = document.createElement("div")
		let title = document.createElement("p")
		let text = document.createElement("p")
		let DETAILS = document.createElement("DETAILS")
		let SUMMARY = document.createElement("SUMMARY")
		let deleteBtn = document.createElement("p")

		SUMMARY.style.fontSize = "2em"
		SUMMARY.style.color = "#ccc"

		deleteBtn.style.color = "red"
		deleteBtn.ident = index
		deleteBtn.id = "deleteBtn"
		deleteBtn.innerText = "Permanently Delete \n(" + e.title + ")"
		deleteBtn.className = "cursor"

		box.ident = index
		box.id = "currentBox"
		box.className = "border-0 padding-def margin-0"
		box.style.backgroundColor = "#FFFFFF"

		title.contentEditable = true
		title.innerText = e.title
		title.id = "title"
		title.ident = index
		title.className = "wrap font-size-big align-def padding-0"
		title.style.outline = "none"
		title.style.fontWeight = "bold"
		title.style.borderBottom = "2px dashed #ccc"
		title.style.color = "#ccc"

		text.contentEditable = true
		text.innerText = e.text
		text.id = "text"
		text.ident = index
		text.className = "wrap font-size-def align-left padding-0"
		text.style.outline = "none"
		text.style.borderLeft = "2px dotted #ccc"
		text.style.marginLeft = "5px"
		text.style.paddingLeft = "5px"
		text.style.color = "#333"

		boxes.append(box)
		box.append(title)
		box.append(DETAILS)
		DETAILS.append(SUMMARY)
		DETAILS.append(text)
		DETAILS.append(deleteBtn)
	})
}

document.addEventListener("keyup",(e) => {
	if(e.target.id == "title") {
		db.load().forEach((get,index) => {
			if(e.target.ident == index)
			{
				get.title = e.target.innerText.toLowerCase()
				db.saveAll()
			}
		})
	}
	else if(e.target.id == "text") {
		db.load().forEach((get,index) => {
			if(e.target.ident == index)
			{
				get.text = e.target.innerText.toLowerCase()
				db.saveAll()
			}
		})
	}
	else {
		return null
	}
})

document.addEventListener("click",(e) => {
	if(e.target.id == "deleteBtn")
	{
		db.load().splice(e.target.ident, 1)
		db.saveAll()
		loadResult()
	}
})
document.getElementById("addButton").addEventListener("click",() => {
	db.save({
		ident: db.load().length,
		title: "title",
		text: "add text"
	})

	loadResult()
})

window.onload = (event) => {
	loadResult()
}