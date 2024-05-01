//v1.12

let stream = null
let mediaRecorder = null
let recordedChunks = []
let isRunning = false
let speed = 1000

let myTimer = {
    a: 0,
    b: 0,
    c: 0,
    d: 0
}

let start = document.getElementById("start")
let stop = document.getElementById("stop")
let counter = document.getElementById("counter")
let stat = document.getElementById("status")

async function startMedia()
{
    try
    {
        stream = await navigator.mediaDevices.getUserMedia({audio: true})

        mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.ondataavailable = function (event)
        {
            recordedChunks.push(event.data)
        }
        
        mediaRecorder.start()

        stat.innerText = "LIVE"
        stat.style.color = "green"
    }
    catch (err)
    {
        console.log("Error start")
    }
}

async function stopMedia()
{
    try
    {
        mediaRecorder.stop()

        stat.innerText = "OFFLINE"
        stat.style.color = "red"

        mediaRecorder.onstop = async function ()
        {
            const blob = new Blob(recordedChunks, { type: "audio/wav" })

            const unixTime = Math.floor(new Date() / 1000)

            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            document.body.appendChild(a)
            a.style = "display: none"
            a.href = url
            a.download = unixTime + ".wav"
            a.click()
            window.URL.revokeObjectURL(url)

            recordedChunks = []
        }
    }
    catch (err)
    {
        console.log("Error stop")
    }
}


start.addEventListener("click",() =>
{
    myTimer.a = 0
    myTimer.b = 0
    myTimer.c = 0
    myTimer.d = 0

    startMedia()
    isRunning = true
})

stop.addEventListener("click",() =>
{
    stopMedia()
    isRunning = false
})

setInterval(() =>
{
    if(isRunning)
    {
        if(myTimer.d == 10)
        {
            myTimer.d = 0
            myTimer.c += 1
        }
        if(myTimer.c == 6)
        {
            myTimer.c = 0
            myTimer.d = 0
            myTimer.b += 1
        }
        if(myTimer.b == 10)
        {
            myTimer.b = 0
            myTimer.a += 1
        }

        counter.innerText = `${myTimer.a}${myTimer.b}:${myTimer.c}${myTimer.d}`

        myTimer.d++
    }
},speed)