function get(item){
    let get = JSON.parse(localStorage.getItem(item))

    return get
}

function start(){
    db = {
        earnings: 0.0,
        progress: 0.0,
        workers: 1.0,
        cakes: 0.0,
        price: 0.1,
        buyers: 0.0,
        demands: 0.0
    }

    if(!get("stats")){
        localStorage.setItem("stats",JSON.stringify(db))
    }
}

function set(item,val){
    let stats = get("stats")

    if (stats.hasOwnProperty(item)) {
        stats[item] = Number(val)
    }

    localStorage.setItem("stats", JSON.stringify(stats))
}

function add(item,val){
    let stats = get("stats")

    if (stats.hasOwnProperty(item)) {
        stats[item] += Number(val)
    }

    localStorage.setItem("stats", JSON.stringify(stats))
}

function remove(item,val){
    let stats = get("stats")

    if (stats.hasOwnProperty(item)) {
        stats[item] -= Number(val)
    }

    localStorage.setItem("stats", JSON.stringify(stats))
}

start()

setInterval(() => {
    let stats = get("stats")

    document.getElementById("myCakes").innerText = Number(stats.cakes).toFixed(0)
    document.getElementById("myEarnings").innerText = Number(stats.earnings).toFixed(1)
    document.getElementById("myDemands").innerText = Number(stats.demands).toFixed(1)
    document.getElementById("myWorkers").innerText = Number(stats.workers).toFixed(0)
    document.getElementById("myPrice").innerText = Number(stats.price).toFixed(1)
    document.getElementById("myBuyers").innerText = Number(stats.buyers).toFixed(0)

    let demand = calculateDemand(100, 10, Number(stats.price))
    let potentialBuyers = Math.floor(Math.random() * (demand + 1));
    let actualBuyers = Math.min(potentialBuyers, stats.cakes);

    if(Number(stats.workers) > 0){
        add("cakes", Number(stats.workers))
    }

    if(demand > 10){
        set("demands",demand)
        if(Number(stats.cakes) > Number(stats.buyers))
        {
            add("buyers",actualBuyers)
            add("earnings",actualBuyers * Number(stats.price))
        }
        else{
            remove("buyers",actualBuyers)
            remove("cakes",actualBuyers)
            remove("earnings",Number(stats.price))
        }
    }
    else{
        set("buyers",0)
        remove("earnings",Number(stats.price))
    }

}, 100);

function calculateDemand(a, b, P){
    return a - b * P
}

function lower(){
    let stats = get("stats")

    if(Number(stats.price) > 0.2){
        remove("price",0.1)
    }
}

function raise(){
    add("price",0.1)
}

document.getElementById("lower").addEventListener("click",() =>{
    lower()
})

document.getElementById("raise").addEventListener("click",() =>{
    raise()
})

document.getElementById("RESET").addEventListener("click",() =>{
    localStorage.removeItem("stats")
})

document.getElementById("addWorker").addEventListener("click",() =>{
    let stats = get("stats")

    if(Number(stats.earnings) > 10000){
        add("workers",1)
        remove("earnings",10000)
        document.getElementById("system").innerHTML = "<p>+1 Worker</p>"
    }
})

//Fun Stuff
let messages = [
    "Your business burned down, all your workers died.",
    "All your workers are sick, and had to quit their job."
]

setInterval(() =>{
    let randomIndex = Math.floor(Math.random() * messages.length)
    let randomMessage = messages[randomIndex]

    document.getElementById("system").innerHTML += "<p>" + randomMessage + "</p>"
    set("workers",0)
    set("cakes",0)
},600000)

document.getElementById("system").innerHTML = "<p>Welcome, sell your cakes! =)</p>"