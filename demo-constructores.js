// =========================================================
// Demostración en consola de las funciones constructoras
// (abre constructores.html y la consola con F12 / Cmd + Option + J)
// =========================================================

console.log('%c Laboratorio 07 — Funciones constructoras ', 'background:#1e3a12;color:#d9f99d;font-size:14px;padding:4px 8px;border-radius:4px');

// 1) Crear objetos con `new`
const salario = new Movimiento('Salario', 'ingreso', 3000);
const cena = new Movimiento('Cena', 'gasto', 45.50);
const freelance = new Movimiento('Freelance', 'ingreso', 500);
const transporte = new Movimiento('Transporte', 'gasto', 30);

console.log('1) Objeto creado con new Movimiento(...):', salario);
console.log('   salario.datosMovimiento() →', salario.datosMovimiento());
console.log('   salario.esIngreso() →', salario.esIngreso(), '| cena.esGasto() →', cena.esGasto());

// 2) Sistema de presupuesto con múltiples objetos
const miPresupuesto = new Presupuesto();
miPresupuesto.agregar(salario);
miPresupuesto.agregar(cena);
miPresupuesto.agregar(freelance);
miPresupuesto.agregar(transporte);

console.log('2) Presupuesto con', miPresupuesto.movimientos.length, 'objetos Movimiento:');
console.table(miPresupuesto.movimientos.map(movimiento => ({
  nombre: movimiento.nombre,
  tipo: movimiento.tipo,
  valor: movimiento.valor,
  texto: movimiento.datosMovimiento()
})));

console.log('3) miPresupuesto.resumen() →', miPresupuesto.resumen());

// 4) Validación: un movimiento inválido no se agrega
const invalido = new Movimiento('', 'regalo', -5);
console.log('4) ¿Se agregó un movimiento inválido?', miPresupuesto.agregar(invalido));

// 5) Buscar y eliminar
console.log('5) buscarPorNombre("free") →', miPresupuesto.buscarPorNombre('free').datosMovimiento());
miPresupuesto.eliminar('Cena');
console.log('   Después de eliminar "Cena" → saldo: $' + miPresupuesto.saldo().toFixed(2));

// 6) Cada objeto es una instancia de su constructor
console.log('6) salario instanceof Movimiento →', salario instanceof Movimiento,
  '| miPresupuesto instanceof Presupuesto →', miPresupuesto instanceof Presupuesto);

// 7) Diferencia con `class`: aquí cada objeto tiene SU PROPIA copia del método
console.log('7) ¿salario y cena comparten la misma función esIngreso?', salario.esIngreso === cena.esIngreso);
