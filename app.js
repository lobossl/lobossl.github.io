/*
    https://github.com/lobossl
*/
let main = document.getElementById("main");
let newBTN = document.getElementById("new");
let backupBTN = document.getElementById("backup");
let restoreBTN = document.getElementById("restore");
let searchINPUT = document.getElementById("search");

let databaseName = "test";

let getDB = localStorage.getItem(databaseName) ? JSON.parse(localStorage.getItem(databaseName)) : []

function setDatabase(objString)
{
    getDB.push(objString);

    localStorage.setItem(databaseName,JSON.stringify(getDB));
}

function spliceDatabase(target)
{
    getDB.splice(target,1);

    localStorage.setItem(databaseName,JSON.stringify(getDB));
}

function editDatabase(obj)
{
    getDB.forEach((x,index) =>
    {
        if(obj.id == index)
        {
            x.title = obj.title;
            x.time = getTime();
            x.text = obj.text;
        }
    });

    localStorage.setItem(databaseName,JSON.stringify(getDB));
}

function getTime()
{
    let Time = new Date();

    let Year = Time.getFullYear();
    let Month = Time.getMonth() + 1;
    let Day = Time.getDate();

    let createTime = Day + "." + Month + "." + Year;

    return createTime;
}

searchINPUT.addEventListener("keyup",(e) =>
{
    if(e.target.value)
    {
        removeChilds();
        loadDivs(e.target.value.toLowerCase());
    }
    else
    {
        removeChilds();
        loadDivs(false);
    }
});

newBTN.addEventListener("click",() =>
{   
    setDatabase({
        time: getTime(),
        title: "Example title",
        text: "Example text"
    });

    removeChilds();
    loadDivs();
});

function removeChilds()
{
    let child = main.lastElementChild;

    while(child)
    {
        main.removeChild(child);
        child = main.lastElementChild;
    }
}

function loadDivs(test)
{
    getDB.forEach((list,index) =>
    {
        if(list.title.toLowerCase().includes(test) || test == undefined || test == false)
        {
            let mainDiv = document.createElement("div");
            mainDiv.className = "mainDiv";

            let elementTITLE = document.createElement("div");
            elementTITLE.id = index;
            elementTITLE.innerText = list.title;
            elementTITLE.className = "elementTITLE";
            elementTITLE.contentEditable = "true";

            let elementTEXT = document.createElement("pre");
            elementTEXT.id = index;
            elementTEXT.innerText = list.text;
            elementTEXT.className = "elementTEXT";
            elementTEXT.contentEditable = "true";

            let elementDELETE = document.createElement("img");
            elementDELETE.id = index;
            elementDELETE.src = "img/delete.png";
            elementDELETE.innerText = "Delete";
            elementDELETE.className = "delete";

            let elementTIME = document.createElement("div");
            elementTIME.id = index;
            elementTIME.innerText = list.time;
            elementTIME.className = "elementTIME";

            main.appendChild(mainDiv);

            mainDiv.appendChild(elementTIME);
            mainDiv.appendChild(elementDELETE);
            mainDiv.appendChild(elementTITLE);
            mainDiv.appendChild(elementTEXT);

            elementDELETE.addEventListener("click",(e) =>
            {
                spliceDatabase(e.target.id);
                removeChilds();
                loadDivs();
            });
        }
    });
};

document.addEventListener("keyup",(key) =>
{
    let getTitle = null;
    let getText = null;

    getDB.forEach((event,index) =>
    {
        if(key.target.id == index)
        {
            getTitle = event.title;
            getText = event.text;
        }
    });

    if(key.target.className == "elementTITLE")
    {
        getTitle = key.target.innerText;
    }

    if(key.target.className == "elementTEXT")
    {
        getText = key.target.innerText;
    }

    editDatabase({
        id: key.target.id,
        title: getTitle,
        text: getText
    });
});

backupBTN.addEventListener("click",() =>
{
    const dataJson = JSON.stringify(getDB);
    const blob = new Blob([dataJson], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "backup.json";
    a.click();
    URL.revokeObjectURL(url);
});

restoreBTN.addEventListener("change",() =>
{
	let file = restore.files[0];

    if(file)
    {
        let reader = new FileReader();
        
        reader.addEventListener("load",(e) =>
        {
            try
            {
                JSON.parse(e.target.result).forEach((event) =>
                {
                    setDatabase(event);
                });
            }
            catch(error)
            {
                console.log("Error loading JSON file.");
            }
        });
        
        reader.readAsText(file);
    }

    location.reload();
});

loadDivs();