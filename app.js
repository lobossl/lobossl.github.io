/*
    Copyrights LoboSSL 2024
*/

let currentTime = Date.now()

let connect = document.getElementById("connect");
let chatWindow = document.getElementById("chatWindow");
let chatInput = document.getElementById("chatInput");
let subWindow = document.getElementById("subWindow")

chatWindow.style.display = "none"
subWindow.style.display = "none"

let server = "wss://irc-ws.chat.twitch.tv:443";
let socket;
let pause = false;
let showPopupBox = false;

//pause
chatWindow.addEventListener("mouseover",() =>{
    pause = true
})
chatWindow.addEventListener("mouseleave",() =>{
    pause = false
})

connect.addEventListener("click",() =>{
    let streamer = document.getElementById("newStreamer").value;
    let auth = document.getElementById("newAuth").value;
    connectWebSocket(streamer, auth);
    document.getElementById("login").style.display = "none"
    chatWindow.style.display = "flex"
    subWindow.style.display = "flex"
});

function connectWebSocket(streamer,auth){
    socket = new WebSocket(server);
    
    socket.addEventListener("open",() =>{
        console.log("Connected");
        socket.send(`PASS ${auth}`);
        socket.send(`NICK ${streamer}`);
        socket.send(`CAP REQ :twitch.tv/tags`);
        socket.send(`CAP REQ :twitch.tv/membership`);
        socket.send(`CAP REQ :twitch.tv/commands`);
        socket.send(`JOIN #${streamer}`);
    });

    socket.addEventListener("message",(e) =>{
        let data = e.data;

        //https://dev.twitch.tv/docs/chat/irc/#privmsg-tags

        if(data[0] === "@"){
                if(data.includes("PRIVMSG")){
                    /*
                        @badge-info=<badge-info>;badges=<badges>;bits=<bits>client-nonce=<nonce>;color=<color>;display-name=<display-name>;emotes=<emotes>;first-msg=<first-msg>;flags=<flags>;id=<msg-id>;mod=<mod>;room-id=<room-id>;subscriber=<subscriber>;tmi-sent-ts=<timestamp>;turbo=<turbo>;user-id=<user-id>;user-type=<user-type>;reply-parent-msg-id=<reply-parent-msg-id>;reply-parent-user-id=<reply-parent-user-id>;reply-parent-user-login=<reply-parent-user-login>;reply-parent-display-name=<reply-parent-display-name>;reply-parent-msg-body=<reply-parent-msg-body>;reply-thread-parent-msg-id=<reply-thread-parent-msg-id>;reply-thread-parent-user-login=<reply-thread-parent-user-login>;vip=<vip>

                        - Sent when a user sends a chat message to a chatroom your bot has joined.
                    */
                    let badges = []

                    if(data.includes("mod=1")){
                        badges.push("MOD")
                    }
                    else if(data.includes("vip=1")){
                        badges.push("VIP")
                    }
                    if(data.includes("subscriber=1")){
                        badges.push("SUB")
                    }
                    else if(data.includes("subscriber=0")){
                        badges.push("PLEB")
                    }
                    else{
                        return null
                    }

                    readyUpMessage(data,badges)
                }
                else if(data.includes("USERNOTICE")){
                    /*
                        @badge-info=<badge-info>;badges=<badges>;color=<color>;display-name=<display-name>;emotes=<emotes>;id=<id-of-msg>;login=<user>;mod=<mod>;msg-id=<msg-id>;room-id=<room-id>;subscriber=<subscriber>;system-msg=<system-msg>;tmi-sent-ts=<timestamp>;turbo=<turbo>;user-id=<user-id>;user-type=<user-type>

                        - A user subscribes to the channel, re-subscribes to the channel. or gifts a subscription to another user.
                        - Another broadcaster raids the channel.
                        - A viewer milestone is celebrated, such as a new viewer chatting for the first time.

                    */
                    if(data.includes("msg-id=")){
                        userNotice(data,"id")
                    }
                    else{
                        return null
                    }
                }
                else{
                    return null
                }
        }

        if(data.includes("PING")){
            socket.send("PONG");
        }
    });

    socket.addEventListener("close",() =>{
        console.log("Connection closed!");
        setTimeout(() => connectWebSocket(streamer, auth), 5000);
    });

    socket.addEventListener("error",() =>{
        console.log("Connection error!!!");
        setTimeout(() => connectWebSocket(streamer, auth), 5000);
    });
}

function userNotice(data,info){
    try{
        let username = data.split("display-name=")[1].split(";")[0]
        let type = data.split("msg-id=")[1].split(";")[0]
        let months = data.split("info=")[1].split("/")[1].split(";")[0]
    
        appendSubs(username,type,months)
    }
    catch(err){
        return null
    }
}

function readyUpMessage(data,info){
    try{
        let username = data.split("display-name=")[1].split(";")[0]
        let color = data.split("color=")[1].split(";")[0]
        let channel = "#" + document.getElementById("newStreamer").value
        let message = data.split("PRIVMSG")[1]

        message = message.substring(message.indexOf(":") + 1)
    
        if(message.length > 0){
            appendMessage(channel, username, message, color, info)
        }
    }
    catch(err){
        return null
    }
}

function appendSubs(username,type,months){
    let messageDiv = document.createElement("div");

    if(months){
        messageDiv.innerText = username + " " + type + " " + months
    }
    else{
        messageDiv.innerText = username + " " + type
    }

    subWindow.append(messageDiv)

    subWindow.scrollTop = subWindow.scrollHeight
}

function appendMessage(channel, username, message, color, info) {
    if(color === "#FFFFFF"){
        color = "#000000"
    }

    let messageDiv = document.createElement("div");

    let infoDiv = document.createElement("div");
    let channelDiv = document.createElement("div");
    let timerDiv = document.createElement("div");
    let userDiv = document.createElement("div");
    let msgDiv = document.createElement("div");

    let dateTime = Math.floor((Date.now() - currentTime) / 1000)

    currentTime = Date.now()

    infoDiv.innerText += `${info}`;
    infoDiv.id = "info"

    channelDiv.innerText = `Streamer: ${channel}`;
    channelDiv.id = "channel"
    
    timerDiv.innerText = `${dateTime} second(s) ago..`;
    timerDiv.id = "timer"

    userDiv.innerText = username.toUpperCase();
    userDiv.id = "username"
    userDiv.style.color = color

    msgDiv.innerText = message;
    msgDiv.id = "message"

    messageDiv.append(infoDiv);
    messageDiv.append(channelDiv);
    messageDiv.append(timerDiv);
    messageDiv.append(userDiv);
    messageDiv.append(msgDiv);

    chatWindow.append(messageDiv);

    if(!pause){
        chatWindow.scrollTop = chatWindow.scrollHeight
    }

    if(message.includes(document.getElementById("newStreamer").value)){
        msgDiv.style.color = "#FF0000"
    }

    messageDiv.addEventListener("click",(e) =>{
        console.log(username)
    })
}