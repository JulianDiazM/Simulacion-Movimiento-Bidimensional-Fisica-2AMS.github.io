//Función constructora del elemento del MCU
function ElementoMCU(){
    this.w = 0;
    this.r = 0;
    this.t = 0; //Estoy pensando en que esta variable sea pública
    this.V = 0;
    this.T = 0;
    this.f = 0;
    this.ac = 0;
    this.theta = 0;
    this.caso_de_movimiento; //Variable usada para almacenar la combinación parámetros escogidos
    
    //setters

    this.setCasoDeMovimiento = function(caso_de_movimiento) {
        this.caso_de_movimiento = caso_de_movimiento;
    }

    this.setVelocidadAngular = function(w) {
        this.w = w;
    }

    this.setRadio = function(r) {
        this.r = r;
    }

    this.setVelocidadLineal = function(V) {
        this.V = V;
    }

    this.setPeriodo = function(T) {
        this.T = T;
    }

    this.setFrecuencia= function(f) {
        this.f = f;
    }

    this.setAceleracionCentripeta= function(ac) {
        this.ac = ac;
    }

    //Método que calcula los componentes del movimiento según la combinación de parámetros
    this.calcularComponentes = function(caso_de_movimiento) {
        switch(caso_de_movimiento) {
            case "w, r":
                this.V = this.w * this.r;
                this.T = (2 * Math.PI) / this.w;
                this.f = 1 / this.T;
                this.ac = (this.V ** 2) / this.r;
                this.theta = this.w * this.t; //Este componente debe ser quitado, (sera calculado con el intervalo)
                break;
    
            case "V, r":
                this.w = this.V / this.r;
                this.T = ((2 * Math.PI) * this.r) / this.V;
                this.f = 1 / this.T;
                this.ac = (this.V ** 2) / this.r;
                this.theta = this.w * this.t; //Este componente debe ser quitado, (sera calculado con el intervalo)
                break;
    
            case "T, r":
                this.w = (Math.PI * 2) / this.T;
                this.V = ((2 * Math.PI) * this.r) / this.T;
                this.f = 1 / this.T;
                this.ac = (this.V ** 2) / this.r;
                this.theta = this.w * this.t; //Este componente debe ser quitado, (sera calculado con el intervalo)
                break;
    
            case "f, r":
                this.T = 1 / this.f;    
                this.w = (2 * Math.PI) / this.T;
                this.V = ((2 * Math.PI) * this.r) / this.T;
                this.ac = (this.V ** 2) / this.r;
                this.theta = this.w * this.t; //Este componente debe ser quitado, (sera calculado con el intervalo)
                break;
    
            case "ac, r":
                this.w = (this.ac / this.r) ** (1/2);
                this.V = this.w * this.r;
                this.T = (Math.PI * 2) / this.w;
                this.f = 1 / this.T;
                this.theta = this.w * this.t; //Este componente debe ser quitado, (sera calculado con el intervalo)
                break;
        }
    }
}

//Función que establece el valor de los componentes registrados por el usuario al elemento (objeto)
function calcularComponentesOrdenadamente(objeto, caso_de_movimiento, valor_param1, valor_param2) {
    objeto.setRadio(valor_param2);
    switch(caso_de_movimiento){
        case "w, r":
            objeto.setVelocidadAngular(valor_param1);
            break;

        case "V, r":
            objeto.setVelocidadLineal(valor_param1);
            break;

        case "T, r":
            objeto.setPeriodo(valor_param1);
            break;

        case "f, r":
            objeto.setFrecuencia(valor_param1);
            break;

        case "ac, r":
            objeto.setAceleracionCentripeta(valor_param1);
            break;
    }
}

//Función que reinicia el valor de los componentes del elemento (objeto)
function reiniciarComponentesMCU(objeto) {
    objeto.w = 0;
    objeto.r = 0;
    objeto.t = 0;
    objeto.V = 0;
    objeto.T = 0;
    objeto.f = 0;
    objeto.ac = 0;
    objeto.theta = 0;
}

//Función que dibuja un circulo con relleno usando .fill()
function dibujarCirculoRelleno(x, y, radio, startAngle, endAngle, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radio, startAngle, endAngle, true);
    ctx.fill();
    ctx.closePath();
}

//Función que dibuja un circulo sin relleno usando .stroke()
function dibujarCirculoSinRelleno(x, y, radio, startAngle, endAngle, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(x, y, radio, startAngle, endAngle, true);
    ctx.stroke();
    ctx.closePath();
}

//Función que dibuja una recta
function dibujarRecta(Xi, Yi, Xf, Yf, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(Xi, Yi);
    ctx.lineTo(Xf, Yf);
    ctx.stroke();
    ctx.closePath();
}

//Función que escribe texto en el canvas
function escribirTexto(font, message, x, y) {
    ctx.font = font;
    ctx.fillText(message, x, y);
}

//Función que pinta el eje x, el cual hace referencia al tamaño del radio de la trayectoria y los valores máximos de posición en x del elemento
function pintarEjeX() {
    let xi = (canvas_x_center - radio);
    let yi = ((canvas_y_center - radio) - 30);
    let xf = xi + (radio * 2); 
    let yf = yi; //Variables usadas para pintar el eje cartesiano en x.

    dibujarRecta(xi, yi, xf, yf, "#000"); //Trazo del eje cartesiano x
    dibujarRecta(canvas_x_center, (yi + 10), canvas_x_center, (yi - 10)); //Trazo de la recta que indica el centro de la circunferencia
    escribirTexto("20px Calibri", 0, (canvas_x_center - 5), (yi - 15));
    dibujarRecta(xi, yi + 10, xi, yi - 10); //Trazo de la recta que indica el radio de la circunferencia (cuadrante II)
    escribirTexto("20px Calibri", `-${param2.value}m`, (xi -17), (yi - 15));
    dibujarRecta(xf, yi + 10, xf, yi - 10); //Trazo de la recta que indica el radio de la circunferencia (cuadrante I)
    escribirTexto("20px Calibri", `${param2.value}m`, (xf -10), (yi - 15));
}

//Función que pinta el eje y, el cual hace referencia al tamaño del radio de la trayectoria y los valores máximos de posición en y del elemento
function pintarEjeY() {
    let xi = canvas_x_center + radio + 30;
    let yi = canvas_y_center - radio;
    let xf = xi; 
    let yf = canvas_y_center + radio; //Variables usadas para pintar el eje cartesiano en y.
    
    dibujarRecta(xi, yi, xf, yf, "#000");
    dibujarRecta((xi - 10), canvas_y_center, (xi + 10), canvas_y_center); //Trazo de la recta que indica el centro de la circunferencia
    escribirTexto("20px Calibri", 0, (xi + 15), (canvas_y_center +5));
    dibujarRecta((xi - 10), yi, (xi + 10), yi); //Trazo de la recta que indica el radio de la circunferencia (cuadrante I y II)
    escribirTexto("20px Calibri", `${param2.value}m`, (xi - 10), (yi - 8));
    dibujarRecta((xi - 10), yf, (xi + 10), yf); //Trazo de la recta que indica el radio de la circunferencia (cuadrante III y IV)
    escribirTexto("20px Calibri", `-${param2.value}m`, (xi - 10), (yf + 20));
}

//Función que valida los parámetros, evitando que el valor del input quede vacio
function validarParametro(parametro) {
    let radio_value;
    if(parametro == ""){
        radio_value = 1;
    } else {
        radio_value = parametro;
    }

    return radio_value;
}