/*Elementos HTML de la sección de parámetros*/
const selector_de_parametros = document.querySelector("#selector_de_parametros"); //Elemento HTML que es la lista desplegable para elegir la combinación de parámetros
const param1_desc = document.querySelector(".parametro1-label__descripcion"); //Elemento HTML que incluye la descripción del parámetro 1
const param1_um = document.querySelector(".parametro1-label__unidad-de-medida"); //Elemento HTML que incluye la unidad de medida del parámetro 1

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