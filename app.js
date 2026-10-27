// =========================================================
// Laboratorio 05 — Programación imperativa + arrays
// =========================================================

// 1) Globales: 2 arrays paralelos.
//    nombres[i] y valores[i] describen el MISMO movimiento.
//    Convención de signos: positivo = ingreso, negativo = gasto.
let nombres = [];
let valores = [];

// 2) Funciones imperativas (no reciben parámetros y usan el estado global)

function registrarMovimiento() {
  const nombre = prompt('Nombre del movimiento:');
  const tipo = (prompt('Tipo (ingreso / gasto):') || '').trim().toLowerCase();
  const monto = parseFloat(prompt('Monto:'));

  if (!nombre || (tipo !== 'ingreso' && tipo !== 'gasto') || isNaN(monto) || monto <= 0) {
    alert('Datos inválidos. Intenta de nuevo.');
    return; // sale de la función sin guardar
  }

  // Logro 2: no permitir nombres repetidos (sin distinguir mayúsculas)
  for (let i = 0; i < nombres.length; i++) {
    if (nombres[i].toLowerCase() === nombre.trim().toLowerCase()) {
      alert('Ya existe un movimiento llamado "' + nombres[i] + '". Usa otro nombre.');
      return;
    }
  }

  // calcular el valor con signo
  let valor;
  if (tipo === 'ingreso') {
    valor = monto;
  } else {
    valor = -monto;
  }

  // guardar en AMBOS arrays — siempre juntos
  nombres.push(nombre.trim());
  valores.push(valor);

  console.log('Movimiento registrado:', nombre.trim(), valor);
}

function calcularSaldo() {
  let saldo = 0;
  for (let i = 0; i < valores.length; i++) {
    saldo = saldo + valores[i];
  }
  return saldo;
}

function mostrarResumen() {
  // Reto P3: desglose por tipo con dos acumuladores en el mismo for
  // Logro 1: ingreso más alto y gasto más bajo (más negativo)
  let totalIngresos = 0;
  let totalGastos = 0;
  let indiceIngresoMayor = -1;
  let indiceGastoMayor = -1;

  for (let i = 0; i < valores.length; i++) {
    if (valores[i] > 0) {
      totalIngresos = totalIngresos + valores[i];
      if (indiceIngresoMayor === -1 || valores[i] > valores[indiceIngresoMayor]) {
        indiceIngresoMayor = i;
      }
    } else {
      totalGastos = totalGastos + valores[i];
      if (indiceGastoMayor === -1 || valores[i] < valores[indiceGastoMayor]) {
        indiceGastoMayor = i;
      }
    }
  }

  console.log('--- Resumen Final ---');
  console.log('Total de movimientos:', nombres.length);
  console.log('Total ingresos: $' + totalIngresos.toFixed(2));
  console.log('Total gastos: $' + Math.abs(totalGastos).toFixed(2));
  console.log('Saldo total: $' + calcularSaldo().toFixed(2));

  if (indiceIngresoMayor !== -1) {
    console.log('Ingreso más alto: ' + nombres[indiceIngresoMayor] + ' ($' + valores[indiceIngresoMayor].toFixed(2) + ')');
  }
  if (indiceGastoMayor !== -1) {
    console.log('Gasto más bajo (más negativo): ' + nombres[indiceGastoMayor] + ' ($' + valores[indiceGastoMayor].toFixed(2) + ')');
  }
}

// Reto P2: acepta "si", "sí", "SI", "Si"… (null si se cancela el prompt)
function quiereContinuar(respuesta) {
  const texto = (respuesta || '').trim().toLowerCase();
  return texto === 'si' || texto === 'sí';
}

// 3) Flujo de ejecución
let continuar = 'si';
while (quiereContinuar(continuar)) {
  registrarMovimiento();
  continuar = prompt('¿Registrar otro movimiento? (si/no):');
}
mostrarResumen();
