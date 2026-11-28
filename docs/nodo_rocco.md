# Rocco, el perro guardián · Nodo «Patio · Rocco se planta»
**Guion: Benja · Lógica: Bruno · Arte: Santino**

---

## 1. Quién es Rocco

Rocco es el perro del colegio, con chapa «3° B». **No es un perro que se rescata: acompaña a Mateo desde la primera pantalla.** En el aula se le pega a la pierna y gruñe hacia la puerta; en el pasillo camina adelante; en el patio se planta delante del grupo; en la preceptoría es el único que puede pasar por el hueco de la pared. Si en algún momento se lo suelta para ganar tiempo, el juego lo registra y el final lo dice.

Lo que cambió respecto de la versión anterior: antes el nodo era «el perro bajo la reja», un perro atrapado en un patio con pasto que parecía el fondo de una casa. Eso hacía que Rocco apareciera una sola vez y desapareciera de la historia. Ahora el patio es **el patio del colegio de noche**: reja vencida, portón arrancado, una silueta del otro lado, y Rocco plantado adelante.

## 2. Guion literario · «Rocco se planta»

**Situación.** Patio interno del colegio, de noche. La alarma sigue sonando lejos, en el edificio. El grupo llega desde el aula por la ventana o desde el buffet por la ventana del fondo. Rocco va con ellos.

**Personajes.** Mateo (protagonista), Lucas y Sofía (grupo), Rocco (perro del colegio, chapa «3° B»), una silueta inmóvil del otro lado del hueco.

> **Mateo:** —Pará. Pará, pará. Hay alguien del otro lado.
>
> **Sofía:** —No es alguien. Está quieto de una forma que no es humana.
>
> *(Rocco pasa adelante. Las patas abiertas, el pelo del lomo parado, la correa tensa. No ladra: gruñe, corto, con el pecho.)*
>
> **Lucas:** —Si lo suelta, lo distrae. Y nosotros cruzamos.
>
> **Mateo:** —No lo voy a soltar para que se lo coma.
>
> **Sofía:** —Entonces levantamos la reja entre los dos y pasamos con él. Pero necesitamos la herramienta.

**Conflicto.** Las tres salidas del patio cuestan cosas distintas: soltar a Rocco cuesta salud y moral (se lastima y el grupo lo siente), levantar la reja cuesta un recurso pero es la única que lleva a la preceptoría por el hueco del fondo, y rodear por el buffet cuesta salud y bastante moral.

**Cierre.** Si el grupo cruzó con Rocco, el perro sigue en el HUD y el final lo nombra. Si lo soltó, el texto del final lo dice: «Rocco se quedó del otro lado, ganándoles unos segundos».

## 3. Guion técnico · 6 planos (20 segundos)

| Plano | Qué se ve | Qué se escucha | Duración |
|---|---|---|---|
| 1 | Plano general del patio: la reja vencida en diagonal, las ventanas rotas, la silueta al fondo | Viento, una chapa golpeando | 4 s |
| 2 | Mateo y Rocco entran juntos por la izquierda; la silueta no se mueve | Pasos, jadeo, la chapa del collar | 3 s |
| 3 | Detalle: la silueta avanza un paso, la sombra se estira sobre el piso | Pisadas lentas, aliento | 2 s |
| 4 | Contrapicado: Rocco se planta adelante, orejas atrás, gruñido; la correa tensa | Gruñido largo, sin ladrido | 3 s |
| 5 | Plano medio: Mateo levanta la reja entre los dos, la linterna barre el hueco | Metal raspando, respiración | 5 s |
| 6 | Plano general: el grupo del otro lado, Rocco último, mirando atrás | Respiración, música baja | 3 s |

**Duración total:** 20 segundos. En el prototipo el nodo no tiene animación propia: usa el fondo `Patio.svg` (rediseñado para este nodo) y el retrato `Personaje_Rocco.svg`.

## 4. Storyboard (6 viñetas)

Están en `docs/storyboard/`: `storyboard_6_vinetas.png` (la hoja completa) y `vineta_1.png` a `vineta_6.png` (una por plano). Cada viñeta trae el plano, la duración y el sonido en el rótulo.

## 5. Decisión y consecuencias (lo que está en el código)

| Opción | Requisito | Efectos | Rocco | Va a |
|---|---|---|---|---|
| Soltar a Rocco para que lo distraiga y cruzar | — | salud −10, moral −5 | se queda del otro lado | Galería |
| Levantar la reja caída entre los dos y pasar juntos | 1 recurso | recursos −1, moral +15, salud −5 | cruza con el grupo | Preceptoría |
| Volver por el buffet y rodear el patio | — | salud −5, moral −10 | cruza, pero el grupo pierde tiempo | Galería |

**Por qué no son tres botones iguales:** la primera no cuesta recurso pero se paga en salud y moral (y el final lo cuenta); la segunda cuesta un recurso y es la única que **te lleva a otro lugar** (la preceptoría, el atajo a las llaves); la tercera no cuesta recurso pero es la más cara en moral.

## 6. La mecánica de guardián (una sola regla)

Rocco acompaña desde el inicio, así que el estado arranca con `perro: true` y `perroAliado: true`.

| Situación | Con Rocco | Sin Rocco |
|---|---|---|
| Cualquier golpe o susto | el daño baja 5 puntos | el daño es completo |
| Preceptoría: «Mandar a Rocco por el hueco» | opción disponible, consigue las llaves sin ruido | la opción no aparece |
| Final | el texto lo nombra | el texto dice que se quedó atrás |

En `variables.js` el daño se aplica así: si `estado.perro` es verdadero, `daño + 5` (5 puntos menos de golpe). En `reglas.js`, la opción de la preceptoría pide `perro: true`. Las dos cosas están cubiertas por las pruebas automáticas.

## 7. Recorrido demostrado

```
AULA 3° B ─(ventana)→ PATIO ─(levantar la reja)→ PRECEPTORÍA ─(llaves)→ ESTACIONAMIENTO ─(camioneta)→ FINAL A
```

Variante que pierde a Rocco:

```
AULA 3° B ─(ventana)→ PATIO ─(soltar a Rocco)→ GALERÍA ─(preceptoría)→ ESTACIONAMIENTO ─(calle)→ FINAL B o C
```

## 8. Justificación frente a la devolución

El profe dijo dos cosas: que «siempre elegís lo que elegís vas al mismo lugar» y que los fondos se repetían. Este nodo ataca las dos, y además corrige el problema de que el perro apareciera una sola vez:

1. **Lugar propio y creíble**: el patio del colegio de noche, con reja vencida y portón arrancado. No es un patio de casa con pasto y banquito.
2. **Personaje con continuidad**: Rocco está en el aula, en el pasillo, en el patio, en la preceptoría y en el final. Se lo ve en el HUD desde la primera pantalla.
3. **Consecuencia que se ve**: soltar a Rocco cambia la salud, la moral y el texto del final; sin Rocco se pierde una opción entera en la preceptoría.
4. **Ruta que se bifurca**: dos de las tres opciones terminan en lugares diferentes (Galería y Preceptoría).
