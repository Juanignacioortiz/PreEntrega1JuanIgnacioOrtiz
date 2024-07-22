const productos = [
    { nombre: 'toji', altoCm: 60, anchoCm: 25, minutosUtilizados: 20, precioVenta: 790 },
    { nombre: 'berserk', altoCm: 60, anchoCm: 50, minutosUtilizados: 15 ,precioVenta:790},
    { nombre: 'nanami', altoCm: 60, anchoCm: 35, minutosUtilizados: 16, precioVenta: 790 },
    { nombre: 'goku', altoCm: 60 , anchoCm: 45, minutosUtilizados: 22, precioVenta: 890 },
    { nombre: 'hisoka', altoCm: 55, anchoCm: 40, minutosUtilizados: 12 , precioVenta: 790},
    { nombre: 'roger', altoCm: 50, anchoCm: 40, minutosUtilizados: 21, precioVenta: 890 },
    { nombre: 'zenitsu', altoCm: 40, anchoCm: 40, minutosUtilizados: 16 , precioVenta: 790},
    { nombre: 'senkuu', altoCm: 60, anchoCm:35 , minutosUtilizados: 13, precioVenta: 790 },
    { nombre: 'mugiwaras', altoCm: 60, anchoCm: 40, minutosUtilizados: 11, precioVenta: 790 },
    { nombre: 'zoro', altoCm: 60, anchoCm: 30, minutosUtilizados: 19 , precioVenta: 790}
];

// Función para calcular el gasto por dimensiones
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

// Función para calcular el gasto de vida útil en pesos
function calcularGastoVidaUtilEnPesos(minutosUtilizados, costoPorMinuto) {
    if (typeof minutosUtilizados !== 'number' || minutosUtilizados <= 0 ||
        typeof costoPorMinuto !== 'number' || costoPorMinuto <= 0) {
        throw new Error('Los parámetros deben ser números positivos');
    }

    const gastoVidaUtil = minutosUtilizados * costoPorMinuto;

    return parseFloat(gastoVidaUtil.toFixed(2));
}

// Función para calcular el gasto en packaging
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

// Función para sumar resultados y evaluar la ganancia
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

// Función principal para manejar la página
function manejarPagina() {
    const respuesta = prompt("¿Es un diseño personalizado? (Responde 'si' o 'no')");

    if (respuesta.toLowerCase() == 'si') {
        try {
            let altoCm = parseFloat(prompt('Ingresa la altura en centímetros del producto:'));
            let anchoCm = parseFloat(prompt('Ingresa el ancho en centímetros del producto:'));
            let minutosUtilizados = parseFloat(prompt('Ingresa la cantidad de minutos utilizados en la máquina:'));
            let cantidadProductos = parseInt(prompt('Ingresa la cantidad de productos vendidos:'));
            let precioVenta = parseFloat(prompt('Ingresa el valor total de la venta:'));

            const valorPorCm2 = 0.017; // Ejemplo de valor por cm^2
            const costoPorMinuto = 0.16; // Ejemplo de costo por minuto
            const gastoInicial = 50; // Ejemplo de gasto inicial en packaging
            const gastoVariablePorUnidad = 10; // Ejemplo de gasto variable por unidad en packaging

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
    } else if (respuesta.toLowerCase() == 'no') {
        const nombreProducto = prompt("Ingresa el nombre del producto:");
        const productoEncontrado = productos.find(producto => producto.nombre == nombreProducto);

        if (productoEncontrado) {
            try {
                let altoCm = productoEncontrado.altoCm;
                let anchoCm = productoEncontrado.anchoCm;
                let minutosUtilizados = productoEncontrado.minutosUtilizados;
                let precioVenta = productoEncontrado.precioVenta;

                const valorPorCm2 = 0.017; // Ejemplo de valor por cm^2
                const costoPorMinuto = 0.16; // Ejemplo de costo por minuto
                const gastoInicial = 50; // Ejemplo de gasto inicial en packaging
                const gastoVariablePorUnidad = 10; // Ejemplo de gasto variable por unidad en packaging

                const gastoTotalMadera = calcularGastoPorDimensiones(altoCm, anchoCm, valorPorCm2);
                console.log(`El Gasto total de Madera es: $${gastoTotalMadera}`);

                const gastoTotalVidaUtil = calcularGastoVidaUtilEnPesos(minutosUtilizados, costoPorMinuto);
                console.log(`El gasto total de vida útil en pesos es: $${gastoTotalVidaUtil}`);

                const gastoTotal = calcularGastoPackaging(1, gastoInicial, gastoVariablePorUnidad); // Solo 1 producto en este caso
                console.log(`El gasto total en packaging es: $${gastoTotal}`);

                const resultado = sumarResultados(altoCm, anchoCm, valorPorCm2, minutosUtilizados, costoPorMinuto, 1, gastoInicial, gastoVariablePorUnidad, precioVenta); // Solo 1 producto en este caso
                console.log(resultado.mensaje);
                console.log(`El Gasto total es: $${resultado.resultadoTotal}`);
            } catch (error) {
                console.error(error.message);
            }
        } else {
            console.log(`No se encontró un producto con el nombre '${nombreProducto}'.`);
        }
    } else {
        // Respuesta no válida
        console.log("Respuesta no válida. Por favor responde 'si' o 'no'.");
    }
}

// Llamar a la función principal al cargar la página o cuando sea necesario
manejarPagina();
