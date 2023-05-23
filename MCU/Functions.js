//Función constructora del elemento del MCU
function ElementoMCU(){
    let _w = 0;
    let _r = 0;
    let _t = 0; //Estoy pensando en que esta variable sea pública
    let _V = 0;
    let _T = 0;
    let _f = 0;
    let _ac = 0;
    let _theta = 0;
    let _caso_de_movimiento; //Variable usada para almacenar la combinación parámetros escogidos
    
    //Getters

    this.getCasoDeMovimiento = function() {
        return _caso_de_movimiento;
    }

    this.getVelocidadAngular = function() {
        return _w;
    }

    this.getRadio = function() {
        return _r;
    }

    this.getVelocidadLineal = function() {
        return _V;
    }

    this.getPeriodo = function() {
        return _T;
    }

    this.getFrecuencia= function() {
        return _f;
    }

    this.getAceleracionCentripeta= function() {
        return _ac;
    }

    this.imprimirComponentes = function() {
        console.log(`w: ${_w}\nr: ${_r}\nV: ${_V}\nT: ${_T}\nf: ${_T}\nac: ${_ac}`);
    }
    
    //Setters

    this.setCasoDeMovimiento = function(caso_de_movimiento) {
        _caso_de_movimiento = caso_de_movimiento;
    }

    this.setVelocidadAngular = function(w) {
        _w = w;
    }

    this.setRadio = function(r) {
        _r = r;
    }

    this.setVelocidadLineal = function(V) {
        _V = V;
    }

    this.setPeriodo = function(T) {
        _T = T;
    }

    this.setFrecuencia= function(f) {
        _f = f;
    }

    this.setAceleracionCentripeta= function(ac) {
        _ac = ac;
    }

    //Método que calcula los componentes del movimiento según la combinación de parámetros
    this.calcularComponentes = function() {
        switch(_caso_de_movimiento) {
            case "w, r":
                _V = _w * _r;
                _T = (2 * Math.PI) / _w;
                _f = 1 / _T;
                _ac = (_V ** 2) / _r;
                _theta = _w * _t; //Este componente debe ser quitado, (sera calculado con el intervalo)
                break;
    
            case "V, r":
                _w = _V / _r;
                _T = ((2 * Math.PI) * _r) / _V;
                _f = 1 / _T;
                _ac = (_V ** 2) / _r;
                _theta = _w * _t; //Este componente debe ser quitado, (sera calculado con el intervalo)
                break;
    
            case "T, r":
                _w = (Math.PI * 2) / _T;
                _V = ((2 * Math.PI) * _r) / _T;
                _f = 1 / _T;
                _ac = (_V ** 2) / _r;
                _theta = _w * _t; //Este componente debe ser quitado, (sera calculado con el intervalo)
                break;
    
            case "f, r":
                _T = 1 / _f;    
                _w = (2 * Math.PI) / _T;
                _V = ((2 * Math.PI) * _r) / _T;
                _ac = (_V ** 2) / _r;
                _theta = _w * _t; //Este componente debe ser quitado, (sera calculado con el intervalo)
                break;
    
            case "ac, r":
                _w = (_ac / _r) ** (1/2);
                _V = _w * _r;
                _T = (Math.PI * 2) / _w;
                _f = 1 / _T;
                _theta = _w * _t; //Este componente debe ser quitado, (sera calculado con el intervalo)
                break;
        }
    }

    //Método que establece el valor de los componentes registrados por el usuario al elemento (objeto)
    this.calcularComponentesOrdenadamente = function(valor_param1, valor_param2) {
        this.setRadio(valor_param2);
        switch(_caso_de_movimiento){
            case "w, r":
                this.setVelocidadAngular(valor_param1);
                break;

            case "V, r":
                this.setVelocidadLineal(valor_param1);
                break;

            case "T, r":
                this.setPeriodo(valor_param1);
                break;

            case "f, r":
                this.setFrecuencia(valor_param1);
                break;

            case "ac, r":
                this.setAceleracionCentripeta(valor_param1);
                break;
        }
    }

    //Método que reinicia el valor de los componentes del elemento (objeto)
    this.reiniciarComponentesMCU = function() {
        _w = 0;
        _r = 0;
        _t = 0;
        _V = 0;
        _T = 0;
        _f = 0;
        _ac = 0;
        _theta = 0;
    }
}

