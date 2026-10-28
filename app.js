// =========================================================
// Laboratorio 08 — Parte 5: conectar el Gestor
// El JavaScript es solo el "cable" entre el formulario y el modelo de C07.
// =========================================================

const form  = document.getElementById('form-mov');
const lista = document.getElementById('lista');
const presupuesto = new Presupuesto();

// Movimientos de ejemplo (antes estaban escritos a mano en el HTML)
presupuesto.agregar(new Movimiento('Salario', 'ingreso', 3000, 'sueldo'));
presupuesto.agregar(new Movimiento('Cena', 'gasto', 45.50, 'comida'));
presupuesto.agregar(new Movimiento('Freelance', 'ingreso', 500, 'trabajo'));

// Escapa los caracteres especiales para que lo que escribe la persona
// (por ejemplo "<b>") se muestre como texto y no se interprete como HTML.
function escaparHTML(texto) {
  return texto
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

// Construye el <li> de un movimiento (mismo estilo que armaste en P3)
function liHTML(m) {
  // 1. Evaluamos si es ingreso
  const ingreso = m.esIngreso();

  // 2. Declaramos las variables usando 'let' porque vamos a asignarles un valor más adelante
  let caja;
  let texto;
  let signo;

  // 3. Estructura condicional clásica
  if (ingreso) {
    caja = 'bg-green-50 border-green-500 dark:bg-green-950';
    texto = 'text-green-700 dark:text-green-300';
    signo = '+';
  } else {
    caja = 'bg-red-50 border-red-500 dark:bg-red-950';
    texto = 'text-red-700 dark:text-red-300';
    signo = '-';
  }

  // 4. Retornamos la plantilla HTML (Logro 3: badge de categoría)
  return `<li class="flex items-center justify-between p-3 border-l-4 rounded ${caja}">
            <span class="text-gray-800 dark:text-gray-100">
              <span class="font-medium">${escaparHTML(m.nombre)}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">(${m.tipo})</span>
              <span class="ml-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300">${m.categoria}</span>
            </span>
            <span class="font-semibold ${texto}">${signo}$${m.valor.toFixed(2)}</span>
          </li>`;
}

// Pinta la lista, el saldo y las cajitas de ingresos/gastos desde el Presupuesto
function render() {
  // 1. Lista: cada movimiento → <li> (map), se unen sin comas (join) y se reemplaza el contenido
  lista.innerHTML = presupuesto.movimientos.map(liHTML).join('');

  // 2. Saldo
  document.getElementById('saldo').textContent = '$' + presupuesto.saldo().toFixed(2);

  // 3. Reto: también se actualizan las cajitas de Ingresos y Gastos
  document.getElementById('ingresos').textContent = '$' + presupuesto.totalIngresos().toFixed(2);
  document.getElementById('gastos').textContent = '$' + presupuesto.totalGastos().toFixed(2);
}

// Al enviar el formulario: crea el movimiento, lo agrega y re-pinta
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const nombre    = document.getElementById('nombre').value.trim();
  const tipo      = document.getElementById('tipo').value;
  const categoria = document.getElementById('categoria').value;
  const valor     = parseFloat(document.getElementById('monto').value);
  const error     = document.getElementById('error');

  // agregar() devuelve false si el movimiento no es válido o el nombre ya existe (C07)
  const agregado = presupuesto.agregar(new Movimiento(nombre, tipo, valor, categoria));
  if (!agregado) {
    error.textContent = 'Revisa los datos: el nombre no puede repetirse y el monto debe ser mayor a 0.';
    return;
  }

  error.textContent = '';
  render();
  e.target.reset();
});

render();   // pinta los ejemplos al cargar
