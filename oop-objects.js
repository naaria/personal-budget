// =========================================================
// Laboratorio 07 — Objetos + POO con class
// =========================================================

// ---------- class Movimiento (construida por capas) ----------
// Capa 1: el molde · Capa 2: constructor con propiedades · Capa 3: métodos
class Movimiento {
  // C08 (Logro 3): categoria es opcional; si no se pasa, vale 'general'
  constructor(nombre, tipo, valor, categoria = 'general') {
    this.nombre = nombre;   // "guarda en ESTE objeto la propiedad nombre"
    this.tipo = tipo;       // 'ingreso' o 'gasto' (explícito, ya no por signo)
    this.valor = valor;     // SIEMPRE positivo
    this.categoria = categoria;
    this.fecha = new Date().toLocaleDateString();
    this.creadoEn = new Date(); // fecha completa, para poder calcular diferencias
  }

  esIngreso() {
    return this.tipo === 'ingreso';
  }

  esGasto() {
    return this.tipo === 'gasto';
  }

  datosMovimiento() {
    let signo;

    if (this.esIngreso()) {
      signo = '+';
    } else {
      signo = '-';
    }

    return `${this.nombre} (${this.tipo}): ${signo}$${this.valor.toFixed(2)}`;
  }

  // Reto P2: días desde que se creó el movimiento hasta hoy.
  // `this.fecha` es un texto ("27/10/2026"), por eso se usa `this.creadoEn` (un Date).
  antiguedadEnDias(hoy = new Date()) {
    const MS_POR_DIA = 1000 * 60 * 60 * 24;
    return Math.floor((hoy - this.creadoEn) / MS_POR_DIA);
  }

  // Logro 2: valida sus propios datos
  esValido() {
    const nombreOk = typeof this.nombre === 'string' && this.nombre.trim() !== '';
    const tipoOk = this.tipo === 'ingreso' || this.tipo === 'gasto';
    const valorOk = typeof this.valor === 'number' && !isNaN(this.valor) && this.valor > 0;
    return nombreOk && tipoOk && valorOk;
  }
}

// ---------- class Presupuesto: encapsula datos + métodos ----------
class Presupuesto {
  constructor() {
    this.movimientos = [];          // propiedad: el array de movimientos
  }

  existeNombre(nombre) {
    return this.movimientos.some(movimiento =>
      movimiento.nombre.toLowerCase() === nombre.trim().toLowerCase());
  }

  // Logro 2: solo acepta movimientos válidos y con nombre único.
  // Devuelve true si lo agregó y false si lo rechazó.
  agregar(movimiento) {
    if (!movimiento.esValido() || this.existeNombre(movimiento.nombre)) {
      return false;
    }
    this.movimientos.push(movimiento);
    return true;
  }

  eliminar(nombre) {
    this.movimientos = this.movimientos.filter(movimiento => movimiento.nombre !== nombre);
  }

  obtenerIngresos() {
    return this.movimientos.filter(movimiento => movimiento.esIngreso());
  }

  obtenerGastos() {
    return this.movimientos.filter(movimiento => movimiento.esGasto());
  }

  // Llama a obtenerIngresos() y acumula el valor de ese array resultante
  totalIngresos() {
    return this.obtenerIngresos()
      .reduce((acumulador, movimiento) => acumulador + movimiento.valor, 0);
  }

  // Llama a obtenerGastos() y acumula el valor de ese array resultante
  totalGastos() {
    return this.obtenerGastos()
      .reduce((acumulador, movimiento) => acumulador + movimiento.valor, 0);
  }

  saldo() {
    return this.totalIngresos() - this.totalGastos();
  }

  buscarPorNombre(texto) {
    return this.movimientos.find(movimiento =>
      movimiento.nombre.toLowerCase().includes(texto.toLowerCase()));
  }

  resumen() {
    return {
      cantidad: this.movimientos.length,
      ingresos: this.totalIngresos(),
      gastos: this.totalGastos(),
      saldo: this.saldo()
    };
  }

  // Reto P3: los n gastos más grandes (filtra → ordena desc → corta)
  topGastos(n) {
    return this.obtenerGastos()
      .sort((a, b) => b.valor - a.valor)   // obtenerGastos() ya es un array nuevo: no muta this.movimientos
      .slice(0, n);
  }

  // Logro 1: avisa cuando los gastos superan el 80 % de los ingresos
  verificarLimites() {
    const ingresos = this.totalIngresos();
    const gastos = this.totalGastos();
    const porcentaje = ingresos === 0 ? (gastos > 0 ? 100 : 0) : (gastos / ingresos) * 100;
    const alerta = porcentaje > 80;

    return {
      alerta,
      porcentaje,
      mensaje: alerta
        ? `⚠️ Tus gastos ya son el ${porcentaje.toFixed(1)}% de tus ingresos (límite: 80%).`
        : `✅ Tus gastos son el ${porcentaje.toFixed(1)}% de tus ingresos.`
    };
  }
}
