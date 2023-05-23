/*Elementos HTML de la sección de canvas (donde se pinta la simulación)*/
const canvas = document.querySelector(".mcu-canvas"); // Elemento canvas
const ctx = canvas.getContext("2d");
const start_button = document.querySelector(".start-button"); // Boton de inicio o pausa
const start_button__icon = document.querySelector("#button-icon"); // Icono del boton de inicio o pausa
const reboot_button = document.querySelector(".reboot-button"); // Boton de reinicio

/*Elementos HTML de la sección de parámetros*/
const selector_de_parametros = document.querySelector("#selector_de_parametros"); // Lista desplegable con las combinaciones de parámetros
const param1 = document.querySelector("#parametro1"); // <input> que es el parámetro 1
const param1_desc = document.querySelector(".parametro1-label__descripcion"); // <span> que incluye la descripción del parámetro 1
const param1_um = document.querySelector(".parametro1-label__unidad-de-medida"); // <span> que incluye la unidad de medida del parámetro 1
const param2 = document.querySelector("#parametro2"); // <input> que es el parámetro 2

/*Elementos HTML de la sección de visualización de vectores*/
const checkbox_velocidad = document.querySelector(".checkbox-velocidad");
const componentes_velocidad = document.querySelectorAll(".componentes-velocidad");
const checkbox_aceleracion = document.querySelector(".checkbox-aceleracion");
const componentes_aceleracion = document.querySelectorAll(".componentes-aceleracion"); // Elementos HTML usados para controlar la visualización de vectores
const checkbox_componentes_posicion = document.querySelector(".componentes-posicion");

//Definición del tamaño del canvas en escala 1:1
canvas.height = 600;
canvas.width = canvas.height;
ctx.font = "20px Arial"; //Tamaño y tipo de fuente en el canvas

//Declaración de variables
let estado_del_boton = false; // Para el boton de inicio/pausa | false → pausado, true → en ejecución
let estado_de_simulacion = false; // false → simulador no iniciado | true → simulador iniciado
let n_de_toques_del_start_button = 0;
let elemento; // Contendrá el elemento (como objeto) sujeto al pendulo
let vectorVelocidad = new VectorVelocidad();
let vectorAceleracion = new VectorAceleracion();
let vectorPosicion = new VectorPosicion();
let simular; // Contendrá el temporizador para poder realizar la animación de simulación
let endAngle = 0; // Contendrá el valor de theta o angulo del movimiento
let decremento = 0; // Contendrá el decremento angular por cada actualización
let actualizaciones_por_segundo = 100; // 50 ya que se cambiaran los datos cada 20ms
let intervalo_de_actualizacion = 1000 / actualizaciones_por_segundo; // Contendrá el valor en ms
let radio = 125; // Radio de la circunferencia pintada (Usado solo en el <canvas>)
let valor_parametro1 = parseFloat(param1.value); // (Componente del elemento) Usada para poder calcular los componentes del elemento
let valor_parametro2 = parseFloat(param2.value); // (Radio de la trayectoria) Usada para poder calcular los componentes del elemento
let object_x = 0; 
let object_y = 0; // coordenadas (x, y) usadas para determinar la posición del elemento en el <canvas> (usado solo para pintar)
let canvas_x_center = canvas.width / 2;
let canvas_y_center = canvas.height / 2; // coordenadas (x, y) que son el centro del <canvas>
pendulo(); // Pintar la trayectoria al iniciar la página

