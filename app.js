let text = document.getElementById("text")
let del = document.getElementById("delete")
let list = []

document.addEventListener("click",(e) =>
{
	switch(e.target.id)
	{
		case "1":
			inner(e.target.src)
			break
                case "2":
                        inner(e.target.src)
                        break
                case "3":
                        inner(e.target.src)
                        break
                case "4":
                        inner(e.target.src)
                        break
                case "12":
                        inner(e.target.src)
                        break
                case "13":
                        inner(e.target.src)
                        break
                case "24":
                        inner(e.target.src)
                        break
                case "34":
                        inner(e.target.src)
                        break
                case "14":
                        inner(e.target.src)
                        break
                case "23":
                        inner(e.target.src)
                        break
                case "b":
                        inner(e.target.src)
                        break
                case "f":
                        inner(e.target.src)
                        break
                case "d":
                        inner(e.target.src)
                        break
                case "u":
                        inner(e.target.src)
                        break
                case "db":
                        inner(e.target.src)
                        break
                case "df":
                        inner(e.target.src)
                        break
                case "ub":
                        inner(e.target.src)
                        break
                case "uf":
                        inner(e.target.src)
                        break
                case "arrow":
                        inner(e.target.src)
                        break
                case "run":
                        inner(e.target.src)
                        break
	default:
		return null
	}
})

function inner(src)
{
        list.push("<img src='" + src + "' class='image'>")

        let test = ""

        list.forEach((e) =>
        {
                test += e
        })

        text.innerHTML = test
        text.style.border = "1px solid #000000"
        text.style.margin = "15px"
}

del.addEventListener("click",() =>
{
        list = []
        text.innerHTML = ""
        text.style.border = "none"
})
