//Elementos HTML a JS
const canvas = document.querySelector(".mcu-canvas"); //Elemento canvas donde se dibujaria la trayectoria circular
const ctx = canvas.getContext("2d");
const coord_x = document.querySelector(".X");
const coord_y = document.querySelector(".Y");

//Definición del tamaño del canvas en escala 1:1
canvas.height = 400;
canvas.width = canvas.height; //Escala 1:1

let x = 0;
let y = 0;
let imaginary_x = 0;
let imaginary_y = 0;


const dibujarCirculoRelleno = (x, y, radio, startAngle, endAngle, color) => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radio, startAngle, endAngle, true);
    ctx.fill();
    ctx.closePath();
}

canvas.addEventListener("mousemove", (event) => {
    x = event.offsetX;
    y = event.offsetY;
    coord_x.innerHTML = `X: ${x}`;
    coord_y.innerHTML = `Y: ${y}`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (y > (canvas.height / 2)){
        imaginary_x = x - 30;
        imaginary_y = y + 30;
    } else {
        imaginary_x = x + 30;
        imaginary_y = y - 30;
    }

    dibujarCirculoRelleno(imaginary_x, imaginary_y, 10, 0, Math.PI * 2, "#37c83768");
});