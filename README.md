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

### Entrega del Lab 07: versión con funciones constructoras

La entrega pide la forma clásica de POO en JavaScript, así que el mismo modelo también está escrito con **funciones constructoras**:

- `oop-constructores.js`: `function Movimiento(nombre, tipo, valor) {}` y `function Presupuesto() {}`, con métodos definidos como `this.metodo = function () {}`.
- `demo-constructores.js` + `constructores.html`: crea varios objetos con `new`, los agrega al presupuesto y muestra en consola el objeto, una tabla, `resumen()`, la validación, `buscarPorNombre`, `eliminar` e `instanceof`.
- **Demo en vivo:** https://naaria.github.io/personal-budget/constructores.html (abrir la consola).

Diferencia con `class`: con la función constructora, cada objeto guarda **su propia copia** de cada método (`salario.esIngreso === cena.esIngreso` → `false`). Con `class`, todas las instancias comparten el mismo método a través del prototipo.

## Laboratorio 08 — Tailwind CSS: el Gestor cobra vida

**Sitio:** https://naaria.github.io/personal-budget/ (la versión final del Lab 08 es la rama `main`)

Interfaz construida por grupos de clases de Tailwind (Play CDN, sin npm ni compilación). El diseño visual se inspira en un dashboard financiero de referencia (tarjetas redondeadas, acento verde lima, números grandes y finos), sin agregar funciones nuevas.

| Parte | Grupo | Clases usadas |
| --- | --- | --- |
| P1 | Layout (flex + grid) | `max-w-4xl mx-auto`, `grid gap-6`, `flex gap-4`, `flex-1`, `flex items-center justify-between` |
| P2 | Caja (espaciado + tamaño) | `min-h-screen`, `px-4 py-8`, `p-6`, `p-3`, `mt-4`, `mb-6`, `space-y-3`, `w-full` |
| P3 | Estética | Fuente Urbanist, `text-6xl font-light` para el saldo, tarjetas `bg-white rounded-3xl shadow-sm`, tarjeta destacada `bg-lime-300`, botón `bg-green-900 rounded-full`, ingresos en verde y gastos en rojo |
| P4 | Modificadores | `hover:bg-green-800 transition`, `focus:ring-2 focus:ring-lime-400`, `grid-cols-1 md:grid-cols-2` y `md:grid-cols-5` (mobile-first) |

**P5 — conexión con JavaScript (`app.js`):** reusa `Movimiento` y `Presupuesto` de C07. Al enviar el formulario se crea un `new Movimiento(...)`, se agrega con `presupuesto.agregar(...)` y `render()` vuelve a pintar la lista (`map(liHTML).join('')`) y el saldo.

Reto y logros:
- **Reto:** las cajitas de Ingresos y Gastos también se actualizan en cada `render()` (`totalIngresos()` / `totalGastos()`).
- **Logro 1 — Modo oscuro:** clases `dark:` que se activan con el modo oscuro del sistema.
- **Logro 2 — Micro-animación:** `transition hover:scale-105` en las cajitas del resumen y `hover:shadow-lg` en las tarjetas.
- **Logro 3 — Badge de categoría:** nuevo campo "Categoría" en el formulario; `Movimiento` recibe un 4.º parámetro opcional (`categoria = 'general'`).

Extras:
- Si `agregar()` rechaza el movimiento (monto inválido o nombre repetido, validado en C07), se muestra un mensaje de error.
- `escaparHTML()` evita que un nombre como `<b>Taxi</b>` se interprete como HTML al usar `innerHTML`.
- Cada campo tiene un `<label class="sr-only">` para lectores de pantalla.

## Cómo ver cada laboratorio

```bash
git checkout lab05   # o lab06, lab07 (el Lab 08 final está en main)
# abre index.html en el navegador (y la consola con F12 en los labs 05–07)
git checkout main    # para volver
```