// Función constructora de un vector (No hablamos de arrays)
function Vector(xi = 0, yi = 0, xf = 0, yf = 0, color = "blue") {
     let _color = color;
     let _xi = xi;
     let _yi = yi;
     let _xf = xf;
     let _yf = yf;
     let _magnitud = 0;
     let _componenteX = 0;
     let _componenteY = 0;
     let _angulo = 0;

    //Getters

    this.getColor = function() {
        return _color;
    }

    this.getXi = function() {
        return _xi;
    }

    this.getYi = function() {
        return _yi;
    }

    this.getXf = function() {
        return _xf;
    }

    this.getYf = function() {
        return _yf;
    }

    this.getMagnitud = function() {
        return _magnitud;
    }

    this.getComponenteX = function() {
        return _componenteX;
    }

    this.getComponenteY = function() {
        return _componenteY;
    }

    this.getAngulo = function() {
        return _angulo;
    }

    //Setters

    this.setColor = function(color) {
        _color = color;
    }
    
    this.setPosicionInicial = function(xi = this.xi, yi = this.yi) {
        _xi = xi;
        _yi = yi;
    }

    this.setPosicionFinal = function(xf, yf) {
        _xf = xf;
        _yf = yf;
    }

    this.setMagnitud = function(magnitud) {
        if(magnitud > 10.4){
            _magnitud = 130;
        }

        else if(magnitud < 1){
            _magnitud = 12.5;
        }

        else {
            _magnitud = (magnitud * 12.5);
        }
    }

    this.setAngulo = function(angulo) {
        _angulo = angulo;
    }

    //Métodos
    this.calcularComponentes = function() {
        _componenteX = _xi + (_magnitud * Math.cos(_angulo));
        _componenteY = _yi + (_magnitud * Math.sin(_angulo));
    }

    this.pintarVector = function() {
        dibujarRecta(_xi, _yi, _xf, _yf, _color, 3);
        let L = 10;
        let x1 = (_xf) - ((L / 2) * Math.cos(_angulo - (Math.PI / 2))); let y1 = (_yf) - ((L / 2) * Math.sin(_angulo - (Math.PI / 2)));
        let x2 = (_xf) + ((L / 2) * Math.cos(_angulo - (Math.PI / 2))); let y2 = (_yf) + ((L / 2) * Math.sin(_angulo - (Math.PI / 2)));        
        let x3 = _xf + (L * Math.cos(_angulo)); let y3 = (_yf) + (L * Math.sin(_angulo));
        dibujarTriangulo(x1, y1, x2, y2, x3, y3, _color, _angulo);
    }
    
    this.pintarComponentesVector = function() {
        let xcx2 = (object_x) + (_magnitud * Math.cos(_angulo));
        let ycx2 = object_y; // Variables usadas para pintar la recta del componente x

        let xcy2 = object_x;
        let ycy2 = (object_y) + (_magnitud * Math.sin(_angulo)); // Variables usadas para pintar la recta del componente y
        
        let L = 5;
        let x1 = xcx2;
        let y1 = ycx2 + (L / 2);
        let x2 = xcx2;
        let y2 = ycx2 - (L / 2);
        let x3;
        let y3 = ycx2;
        

        if(_angulo >= (-268 * (Math.PI / 180))) {
            x3 = xcx2 - L;
        }
        else {
            x3 = xcx2 + L;
        } // Los cálculos previos se usan para pintar el triangulo en el componente x
        

        dibujarRecta(object_x, object_y, xcx2, ycx2, _color); // Trazo del componente x
        dibujarTriangulo(x1, y1, x2, y2, x3, y3, _color); // Triangulo (para indicar vector) del componente x
        
        x1 = xcy2 + (L / 2);
        y1 = ycy2;
        x2 = xcy2 - (L / 2);
        y2 = ycy2;
        x3 = xcy2;
        y3;

        if(_angulo >= (-180 * (Math.PI / 180))) {
            y3 = ycy2 - L;
        }
        else if (_angulo >= (-360 * (Math.PI / 180))){
            y3 = ycy2 + L;
        }

        else {
            y3 = ycy2 - L;
        } // Los cálculos previos se usan para pintar el triangulo en el componente y

        dibujarRecta(object_x, object_y, xcy2, ycy2, _color); // Trazo del componente y
        dibujarTriangulo(x1, y1, x2, y2, x3, y3, _color); // Trazo del triangulo (para indicar vector) del componente y
    }

    this.imprimirDatos = function() {
        console.log(`Magnitud: ${_magnitud}\nX: ${_componenteX}\nY: ${_componenteY}\n Angulo: ${_angulo}`);
    }
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
function dibujarRecta(Xi, Yi, Xf, Yf, color, grosor = 1) {
    ctx.beginPath();
    ctx.lineWidth = grosor;
    ctx.strokeStyle = color;
    ctx.moveTo(Xi, Yi);
    ctx.lineTo(Xf, Yf);
    ctx.stroke();
    ctx.closePath();
}

//Función que dibuja un triangulo
function dibujarTriangulo(x1, y1, x2, y2, x3, y3, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fill();
    ctx.fillStyle = "#000"; // Linea para evitar un bug en el que se cambia de color la letra de los ejes
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
    let yi = ((canvas_y_center - radio) - 120);
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
    let xi = canvas_x_center + radio + 120;
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