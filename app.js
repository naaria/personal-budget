// =========================================================
// Laboratorio 08 — el Gestor cobra vida
// El formulario reemplaza a prompt(): reusa Movimiento y Presupuesto (C07)
// y actualiza el saldo y la lista en vivo.
// =========================================================

const miPresupuesto = new Presupuesto();

// Datos de ejemplo de C07 (puedes borrarlos con el botón ✕)
miPresupuesto.agregar(new Movimiento('Salario', 'ingreso', 3000));
miPresupuesto.agregar(new Movimiento('Cena', 'gasto', 45.5));
miPresupuesto.agregar(new Movimiento('Freelance', 'ingreso', 500));

// Referencias al DOM
const form = document.getElementById('form-movimiento');
const inputNombre = document.getElementById('nombre');
const selectTipo = document.getElementById('tipo');
const inputMonto = document.getElementById('monto');
const errorForm = document.getElementById('error-form');
const saldoEl = document.getElementById('saldo');
const ingresosEl = document.getElementById('total-ingresos');
const gastosEl = document.getElementById('total-gastos');
const avisoEl = document.getElementById('aviso-limite');
const cantidadEl = document.getElementById('cantidad');
const lista = document.getElementById('lista-movimientos');

const formatear = monto => '$' + monto.toFixed(2);

function crearFila(movimiento) {
  const li = document.createElement('li');
  li.className = 'flex items-center justify-between gap-3 py-3';

  const texto = document.createElement('span');
  texto.className = 'font-medium text-slate-800';
  texto.textContent = movimiento.nombre + ' ';   // textContent: el texto nunca se interpreta como HTML

  const tipo = document.createElement('span');
  tipo.className = 'text-sm font-normal text-slate-400';
  tipo.textContent = `(${movimiento.tipo})`;
  texto.append(tipo);

  const derecha = document.createElement('span');
  derecha.className = 'flex items-center gap-2';

  const monto = document.createElement('span');
  monto.className = movimiento.esIngreso()
    ? 'font-semibold text-emerald-600'
    : 'font-semibold text-rose-600';
  monto.textContent = (movimiento.esIngreso() ? '+' : '-') + formatear(movimiento.valor);

  const borrar = document.createElement('button');
  borrar.type = 'button';
  borrar.className = 'rounded-md px-2 py-1 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400';
  borrar.textContent = '✕';
  borrar.setAttribute('aria-label', `Eliminar ${movimiento.nombre}`);
  borrar.addEventListener('click', () => {
    miPresupuesto.eliminar(movimiento.nombre);
    render();
  });

  derecha.append(monto, borrar);
  li.append(texto, derecha);
  return li;
}

function render() {
  const resumen = miPresupuesto.resumen();

  saldoEl.textContent = formatear(resumen.saldo);
  saldoEl.className = resumen.saldo < 0
    ? 'mt-1 text-4xl font-bold text-rose-600'
    : 'mt-1 text-4xl font-bold text-blue-600';
  ingresosEl.textContent = formatear(resumen.ingresos);
  gastosEl.textContent = formatear(resumen.gastos);
  cantidadEl.textContent = resumen.cantidad === 1 ? '1 movimiento' : `${resumen.cantidad} movimientos`;

  const limites = miPresupuesto.verificarLimites();
  avisoEl.textContent = resumen.cantidad === 0 ? '' : limites.mensaje;
  avisoEl.className = limites.alerta
    ? 'mt-4 text-sm font-medium text-amber-700'
    : 'mt-4 text-sm text-slate-500';

  if (resumen.cantidad === 0) {
    const vacio = document.createElement('li');
    vacio.className = 'py-6 text-center text-slate-400';
    vacio.textContent = 'Aún no hay movimientos. Agrega el primero con el formulario.';
    lista.replaceChildren(vacio);
    return;
  }

  lista.replaceChildren(...miPresupuesto.movimientos.map(crearFila));
}

form.addEventListener('submit', evento => {
  evento.preventDefault();   // evita que la página se recargue

  const nombre = inputNombre.value.trim();
  const movimiento = new Movimiento(nombre, selectTipo.value, parseFloat(inputMonto.value));

  if (!movimiento.esValido()) {
    errorForm.textContent = 'Completa el nombre y un monto mayor a 0.';
    (nombre ? inputMonto : inputNombre).focus();
    return;
  }
  if (miPresupuesto.existeNombre(nombre)) {
    errorForm.textContent = `Ya existe un movimiento llamado "${nombre}".`;
    inputNombre.focus();
    return;
  }

  miPresupuesto.agregar(movimiento);
  errorForm.textContent = '';
  form.reset();
  inputNombre.focus();
  render();
});

render();
