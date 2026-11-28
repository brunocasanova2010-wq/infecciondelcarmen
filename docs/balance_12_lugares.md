# Balance de los doce lugares
**Bruno · Sprint 5**

`node tools/balance.js` recorre **todas** las combinaciones de decisiones (no una muestra) y anota con qué estado se llega a cada final. Resultado real de la última corrida:

```
A: 9 camino(s)   | salud 70-90 (prom 78)  moral 45-80 (prom 62)  recursos 2-5
B: 55 camino(s)  | salud 60-85 (prom 70)  moral 45-100 (prom 75) recursos 0-5
C: 117 camino(s) | salud 55-85 (prom 69)  moral 20-95 (prom 54) recursos 0-5
Total de partidas posibles: 181
```

## Qué dicen estos números

1. **El final A es el más difícil**: 9 de 181 (5 %). No es un accidente: para el A hay que conseguir las llaves, llegar entero (salud ≥ 50), mantener la moral (≥ 40) y tener al menos 2 recursos. Es el final «bien jugado».
2. **El final B es el más común** (55): llegar al refugio no exige llaves, pero sí llegar con resto.
3. **El final C es el más frecuente** (117) porque también es el que sale cuando elegís el descampado a propósito, aunque tengas todo perfecto. Es el final de la decisión, no del fracaso.
4. **Todos los finales son alcanzables** y ninguno depende de un solo camino: hay 9 formas de llegar al A, 55 al B y 117 al C.

## Los umbrales (en `tools/reglas.js`)

| Variable | Rango | Arranca en |
|---|---|---|
| Salud | 0 a 100 | 100 |
| Moral | 0 a 100 | 50 |
| Recursos | 0 a 5 | 1 |

| Final | Condición |
|---|---|
| A | salida en camioneta **y** llaves **y** salud ≥ 50 **y** moral ≥ 40 **y** recursos ≥ 2 |
| B | salida en el refugio **y** salud ≥ 40 **y** moral ≥ 30 |
| C | cualquier otro caso |

## El Game Over

La salud en 0 corta la partida en el acto, en cualquier lugar (no solo al final). **Con estos números no se alcanza**: el daño máximo por camino es de unos 45 puntos y la salud arranca en 100. Queda como red de seguridad y se cuenta igual en las estadísticas del usuario (`Game Over: 0`). Si en el futuro se agrega un lugar más peligroso, el sistema ya está.

> Esto está dicho a propósito: es preferible un juego donde siempre llegás a un final que uno donde morís por azar. Si el profe pregunta «¿y el Game Over?», la respuesta es: existe, está implementado, y la prueba `tools/prueba_reglas.js` verifica que la salud en 0 lo dispare.

## Cómo se probó

```
node tools/prueba_rutas.js     -> 12 OK, 0 fallaron
node tools/prueba_reglas.js    ->  9 OK, 0 fallaron
node tools/balance.js          -> 181 partidas, A/B/C alcanzables
```

`tools/prueba_rutas.js` no mira dibujos: mira que ningún botón lleve a un lugar que no existe, que los 12 fondos estén en disco, que desde el aula salgan 3 lugares distintos y que la camioneta esté bloqueada sin llaves.
