/*
    Life Game v1.0

    Added:
    - database localstorage
    - random quests
    - removing quests when click button
    - added xp gain and int,dex,str when task done
    
    Todo:
    - Fix that u dont get same quest in a row
    - Fix AI, give quests based on task you like or do more often
*/

let text_add = document.getElementById('text_add')
let btn_add = document.getElementById('btn_add')
let table = document.getElementById('table')
let countQuests = document.getElementById('countQuests')

let strength = document.getElementById('strength')
let intelligence = document.getElementById('intelligence')
let dexterity = document.getElementById('dexterity')
let xp = document.getElementById('xp')
let gold = document.getElementById('gold')

let databaseName = "lifeGame"

let quests = [
    {quest: [
        "Workout for 15 minutes or more",
        "Get outside and take a walk"
    ],category: "exercise",stat: "strength",level: 3},
    {quest: [
        "Yoga for 15 minutes",
        "Go listen to Stress Relief music for 15 minutes"
    ],category: "yoga",stat: "dexterity",level: 2},
    {quest: [
        "Read newspaper or learn something new for 30 minutes",
        "Read a book for 15 minutes"
    ],category: "learning",stat: "intelligence",level: 1},
    {quest: [
        "Call someone and talk for 15 minutes",
        "Go to a supermarked, buy something to yourself or your house",
        "go to your local store and buy some fresh food",
        "go visit your family / friend / gf / bf"
    ],category: "social",stat: "intelligence",level: 4},
    {quest: [
        "Go outside with the trash",
        "Cleaning time, wash your clothes and house",
        "Pay all your bills",
        "Get minimum of 6 hours of sleep tonight",
        "Go to bed before 12PM"
    ],category: "daily",stat: "intelligence",level: 1}
]

btn_add.addEventListener('click',() =>{

    start()
})

function start(){
    let randomize = quests[Math.floor(Math.random() * quests.length)]

    let category = randomize.category
    let stat = randomize.stat
    let level = randomize.level
    let quest = randomize.quest[Math.floor(Math.random() * randomize.quest.length)]

    addToDatabase(category,quest,stat,level)
}

function addToDatabase(category,quest,stat,level){
    let lifeGame = JSON.parse(localStorage.getItem(databaseName)) || []

    lifeGame.push({
        category: category,
        quest: quest,
        stat: stat,
        level: level
    })

    localStorage.setItem(databaseName, JSON.stringify(lifeGame))

    readFromDatabase()
}

function readFromDatabase(){
    table.innerText = ""

    let read = JSON.parse(localStorage.getItem(databaseName)) || []

    if(read.length == 0){
        table.innerHTML = '<h3>Are you ready for a quest? Click Ready...</h3>'
    }

    read.forEach((e,index) => {
        let createDiv = document.createElement('div')
        let createBtnDiv = document.createElement('div')
        let createBtn = document.createElement('button')
        let createTopic = document.createElement('div')
        let createQuest = document.createElement('div')
        let createLevel = document.createElement('div')

        createBtn.innerText = "x"
        createBtn.id = index
        createBtn.className = "clickAble"
        createBtn.level = e.level
        createBtn.stat = e.stat
        createBtn.style.backgroundColor = '#EEEEEE'
        createBtn.style.color = '#CCCCCC'
        createBtn.style.border = '1px solid #CCCCCC'
        createBtn.style.outline = 'none'
        createBtn.style.cursor = 'pointer'
        createBtn.style.fontSize = '1em'

        createLevel.innerText = 'Level: ' + e.level
        createLevel.style.margin = '15px'

        createBtnDiv.style.textAlign = 'right'

        createDiv.style.padding = '5px'
        createDiv.style.border = '1px solid #EEEEEE'
        createDiv.style.margin = '5px'
        createDiv.style.width = "164px"
    
        createTopic.innerText = '{' + e.category + '}'
        createTopic.style.fontSize = '1.3em'
        createTopic.style.margin = '15px'
        createTopic.style.padding = '5px'
    
        createQuest.innerText = e.quest
        createQuest.style.fontSize = '1.2em'
        createQuest.style.textAlign = 'left'
    
        createDiv.append(createBtnDiv)
        createBtnDiv.append(createBtn)
        createDiv.append(createTopic)
        createDiv.append(createLevel)
        createDiv.append(createQuest)
        table.append(createDiv)
    })
}

function deleteFromDatabase(id){
    let read = JSON.parse(localStorage.getItem(databaseName)) || []

    read.splice(id, 1)

    localStorage.setItem(databaseName, JSON.stringify(read))
}

function createStats(){
    let readStats = JSON.parse(localStorage.getItem("myStats"))

    if(readStats === null)
    {
        let stats = {
            "strength": 0,
            "intelligence": 0,
            "dexterity": 0,
            "xp": 0,
            "gold": 0
        }
    
        localStorage.setItem("myStats", JSON.stringify(stats))
    }
}

function updateStats(level,stat){
    let readStats = JSON.parse(localStorage.getItem("myStats"))

    readStats.xp = readStats.xp + level
    readStats.gold = readStats.gold + 5

    if(stat == 'strength'){
        readStats.strength = readStats.strength + 1
    }
    else if(stat == 'intelligence'){
        readStats.intelligence = readStats.intelligence + 1
    }
    else if(stat == 'dexterity'){
        readStats.dexterity = readStats.dexterity + 1
    }
    else
    {
        return null
    }

    localStorage.setItem("myStats", JSON.stringify(readStats))
}

function showStats(){
    let readStats = JSON.parse(localStorage.getItem("myStats"))

    strength.innerText = readStats.strength
    intelligence.innerText = readStats.intelligence
    dexterity.innerText = readStats.dexterity
    xp.innerText = readStats.xp
    gold.innerText = readStats.gold
}

document.addEventListener('click',(e) =>{
    if(e.target.className === 'clickAble'){
        deleteFromDatabase(e.target.id)
        readFromDatabase()
        updateStats(e.target.level,e.target.stat) //
        showStats()
    }
})

readFromDatabase()
createStats()
showStats()

//setInterval(() =>{
//    showStats()
//},1000 / 60)