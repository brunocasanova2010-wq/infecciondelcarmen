# Guion · Doce lugares
**Infección: Escape del Carmen — Sprint 5**
Guion: Benja · Lógica: Bruno

---

## 1. La historia en dos líneas

Es un simulacro de evacuación en el colegio. A los dos minutos deja de ser simulacro: hay gente corriendo en círculos en el patio y la dirección no contesta. Mateo junta al grupo en el aula de 3° B, con una herramienta en la mano y doce lugares por delante. **No hay un camino correcto: hay tres formas de salir** (la camioneta, la estación de servicio o el descampado) y cada una se gana o se pierde en el recorrido.

Desde la primera pantalla Mateo no está solo: **Rocco, el perro del colegio, se le pega a la pierna y va con él hasta el final**. No es un perro que aparece de golpe en un patio: es el que camina al lado del grupo en cada lugar y el que se planta cuando algo se acerca.

## 2. El mapa

```
                                  AULA 3° B
                    ┌──────────────────┼──────────────────┐
                 PASILLO             BUFFET              PATIO
              ┌─────┴─────┐        ┌────┴────┐         (Rocco)
        LABORATORIO   GIMNASIO     │      GALERÍA ←────────┘
              │           │        │         │
              └─────► GALERÍA ◄────┘      OFICINA
                        │                   │
                        └────► ESTACIONAMIENTO ◄──┘
                                     │
                          ┌──────────┴──────────┐
                     CAMIONETA               CALLE
                        │                  ┌───┴────┐
                     FINAL A            REFUGIO   a pie
                                           │         │
                                        FINAL B   FINAL C
```

**Doce lugares, doce fondos, un fondo por lugar.** Antes eran seis etapas en fila: se eligiera lo que se eligiera, se caía en la misma pantalla siguiente y con el mismo dibujo. Ahora desde el aula salen **tres lugares distintos** y cada uno abre caminos que el otro no tiene.

## 3. Los doce lugares

| # | Lugar | Fondo | Quién aparece | Qué se decide |
|---|-------|-------|---------------|----------------|
| 1 | Aula 3° B | `Fondo_01_Aula.svg` | Mateo + Rocco | por dónde salir: pasillo, buffet o patio |
| 2 | Pasillo norte | `Fondo_02_Pasillo.svg` | Lucas | abrir el laboratorio o seguir al gimnasio |
| 3 | Buffet | `Fondo_03_Buffet.svg` | Sofía | cargar provisiones, romper la máquina o ir al patio |
| 4 | Patio · Rocco se planta | `Patio.svg` | Rocco + una silueta | soltar a Rocco, levantar la reja entre dos o rodear |
| 5 | Laboratorio | `Fondo_04_Laboratorio.svg` | Mateo | sacar a Tomás, quedarse con la radio o romper el vidrio |
| 6 | Gimnasio | `Fondo_05_Gimnasio.svg` | Lucas | cruzar a la puerta de servicio o volver por la galería |
| 7 | Galería | `Galeria.svg` | Sofía | entrar a la preceptoría o ir directo al estacionamiento |
| 8 | Preceptoría | `Oficina.svg` | Mateo | romper el vidrio, mandar a Rocco o salir sin llaves |
| 9 | Estacionamiento | `Fondo_06_Estacionamiento.svg` | Sofía | tomar la camioneta o salir a la calle |
| 10 | Camioneta | `Camioneta.svg` | Mateo | insistir con el arranque o bajar y seguir a pie |
| 11 | Calle | `Calle.svg` | Sobreviviente | cruzar a la estación o rodear el descampado |
| 12 | Estación de servicio | `Refugio.svg` | Sobreviviente | entrar y bajar la persiana o seguir a pie |

## 4. Los textos, lugar por lugar

### 1 · Aula 3° B — «La alarma no era un simulacro»
Suena la chicharra y esta vez nadie se ríe: en el patio hay gente corriendo en círculos y una maestra golpeando la puerta de Dirección. Mateo cuenta cabezas. Falta Tomás, que estaba en el laboratorio. **Rocco, el perro del colegio, no se le despega de la pierna: le eriza el lomo y gruñe hacia la puerta.** Hay un minuto, una herramienta y tres salidas.

| Opción | Consecuencia | Va a |
|---|---|---|
| Atrancar la puerta con una silla y salir por el pasillo norte | moral +5 | Pasillo |
| Bajar al buffet: hay agua y comida para varios días | salud −5 | Buffet |
| Saltar por la ventana al patio, con Rocco adelante | salud −5, moral +5 | Patio |

