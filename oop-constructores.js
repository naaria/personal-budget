// =========================================================
// Laboratorio 07 (entrega) — POO con FUNCIONES CONSTRUCTORAS
// Es la forma clásica de crear "moldes" de objetos, antes de `class`.
// La versión con `class` está en oop-objects.js (la usa el Gestor del Lab 08).
// =========================================================

// ---------- Función constructora Movimiento ----------
// Por convención, las funciones constructoras empiezan con mayúscula.
function Movimiento(nombre, tipo, valor) {
  // Propiedades: `this` es el objeto nuevo que está creando `new`
  this.nombre = nombre;
  this.tipo = tipo;        // 'ingreso' o 'gasto'
  this.valor = valor;      // siempre positivo
  this.fecha = new Date().toLocaleDateString();

  // Métodos: funciones guardadas como propiedades del objeto
  this.esIngreso = function () {
    return this.tipo === 'ingreso';
  };

  this.esGasto = function () {
    return this.tipo === 'gasto';
  };

  this.esValido = function () {
    const nombreOk = typeof this.nombre === 'string' && this.nombre.trim() !== '';
    const tipoOk = this.tipo === 'ingreso' || this.tipo === 'gasto';
    const valorOk = typeof this.valor === 'number' && !isNaN(this.valor) && this.valor > 0;
    return nombreOk && tipoOk && valorOk;
  };

  this.datosMovimiento = function () {
    let signo;
    if (this.esIngreso()) {
      signo = '+';
    } else {
      signo = '-';
    }
    return `${this.nombre} (${this.tipo}): ${signo}$${this.valor.toFixed(2)}`;
  };
}

// ---------- Función constructora Presupuesto ----------
// Encapsula el array de movimientos y todos los métodos que lo usan.
function Presupuesto() {
  this.movimientos = [];

  // Solo acepta movimientos válidos. Devuelve true si lo agregó.
  this.agregar = function (movimiento) {
    if (!movimiento.esValido()) {
      return false;
    }
    this.movimientos.push(movimiento);
    return true;
  };

  this.eliminar = function (nombre) {
    this.movimientos = this.movimientos.filter(movimiento => movimiento.nombre !== nombre);
  };

  this.obtenerIngresos = function () {
    return this.movimientos.filter(movimiento => movimiento.esIngreso());
  };

  this.obtenerGastos = function () {
    return this.movimientos.filter(movimiento => movimiento.esGasto());
  };

  this.totalIngresos = function () {
    return this.obtenerIngresos().reduce((acumulador, movimiento) => acumulador + movimiento.valor, 0);
  };

  this.totalGastos = function () {
    return this.obtenerGastos().reduce((acumulador, movimiento) => acumulador + movimiento.valor, 0);
  };

  this.saldo = function () {
    return this.totalIngresos() - this.totalGastos();
  };

  this.buscarPorNombre = function (texto) {
    return this.movimientos.find(movimiento =>
      movimiento.nombre.toLowerCase().includes(texto.toLowerCase()));
  };

  this.resumen = function () {
    return {
      cantidad: this.movimientos.length,
      ingresos: this.totalIngresos(),
      gastos: this.totalGastos(),
      saldo: this.saldo()
    };
  };
}
