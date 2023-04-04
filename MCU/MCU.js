//Elementos HTML a JS
const canvas = document.querySelector(".mcu-canvas"); //Elemento canvas
const ctx = canvas.getContext("2d");
const coord_x = document.querySelector(".X");
const coord_y = document.querySelector(".Y");

//Definición del tamaño del canvas en escala 1:1
canvas.height = 400;
canvas.width = canvas.height; //Escala 1:1

canvas.addEventListener("mousemove", (event) => {
    let x = event.offsetX;
    let y = event.offsetY;
    coord_x.innerHTML = `X: ${x}`;
    coord_y.innerHTML = `Y: ${y}`;
});