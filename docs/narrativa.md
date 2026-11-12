# Narrativa — Infección: Escape del Carmen (Sprint 3)
**Autor del guion: Benja Chesak**

> Este documento **no es un borrador**: los textos de acá son los que están
dentro del juego, con las mismas palabras. Si cambiamos un diálogo, cambiamos
los dos lados (`docs/narrativa.md` y `webapp/js/datos.js`).

---

## 1. La historia en una frase

Un simulacro de evacuación en la escuela se convierte en una infección real.
Mateo, Lucas, Sofía y Tomás tienen que cruzar el colegio y salir por el
estacionamiento antes de que la horda los alcance. **La escuela está en el
Carmen** por eso el título: no es que "escapen del Carmen", es que tienen que
escapar del colegio del Carmen.

## 2. Personajes y para qué está cada uno

| Personaje | Quién es | Qué aporta a la historia |
|---|---|---|
| **Mateo** | El que toma las decisiones | Es el que empuja al grupo a moverse. Su frase guía: *"Nadie se queda atrás"*. |
| **Lucas** | El que conoce el edificio | Sabe dónde están las llaves, los talleres y las salidas. |
| **Sofía** | La que calcula los riesgos | Marca las rutas posibles y los peligros de cada una. |
| **Tomás** | Quedó atrapado en el laboratorio | **Es la decisión moral del juego:** rescatarlo o abandonarlo. |
| **Los infectados** | El peligro | No se negocian ni se razonan: se evitan. |

**Por qué Tomás importa:** es el único personaje que cambia el final según lo
que hagas con él. No es decorativo: si lo dejás, la moral del grupo cae 25 puntos
y el texto final lo nombra.

---

## 3. Los seis momentos (texto real del juego)

### Etapa 1 — La alarma inicial (Aula)
> Suena la alarma general en plena clase. Desde el patio llegan gritos y algo
golpea las puertas del aula. Mateo mira a sus compañeros: *"Eso no es un
simulacro. Tenemos que movernos, ya."*

**Decisión:** bloquear las puertas con los bancos / correr al buffet por
provisiones / escapar por la ventana al patio.

### Etapa 2 — El pasillo
> El pasillo norte está a oscuras. *"Si hacemos ruido, van a venir todos.
Despacio"*, susurra Lucas.

**Decisión:** tomar una barra de metal del taller / usar mostradores caídos como
cobertura / encender un extintor como distracción.

### Etapa 3 — El buffet y las llaves
> El buffet está saqueado. *"Esas llaves son nuestra salida. Vale el riesgo"*,
dice Mateo mirando la oficina.

**Decisión:** juntar botiquines (suma 2 recursos y 15 de moral) / buscar las
llaves en la oficina (cuesta 30 de salud) / barricar y descansar.

**Por qué las llaves:** sin llaves no hay camioneta, y sin camioneta el final
cambia. Es la primera decisión que se siente después, en la Etapa 6.

### Etapa 4 — Tomás atrapado (Laboratorio)
> Tomás quedó encerrado en el laboratorio, golpeando el vidrio. *"No lo
dejamos. Nadie se queda atrás"*, dice Mateo. La puerta principal está trabada.

**Decisión:** rescatarlo con una herramienta / forzar la traba a mano (duele) /
abandonarlo y avanzar.

### Etapa 5 — La radio (Gimnasio)
> El gimnasio es el último filtro. En un rincón hay una radio de emergencia rota.
*"Si la arreglamos, alguien puede escucharnos"*, dice Lucas.

**Decisión:** distraer la horda / reparar la radio / escalar al techo.

**Por qué la radio:** es el hilo que justifica que **alguien pueda rescatarlos**
en los finales. Si no la arreglás, nadie sabe que salieron.

### Etapa 6 — El estacionamiento (la salida)
> Llegan al estacionamiento. La camioneta está a metros. *"Arranca. Arranca de
una vez"*, grita Mateo. Cómo escapan define todo.

**Decisión:** camioneta / huir a pie a Plaza San Martín / refugiarse en la
estación de servicio.

---

## 4. Los finales, escritos completos

### FINAL A — Supervivientes Organizados
Salen con salud suficiente, al menos dos recursos y en la camioneta.

> El grupo cruza el portón completo, con recursos y moral intactas. **Si
rescataron a Tomás:** sale con ellos, y haberlo rescatado mantuvo unida a la
cuadrilla. **Si lo abandonaron:** su ausencia pesa en cada uno, aunque nadie lo
diga en voz alta. **Si repararon la radio:** un puesto de rescate ya sabía
dónde estaban y los espera en la ruta. **Si no:** el silencio del otro lado del
auricular es la única respuesta. Escapan ordenados, listos para ayudar a otros.

### FINAL B — Refugiados en la Fortaleza
Sobreviven, pero sin los recursos o las condiciones para salir bien.

> Sin fuerzas para seguir, frenan y se atrincheran a esperar. **Tomás** queda
en el recuerdo de la decisión que tomaron. **La radio** decide el resto: si la
repararon, el rescate que llamaron llega al amanecer; si no, resisten la noche
sin saber si vendrá ayuda. Aguanta el que tiene algo por lo que aguantar.

### FINAL C — Huida Desesperada
La salud está muy baja, la moral se rompió, o salieron a pie.

> La expedición colapsa. Mateo escapa casi sin aliento y con el grupo quebrado.
**Tomás** queda atrás. **La radio** quedó muda. Sobrevivieron, pero el costo fue
altísimo: no es una victoria, es lo que quedó después.

### GAME OVER (no es un final)
La salud llega a 0 en cualquier momento.

> La Salud del Grupo llegó a 0%. La horda los alcanzó antes de encontrar una
salida. Esta pantalla es independiente de los finales: no es un desenlace, es el
fin del recorrido.

---

## 5. Cómo se conecta con el código

| En la historia | En el código | Dónde |
|---|---|---|
| Cada escena | `ESCENAS.N1` … `N6C` | `webapp/js/datos.js` |
| Cada diálogo | `texto` de la escena | `webapp/js/datos.js` |
| Rescatar/abandonar a Tomás | variable `tomasRescatado` | `variables.js` + `finales.js` |
| Reparar la radio | variable `radioReparada` | `variables.js` + `finales.js` |
| Escapar en camioneta | variable `salieronCamioneta` | `variables.js` + `finales.js` |
| El desenlace | función `calcularFinal()` | `webapp/js/finales.js` |

## 6. Reglas de escritura que seguimos

1. **Nadie habla solo para explicar el juego.** Si un personaje dice algo, es
   porque tiene que decidir ya.
2. **Cada decisión se siente después.** Las llaves, Tomás y la radio vuelven
   en el final.
3. **No hay héroes invencibles.** El final C existe y es el más probable si el
   jugador improvisa.
4. **El texto es corto a propósito.** Se lee en pantalla, no en un libro.
