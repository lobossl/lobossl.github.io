// DOM
const start = document.getElementById("start")
const stop = document.getElementById("stop")
const pause = document.getElementById("pause")
const resume = document.getElementById("resume")
const player = document.getElementById("player")
const stat = document.getElementById("status")
const timer = document.getElementById("timer")

//SETTINGS
let stream = null
let chunks = []
let recorder = null
let counter = 0
let counterActive = false
let secure = true

// START
start.addEventListener("click", async () =>
{
    try
    {
        if(secure)
        {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    
            recorder = new MediaRecorder(stream)
    
            recorder.ondataavailable = (event) =>
            {
                chunks.push(event.data)
            }
    
            recorder.start()
            secure = false
            counterActive = true
            chunks = []
            player.innerText = ""
            stat.innerText = "Started"
            stat.style.color = "green"
        }
    }
    catch(err)
    {
        return false
    }
})

// STOP
stop.addEventListener("click", async () =>
{
    try
    {
        recorder.stop()
        secure = true
        counter = 0
        counterActive = false
        stat.innerText = "Stopped"
        stat.style.color = "red"

        recorder.onstop = async function ()
        {
            const bob = new Blob(chunks, { type: "audio/wav" })

            let createPlayer = document.createElement("audio")
            let downloadLink = document.createElement("a")

            createPlayer.src = URL.createObjectURL(bob)
            createPlayer.type = bob.type
            createPlayer.controls = true

            downloadLink.href = createPlayer.src
            downloadLink.download = "soundFile.wav"
            downloadLink.click()

            player.appendChild(createPlayer)
            player.appendChild(downloadLink)
        }
    }
    catch(err)
    {
        return false
    }
})

// PAUSE
pause.addEventListener("click", async () =>
{
    try
    {
        recorder.pause()
        counterActive = false
        stat.innerText = "Paused"
        stat.style.color = "orange"
    }
    catch(err)
    {
        return false
    }
})

// RESUME
resume.addEventListener("click", async () =>
{
    try
    {
        recorder.resume()
        counterActive = true
        stat.innerText = "Resumed"
        stat.style.color = "green"
    }
    catch(err)
    {
        return false
    }
})

setInterval(() =>
{
    if(counterActive)
    {
        timer.innerText = "Live for " + counter + " second(s)."
        counter++
    }
},1000)