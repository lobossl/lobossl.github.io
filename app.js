/*
    Twitch Chat Client WebSocket WSS

    https://github.com/lobossl
*/

let connect = document.getElementById("connect")
let main = document.getElementById("main")
let chatWindow = document.getElementById("chatWindow")
let chatText = document.getElementById("chatText")
let newStreamer = document.getElementById("newStreamer")
let newAuth = document.getElementById("newAuth")

let server = "wss://irc-ws.chat.twitch.tv:443"

let socket

connect.addEventListener("click",() =>{
    connectWebSocket(newStreamer.value,newAuth.value)
    newStreamer.style.display = "none"
    newAuth.style.display = "none"
    connect.style.display = "none"
})

function connectWebSocket(newStreamer,newAuth) {
    socket = new WebSocket(server)
    
    socket.addEventListener("close",() => {
        console.log("closed")
        setTimeout(() => {
            connectWebSocket()
        },5000)
    })
    
    socket.addEventListener("error",() => {
        console.log("error")
        setTimeout(() => {
            connectWebSocket()
        },5000)
    })
    
    socket.addEventListener("open",() => {
        console.log("open")
        if(newAuth){
            socket.send("PASS " + newAuth + "\r\n")
            socket.send("NICK kkjk4555555\r\n")
            socket.send("JOIN #" + newStreamer + "\r\n")
            addMessage()
        }
        else{
            socket.send("NICK justinfan3332\r\n")
            socket.send("JOIN #" + newStreamer + "\r\n")
        }
    })
    
    socket.addEventListener("message",(e) => {
        let data = e.data
        let regexData = data.split(" ")

        if(regexData[1] === "PRIVMSG"){
            let username = regexData[0].split(":")[1].split("!")[0]
            let channel = regexData[2]
            let message = data.split(":")[2]

            getMessages(channel,username,message)
        }
    })
}

function getMessages(channel,username,message){
    let chatBoxes = document.createElement("div")

    chatBoxes.id = "chatBoxes"
    chatBoxes.className = 
    chatBoxes.innerText = "[" + channel + "] " + username + ": " + message

    chatWindow.append(chatBoxes)

    chatWindow.scrollTop = chatWindow.scrollHeight

    chatBoxes.addEventListener("click",() =>{
        socket.send(`PRIVMSG #${channel} :/timeout ${username} 600 Bye.\r\n`)
    })
}

function addMessage(){
    let newMessage = document.createElement("input")

    newMessage.id = "newMessage"
    newMessage.type = "text"
    newMessage.placeholder = "Message:"

    chatTools.append(newMessage)

    newMessage.addEventListener("keyup",(e) =>{
        if(e.key === "Enter"){
            socket.send(`PRIVMSG #${newStreamer.value} :${newMessage.value}\r\n`)

            newMessage.value = ""
        }
    })
}