//1.0.4

if(location.protocol == "http:")
{
	location.href = location.href.replace("http://", "https://");
}

class myProject {
	constructor(dbname)
	{
			this.elementBoxes = document.getElementById("boxes")
			this.elementDelete = document.getElementById("delete")
			this.elementAddBtn = document.getElementById("addButton")
			this.inputText = document.getElementById("inputText")
        	this.dbname = dbname;
        	this.dbread = JSON.parse(localStorage.getItem(dbname)) || []
	}

	SAVE(obj)
	{
		this.dbread.push(obj)
		localStorage.setItem(this.dbname, JSON.stringify(this.dbread))
	}

	SAVEALL()
	{
		localStorage.setItem(this.dbname, JSON.stringify(this.dbread))
	}

	DELETE()
	{
		for(let i = this.dbread.length - 1; i >= 0; i--)
		{
			if(this.dbread[i].underline == true)
			{
				this.dbread.splice(i,1)
			}
		}

		this.SAVEALL()
		this.RELOAD()
	}

	ADD()
	{
		if(this.inputText.value.length > 0)
		{
			let monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]
			let d = new Date()
	
			this.SAVE({
				ident: null,
				underline: false,
				date: monthNames[d.getMonth()],
				text: this.inputText.value
			})
	
			this.RELOAD()
			
			this.inputText.value = ""
		}
	}

	RELOAD()
	{
		this.elementBoxes.innerText = ""

		for(let i = this.dbread.length - 1; i >= 0; i--)
		{
			this.dbread[i].ident = i

			let createNewBox = document.createElement("div")
			let createRadio = document.createElement("input")
			let createLabel = document.createElement("label")

			createRadio.type = "checkbox"
			createRadio.id = "checkbox"
			createRadio.name = this.dbread[i].text
			createRadio.value = this.dbread[i].text
			createRadio.ident = i
			createRadio.underline = this.dbread[i].underline
			createRadio.className = "margin-def"

			createLabel.innerText = this.dbread[i].text

			this.UNDERLINE(this.dbread[i].underline,createLabel,createRadio)

			this.elementBoxes.appendChild(createNewBox)

			createNewBox.appendChild(createRadio)
			createNewBox.appendChild(createLabel)
		}
	}

	UNDERLINE(e,label,radio)
	{
		if(e == true)
		{
			radio.checked = true
			label.style.textDecoration = "line-through red"
		}
		else
		{
			radio.checked = false
			label.style.textDecoration = "none"
		}
	}

	SELECT(e)
	{
		if(this.dbread[e].underline == true)
		{
			this.dbread[e].underline = false
		}
		else
		{
			this.dbread[e].underline = true
		}

		this.SAVEALL()
	}
}

let Project = new myProject("test")

Project.RELOAD()

Project.elementDelete.addEventListener("click",(e) =>
{
	Project.DELETE()
})

Project.elementAddBtn.addEventListener("click",(e) =>
{
	Project.ADD()
})

document.addEventListener("click",(e) =>
{
	if(e.target.id == "checkbox")
	{
		Project.SELECT(e.target.ident)
		Project.RELOAD()
	}
})