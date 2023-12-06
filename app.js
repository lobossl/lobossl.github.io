/*
	0.11
*/
class STORAGE {
    constructor(dbName)
    {
        this.dbName = dbName;
    }

    GET()
    {
        let str = JSON.parse(localStorage.getItem(this.dbName)) || {todo: [],recipe: []};

        return str;
    }

    SAVE()
    {
        let data = this.GET();

        localStorage.setItem(this.dbName,JSON.stringify(data));
    }

    SET(db,obj)
    {
        let data = this.GET();

        data[db].push(obj);
    
        localStorage.setItem(this.dbName, JSON.stringify(data));
    }

    DELETE(db,id)
    {
        const data = this.GET();

        data[db].splice(id,1);

        localStorage.setItem(this.dbName, JSON.stringify(data));
    }

    MARK(db,id)
    {
        const data = this.GET();

        if(data[db][id].marked == false)
        {
            data[db][id].marked = true;
        }
        else
        {
            data[db][id].marked = false;
        }

        localStorage.setItem(this.dbName, JSON.stringify(data));
    }
}

const myStorage = new STORAGE("main");

let todoText = document.getElementById("todoText");
let recipeText = document.getElementById("recipeText");
let addTodo = document.getElementById("addTodo");
let addRecipe = document.getElementById("addRecipe");
let innerTodo = document.getElementById("innerTodo");
let innerRecipe = document.getElementById("innerRecipe");
let day = document.getElementById("day");
let month = document.getElementById("month");

addTodo.addEventListener("click",(e) => {
    myStorage.SET("todo",{
        text: todoText.value,
        day: day.value,
        month: month.value,
        marked: false
    });

    todoText.value = ""; //
    Load();
});

addRecipe.addEventListener("click",(e) => {
    myStorage.SET("recipe",{
        text: recipeText.value,
        marked: false
    });

    recipeText.value = ""; //
    Load();
});

document.addEventListener("click",(e) =>
{
    if(e.target.id == "todo")
    {
        myStorage.DELETE("todo",e.target.setID);
        Load();
    }

    if(e.target.id == "recipe")
    {
        myStorage.DELETE("recipe",e.target.setID);
        Load();
    }

    if(e.target.id === "markTodo")
    {
        myStorage.MARK("todo",e.target.setID);
        Load();
    }

    if(e.target.id === "markRecipe")
    {
        myStorage.MARK("recipe",e.target.setID);
        Load();
    }
})

function Load()
{
    let currentDate = new Date();

    innerTodo.innerText = "";
    innerRecipe.innerText = "";

    for(let i = 0; i < myStorage.GET().todo.length; i ++)
    {
        let Data = myStorage.GET().todo[i];

        let Frame = document.createElement("div");
        let Date = document.createElement("p");
        let Delete = document.createElement("span");
        let Mark = document.createElement("span");
        let Text = document.createElement("p");

        Frame.className = "align-Right border-def margin-def align-right";
        Frame.style.display = "inline-block";
        Frame.style.backgroundColor = "#222";
        Frame.style.color = "#ccc";

        Date.innerText = Data.day + "." + Data.month + "." + currentDate.getFullYear();
        Date.style.marginRight = "2px";
        Date.className = "align-def padding-def";

        Delete.innerText = "X";
        Delete.setID = i;
        Delete.id = "todo";
        Delete.style.color = "#FF4500";
        Delete.style.margin = "5px";
        Delete.className = "align-right cursor user-select-0";

        Mark.innerText = "V";
        Mark.setID = i;
        Mark.id = "markTodo";
        Mark.style.color = "#579E1E";
        Mark.style.margin = "5px";
        Mark.className = "align-right cursor user-select-0";

        Text.innerText = Data.text || "no text..";
        Text.className = "align-left padding-def";

        if(Data.marked == true)
        {
            Frame.style.borderColor = "#579E1E";
        }
        else if(Data.marked == false)
        {
            Frame.style.borderColor = "#444";
        }

        innerTodo.append(Frame);
        Frame.append(Mark);
        Frame.append(Delete);
        Frame.append(Date);
        Frame.append(Text);
    }

    for(let i = 0; i < myStorage.GET().recipe.length; i ++)
    {
        let Data = myStorage.GET().recipe[i];

        let Frame = document.createElement("div");
        let Delete = document.createElement("span");
        let Text = document.createElement("p");
        let Mark = document.createElement("span");

        Frame.className = "align-Right border-def margin-def align-right";
        Frame.style.backgroundColor = "#222";
        Frame.style.color = "#ccc";

        Delete.innerText = "X";
        Delete.setID = i;
        Delete.id = "recipe";
        Delete.style.color = "#FF4500";
        Delete.style.margin = "5px";
        Delete.className = "align-right cursor user-select-0";

        Mark.innerText = "V";
        Mark.setID = i;
        Mark.id = "markRecipe";
        Mark.style.color = "#579E1E";
        Mark.style.margin = "5px";
        Mark.className = "align-right cursor user-select-0";

        Text.innerText = Data.text || "no text..";
        Text.className = "align-left padding-def";

        if(Data.marked == true)
        {
            Frame.style.borderColor = "#579E1E";
        }
        else if(Data.marked == false)
        {
            Frame.style.borderColor = "#444";
        }

        innerRecipe.append(Frame);
        Frame.append(Mark);
        Frame.append(Delete);
        Frame.append(Text);
    }
}

Load();