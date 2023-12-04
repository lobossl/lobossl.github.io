/*
    0.0.1
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
let foodText = document.getElementById("foodText");
let addTodo = document.getElementById("addTodo");
let addFood = document.getElementById("addFood");
let deleteTodo = document.getElementById("deleteTodo");
let deleteFood = document.getElementById("deleteFood");

deleteTodo.addEventListener("click",(e) => {
    myStorage.Delete("todo");
    Load();
})

deleteFood.addEventListener("click",(e) => {
    myStorage.Delete("food");
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

addFood.addEventListener("click",(e) => {
    myStorage.Push("food",{
        text: foodText.value,
        checked: false
    });
    foodText.value = "";
    Load();
});

document.addEventListener("click",(e) =>
{
    if(e.target.id == "todoList")
    {
        myStorage.Checker("todo",e.target.setID)
        Load();
    }

    if(e.target.id == "foodList")
    {
        myStorage.Checker("food",e.target.setID)
        Load();
    }
})

function Load()
{
    innerTodo.innerText = "";
    innerFood.innerText = "";

    for(let i = 0;i < myStorage.Read("todo").length;i++)
    {
        let child = document.createElement("p");

        child.setID = i;
        child.id = "todoList";
        child.style.backgroundColor = "#111";
        child.className = "border-def padding-def";
        child.innerText = myStorage.Read("todo")[i].text;

        if(myStorage.Read("todo")[i].checked == true)
        {
            child.style.color = "red";
            child.style.textDecoration = "line-through";
        }
        else
        {
            child.style.color = "#eee";
            child.style.textDecoration = "none";
        }

        innerTodo.append(child);
    }

    for(let i = 0;i < myStorage.Read("food").length;i++)
    {
        let child = document.createElement("p");

        child.setID = i;
        child.id = "foodList";
        child.style.backgroundColor = "#111";
        child.className = "border-def padding-def align-left";
        child.innerText = myStorage.Read("food")[i].text;

        if(myStorage.Read("food")[i].checked == true)
        {
            child.style.color = "red";
            child.style.textDecoration = "line-through";
        }
        else
        {
            child.style.color = "#eee";
            child.style.textDecoration = "none";
        }

        innerFood.append(child);
    }
}

Load();