### 2 · Pasillo norte — «Dos puertas y un ruido»
Del laboratorio sale un golpe rítmico, como una mano abierta contra el vidrio. Del otro lado, la puerta del gimnasio está abierta de par en par y da al estacionamiento.

| Opción | Consecuencia | Va a |
|---|---|---|
| Abrir el laboratorio: alguien golpea desde adentro | moral +5 | Laboratorio |
| Seguir de largo hasta el gimnasio | salud −10 | Gimnasio |

### 3 · Buffet — «Provisiones y ruido»
Las heladeras siguen frías. Hay agua, barras de cereal y una lata de duraznos. También hay vidrio roto: cada paso suena como un disparo. Por la ventana se ve el patio, la reja vencida y una silueta que se mece entre los yuyos.

| Opción | Consecuencia | Va a |
|---|---|---|
| Cargar las mochilas con todo lo que entre | recursos +2, salud −5, moral +5 | Galería |
| Romper la máquina expendedora *(pide 1 recurso)* | recursos +3, salud −10 | Galería |
| Pasar por la ventana al patio, sin cargar nada | salud −5, moral −5 | Patio |

### 4 · Patio — «Rocco se planta»
La reja del patio está vencida y el portón de chapa, arrancado de un gozne. Del otro lado del hueco hay una silueta quieta, meciéndose. **Rocco se le planta adelante al grupo**, con las patas abiertas y el pelo del lomo parado: no ladra, gruñe. Si lo sueltan, gana tiempo. Si lo llaman, los guía por el hueco del fondo.

| Opción | Requisito | Consecuencia | Va a |
|---|---|---|---|
| Soltar a Rocco para que lo distraiga y cruzar | — | salud −10, moral −5 | Galería |
| Levantar la reja caída entre los dos y pasar juntos | 1 recurso | recursos −1, moral +15, salud −5 | Preceptoría |
| Volver por el buffet y rodear el patio | — | salud −5, moral −10 | Galería |

### 5 · Laboratorio — «Tomás está adentro»
Tomás está del otro lado del vidrio, con un corte en la mano y la radio del colegio apretada contra el pecho. El pestillo está trabado desde adentro.

| Opción | Consecuencia | Va a |
|---|---|---|
| Forzar el pestillo con la herramienta *(pide 1 recurso)* | recursos −1, moral +20, salud −5, **Tomás se suma** | Galería |
| Que te pase la radio por la ventana y seguir | moral +5, **la radio avisa al rescate** | Galería |
| Golpear el vidrio para que salga solo | salud −15, moral +10, **Tomás se suma** | Galería |

### 6 · Gimnasio — «La puerta de servicio»
Las colchonetas están tiradas y una pelota rueda sola. Al fondo, la puerta que usan los profes para el estacionamiento tiene un eslabón cortado en la cadena.

| Opción | Consecuencia | Va a |
|---|---|---|
| Cruzar el gimnasio y abrir la puerta de servicio | salud −10, moral +5 | Estacionamiento |
| Volver por la galería: más lejos, pero más seguro | moral −5 | Galería |

### 7 · Galería — «El corredor de vidrio»
La galería corre paralela al patio: vidrio de un lado, aulas cerradas del otro. En el piso hay marcas de zapatillas que van y vienen. Al final del corredor, la puerta de la preceptoría tiene luz.

| Opción | Consecuencia | Va a |
|---|---|---|
| Entrar a la preceptoría: ahí están las llaves | moral +5 | Preceptoría |
| Cruzar la galería hasta la puerta del estacionamiento | salud −10 | Estacionamiento |

### 8 · Preceptoría — «Las llaves detrás del vidrio»
El tablero de llaves está detrás de un vidrio, con una etiqueta escrita a mano: «CAMIONETA». La puerta del fondo, la que da al estacionamiento, está entreabierta.

| Opción | Consecuencia | Va a |
|---|---|---|
| Romper el vidrio, llevarse la llave y la linterna | salud −5, recursos +1, **llaves** | Estacionamiento |
| Mandar a Rocco por el hueco de la pared *(pide a Rocco)* | moral +10, **llaves** | Estacionamiento |
| Salir por la puerta del fondo sin las llaves | moral −10 | Estacionamiento |

### 9 · Estacionamiento — «La camioneta y el portón»
La camioneta del colegio está donde siempre, con la puerta del acompañante abierta. El portón está trabado con un candado nuevo. Del otro lado de la calle, la estación de servicio tiene todas las luces prendidas.

| Opción | Consecuencia | Va a |
|---|---|---|
| Subir a la camioneta y arrancar *(pide llaves)* | moral +5 | Camioneta |
| Salir por el portón peatonal hacia la calle | salud −5 | Calle |

