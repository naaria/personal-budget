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
  let icono;
  let texto;
  let signo;
  let flecha;

  // 3. Estructura condicional clásica
  if (ingreso) {
    icono = 'bg-lime-200 text-green-900';
    texto = 'text-green-600 dark:text-green-400';
    signo = '+';
    flecha = '↙';   // el dinero entra
  } else {
    icono = 'bg-red-100 text-red-700';
    texto = 'text-red-600 dark:text-red-400';
    signo = '-';
    flecha = '↗';   // el dinero sale
  }

  // 4. Retornamos la plantilla HTML (Logro 3: badge de categoría)
  return `<li class="flex items-center justify-between gap-3 py-3">
            <div class="flex items-center gap-3">
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full text-lg ${icono}" aria-hidden="true">${flecha}</span>
              <div>
                <p class="font-medium">${escaparHTML(m.nombre)}</p>
                <p class="text-xs text-neutral-500 dark:text-neutral-400">
                  ${m.tipo}
                  <span class="ml-1 rounded-full bg-neutral-100 px-2 py-0.5 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">${m.categoria}</span>
                </p>
              </div>
            </div>
            <span class="whitespace-nowrap text-lg font-medium ${texto}">${signo}$${m.valor.toFixed(2)}</span>
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
