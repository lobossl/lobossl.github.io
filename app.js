/*
	0.05
*/
class STORAGE {
    Save(db) {
        const savedData = this.Read(db);
        localStorage.setItem(db, JSON.stringify(savedData));
    }

    Push(db,data) {
        const savedData = this.Read(db);
        savedData.push(data);
        localStorage.setItem(db, JSON.stringify(savedData));
    }

    Checker(db,index)
    {
        const savedData = this.Read(db);

        if(savedData[index].checked == false)
        {
            savedData[index].checked = true;
        }
        else
        {
            savedData[index].checked = false;
        }

        localStorage.setItem(db, JSON.stringify(savedData));
    }

    Delete(db)
    {
        const savedData = this.Read(db);

        for(let i = savedData.length - 1; i >= 0; i--)
        {
            if(savedData[i].checked === true)
            {
                savedData.splice(i,1);
            }
        }

        localStorage.setItem(db, JSON.stringify(savedData));
    }

    Read(db) {
        const savedData = JSON.parse(localStorage.getItem(db) || "[]");
        return savedData;
    }
}

const myStorage = new STORAGE();

let todoText = document.getElementById("todoText");
let recipeText = document.getElementById("recipeText");
let addTodo = document.getElementById("addTodo");
let addRecipe = document.getElementById("addRecipe");
let deleteRecipe = document.getElementById("deleteRecipe");

deleteRecipe.addEventListener("click",(e) => {
    myStorage.Delete("recipe");
    Load();
})

addTodo.addEventListener("click",(e) => {
    let day = document.getElementById("day");
    let month = document.getElementById("month");

    myStorage.Push("todo",{
        text: todoText.value,
        checked: false,
        day: day.value,
        month: month.value
    });

    todoText.value = "";
    Load();
});

addRecipe.addEventListener("click",(e) => {
    myStorage.Push("recipe",{
        text: recipeText.value,
        checked: false
    });
    recipeText.value = "";
    Load();
});

document.addEventListener("click",(e) =>
{
    if(e.target.id == "recipeList")
    {
        myStorage.Checker("recipe",e.target.setID)
        Load();
    }

    if(e.target.id == "todoList")
    {
        myStorage.Checker("todo",e.target.setID)
        myStorage.Delete("todo");
        Load();
    }
})

function Load()
{
    innerTodo.innerText = "";
    innerRecipe.innerText = "";

    //TODO
    for(let i = 0;i < myStorage.Read("todo").length;i++)
    {
        let p = document.createElement("p");
        let icon = document.createElement("span");
        let text = document.createElement("p");
        let date = document.createElement("span");

        p.style.backgroundColor = "#222";
        p.className = "padding-def border-def";

        let year = new Date().getFullYear();
        date.innerText = "[" + myStorage.Read("todo")[i].day + "." + myStorage.Read("todo")[i].month + "." + year + "]";

        icon.id = "todoList";
        icon.setID = i;
        icon.innerText = "♻";
        icon.className = "cursor margin-def";

        text.innerText = myStorage.Read("todo")[i].text || "no text..";

        innerTodo.append(p);
        p.append(icon);
        p.append(date);
        p.append(text);
    }

    //recipe
    for(let i = 0;i < myStorage.Read("recipe").length;i++)
    {
        let child = document.createElement("p");

        child.setID = i;
        child.id = "recipeList";
        child.style.backgroundColor = "#222";
        child.className = "border-def padding-def align-left";
        child.innerText = myStorage.Read("recipe")[i].text || "no text..";

        if(myStorage.Read("recipe")[i].checked == true)
        {
            child.style.color = "#ccc";
            child.style.textDecoration = "line-through red";
            child.style.border = "1px solid #6d0e0e";
        }
        else
        {
            child.style.color = "#eeeeee";
            child.style.textDecoration = "none";
            child.style.border = "1px solid #555";
        }

        innerRecipe.append(child);
    }
}

Load();
