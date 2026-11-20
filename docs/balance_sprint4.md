# Balance del Sprint 4
**Autor: Bruno Casanova (lógica y balance)**

Acá está **solo** lo que cambió en este sprint. El balance completo del juego sigue en
`docs/balance.md`, que ya existía desde el Sprint 3.

---

## 1. Por qué arrancan con 1 recurso

La devolución pidió justificar el `recursos: 1` inicial (antes estaba en 0, y después pasó a 1 sin
explicación).

**Justificación:** en la Etapa 1, Leo agarra **una barra de metal** en el aula. Ese es el recurso.
Por eso:
- Las 13 opciones que piden 1 recurso son coherentes: se usa la barra (bengala, abrir la reja,
  reparar la radio).
- También funciona como **decisión**: gastar la barra en la reja te deja sin nada para la radio.
- Si empezaran en 0, el jugador no podría elegir ninguna opción de recurso hasta la Etapa 2.

El valor vive en un solo lugar: `REGLAS.inicial` (`tools/reglas.js`).

---

## 2. Qué números cambiaron

| Cosa | Sprint 3 | Sprint 4 | Por qué |
|---|---|---|---|
| Llaves en el Final A | No se miraban | **Obligatorias** | Eran decorativas |
| Salud del Final A | ≥ 45 | **≥ 50** | Coincidir con el comentario |
| Moral del Final A | No se miraba | **≥ 40** | La Moral tenía que pesar |
| Recursos del Final A | No se miraba | **≥ 2** | Quien llega al A no gastó todo |
| Final B | `!camioneta` → siempre C | **salud ≥ 40 y moral ≥ 30** | El C estaba absorbiendo todo |
| Penalización Moral 0 | −20 **por cada decisión** | **−20 una sola vez** | Castigaba dos veces el mismo golpe |
| Opción sin recursos | Avanzaba igual | **Botón deshabilitado** | Avanzaba por un camino escondido |

---

## 3. Cómo quedó repartido (medido, no estimado)

Corriendo `node tools/prueba_reglas.js` (recorre todos los caminos y cuenta dónde termina cada uno):

| Desenlace | Sprint 3 | Sprint 4 |
|---|---|---|
| Final A | 140 | **28** |
| Final B | 88 | **284** |
| Final C | 452 | **368** |
| Game Over | 16 | **16** |
| **A sin llaves** | **98** (error) | **0** |

**Lectura:** en el Sprint 3 el A era fácil porque no pedía llaves y el B casi no existía. Ahora el A
es el final difícil (28 de 696), el B es el premio por "llegar entero" sin camioneta, y el C queda
para quien huye a pie o llega destruido.

> Los 696 son los caminos que entran al árbol; los que quedan bloqueados por falta de recursos no
> se cuentan (el jugador no los puede elegir).

---

## 4. Las reglas, escritas una sola vez

```
A: llaves = true  Y  salieronCamioneta = true  Y  salud >= 50  Y  moral >= 40  Y  recursos >= 2
B: salieronCamioneta = false                  Y  salud >= 40  Y  moral >= 30
C: cualquier otro caso con salud > 0
Game Over: salud <= 0 (independiente, en cualquier momento)
```

Están en `REGLAS.umbrales` y `REGLAS.finales` (`tools/reglas.js`). `finales.js` las lee de ahí.
