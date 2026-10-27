# Gestor de Presupuesto Personal

Proyecto del Módulo 2: registra ingresos y gastos y calcula el saldo. Cada laboratorio evoluciona el mismo código; el estado de cada uno queda marcado con un tag de Git (`lab05`, `lab06`, …).

## Laboratorio 05 — Programación imperativa + arrays

Se usa desde la consola del navegador (F12 → Console).

- Modelo de datos: 2 arrays paralelos, `nombres[]` y `valores[]` (positivo = ingreso, negativo = gasto).
- `registrarMovimiento()`: captura con `prompt()`, valida con `if` (nombre vacío, tipo inválido, monto `NaN` o ≤ 0) y hace `push` en ambos arrays.
- `calcularSaldo()`: recorre `valores` con `for` y suma.
- `mostrarResumen()`: cantidad de movimientos y saldo.
- Flujo con `while` hasta que la respuesta no sea "si".

Retos y logros:
- Acepta "si", "sí", "SI" o "Si" para continuar (`.trim().toLowerCase()`).
- Desglose de ingresos y gastos con dos acumuladores en el mismo `for`.
- Ingreso más alto y gasto más bajo (más negativo).
- No permite nombres de movimiento repetidos.

## Laboratorio 06 — Programación funcional + arrow functions

- `functional-utils.js` con **17 funciones puras** (arrow functions, sin efectos, sin mutar el array original): `obtenerIngresos`, `obtenerGastos`, `montosAbsolutos`, `buscarPrimerGastoMayor`, `contarGastos`, `calcularSaldo`, `totalIngresos`, `totalGastos`, `generarValoresReporte`, `promedioMovimiento`, `promedioIngresos`, `validarPresupuesto`, `ingresoMasAlto`, `gastoMasNegativo`, `mediana`, `desviacionEstandar`, `categorizarPorMonto`.
- Los `for` de C05 desaparecen: se reemplazan por `.map()`, `.filter()`, `.find()`, `.reduce()` y `.forEach()`.
- `imprimirReporte(nombres, valores)` es la única función impura (usa `console.log`): se separa el cálculo (puro) de la salida (impura).
- Composición y DRY: `totalIngresos` reutiliza `obtenerIngresos`; `promedioIngresos` reutiliza `totalIngresos`.
- `mediana` ordena una copia (`[...valores]`) para no mutar el array original.
- Retos: `contarGastos`, `promedioMovimiento`, `validarPresupuesto`. Logros: `mediana`, `desviacionEstandar`, `categorizarPorMonto` (bajo < 100, medio 100–999, alto ≥ 1000).

## Laboratorio 07 — Objetos + POO con `class`

- **Nuevo modelo:** de 2 arrays paralelos (tipo por signo) a **1 array de objetos** `{ nombre, tipo, valor }` con tipo explícito y valor siempre positivo.
- `functional-utils.js` adaptado: filtra por `movimiento.tipo`, `calcularSaldo` ahora es `ingresos − gastos`, `buscarPrimerGastoMayor` usa `valor > monto`, `montosAbsolutos` se elimina e `imprimirReporte(movimientos)` recibe un solo argumento.
- `oop-objects.js`:
  - `class Movimiento` construida por capas (molde → constructor con `this` → métodos `esIngreso`, `esGasto`, `datosMovimiento`).
  - `class Presupuesto` encapsula el array y sus métodos: `agregar`, `eliminar`, `obtenerIngresos`, `obtenerGastos`, `totalIngresos`, `totalGastos`, `saldo`, `buscarPorNombre` y `resumen()`, que devuelve un objeto con nombres en vez de posiciones.
- Retos: `agruparPorTipo` con `.reduce`, `antiguedadEnDias()` y `topGastos(n)`.
- Logros: `verificarLimites()` (avisa si los gastos superan el 80 % de los ingresos) y `esValido()`, usado por `agregar` para rechazar movimientos inválidos o con nombre repetido.

`antiguedadEnDias()` usa `this.creadoEn` (un `Date`) porque `this.fecha` es un texto formateado y no se puede restar de forma fiable.

## Laboratorio 08 — Tailwind CSS: el Gestor cobra vida

- Interfaz con **Tailwind por Play CDN** (`<script src="https://cdn.tailwindcss.com">`), sin npm ni compilación.
- **Layout (P1):** `max-w-4xl mx-auto`, `grid` con `gap-6` para resumen + formulario, `flex gap-4` / `flex-1` para ingresos y gastos, y `flex items-center justify-between` en cada movimiento.
- **Caja (P2):** `px-4 py-8`, `p-6`, `p-3`, `mt-4`, `space-y-3`, `w-full`, `min-h-screen`.
- **Estética (P3):** tarjetas `bg-white rounded-2xl shadow-sm ring-1`, saldo en `text-4xl font-bold`, ingresos en verde (`emerald`) y gastos en rojo (`rose`).
- **Modificadores (P4):** `hover:bg-blue-700`, `focus:ring-2`, `focus-visible:` para teclado, `active:scale-[0.98]` y responsive mobile-first: `grid-cols-1 md:grid-cols-2` (apilado en móvil, 2 columnas desde 768 px).
- **JavaScript (P5):** el formulario reemplaza a `prompt()`. `app.js` reutiliza `Movimiento` y `Presupuesto` del Lab 07: crea la instancia, la valida con `esValido()` y `existeNombre()`, la agrega y vuelve a dibujar saldo, totales, aviso de límite (`verificarLimites()`) y lista. Cada movimiento tiene un botón ✕ que usa `eliminar()`.
- Seguridad: las filas se crean con `createElement` + `textContent`, así lo que escribe la persona nunca se interpreta como HTML.

La versión de consola (con `prompt`) de los labs anteriores sigue disponible en los tags `lab05`, `lab06` y `lab07`. `functional-utils.js` queda en el repo como la versión funcional del Lab 07; la interfaz no lo necesita porque usa los métodos de `Presupuesto`.

## Cómo ver cada laboratorio

```bash
git checkout lab05   # o lab06, lab07, lab08
# abre index.html en el navegador (y la consola con F12 en los labs 05–07)
git checkout main    # para volver
```
