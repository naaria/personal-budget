// =========================================================
// Laboratorio 06 — app.js (versión funcional)
// La captura sigue siendo imperativa (C05); el reporte usa
// las funciones puras de functional-utils.js.
// =========================================================

let nombres = [];
let valores = [];

// Captura imperativa (C05) — la mantenemos
function registrarMovimiento() {
  const nombre = (prompt('Nombre del movimiento:') || '').trim();
  const tipo = (prompt('Tipo (ingreso / gasto):') || '').trim().toLowerCase();
  const monto = parseFloat(prompt('Monto:'));

  if (!nombre || (tipo !== 'ingreso' && tipo !== 'gasto') || isNaN(monto) || monto <= 0) {
    alert('Datos inválidos.');
    return;
  }

  // Sin for: .some() responde si algún nombre ya existe
  if (nombres.some(existente => existente.toLowerCase() === nombre.toLowerCase())) {
    alert(`Ya existe un movimiento llamado "${nombre}". Usa otro nombre.`);
    return;
  }

  const valor = tipo === 'ingreso' ? monto : -monto;
  nombres.push(nombre);
  valores.push(valor);
}

// Acepta "si", "sí", "SI"… (arrow function compacta)
const quiereContinuar = respuesta => ['si', 'sí'].includes((respuesta || '').trim().toLowerCase());

let continuar = 'si';
while (quiereContinuar(continuar)) {
  registrarMovimiento();
  continuar = prompt('¿Registrar otro movimiento? (si/no):');
}

// Reporte funcional (C06) — todo viene de functional-utils.js
imprimirReporte(nombres, valores);
console.log('Promedio de ingresos: $' + promedioIngresos(valores).toFixed(2));

// Retos y logros
console.log('Cantidad de gastos:', contarGastos(valores));
console.log('Promedio por movimiento (absoluto): $' + promedioMovimiento(valores).toFixed(2));
console.log('¿Gastos dentro de un límite de $500?', validarPresupuesto(valores, 500));
console.log('Ingreso más alto: $' + ingresoMasAlto(valores).toFixed(2));
console.log('Gasto más negativo: $' + gastoMasNegativo(valores).toFixed(2));
console.log('Mediana: $' + mediana(valores).toFixed(2));
console.log('Desviación estándar: $' + desviacionEstandar(valores).toFixed(2));
console.log('Categorías por monto:', categorizarPorMonto(valores));
