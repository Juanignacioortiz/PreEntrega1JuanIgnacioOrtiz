// Función para calcular el gasto total de madera por dimensiones
function calcularGastoPorDimensiones(altoCm, anchoCm, valorPorCm2) {


    const areaCm2 = altoCm * anchoCm;

    const gastoTotalMadera = areaCm2 * valorPorCm2;

    return parseFloat(gastoTotalMadera.toFixed(2)); 
}

// Función para calcular el gasto total en vida útil en pesos
function calcularGastoVidaUtilEnPesos(minutosUtilizados, costoPorMinuto) {


    const gastoVidaUtil = minutosUtilizados * costoPorMinuto;

    return parseFloat(gastoVidaUtil.toFixed(2));
}

// Función para calcular el gasto total en packaging
function calcularGastoPackaging(cantidadProductos, gastoInicial, gastoVariablePorUnidad) {


    let gastoPackaging = gastoInicial;

    if (cantidadProductos > 1) {
        gastoPackaging += (cantidadProductos - 1) * gastoVariablePorUnidad;
    }

    return parseFloat(gastoPackaging.toFixed(2));
}

function sumarResultados(altoCm, anchoCm, valorPorCm2, minutosUtilizados, costoPorMinuto, cantidadProductos, gastoInicial, gastoVariablePorUnidad, precioVenta) {
    const resultado1 = calcularGastoPorDimensiones(altoCm, anchoCm, valorPorCm2);
    const resultado2 = calcularGastoVidaUtilEnPesos(minutosUtilizados, costoPorMinuto);
    const resultado3 = calcularGastoPackaging(cantidadProductos, gastoInicial, gastoVariablePorUnidad);

    const total = resultado1 + resultado2 + resultado3;

    const ganancia = parseFloat((precioVenta - total).toFixed(2));

    const cincuentaPorCientoPrecioVenta = precioVenta * 0.5;

    if (ganancia > cincuentaPorCientoPrecioVenta) {
        return {
            mensaje: `La ganancia (${ganancia}) fue mayor al 50% del precio de venta (${precioVenta}) por ende fue buena.`,
            resultadoTotal: parseFloat(total.toFixed(2))
        };
    } else {
        return {
            mensaje: `La ganancia (${ganancia}) fue igual o menor al 50% del precio de venta (${precioVenta}) por ende fue mala.`,
            resultadoTotal: parseFloat(total.toFixed(2))
        };
    }
}

function iniciarPagina() {
    let altoCm = parseFloat(prompt('Ingresa la altura en centímetros del producto:'));
    let anchoCm = parseFloat(prompt('Ingresa el ancho en centímetros del producto:'));
    let minutosUtilizados = parseFloat(prompt('Ingresa la cantidad de minutos utilizados en la máquina:'));
    let cantidadProductos = parseInt(prompt('Ingresa la cantidad de productos vendidos:'));
    let precioVenta = parseFloat(prompt('Ingresa el precio de venta del producto:'));

    const valorPorCm2 = 0.017; // valor por centímetro cuadrado
    const costoPorMinuto = 0.16; //costo por minuto de uso
    const gastoInicial = 50; // gasto inicial fijo 
    const gastoVariablePorUnidad = 10; //gasto variable por cada unidad extra

    try {
        const gastoTotalMadera = calcularGastoPorDimensiones(altoCm, anchoCm, valorPorCm2);
        console.log(`El Gasto total de Madera es: $${gastoTotalMadera}`);
        const gastoTotalVidaUtil = calcularGastoVidaUtilEnPesos(minutosUtilizados, costoPorMinuto);
        console.log(`El gasto total de vida útil en pesos es: $${gastoTotalVidaUtil}`);
        const gastoTotal = calcularGastoPackaging(cantidadProductos, gastoInicial, gastoVariablePorUnidad);
        console.log(`El gasto total en packaging es: $${gastoTotal}`);
        const resultado = sumarResultados(altoCm, anchoCm, valorPorCm2, minutosUtilizados, costoPorMinuto, cantidadProductos, gastoInicial, gastoVariablePorUnidad, precioVenta);
        console.log(resultado.mensaje);
        console.log(`El Gasto total es: $${resultado.resultadoTotal}`);
    } catch (error) {
        console.error(error.message);
    }
}

iniciarPagina();