// Evento que cambia la desripción de los parámetros al cambiar la opción del selector de parámetros
selector_de_parametros.addEventListener("change", () => {
    switch(selector_de_parametros.value){
        case "w, r": // El usuario escogió velocidad angular y radio
            param1_desc.innerHTML = `Valor de la velocidad angular (w): `;
            param1_um.innerHTML = `rad/s`;
            break;

        case "V, r": // El usuario escogió velocidad lineal y radio
            param1_desc.innerHTML = `Valor de la velocidad lineal (V): `;
            param1_um.innerHTML = `m/s`;
            break;

        case "T, r": // El usuario escogió periodo y radio
            param1_desc.innerHTML = `Periodo del movimiento (T): `;
            param1_um.innerHTML = `s`;
            break;

        case "f, r": // El usuario escogió frecuencia y radio
            param1_desc.innerHTML = `Frecuencia del movimiento (f): `;
            param1_um.innerHTML = `Hz`;
            break;

        case "ac, r": // El usuario escogió aceleración centripeta y radio
            param1_desc.innerHTML = `Valor de la aceleración centripeta (ac): `;
            param1_um.innerHTML = `m/s^2`;
            break;
    }
});

//Evento que modifica el display del checkbox de los componentes del vector velocidad
checkbox_velocidad.addEventListener("change", () => {
    if (checkbox_velocidad.checked) {
      componentes_velocidad[0].style.display = "inline-block";
      componentes_velocidad[1].style.display = "inline-block";
    } else {
      componentes_velocidad[0].style.display = "none";
      componentes_velocidad[1].style.display = "none";
      componentes_velocidad[0].checked = false;
    }
    endAngle += decremento; pendulo();
  });

componentes_velocidad[0].addEventListener("change", () => {
    endAngle += decremento; pendulo();
});

//Evento que modifica el display del checkbox de los componentes del vector aceleración
checkbox_aceleracion.addEventListener("change", () => {
    if (checkbox_aceleracion.checked) {
        componentes_aceleracion[0].style.display = "inline-block";
        componentes_aceleracion[1].style.display = "inline-block"
    } else {
        componentes_aceleracion[0].style.display = "none";
        componentes_aceleracion[1].style.display = "none";
        componentes_aceleracion[0].checked = false;
    }
    endAngle += decremento; pendulo();
});

componentes_aceleracion[0].addEventListener("change", () => {
    endAngle += decremento; pendulo();
});

checkbox_componentes_posicion.addEventListener("change", () => {
    endAngle += decremento; pendulo();
});

// Evento que modifica el valor ingresado del componente al pulsar Enter
param1.addEventListener("keydown", (event) => {
    if(!estado_de_simulacion){
        if(event.keyCode == 13){
            param1.value = validarParametro(param1.value);
            valor_parametro1 = param1.value;
        }
    }
});

// Evento que modifica el valor ingresado del radio al pulsar Enter
param2.addEventListener("keydown", (event) => {
    if(!estado_de_simulacion){
        if(event.keyCode == 13){
            param2.value = validarParametro(param2.value);
            valor_parametro2 = param2.value;
            endAngle = 0; pendulo(); endAngle = 0;
        }
    }
});

// Evento que detiene/reanuda la simulación y cambia el icono del boton correspondiente
start_button.addEventListener("click", () => {
    n_de_toques_del_start_button++;

    if(n_de_toques_del_start_button == 1) { // EL usuario inició la simulación por primera vez
        elemento = new ElementoMCU(); // Se crea el objeto del MCU
        elemento.setCasoDeMovimiento(selector_de_parametros.value);
        param1.value = validarParametro(param1.value); valor_parametro1 = parseFloat(param1.value); // Se cambia el valor de los parámetros por si el usuario olvida de hacerlo con la tecla Enter
        param2.value = validarParametro(param2.value); valor_parametro2 = parseFloat(param2.value);
        elemento.calcularComponentesOrdenadamente(valor_parametro1, valor_parametro2);
        pintarEjeX(); pintarEjeY();
        elemento.calcularComponentes(); // Cálculo de los componentes del movimiento

        vectorVelocidad.setMagnitud(elemento.getVelocidadLineal());
        vectorAceleracion.setMagnitud(elemento.getAceleracionCentripeta());
        decremento = elemento.getVelocidadAngular() / actualizaciones_por_segundo;
        estado_de_simulacion = true;
    }
    
    reboot_button.style.display = "inline-block"; // Se activa el boton de reinicio
    param1.readOnly = true; 
    param2.readOnly = true; // Se deshabilita la edición de los parámetros
    selector_de_parametros.disabled = true; //Se deshabilita la lista desplegable
    
    estado_del_boton = !estado_del_boton;
    if (estado_del_boton){ // El usuario reanudó la simulación
        start_button__icon.classList.remove('fa-play');
        start_button__icon.classList.add("fa-pause");
        simular = setInterval(pendulo, intervalo_de_actualizacion);
    }
    else { // El usuario pausó la simulación
        start_button__icon.classList.remove('fa-pause');
        start_button__icon.classList.add("fa-play");
        clearInterval(simular);
    }
});

