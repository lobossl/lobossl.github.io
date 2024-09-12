let connect = document.getElementById("connect");
let chatWindow = document.getElementById("chatWindow");
let modToolsPopup = document.getElementById("modToolsPopup");
let closeModToolsPopup = document.getElementById("closeModToolsPopup");
let chatInput = document.getElementById("chatInput");
let openModTools = document.getElementById("openModTools");
let banUser = document.getElementById("banUser");
let timeoutUser = document.getElementById("timeoutUser");

let server = "wss://irc-ws.chat.twitch.tv:443";
let socket;
let pause = false;
let setUsername = false;

connect.addEventListener("click", () => {
    let streamer = document.getElementById("newStreamer").value;
    let auth = document.getElementById("newAuth").value;
    connectWebSocket(streamer, auth);
    document.getElementById("login").style.display = "none"
});

function connectWebSocket(streamer, auth) {
    socket = new WebSocket(server);
    
    socket.addEventListener("open", () => {
        console.log("Connected");
        socket.send(`PASS ${auth}\r\n`);
        socket.send(`NICK ${streamer}\r\n`);
        socket.send(`JOIN #${streamer}\r\n`);
    });

    socket.addEventListener("message", (e) => {
        let data = e.data;
    
        // Split the data by spaces and handle different parts of the message!
        let parts = data.split(" ");
    
        // Check if the message type is PRIVMSG!
        if (parts[1] === "PRIVMSG") {
            // Extract the username, channel, and message content!
            let username = parts[0].split(":")[1].split("!")[0];
            let channel = parts[2];
            
            // Join the remaining parts of the message (from the 4th part onward) to handle spaces and URLs properly!
            let message = parts.slice(3).join(" ").replace(/^:/, '');
    
            // Append the message to the chat window!
            appendMessage(channel, username, message);
        }
    });

    socket.addEventListener("close", () => {
        console.log("Connection closed");
        setTimeout(() => connectWebSocket(streamer, auth), 5000);
    });

    socket.addEventListener("error", () => {
        console.log("Connection error");
        setTimeout(() => connectWebSocket(streamer, auth), 5000);
    });
}

function appendMessage(channel, username, message) {
    let messageDiv = document.createElement("div");

    let timerDiv = document.createElement("div");
    let userDiv = document.createElement("div");
    let msgDiv = document.createElement("div");

    let now = new Date();
    let datetime = now.toLocaleString();
    
    timerDiv.innerText = `[${channel}] - ${datetime}`;
    timerDiv.id = "timer"

    userDiv.innerText = username.toUpperCase();
    userDiv.id = "username"

    msgDiv.innerText = "\n" + message;
    msgDiv.id = "message"

    messageDiv.append(timerDiv);
    messageDiv.append(userDiv);
    messageDiv.append(msgDiv);

    chatWindow.append(messageDiv);

    if(message.includes(document.getElementById("newStreamer").value)){
        msgDiv.style.color = "#ff0000"
        msgDiv.style.opacity = "1.0"
    }

    if(!pause){
        chatWindow.scrollTop = chatWindow.scrollHeight
    }

    messageDiv.addEventListener("click",() =>{
        setUsername = username
        modToolsPopup.style.display = "flex";
    })
}

chatWindow.addEventListener("dblclick",() =>{
    if(pause){
        pause = false
    }
    else{
        pause = true
    }
})

closeModToolsPopup.addEventListener("click", () => {
    modToolsPopup.style.display = "none";
});

chatInput.addEventListener("keyup", (e) => {
    if(setUsername){
        if (e.key === "Enter") {
            let message = chatInput.value;
            socket.send(`PRIVMSG #${document.getElementById("newStreamer").value} :@${setUsername} ${message}\r\n`);
            chatInput.value = "";
        }
    }
});

banUser.addEventListener("click", (e) => {
    if(setUsername){
        socket.send(`PRIVMSG #${document.getElementById("newStreamer").value} :/ban ${setUsername} banned\r\n`);
    }
});

timeoutUser.addEventListener("click", (e) => {
    if(setUsername){
        socket.send(`PRIVMSG #${document.getElementById("newStreamer").value} :/timeout ${setUsername} 600 timeout\r\n`);
    }
});