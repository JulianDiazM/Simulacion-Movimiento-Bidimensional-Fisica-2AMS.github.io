//Elementos HTML a JS
const canvas = document.querySelector(".mcu-canvas"); //Elemento canvas
const ctx = canvas.getContext("2d");

//Definición del tamaño del canvas en escala 1:1
canvas.height = 400;
canvas.width = canvas.height; //Escala 1:1

//Función que dibuja un circulo con relleno usando .fill()
const dibujarCirculoRelleno = (x, y, radio, startAngle, endAngle, color) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radio, startAngle, endAngle, true);
    ctx.fill();
    ctx.closePath();
}

//Función que dibuja un circulo sin relleno usando .stroke()
const dibujarCirculoSinRelleno = (x, y, radio, startAngle, endAngle, color) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(x, y, radio, startAngle, endAngle, true);
    ctx.stroke();
    ctx.closePath();
}

//Función que dibuja una recta
const dibujarRecta = (Xi, Yi, Xf, Yf, color) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(Xi, Yi);
    ctx.lineTo(Xf, Yf);
    ctx.stroke();
    ctx.closePath();
}

let endAngle = 0; //Angulo que crece con el paso del tiempo.
let radio = 100; //Radio del pendulo
let object_x = 0; //Posición en x, usada para pintar posteriormente el objeto amarrado al pendulo
let object_y = 0; //Posición en y, usada para pintar posteriormente el objeto amarrado al pendulo
let canvas_x_center = canvas.width / 2; 
let canvas_y_center = canvas.height / 2; //coordenadas (x, y) que son el centro del MCU


//Función que grafica el pendulo con el objeto amarrado y la trayectoria del angulo
const pendulo = () => {
    if(endAngle >= Math.PI * -2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //Reinicio del canvas
        let x = Math.cos(endAngle) * radio;
        let y = Math.sin(endAngle) * radio;
        object_x = canvas_x_center + x;
        object_y = canvas_y_center + y;
        dibujarRecta(canvas_x_center, canvas_y_center, object_x, object_y, "#000");
        dibujarCirculoRelleno(object_x, object_y, 5, 0, Math.PI * 2, "#000");
        dibujarCirculoSinRelleno(canvas_x_center, canvas_y_center, radio, 0, endAngle, "#000");
        endAngle -= Math.PI / 180;
    }
}

setInterval(pendulo, 20);