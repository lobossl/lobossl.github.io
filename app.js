/*
	TODO LIST
*/

let dbName = "todolist"

let ADD = document.getElementById("add")

ADD.addEventListener("click",() =>{
	let INPUT_TEXTAREA = document.createElement("textarea")
	let SAVE_BUTTON = document.createElement("button")

	INPUT_TEXTAREA.id = "textarea"
	INPUT_TEXTAREA.className = "textarea"
	INPUT_TEXTAREA.placeholder = "Text.. [Press Enter to Save]" //

	document.getElementById("form").append(INPUT_TEXTAREA)

	setTimeout(() =>{
		INPUT_TEXTAREA.focus()
	},0)

	INPUT_TEXTAREA.addEventListener("keyup",(e) =>{
		if(e.key === "Enter"){
			saveDatabase(INPUT_TEXTAREA.value,dbName)

			INPUT_TEXTAREA.value = ""
			document.getElementById("form").innerText = ""
		}
	})
})

function saveDatabase(text,databaseName){
	let database = JSON.parse(localStorage.getItem(databaseName)) || []

	let entry = {
		date: new Date().toDateString(),
		textarea: text
	}

	database.push(entry)

	localStorage.setItem(databaseName, JSON.stringify(database))

	loadResults()
}

function loadDatabase(databaseName){
	let database = JSON.parse(localStorage.getItem(databaseName)) || []

	return database
}

function loadResults(){
	document.getElementById("result").innerText = ""

	loadDatabase(dbName).forEach((e,index) =>{
		let DIV_MAIN = document.createElement("div")
		let DIV_DATE = document.createElement("div")
		let DIV_TEXTAREA = document.createElement("div")
		let DIV_DELETE = document.createElement("div")
	
		DIV_MAIN.className = "mainDiv"

		DIV_DATE.innerText = "Added " + e.date + "."
		DIV_DATE.className = "dateDiv"
	
		DIV_TEXTAREA.innerText = e.textarea
		DIV_TEXTAREA.className = "textareaDiv"

		DIV_DELETE.innerText = " "
		DIV_DELETE.className = "deleteDiv"

		DIV_MAIN.append(DIV_DATE)	
		DIV_MAIN.append(DIV_TEXTAREA)
		DIV_MAIN.append(DIV_DELETE)
	
		document.getElementById("result").append(DIV_MAIN)

		DIV_DELETE.addEventListener("click",() =>{
			deleteDatabase(index,dbName)
		})
	})
}

function deleteDatabase(index,databaseName){
	let database = JSON.parse(localStorage.getItem(databaseName)) || []

	if (index >= 0 && index < database.length) {
		database.splice(index, 1)

		localStorage.setItem(databaseName, JSON.stringify(database))

		loadResults()
	}
}

loadResults()
