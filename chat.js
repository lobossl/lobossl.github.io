/*
     chat.js
*/
let adr = "wss://ws.chatlinkup.com"
let ws = new WebSocket(adr)

ws.onopen = (e) =>{
     //
}

ws.onmessage = (e) =>{
	let parseData = JSON.parse(e.data)

     if(parseData.action === "users"){
          document.getElementById("users").innerText = ""

          parseData.list.forEach((client) =>{
               let newDiv = document.createElement("div")

               newDiv.innerText = "id: " + client
               newDiv.id = "onlineUsers"

               document.getElementById("clients").innerText = "Klienter: (" + parseData.clients + ")"

               document.getElementById("users").append(newDiv)

               newDiv.addEventListener("click",() =>{
                    console.log(client)
               })
          })
     }
     else if(parseData.action === "chatMessage"){
          let newDiv = document.createElement("div")

          newDiv.innerText = parseData.id + ":" + parseData.message
          newDiv.id = "theMessage"
     
          document.getElementById("chat").append(newDiv)
     
          document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight 
     }
}

ws.onerror = (e) =>{
	location.reload()
}

ws.onclose = (e) =>{
	location.reload()
}

document.getElementById("buttonChat").addEventListener("click",() =>{
     ws.send(JSON.stringify({
          message: document.getElementById("textArea").value
     }))

     document.getElementById("textArea").value = ""
})

document.getElementById("textArea").addEventListener("keyup",(e) =>{
     if(e.key === "Enter"){
          ws.send(JSON.stringify({
               message: document.getElementById("textArea").value
          }))
     
          document.getElementById("textArea").value = ""
     }
})
