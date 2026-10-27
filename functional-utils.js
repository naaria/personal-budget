// =========================================================
// Laboratorio 07 — functional-utils.js adaptado al nuevo modelo
// Antes: 2 arrays paralelos y el tipo codificado con el signo.
// Ahora: 1 array de objetos { nombre, tipo, valor } con valor SIEMPRE positivo.
// La clase Presupuesto (oop-objects.js) absorbe esta lógica como métodos;
// estas funciones quedan como versión funcional equivalente.
// =========================================================

const obtenerIngresos = movimientos =>
  movimientos.filter(movimiento => movimiento.tipo === 'ingreso');

const obtenerGastos = movimientos =>
  movimientos.filter(movimiento => movimiento.tipo === 'gasto');

const totalIngresos = movimientos =>
  obtenerIngresos(movimientos).reduce((acumulador, movimiento) => acumulador + movimiento.valor, 0);

const totalGastos = movimientos =>
  obtenerGastos(movimientos).reduce((acumulador, movimiento) => acumulador + movimiento.valor, 0);

// ⚠️ CAMBIA DE LÓGICA: antes bastaba sumar valores con signo.
// Ahora valor es positivo y el tipo es explícito → saldo = ingresos - gastos.
const calcularSaldo = movimientos =>
  totalIngresos(movimientos) - totalGastos(movimientos);

// ⚠️ EL SIGNO SE INVIERTE: antes buscaba valor < -monto; ahora valor > monto.
const buscarPrimerGastoMayor = (movimientos, monto) =>
  obtenerGastos(movimientos).find(movimiento => movimiento.valor > monto);

// Retorna: [cantidad, totalIngresos, totalGastos, saldo]
const generarValoresReporte = movimientos => [
  movimientos.length,
  totalIngresos(movimientos),
  totalGastos(movimientos),
  calcularSaldo(movimientos)
];

// 🗑️ montosAbsolutos ya no existe: valor siempre es positivo.

// Reto P1: agrupa con .reduce → { ingresos: [...], gastos: [...] }
const agruparPorTipo = movimientos =>
  movimientos.reduce(
    (grupos, movimiento) => {
      if (movimiento.tipo === 'ingreso') {
        return { ...grupos, ingresos: [...grupos.ingresos, movimiento] };
      }
      return { ...grupos, gastos: [...grupos.gastos, movimiento] };
    },
    { ingresos: [], gastos: [] }
  );

// Salida (IMPURA). Un solo argumento: cada objeto trae su nombre y tipo.
const imprimirReporte = movimientos => {
  console.log('--- Resumen Final ---');

  movimientos.forEach((movimiento, indice) => {
    console.log(`  ${indice + 1}. ${movimiento.datosMovimiento()}`);
  });

  const reporte = generarValoresReporte(movimientos);
  console.log('Total movimientos:', reporte[0]);
  console.log('Total ingresos: $' + reporte[1].toFixed(2));
  console.log('Total gastos: $' + reporte[2].toFixed(2));   // ya es positivo: sin Math.abs
  console.log('Saldo: $' + reporte[3].toFixed(2));
};