// Evento que reinicia la simulación
reboot_button.addEventListener("click", () => {
    if(estado_del_boton == true){
        estado_del_boton = !estado_del_boton;
    }

    elemento.reiniciarComponentesMCU(); // Se establece en 0 todos los componentes del movimiento
    n_de_toques_del_start_button = 0;
    estado_de_simulacion = false; // Se reinicia toda la simulación
    reboot_button.style.display = "none"; // Se desactiva el boton de reinicio
    param1.readOnly = false;
    param2.readOnly = false; // Se habilita la edición de los parámetros nuevamente
    selector_de_parametros.disabled = false; //Se habilita la lista desplegable nuevamente
    start_button__icon.classList.remove('fa-pause');
    start_button__icon.classList.add("fa-play");
    clearInterval(simular);
    endAngle = 0;
    pendulo();
});

/*Función encargada de la simulación
-Pinta la trayectoria del elemento.
-Pinta el movimiento del elemento sujeto de un pendulo.
-Pinta los ejes cartesianos que indican el radio de la trayectoria
*/
function pendulo() {
    if(endAngle >= Math.PI * -2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); //Reinicio del canvas
        let x = Math.cos(endAngle) * radio;
        let y = Math.sin(endAngle) * radio;
        object_x = canvas_x_center + x;
        object_y = canvas_y_center + y;
        pintarEjeX();
        pintarEjeY();
        dibujarCirculoSinRelleno(canvas_x_center, canvas_y_center, radio, 0, Math.PI * 2, "#000"); //Trazo de la trayectoria
        dibujarRecta(canvas_x_center, canvas_y_center, object_x, object_y, "#000"); //Trazo del pendulo
        dibujarCirculoRelleno(object_x, object_y, 5, 0, Math.PI * 2, "#000"); //Trazo del elemento
        
        vectorVelocidad.setPosicionInicial(object_x, object_y);
        vectorVelocidad.setAngulo(endAngle - (Math.PI / 2));
        vectorVelocidad.calcularComponentes();
        vectorVelocidad.setPosicionFinal(vectorVelocidad.getComponenteX(), vectorVelocidad.getComponenteY());

        vectorAceleracion.setPosicionInicial(object_x, object_y);
        vectorAceleracion.setAngulo(endAngle);
        vectorAceleracion.calcularComponentes();
        vectorAceleracion.setPosicionFinal(vectorAceleracion.getComponenteX(), vectorAceleracion.getComponenteY());

        vectorPosicion.setPosicionInicial(canvas_x_center, canvas_y_center);
        vectorPosicion.setAngulo(endAngle);
        vectorPosicion.calcularComponentes();
        vectorPosicion.setPosicionFinal(vectorPosicion.getComponenteX(), vectorPosicion.getComponenteY());
        
        if (checkbox_velocidad.checked) {
            vectorVelocidad.pintarVector();
        }

        if (componentes_velocidad[0].checked) {
            vectorVelocidad.pintarComponentesVector();
        }

        if (checkbox_aceleracion.checked) {
            vectorAceleracion.pintarVector();
        }

        if (componentes_aceleracion[0].checked) {
            vectorAceleracion.pintarComponentesVector();
        }

        if (checkbox_componentes_posicion.checked) {
            vectorPosicion.pintarComponentesVector();
        }
        endAngle -= decremento;
    }
    else {
        endAngle = 0;
    }
}