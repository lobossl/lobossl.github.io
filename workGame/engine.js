/* system board */
let divSystem = document.getElementById("divSystem")
/* buttons */
let btnRaise = document.getElementById("btnRaise")
let btnLower = document.getElementById("btnLower")
let btnReset = document.getElementById("btnReset")
let btnWorker = document.getElementById("btnWorker")
/* div display */
let divPrice = document.getElementById("divPrice")
let divGoods = document.getElementById("divGoods")
let divEarnings = document.getElementById("divEarnings")
let divWorkers = document.getElementById("divWorkers")
let divDemands = document.getElementById("divDemands")
let divBuyers = document.getElementById("divBuyers")
let divTotal = document.getElementById("divTotal")
/* localStorage key */
let KEY = "stats"
/* update speed */
setInterval(game,100)
/* Clicks */
btnWorker.addEventListener("click",() =>{
    divSystem.innerText = "You bought +1 worker."
    add("workers",1)
    remove("earnings",10000)
})
btnLower.addEventListener("click",() =>{
    let stats = get(KEY)

    if(Number(stats.price >= 0.10)){
        divSystem.innerText = "You lowered the price of the product"
        remove("price",0.1)
    }
})
btnRaise.addEventListener("click",() =>{
    divSystem.innerText = "You raised the price of the product."
    add("price",0.1)
})
btnReset.addEventListener("click",() =>{
    reset()
})
/* the logic behind the game */
function game(){
    let stats = get(KEY)

    //calculer demand
    let calculateDemand = 100 - (stats.price * 100)
    //Force fra 0 til 100
    calculateDemand = Math.max(0, Math.min(100, calculateDemand))

    //create random buyers
    let randomBuyers = Math.floor(Math.random() * (stats.goods) + 1)

    //set demand all the time
    set("demands",calculateDemand)

    //make goods if you have workers
    if(Number(stats.workers) > 0){
        add("goods",Number(stats.workers))
    }

    //if goods are higher > buyers do this
    if(Number(stats.goods) > Number(stats.buyers)){
        if(calculateDemand >= 10){
            add("total",randomBuyers)
            add("buyers",randomBuyers)
            remove("goods",randomBuyers)
            set("buyers",randomBuyers) //
            set("goods",randomBuyers) //
            add("earnings",randomBuyers * Number(stats.price))
        }
        else if(calculateDemand <= 1){
            //fix later
            remove("earnings",Number(stats.price))
            set("buyers",0)
        }
    }

    //display live stats to divs
    display(stats)
}
/* localStorage */
function start(){
    db = {
        price: 0.0,
        goods: 0.0,
        earnings: 0.0,
        workers: 1.0,
        demands: 0.0,
        buyers: 0.0,
        total: 0.0
    }

    if(!get(KEY)){
        localStorage.setItem(KEY,JSON.stringify(db))
    }
}
function get(item){
    let get = JSON.parse(localStorage.getItem(item))

    return get
}
function set(item,val){
    let stats = get(KEY)

    if (stats.hasOwnProperty(item)) {
        stats[item] = val
    }

    localStorage.setItem(KEY, JSON.stringify(stats))
}
function add(item,val){
    let stats = get(KEY)

    if (stats.hasOwnProperty(item)) {
        stats[item] += val
    }

    localStorage.setItem(KEY, JSON.stringify(stats))
}
function remove(item,val){
    let stats = get(KEY)

    if (stats.hasOwnProperty(item)) {
        stats[item] -= val
    }

    localStorage.setItem(KEY, JSON.stringify(stats))
}
function reset(){
    localStorage.removeItem(KEY)
    location.reload()
}
function display(stats){
    /* Output Live Data */
    divPrice.innerText = "Product Price: " + stats.price.toFixed(2) + "$"
    divGoods.innerText = "Goods: " + stats.goods.toFixed(0)
    divEarnings.innerText = "Earnings: " + stats.earnings.toFixed(2) + "$"
    divWorkers.innerText = "Workers: " + stats.workers.toFixed(0)
    divDemands.innerText = "Public Demands: " + stats.demands.toFixed(0) + "%"
    divBuyers.innerText = "Buyers: " + stats.buyers.toFixed(0)
    divTotal.innerText = "Total Items Sold: " + stats.total.toFixed(0)
}
/* Create localStorage  database setup */
start()