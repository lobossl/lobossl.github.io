/*
     chat.js
*/
let adr = "wss://ws.chatlinkup.com"
let ws = new WebSocket(adr) || null

ws.onopen = () =>{
     console.log("Connection ready..")
}

ws.onmessage = (e) =>{
     try{
          let parseData = JSON.parse(e.data)

          if(parseData.action === "users"){
               document.getElementById("users").innerText = ""
     
               parseData.list.forEach((client) =>{
                    let newDiv = document.createElement("div")
     
                    newDiv.innerText = client
                    newDiv.id = "onlineUsers"
     
                    document.getElementById("clients").innerText = "Online: (" + parseData.clients + ")"
     
                    document.getElementById("users").append(newDiv)
     
                    newDiv.addEventListener("click",() =>{
                         ws.send(JSON.stringify({
                              action: "request",
                              id: client
                         }))
                    })
               })
          }
          else if(parseData.action === "chatMessage"){
               let newDiv = document.createElement("div")
     
               if(parseData.id === "Server"){
                    newDiv.style.color = "#FF0000"
               }
     
               if(parseData.admin === true){
                    newDiv.innerText = `@${parseData.id} ${parseData.message}`
               }
               else{
                    newDiv.innerText = `${parseData.id} ${parseData.message}`
               }
     
               newDiv.id = "theMessage"
          
               document.getElementById("chat").append(newDiv)
          
               document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight 
          }
     }
     catch(err){
          return null
     }
}

ws.onerror = () =>{
	document.getElementById("theMessage").innerText = "ERROR"
}

ws.onclose = () =>{
	document.getElementById("theMessage").innerText = "CONNECTION CLOSED"
}

document.getElementById("textArea").addEventListener("keyup",(e) =>{
     if(e.key === "Enter"){
          ws.send(JSON.stringify({
               action: "message",
               message: document.getElementById("textArea").value
          }))
     
          document.getElementById("textArea").value = ""
     }
})

document.getElementById("close").addEventListener("click",() =>{
     location.reload()
})