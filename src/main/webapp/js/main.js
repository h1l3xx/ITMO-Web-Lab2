let canvas = new Canvas();
let dots = []
window.onload = function () {

    const check = document.getElementById('checkButton');

    let type = "values"
    let dot = new Dot(0, 0,0, 0)

    canvas.drawGraph(4);

    const canv = document.querySelector('canvas')

    let y_button = document.getElementById("Y_input");
    y_button.addEventListener("input", validateY);
    y_button.addEventListener("focus", validateY);

    let r_button = document.getElementById("R_input");
    r_button.addEventListener("input", validateR);
    r_button.addEventListener("focus", validateR);


    document.getElementById("R_input").onchange = function () {
        const r = document.getElementById("R_input").value.replace(',', '.')
        if (validateR(r)){
            canvas.drawGraph(r)
            canvas.reDrawDots()
        }
    }

    document.getElementById('clearButton').onclick = function (){
        const r = document.getElementById("R_input").value.replace(',', '.')
        canvas.drawGraph(r)
        dots = []
    }

    check.onclick = function (){
        if (type === "click"){
            type = "values"
            let x = (dot.x - 200)/(40)
            let y = (dot.y - 200)*(-1)/(40)
            let data = { X : x, Y : y, R : dot.r};
            send(data)
        }else{
            if (validateY() && validateR()) {
                let x = document.querySelector('input[type="radio"]:checked').value;
                let y = document.getElementById("Y_input").value.replace(',', '.');
                let r = document.getElementById("R_input").value.replace(',', '.');

                let data = { X : x, Y : y, R : r};

                send(data)
                clockOnElement()
            }
        }

    }
    canv.addEventListener("click", ev => {
        const x = ev.offsetX;
        const y = ev.offsetY;
        const r = document.getElementById("R_input").value.replace(',', '.')

        if (validateR(r)){
            dot = new Dot(x, y, r, "gray");
            type = "click"
            check.click()
            clockOnElement()
        }
    })
};

function send(data) {
    axios('/controller', {method: "post", headers: { "Content-Type": "application/x-www-form-urlencoded" }, data: data})
        .then(function (response) {
            const responseData = response.data.split(" ")
            canvas.drawDot(
                parseFloat(responseData[0]),
                parseFloat(responseData[1]),
                parseFloat(responseData[2]),
                responseData[3]
            )
            dots.push(new Dot(
                parseFloat(responseData[0]),
                parseFloat(responseData[1]),
                parseFloat(responseData[2]),
                responseData[3]
            ))
        })
        .catch(function (error) {
            console.log(error);
        });

}
function clockOnElement(){
    let element = document.createElement("a");
    let a = document.documentElement.appendChild(element)
    a.href = `/controller/check`;
    a.target = '_self';
    setTimeout(() => {
        a.click();
    }, 400);
}