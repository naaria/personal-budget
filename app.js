// =========================================================
// Laboratorio 07 — app.js con objetos y clases
// Cada movimiento es una instancia de Movimiento y vive dentro
// de un Presupuesto (oop-objects.js).
// =========================================================

const miPresupuesto = new Presupuesto();

function registrarMovimiento() {
  const nombre = (prompt('Nombre del movimiento:') || '').trim();
  const tipo = (prompt('Tipo (ingreso / gasto):') || '').trim().toLowerCase();
  const valor = parseFloat(prompt('Monto:'));

  // 1 sola instancia por movimiento. valor SIEMPRE positivo: el tipo dice qué es.
  const movimiento = new Movimiento(nombre, tipo, valor);

  if (!movimiento.esValido()) {
    alert('Datos inválidos. Intenta de nuevo.');
    return;
  }
  if (miPresupuesto.existeNombre(nombre)) {
    alert(`Ya existe un movimiento llamado "${nombre}". Usa otro nombre.`);
    return;
  }

  miPresupuesto.agregar(movimiento);
}

const quiereContinuar = respuesta => ['si', 'sí'].includes((respuesta || '').trim().toLowerCase());

let continuar = 'si';
while (quiereContinuar(continuar)) {
  registrarMovimiento();
  continuar = prompt('¿Registrar otro movimiento? (si/no):');
}

// Reporte detallado (un solo argumento) + resumen con nombres en vez de posiciones
imprimirReporte(miPresupuesto.movimientos);
console.log('resumen():', miPresupuesto.resumen());

// Retos y logros
console.log(miPresupuesto.verificarLimites().mensaje);
console.log('Top 2 gastos:', miPresupuesto.topGastos(2).map(movimiento => movimiento.datosMovimiento()));
console.log('Agrupados por tipo:', agruparPorTipo(miPresupuesto.movimientos));
