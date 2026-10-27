// =========================================================
// Laboratorio 06 — Programación funcional + arrow functions
// Funciones PURAS: misma entrada → misma salida, sin efectos.
// Nunca declarar aquí `nombres` ni `valores` (viven en app.js).
// =========================================================

// ---------- Parte 1: .map(), .filter(), .find() ----------

const obtenerIngresos = valores => valores.filter(valor => valor > 0);

const obtenerGastos = valores => valores.filter(valor => valor < 0);

const montosAbsolutos = valores => valores.map(valor => Math.abs(valor));

const buscarPrimerGastoMayor = (valores, monto) =>
  valores.find(valor => valor < -monto);

// Reto P1: cuántos gastos hay
const contarGastos = valores => obtenerGastos(valores).length;

// ---------- Parte 2: .reduce() ----------

const calcularSaldo = valores =>
  valores.reduce((acumulador, valor) => acumulador + valor, 0);

const totalIngresos = valores =>
  obtenerIngresos(valores).reduce((acumulador, valor) => acumulador + valor, 0);

const totalGastos = valores =>
  obtenerGastos(valores).reduce((acumulador, valor) => acumulador + valor, 0);

// Retorna: [cantidad, totalIngresos, totalGastos, saldo]
const generarValoresReporte = valores => [
  valores.length,
  totalIngresos(valores),
  totalGastos(valores),
  calcularSaldo(valores)
];

// Reto P2: promedio absoluto de los movimientos (DRY: reusa montosAbsolutos y calcularSaldo)
const promedioMovimiento = valores =>
  valores.length === 0 ? 0 : calcularSaldo(montosAbsolutos(valores)) / valores.length;

// ---------- Parte 3: composición + DRY ----------

const promedioIngresos = valores => {
  const ingresos = obtenerIngresos(valores);
  if (ingresos.length === 0) return 0;
  return totalIngresos(valores) / ingresos.length;
};

// Reto P3: true si el total de gastos NO supera el límite
const validarPresupuesto = (valores, limite) => Math.abs(totalGastos(valores)) <= limite;

// Logro de C05 en versión funcional: ingreso más alto y gasto más negativo
const ingresoMasAlto = valores =>
  obtenerIngresos(valores).reduce((maximo, valor) => (valor > maximo ? valor : maximo), 0);

const gastoMasNegativo = valores =>
  obtenerGastos(valores).reduce((minimo, valor) => (valor < minimo ? valor : minimo), 0);

// ---------- Logro 1: estadística ----------

const mediana = valores => {
  if (valores.length === 0) return 0;
  const ordenados = [...valores].sort((a, b) => a - b); // copia: no muta el original
  const mitad = Math.floor(ordenados.length / 2);
  return ordenados.length % 2 === 0
    ? (ordenados[mitad - 1] + ordenados[mitad]) / 2
    : ordenados[mitad];
};

const desviacionEstandar = valores => {
  if (valores.length === 0) return 0;
  const media = calcularSaldo(valores) / valores.length;
  const varianza = valores
    .map(valor => (valor - media) ** 2)
    .reduce((acumulador, cuadrado) => acumulador + cuadrado, 0) / valores.length;
  return Math.sqrt(varianza);
};

// ---------- Logro 2: categorización por monto (en valor absoluto) ----------
// bajo: < 100 · medio: 100 a 999.99 · alto: ≥ 1000
const categorizarPorMonto = valores => ({
  bajo: valores.filter(valor => Math.abs(valor) < 100),
  medio: valores.filter(valor => Math.abs(valor) >= 100 && Math.abs(valor) < 1000),
  alto: valores.filter(valor => Math.abs(valor) >= 1000)
});

// ---------- Salida (IMPURA: console.log es un efecto) ----------

const imprimirReporte = (nombres, valores) => {
  console.log('--- Resumen Final ---');

  valores.forEach((valor, indice) => {
    const tipo = valor > 0 ? 'ingreso' : 'gasto';
    console.log(`  ${indice + 1}. ${nombres[indice]} (${tipo}): $${Math.abs(valor).toFixed(2)}`);
  });

  const reporte = generarValoresReporte(valores);
  console.log('Total movimientos:', reporte[0]);
  console.log('Total ingresos: $' + reporte[1].toFixed(2));
  console.log('Total gastos: $' + Math.abs(reporte[2]).toFixed(2));
  console.log('Saldo: $' + reporte[3].toFixed(2));
};
