/*
	0.04
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
let addFecipe = document.getElementById("addRecipe");
let deleteTodo = document.getElementById("deleteTodo");
let deleteRecipe = document.getElementById("deleteRecipe");

deleteTodo.addEventListener("click",(e) => {
    myStorage.Delete("todo");
    Load();
})

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
    if(e.target.id == "todoList")
    {
        myStorage.Checker("todo",e.target.setID)
        Load();
    }

    if(e.target.id == "recipeList")
    {
        myStorage.Checker("recipe",e.target.setID)
        Load();
    }
})

function Load()
{
    innerTodo.innerText = "";
    innerRecipe.innerText = "";

    for(let i = 0;i < myStorage.Read("todo").length;i++)
    {
        let child = document.createElement("p");
        let childDate = document.createElement("span");
        let childText = document.createElement("span");

        child.setID = i;
        child.id = "todoList";
        childText.id = "todoList";
        childText.setID = i;
        childDate.setID = i;
        childDate.id = "todoList";
        child.style.borderBottom = "2px dashed #555";
        child.className = "padding-def align-left";
        childText.innerText = myStorage.Read("todo")[i].text;
        childDate.innerText = myStorage.Read("todo")[i].day + " " + myStorage.Read("todo")[i].month + "\n";

        if(myStorage.Read("todo")[i].checked == true)
        {
            child.style.color = "#555";
            child.style.textDecoration = "line-through #555";
            child.style.border = "2px dashed #6d0e0e";
        }
        else
        {
            child.style.color = "#eeeeee";
            child.style.textDecoration = "none";
            child.style.border = "2px dashed #555";
        }

        innerTodo.append(child);
        child.appendChild(childDate);
        child.appendChild(childText);
    }

    for(let i = 0;i < myStorage.Read("recipe").length;i++)
    {
        let child = document.createElement("div");

        child.setID = i;
        child.id = "recipeList";
        child.style.backgroundColor = "#222";
        child.className = "border-def padding-def align-left";
        child.innerText = myStorage.Read("recipe")[i].text;

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

