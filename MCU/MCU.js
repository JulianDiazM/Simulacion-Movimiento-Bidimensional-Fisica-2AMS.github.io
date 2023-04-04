/*Elementos HTML de la sección de canvas (donde se pinta la simulación)*/
const canvas = document.querySelector(".mcu-canvas"); //Elemento canvas
const ctx = canvas.getContext("2d");

/*Elementos HTML de la sección de parámetros*/
const selector_de_parametros = document.querySelector("#selector_de_parametros"); //Elemento HTML que es la lista desplegable para elegir la combinación de parámetros
const param1_desc = document.querySelector(".parametro1-label__descripcion"); //Elemento HTML que incluye la descripción del parámetro 1
const param1_um = document.querySelector(".parametro1-label__unidad-de-medida"); //Elemento HTML que incluye la unidad de medida del parámetro 1

//Definición del tamaño del canvas en escala 1:1
canvas.height = 400;
canvas.width = canvas.height; //Escala 1:1

//Evento que cambia la desripción de los parámetros al cambiar la opción del selector de parámetros
selector_de_parametros.addEventListener("change", () => {
    switch(selector_de_parametros.value){
        case "w, r": //El usuario escogio velocidad angular y radio
            param1_desc.innerHTML = `Valor de la velocidad angular (w): `;
            param1_um.innerHTML = `rad/s`;
            break;

        case "V, r": //El usuario escogio velocidad lineal y radio
            param1_desc.innerHTML = `Valor de la velocidad lineal (V): `;
            param1_um.innerHTML = `m/s`;
            break;

        case "T, r": //El usuario escogio periodo y radio
            param1_desc.innerHTML = `Periodo del movimiento (T): `;
            param1_um.innerHTML = `s`;
            break;

        case "f, r": //El usuario escogio frecuencia y radio
            param1_desc.innerHTML = `Frecuencia del movimiento (f): `;
            param1_um.innerHTML = `Hz`;
            break;

        case "ac, r": //El usuario escogio aceleración centripeta y radio
            param1_desc.innerHTML = `Valor de la aceleración centripeta (ac): `;
            param1_um.innerHTML = `m/s^2`;
            break;
    }
});

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
let radio = 150; //Radio del pendulo y de la trayectoria
let object_x = 0; //Posición en x, usada para pintar posteriormente el objeto amarrado al pendulo
let object_y = 0; //Posición en y, usada para pintar posteriormente el objeto amarrado al pendulo
let canvas_x_center = canvas.width / 2; 
let canvas_y_center = canvas.height / 2; //coordenadas (x, y) que son el centro de la trayectoria

/*Función encargada de la simulación
-Pinta la trayectoria del elemento.
-Pinta el movimiento del elemento sujeto de un pendulo.
-Pinta los ejes cartesianos que indican el radio de la trayectoria
*/
const pendulo = () => {
    if(endAngle >= Math.PI * -2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //Reinicio del canvas
        let x = Math.cos(endAngle) * radio;
        let y = Math.sin(endAngle) * radio;
        object_x = canvas_x_center + x;
        object_y = canvas_y_center + y;
        dibujarRecta(canvas_x_center, canvas_y_center, object_x, object_y, "#000"); //Trazo del pendulo
        dibujarCirculoSinRelleno(canvas_x_center, canvas_y_center, radio, 0, Math.PI * 2, "#000"); //Trazo de la trayectoria
        dibujarRecta(canvas_x_center, canvas_y_center, object_x, object_y, "#000"); //Trazo del pendulo
        dibujarCirculoRelleno(object_x, object_y, 5, 0, Math.PI * 2, "#000"); //Trazo del elemento
        endAngle -= Math.PI / 180;
    }
    else {
        endAngle = 0;
    }
}

setInterval(pendulo, 10);