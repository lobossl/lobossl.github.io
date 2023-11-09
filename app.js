/*
	[Copyrights by Lobo]
	version: 2.0
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

		box.ident = index
		box.id = "currentBox"
		box.className = "border-0 padding-0 margin-0"
		box.style.backgroundColor = "#FFFFFF"

		title.contentEditable = true
		title.innerText = e.title
		title.id = "title"
		title.ident = index
		title.className = "wrap font-size-med align-def padding-def"
		title.style.outline = "none"
		title.style.fontWeight = "bold"
		title.style.borderBottom = "1px dashed #CCCCCC"

		text.contentEditable = true
		text.innerText = e.text
		text.id = "text"
		text.ident = index
		text.className = "wrap font-size-def align-left padding-def"
		text.style.outline = "none"
		text.style.borderLeft = "1px dashed #CCCCCC"
		text.style.marginLeft = "15px"

		boxes.append(box)
		box.append(title)
		box.append(DETAILS)
		DETAILS.append(SUMMARY)
		DETAILS.append(text)
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

document.getElementById("addButton").addEventListener("click",() => {
	db.save({
		ident: db.load().length,
		title: "Change Me (Title..)",
		text: "Change Me (Text..)"
	})

	loadResult()
})

window.onload = (event) => {
	loadResult()
}