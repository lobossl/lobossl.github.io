/*
    0.0.2
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
    myStorage.Push("todo",{
        text: todoText.value,
        checked: false
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

        child.setID = i;
        child.id = "todoList";
        child.style.backgroundColor = "#111111";
        child.className = "border-def padding-def";
        child.innerText = myStorage.Read("todo")[i].text;

        if(myStorage.Read("todo")[i].checked == true)
        {
            child.style.color = "#6d0e0e";
            child.style.textDecoration = "line-through";
            child.style.border = "1px solid #6d0e0e";
        }
        else
        {
            child.style.color = "#eeeeee";
            child.style.textDecoration = "none";
            child.style.border = "1px solid #555";
        }

        innerTodo.append(child);
    }

    for(let i = 0;i < myStorage.Read("recipe").length;i++)
    {
        let child = document.createElement("p");

        child.setID = i;
        child.id = "recipeList";
        child.style.backgroundColor = "#111111";
        child.className = "border-def padding-def align-left";
        child.innerText = myStorage.Read("recipe")[i].text;

        if(myStorage.Read("recipe")[i].checked == true)
        {
            child.style.color = "#ff0000";
            child.style.textDecoration = "line-through";
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

