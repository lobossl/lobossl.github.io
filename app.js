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
		let boxes = document.getElementById("boxes")
		let box = document.createElement("div")
		let title = document.createElement("p")
		let text = document.createElement("p")
		let DETAILS = document.createElement("DETAILS")
		let SUMMARY = document.createElement("SUMMARY")
		let deleteBtn = document.createElement("span")

		SUMMARY.style.fontSize = "1.2em"
		SUMMARY.style.color = "#333"

		deleteBtn.style.color = "#999"
		deleteBtn.ident = index
		deleteBtn.id = "deleteBtn"
		deleteBtn.innerText = "Delete"
		deleteBtn.className = "cursor"

		box.ident = index
		box.id = "currentBox"
		box.className = "border-def padding-def margin-def radius-def"
		box.style.backgroundColor = "#FFFFFF"

		title.contentEditable = true
		title.innerText = e.title
		title.id = "title"
		title.ident = index
		title.className = "wrap font-size-med align-def padding-0"
		title.style.outline = "none"
		title.style.fontWeight = "bold"
		title.style.color = "#333"

		text.contentEditable = true
		text.innerText = e.text
		text.id = "text"
		text.ident = index
		text.className = "wrap font-size-def align-left padding-0"
		text.style.outline = "none"
		text.style.borderLeft = "3px dotted #ccc"
		text.style.marginLeft = "5px"
		text.style.paddingLeft = "5px"
		text.style.color = "#000"

		boxes.append(box)
		box.append(title)
		box.append(DETAILS)
		DETAILS.append(SUMMARY)
		DETAILS.append(text)
		DETAILS.append(deleteBtn)
	})
}

document.addEventListener("paste",(e) => {
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
				get.text = e.target.innerText

				db.saveAll()
			}
		})
	}
	else {
		return null
	}
})

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
				get.text = e.target.innerText

				db.saveAll()
			}
		})
	}
	else {
		return null
	}
})

document.addEventListener("click",(e) => {
	if(e.target.id == "deleteBtn") {
		db.load().splice(e.target.ident, 1)

		db.saveAll()

		loadResult()
	}
})

document.getElementById("clearButton").addEventListener("click",() => {
	let conFirm = confirm("Are you sure?")

	if(conFirm) {
		db.clear()

		db.saveAll()

		loadResult()
	}
})

document.getElementById("addButton").addEventListener("click",() => {
	db.save({
		ident: null,
		title: "Edit Title..",
		text: "Edit Text.."
	})

	loadResult()
})

window.onload = () => {
	loadResult()
}