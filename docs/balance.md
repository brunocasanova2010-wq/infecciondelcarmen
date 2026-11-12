# Balance del prototipo — cómo se ajustaron las variables
**Autor: Bruno Casanova** (lógica y balance)

Este documento explica **qué se cambió, por qué y cómo se comprobó**. Fue
hecho respondiendo a la devolución: *"no alcanza con asignar
responsabilidades en un documento"* y *"cada integrante debe poder
demostrar su aporte"*.

---

## 1. El problema que encontramos

En la versión anterior del código, el **Final A era casi imposible**. Lo probamos
con un programa (`tools/prueba_recorridos.js`) que juega **los 729 caminos**
posibles (3 opciones × 6 etapas = 3⁶). El resultado fue:

| Versión | Final A | Final B | Final C | Game Over |
|---|---|---|---|---|
| Antes | **21** (2,9%) | 643 | 64 | 1 |
| Después | **140** (19,2%) | 94 | 477 | 18 |

Es decir: en la versión anterior, **solo 21 recorridos de 729** llegaban al final
"bueno", y el Game Over se alcanzaba en **un solo camino**. Eso es un error de
balance, no de código: el juego "funcionaba" pero era injusto.

## 2. Qué decisión de diseño tomé

El final no puede depender solo de números, porque el jugador no ve por qué
perdió. Decidí que **cómo escapan en la Etapa 6 también define el final**:

- **Salir en la camioneta** es la única forma de llegar al **Final A**
  (necesitás las llaves de la Etapa 3 y recursos).
- **Huir a pie** o **refugiarse** lleva siempre al **Final C**, aunque llegues
  con la Salud alta: es una huida desesperada, no una victoria.
- El **Final B** queda para quien sobrevive con lo justo y se atrinchera.

Así el jugador **entiende** por qué llegó a un final: la última decisión pesa.

## 3. Reglas finales (en `webapp/js/finales.js`)

| Final | Condición |
|---|---|
| **A — Supervivientes Organizados** | Salud ≥ 45 **y** Recursos ≥ 2 **y** salieron en la camioneta |
| **B — Refugiados en la Fortaleza** | el resto (Salud ≥ 25, Moral > 10, no cumplen A) |
| **C — Huida Desesperada** | Salud < 25 **o** Moral ≤ 10 **o** salieron a pie / refugiados |
| **GAME OVER** | Salud = 0 en cualquier momento (independiente de los finales) |

Son **mutuamente excluyentes** y **cubren el 100%** de los casos: lo verifica
la prueba automática.

## 4. Los ajustes concretos (y por qué)

| Cambio | Por qué |
|---|---|
| Arrancan con **1 recurso** (antes 0) | Sin recursos, la primera opción que los pide quedaba bloqueada y el jugador no entendía por qué. Con 1, la mecánica se entiende desde el inicio. |
| Juntar provisiones en la Etapa 3 da **+2 recursos** (antes +1) | Es la etapa "de recursos"; +1 no compensaba el riesgo. |
| Buscar las llaves cuesta **−30 de Salud** (antes −20) | Las llaves dan el Final A: tenían que costar algo real. |
| Rescatar a Tomás da **+25 de Moral** | Rescatar es la decisión "correcta" del juego y debía notarse en el final. |
| Reparar la radio **no gasta recurso** pero da **+15 de Moral** | Antes gastaba el recurso que hacía falta para el Final A: el jugador era castigado por hacer algo bueno. |
| Huir a pie: **−25 Salud, +5 Moral, −1 recurso** | Es rápido y no cuesta moral, pero desgasta el cuerpo: cierra en Final C. |
| Refugiarse: exige 1 recurso y da **+5 Moral** | Es la opción "cobarde pero sensata": cierra en Final C con buena moral. |
| Si la Moral llega a 0, **el grupo pierde 20 de Salud** | Regla de consecuencias cruzadas: descuidar la moral tiene costo físico. |

Los valores exactos están en `webapp/js/datos.js` (cada opción tiene su
`efectos` y su comentario).

## 5. Cómo lo comprobé (reproducible)

Dos programas en la carpeta `tools/`:

```
node tools/prueba_recorridos.js   -> juega los 729 caminos y avisa si algo se traba
node tools/balance.js            -> muestra cuántos caminos van a cada final
node tools/matriz_verificacion.js -> imprime caminos elegidos a mano, paso a paso
```

Salida actual de la prueba:

```
Recorridos probados: 729
Se trabó algun recorrido: 0
Valores fuera de rango: 0
Final A: 140 | Final B: 94 | Final C: 477
GAME OVER (independiente): 18
Caminos con Tomas rescatado: 470 | con Tomas abandonado: 241
RESULTADO: OK - pasaron todas las pruebas
```

> Si no tienen Node.js instalado, los resultados están copiados en
> `docs/registro_pruebas.md`, que es la evidencia de que se corrió.

## 6. Qué puedo defender en la devolución

- **Por qué arrancan con 1 recurso**: porque con 0 la primera opción bloqueada
  parecía un error del juego, no una decisión. Lo probé con el programa de 729 caminos.
- **Por qué el final depende de la camioneta**: porque con las reglas viejas solo
  21 de 729 caminos llegaban al final bueno; ahora llegan 140 y el jugador
  entiende por qué (la última decisión pesa).
- **Por qué la radio no cuesta recurso**: porque castigaba al jugador por hacer
  algo bueno y le quitaba la chance del Final A sin explicación.
