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
