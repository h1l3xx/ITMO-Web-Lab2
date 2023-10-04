class Canvas {
    size = 400;

    constructor() {
        this.canvas = document.getElementById("graph");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = `20px Arial`
    }

    drawWithDot(x, y, r){


        const xRegular = (x - 200)/(r*40)

        const yRegular = (y - 200)*(-1)/(r*40)

        console.log(xRegular, yRegular);

        this.drawDot(xRegular ,yRegular, r)
    }

    drawGraph(r){

        const radius = r * 40

        this.ctx.beginPath();

        this.ctx.strokeStyle = "#FFFFFF";
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.roundRect(0, 0, this.size, this.size, 40);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();

        //Сетка
        const scaleX = 40;
        const scaleY = 40;

        this.ctx.font = `${Math.round(scaleX/2.5)}px Arial`;
        this.ctx.textAlign = 'left';
        this.ctx.baseLine = 'top';

        this.ctx.beginPath();
        this.ctx.strokeStyle = '#C0C0C0';

        for (let i = 40; i <= this.size-40; i = i + scaleX) {
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.size);
        }

        for (let i = 40; i <= this.size-40; i = i + scaleY) {
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.size, i);
        }
        this.ctx.stroke();
        this.ctx.closePath();

        //Ось X, ось Y

        const xAxis = Math.round(this.size / scaleX / 2) * scaleX;
        const yAxis = Math.round(this.size / scaleY /2) * scaleY;

        this.ctx.strokeStyle = '#000000'
        this.ctx.fillStyle = '#00BFFF'



        //Треугольник
        this.ctx.moveTo(this.size/2, this.size/2);
        this.ctx.lineTo(this.size/2 + radius/2, this.size/2);
        this.ctx.lineTo(this.size/2, this.size/2 + radius/2);
        this.ctx.fill();

        this.ctx.closePath();
        //Четверть круга
        this.ctx.arc(this.size/2, this.size/2, radius, -Math.PI/2, 0, false);
        this.ctx.fill();

        this.ctx.closePath();


        //Прямоугольник
        this.ctx.beginPath();

        this.ctx.fillRect(this.size/2, this.size/2, -radius, radius/2);

        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(xAxis, 0);
        this.ctx.lineTo(xAxis, this.size);

        this.ctx.moveTo(0, yAxis);
        this.ctx.lineTo(this.size, yAxis);

        this.ctx.stroke();
        this.ctx.closePath();


        //Разметка R и "точек" по оси X
        this.ctx.fillStyle = '#000000'

        this.ctx.beginPath();

        //Точка (0,0)

        this.ctx.fillRect(198, 198, 4, 4)

        // Обозначение оси X
        this.ctx.fillText('X', 380, 220);

        // R
        this.ctx.fillText('4', 365, 220);
        this.ctx.fillRect(360, 195, 2, 10);

        // R/2
        this.ctx.fillText('2', 285, 220);
        this.ctx.fillRect(280, 195, 2, 10);

        // -R
        this.ctx.fillText('-4', 55, 220);
        this.ctx.fillRect(40, 195, 2, 10);

        // -R/2
        this.ctx.fillText('-2', 125, 220);
        this.ctx.fillRect(120, 195, 2, 10);

        this.ctx.closePath();

        //Разметка R и "точек" по оси Y

        this.ctx.beginPath();
        // Обозначение оси Y
        this.ctx.fillText('Y', 210, 20);

        // R
        this.ctx.fillText('4', 215, 55);
        this.ctx.fillRect(195,40, 10, 2);

        // R/2
        this.ctx.fillText('2', 215, 120);
        this.ctx.fillRect(195,120, 10, 2);

        // -R/2
        this.ctx.fillText('-2', 215, 290);
        this.ctx.fillRect(195,280, 10, 2);

        // -R
        this.ctx.fillText('-4', 215, 370);
        this.ctx.fillRect(195,360, 10, 2);

        this.ctx.closePath();
    }
    drawDot(x, y, r){


        this.ctx.fillStyle = '#696969'

        this.ctx.arc(200 + (x * r * 40), 200- (y * r * 40), 4, 0, 2*Math.PI, false);
        this.ctx.fill();

        this.ctx.fillStyle = '#000000'

        this.ctx.fillText(`(${x.toFixed(3)}; ${y.toFixed(3)})`, 210 + (x * r * 40), 195 - (y * r * 40));

        this.ctx.closePath();
    }
}

window.onload = function () {
    let canvas = new Canvas();

    let dots = []

    console.log(dots.length)

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
        }
    }

    document.getElementById('clearButton').onclick = function (){
        if (dots.length !== 0){
            const r = dots[0].r
            dots = []
            canvas.drawGraph(r)
        }
    }

    document.getElementById('checkButton').onclick = function (){
        if (dots.length !== 0){
            console.log(dots)
            //Отправляем на сервак
        }else {
            if (validateY() && validateX() && validateR()) {
                console.log(document.querySelectorAll('input[type="checkbox"]:checked'))
                let x = [];
                document.querySelectorAll('input[type="checkbox"]:checked').forEach(el => x.push(el.value))
                let y = document.getElementById("Y_input").value.replace(',', '.');
                let r = document.getElementById("R_input").value.replace(',', '.');
                //Отправляем на сервак
            }
        }
    }
    canv.addEventListener("click", ev => {
        const x = ev.offsetX;
        const y = ev.offsetY;
        const r = document.getElementById("R_input").value.replace(',', '.')

        if (validateR(r)){
            canvas.drawWithDot(x, y , r)
            dots.push(new Dot(x, y, r, "gray"))
        }
    })
};

class Dot {
    constructor(x, y, r, color) {
        this.x = x
        this.y = y
        this.r = r
        this.color = color
    }
}
function validateX(){
    let checkboxes = document.querySelectorAll('input[type=checkbox]')
    for (let checkbox of checkboxes){
        if(checkbox.checked){
            return true;
        }
    }
    checkboxes[4].setCustomValidity("Выберите значение.");
    checkboxes[4].reportValidity();

    return false;
}

function validateY() {
    let value = document.getElementById("Y_input");
    let y = value.value.replace(',', '.');
    if (!checkNum(y) || parseFloat(y) > 3 || parseFloat(y) < -5) {


        value.setCustomValidity("Указанное значение должно быть между -5 и 3.");

        value.reportValidity();


        return false;
    } else {
        value.setCustomValidity("");
        value.reportValidity();

        return true;
    }

}
function validateR() {
    let value = document.getElementById("R_input");
    let r = value.value.replace(',', '.');
    if (!checkNum(r) || parseFloat(r) < 1 || parseFloat(r) > 4) {


        value.setCustomValidity("Указанное значение должно быть между 1 и 4.");

        value.reportValidity();


        return false;
    } else {
        value.setCustomValidity("");
        value.reportValidity();

        return true;
    }

}

function checkNum(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
