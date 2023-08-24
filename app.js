function run()
{
    let html = document.getElementById("html").value
    let css = document.getElementById("css").value
    let js = document.getElementById("js").value
    let output = document.getElementById("output")

    output.contentDocument.body.innerHTML = html + "<style>" + css + "</style>"
    output.contentWindow.eval(js)
}