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
/* random strings */
let maxGoods = 100
let maxPrice = 10
let minPrice = 1
let setSpeed = 100
/* update / refresh game speed */
setInterval(game,setSpeed)
/* Clicks */
btnWorker.addEventListener("click",() =>{
    divSystem.innerText = "You bought +1 worker."
    add("workers",1)
    remove("earnings",10000)
})
btnLower.addEventListener("click",() =>{
    let stats = get(KEY)

    if(Number(stats.price > 1)){
        divSystem.innerText = "You lowered the price of the product"
        remove("price",1)
    }
})
btnRaise.addEventListener("click",() =>{
    divSystem.innerText = "You raised the price of the product."
    add("price",1)
})
btnReset.addEventListener("click",() =>{
    reset()
})
/* the logic behind the game */
function game(){
    let stats = get(KEY)

    //regn ut etterspørselen (ikke rør)
    let demand = 100 - ((Number(stats.price) - minPrice) / (maxPrice - minPrice)) * 100
    set("demands",Math.max(0, Math.min(100, demand)))

    set("buyers",(Math.round((Number(stats.demands) / 100) * Number(stats.goods))))

    add("goods",Number(stats.workers))
    remove("goods",Number(stats.buyers))
    add("earnings",Number(stats.buyers) * Number(stats.price))
    add("total",Number(stats.buyers))

    display(stats)
}
/* localStorage */
function start(){
    db = {
        price: 1,
        goods: 0,
        earnings: 0,
        workers: 1,
        demands: 0,
        buyers: 0,
        total: 0
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
    divPrice.innerText = "Product Price: " + stats.price.toFixed(0) + "$"
    divGoods.innerText = "Goods: " + stats.goods.toFixed(0)
    divEarnings.innerText = "Earnings: " + stats.earnings.toFixed(0) + "$"
    divWorkers.innerText = "Workers: " + stats.workers.toFixed(0)
    divDemands.innerText = "Demand: " + stats.demands.toFixed(0) + "%"
    divBuyers.innerText = "Buyers: " + stats.buyers.toFixed(0)
    divTotal.innerText = "Total Sold: " + stats.total.toFixed(0)
}
/* Create localStorage  database setup */
start()