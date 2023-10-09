
class Canvas {
    size = 400;
    red = "#FF0000"
    gray = "#696969"
    green = "#19ff19"

    constructor() {
        this.canvas = document.getElementById("graph");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = `20px Arial`
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
    drawDot(x, y, r, color){
        switch (color){
            case "red" :
                this.drawRed(x, y)
                break;
            case "gray" :
                this.drawGrey(x, y)
                break;
            case "green" :
                this.drawGreen(x, y)
                break;
        }

        this.ctx.beginPath();

        this.ctx.fillStyle = '#000000'

        this.ctx.fillText(`(${x.toFixed(3)}; ${y.toFixed(3)}; ${r})`, 210 + (x * 40), 195 - (y * 40));

        this.ctx.closePath();
    }
    drawRed(x, y){
        this.ctx.fillStyle = "#FF0000"
        this.ctx.beginPath();
        this.ctx.arc(200 + (x * 40), 200- (y * 40), 4, 0, 2*Math.PI, false);
        this.ctx.fill();
        this.ctx.closePath()
    }
    drawGreen(x, y){
        this.ctx.fillStyle = "#19ff19"
        this.ctx.beginPath();
        this.ctx.arc(200 + (x * 40), 200- (y * 40), 4, 0, 2*Math.PI, false);
        this.ctx.fill();
        this.ctx.closePath()
    }
    drawGrey(x, y){
        this.ctx.fillStyle = "#696969"
        this.ctx.beginPath();
        this.ctx.arc(200 + (x * 40), 200- (y * 40), 4, 0, 2*Math.PI, false);
        this.ctx.fill();
        this.ctx.closePath()
    }
    reDrawDots(){
        for (let i = 0; i < dots.length; i++){
            this.drawDot(dots[i].x, dots[i].y, dots[i].r, dots[i].color)
        }
    }
}