### 10 · Camioneta — «El motor no arranca a la primera»
La batería está floja: el tablero prende, se apaga, vuelve. Por el espejo retrovisor se ven dos siluetas cruzando el portón. Una más y arranca.

| Opción | Consecuencia | Va a |
|---|---|---|
| Insistir con el arranque y salir por el portón | salud −5, **salida en camioneta** | FINAL A |
| Bajar y seguir a pie: la camioneta los va a delatar | moral −10 | Calle |

### 11 · Calle — «El semáforo en amarillo»
La calle está vacía y el semáforo parpadea en amarillo. A dos cuadras, la estación de servicio tiene la persiana a medio bajar. En la otra dirección, el descampado baja hasta el río.

| Opción | Consecuencia | Va a |
|---|---|---|
| Cruzar a la estación de servicio | salud −10, moral +5 | Estación de servicio |
| Rodear por el descampado y seguir a pie | salud −15, moral −10, **salida a pie** | FINAL C |

### 12 · Estación de servicio — «La persiana a medio bajar»
Adentro hay dos empleados, una radio de banda y un perro que no es Rocco. «Si entran, se cierra», dice el encargado. «Después no sale nadie hasta mañana».

| Opción | Consecuencia | Va a |
|---|---|---|
| Entrar y bajar la persiana | moral +10, **salida en el refugio** | FINAL B |
| No entrar: seguir a pie antes de que cierren | moral −10, **salida a pie** | FINAL C |

## 5. Rocco, el perro guardián

**Está desde la primera pantalla.** En el aula se le pega a la pierna de Mateo y gruñe hacia la puerta; en el pasillo camina adelante; en el patio se planta; en la preceptoría es el único que entra por el hueco de la pared. Nunca hay un momento en el que Rocco «aparece»: el jugador lo ve en el primer texto y en el HUD de arriba a la derecha.

**Qué hace en el juego (una sola regla, fácil de explicar):**

| Situación | Con Rocco | Sin Rocco |
|---|---|---|
| Cualquier golpe o susto | el daño baja 5 puntos | el daño es completo |
| Preceptoría | se puede mandar a Rocco por el hueco y sacar las llaves sin ruido | esa opción no aparece |
| Final | el texto del final lo nombra | el final dice que se quedó atrás |

En el código es una línea: si `estado.perro` es verdadero, el daño se calcula como `daño + 5` (o sea, 5 puntos menos de golpe). Está en `variables.js`, en la función que aplica los efectos, y lo prueba `tools/prueba_reglas.js` («con Rocco −15 / sin Rocco −20»).

**Por qué se cambió.** En la versión anterior Rocco estaba atrapado bajo una reja en un patio con pasto, y el nodo entero era rescatarlo. Quedaba raro: el perro aparecía una sola vez, en un lugar que parecía el patio de una casa, y después desaparecía de la historia. Ahora Rocco es **el guardián que acompaña**: no hay que rescatarlo, hay que decidir si se lo suelta para ganar tiempo o si se cruza con él al lado. Es un personaje, no un objeto que se levanta del piso.

## 6. Los tres finales

| Final | Cómo se llega | Qué hace falta |
|---|---|---|
| **A — Supervivientes organizados** | salir en la camioneta | llaves + salud ≥ 50 + moral ≥ 40 + recursos ≥ 2 |
| **B — Refugiados en la estación** | entrar al refugio | salud ≥ 40 + moral ≥ 30 |
| **C — Huida a pie** | cruzar el descampado o no entrar al refugio | cualquiera (incluso con todo bien, si eligen el descampado) |

El final no depende de un botón «elegir final»: **depende del lugar al que llegaste y del estado con el que llegaste**. Si salís en la camioneta pero lastimado y sin provisiones, el juego no te da el A: te da el C. Eso es lo que hace que las decisiones pesen.

## 7. Por qué esto ya no es lineal (para contestarle al profe)

1. **Tres primeras salidas distintas**, no una: pasillo, buffet y patio. Cada una tiene lugares que las otras no tienen.
2. **Caminos que no se tocan**: el que baja al buffet nunca ve el laboratorio; el que va al patio se cruza con la silueta y con Rocco plantado; el que va al pasillo decide sobre Tomás.
3. **Doce lugares con doce fondos**: no se repite ninguna imagen.
4. **Decisiones que abren y cierran puertas**: sin llaves no hay camioneta (el botón queda bloqueado con el motivo); sin Rocco no se puede mandarlo por el hueco; sin herramienta no se levanta la reja del patio.
5. **El estado decide el final**, no el último clic: hay **237 partidas posibles** y **11 formas distintas** de llegar al final A.
