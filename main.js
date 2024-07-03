function calcularGastoPorDimensiones(altoCm, anchoCm, valorPorCm2) {
    if (typeof altoCm !== 'number' || altoCm <= 0 ||
        typeof anchoCm !== 'number' || anchoCm <= 0 ||
        typeof valorPorCm2 !== 'number' || valorPorCm2 <= 0) {
        throw new Error('Los parámetros deben ser números positivos');
    }

    const areaCm2 = altoCm * anchoCm;
    const gastoTotalMadera = areaCm2 * valorPorCm2;

    return parseFloat(gastoTotalMadera.toFixed(2)); 
}

function calcularGastoVidaUtilEnPesos(minutosUtilizados, costoPorMinuto) {
    if (typeof minutosUtilizados !== 'number' || minutosUtilizados <= 0 ||
        typeof costoPorMinuto !== 'number' || costoPorMinuto <= 0) {
        throw new Error('Los parámetros deben ser números positivos');
    }

    const gastoVidaUtil = minutosUtilizados * costoPorMinuto;

    return parseFloat(gastoVidaUtil.toFixed(2));
}

function calcularGastoPackaging(cantidadProductos, gastoInicial, gastoVariablePorUnidad) {
    if (typeof cantidadProductos !== 'number' || cantidadProductos <= 0 ||
        typeof gastoInicial !== 'number' || gastoInicial < 0 ||
        typeof gastoVariablePorUnidad !== 'number' || gastoVariablePorUnidad < 0) {
        throw new Error('Los parámetros deben ser números positivos');
    }

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

    let mensaje = '';

    if (ganancia > cincuentaPorCientoPrecioVenta) {
        mensaje = `La ganancia (${ganancia}) fue mayor al 50% del precio de venta (${precioVenta}) por ende fue buena.`;
    } else {
        mensaje = `La ganancia (${ganancia}) fue igual o menor al 50% del precio de venta (${precioVenta}) por ende fue mala.`;
    }

    switch (true) {
        case (ganancia > 600):
            mensaje += ' ¡Excelente ganancia!';
            break;
        case (ganancia > 400):
            mensaje += ' ¡Buena ganancia!';
            break;
        case (ganancia > 200):
            mensaje += ' ¡Ganancia aceptable!';
            break;
        case (ganancia > 0):
            mensaje += ' ¡Ganancia mínima!';
            break;
        default:
            mensaje += ' ¡No hubo ganancia!';
    }

    return {
        mensaje: mensaje,
        resultadoTotal: parseFloat(total.toFixed(2))
    };
}



function iniciarPagina() {
    try {
        let altoCm = parseFloat(prompt('Ingresa la altura en centímetros del producto:'));
        let anchoCm = parseFloat(prompt('Ingresa el ancho en centímetros del producto:'));
        let minutosUtilizados = parseFloat(prompt('Ingresa la cantidad de minutos utilizados en la máquina:'));
        let cantidadProductos = parseInt(prompt('Ingresa la cantidad de productos vendidos:'));
        let precioVenta = parseFloat(prompt('Ingresa el precio de venta del producto:'));

        const valorPorCm2 = 0.017; 
        const costoPorMinuto = 0.16; 
        const gastoInicial = 50; 
        const gastoVariablePorUnidad = 10; 

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