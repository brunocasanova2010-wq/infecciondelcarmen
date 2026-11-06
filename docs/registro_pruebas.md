# Registro de pruebas - Sprint 3
## Infeccion: Escape del Carmen

Se probo el prototipo (`webapp/index.html`) recorriendo distintas rutas desde
el inicio hasta un desenlace, anotando las decisiones y verificando que las
variables cambien como estan definidas en `js/datos.js` y que la pantalla
siguiente sea la correcta. Todas las rutas posibles (729 combinaciones) fueron
verificadas por script: ninguna se traba ni queda sin salida.

> Notacion: **S** = Salud, **M** = Moral, **R** = Recursos. Cada flecha muestra
> el estado despues de aplicar la decision.

---

## Prueba 1 - Recorrido optimo (FINAL A)

| # | Decision | Estado resultante |
|---|---|---|
| 1 | Etapa 1: Correr al buffet por provisiones | S90 M50 R1 |
| 2 | Etapa 2: Avanzar en sigilo tras el mostrador | S85 M50 R1 |
| 3 | Etapa 3: Juntar raciones y bebidas | S85 M60 R2 |
| 4 | Etapa 4: Forzar la traba a mano (rescata a Tomas) | S65 M75 R2 |
| 5 | Etapa 5: Saltar el muro desde las gradas | S50 M90 R2 |
| 6 | Etapa 6: Escapar en la camioneta | S50 M90 R2 |

- **Esperado:** llegar a FINAL A (Salud>=50, Moral>=40, Recursos>=2).
- **Obtenido:** FINAL A - Supervivientes Organizados. Tomas rescatado. Correcto.

## Prueba 2 - Recorrido intermedio (FINAL B)

| # | Decision | Estado resultante |
|---|---|---|
| 1 | Etapa 1: Bloquear las puertas con los bancos | S100 M40 R0 |
| 2 | Etapa 2: Tomar una barra de metal del taller | S80 M40 R1 |
| 3 | Etapa 3: Juntar botiquines | S80 M55 R2 |
| 4 | Etapa 4: Rescatar a Tomas con una herramienta | S75 M80 R1 |
| 5 | Etapa 5: Activar la alarma del taller | S90 M70 R0 |
| 6 | Etapa 6: Escapar en la camioneta | S90 M70 R0 |

- **Esperado:** FINAL B (Salud>=25 y Moral>10, sin cumplir A por falta de recursos).
- **Obtenido:** FINAL B - Refugiados en la Fortaleza. Tomas rescatado, radio muda. Correcto.

## Prueba 3 - Moral destruida al abandonar a Tomas (FINAL C)

| # | Decision | Estado resultante |
|---|---|---|
| 1 | Etapa 1: Bloquear las puertas con los bancos | S100 M40 R0 |
| 2 | Etapa 2: Encender un extintor como distraccion | S100 M30 R0 |
| 3 | Etapa 3: Escapar por el pasillo tecnico | S100 M25 R0 |
| 4 | Etapa 4: Abandonar a Tomas | S80 M0 R0 (*) |
| 5 | Etapa 5: Lanzar bote de humo **[BLOQUEADA]** | S50 M0 R0 |
| 6 | Etapa 6: Huir a pie a Plaza San Martin | S5 M0 R0 |

(*) Al abandonar a Tomas la Moral cae a 0, y la regla de Moral=0 aplica -20 de Salud.

- **Esperado:** FINAL C (Moral<=10).
- **Obtenido:** FINAL C - Huida Desesperada. Tomas abandonado. Correcto.

## Prueba 4 - Game Over independiente

| # | Decision | Estado resultante |
|---|---|---|
| 1 | Etapa 1: Correr al buffet por provisiones | S90 M50 R1 |
| 2 | Etapa 2: Avanzar a paso acelerado | S75 M60 R1 |
| 3 | Etapa 3: Buscar las llaves en la oficina | S55 M60 R3 |
| 4 | Etapa 4: Golpear la estructura y abrir la traba | S40 M70 R3 |
| 5 | Etapa 5: Saltar el muro desde las gradas | S25 M85 R3 |
| 6 | Etapa 6: Huir a pie a Plaza San Martin | **S0** |

- **Esperado:** al llegar Salud a 0 aparece la pantalla de GAME OVER (no un final).
- **Obtenido:** GAME OVER independiente. Correcto.

## Prueba 5 - Opcion bloqueada por falta de recursos

| # | Decision | Estado resultante |
|---|---|---|
| 1 | Etapa 1: Bloquear las puertas con los bancos | S100 M40 R0 |
| 2 | Etapa 2: Encender un extintor | S100 M30 R0 |
| 3 | Etapa 3: Escapar por el pasillo tecnico | S100 M25 R0 |
| 4 | Etapa 4: Cortar la reja con herramienta **[BLOQUEADA, R0]** | S100 M25 R0 |
| 5 | Etapa 5: Activar la alarma **[BLOQUEADA, R0]** | S90 M25 R0 |
| 6 | Etapa 6: Escapar en la camioneta | S90 M25 R0 |

- **Esperado:** sin recursos, las opciones que piden 1 recurso quedan bloqueadas
  y aplican su consecuencia alternativa.
- **Obtenido:** opciones bloqueadas correctamente; el juego siguio sin trabarse. Correcto.

---

## Resumen de la verificacion automatica

- **729** recorridos posibles probados (3 opciones x 6 etapas).
- **0** pantallas sin salida o enlaces rotos.
- Distribucion de desenlaces: FINAL B la mayoria, FINAL C y FINAL A posibles,
  y GAME OVER alcanzable en la ruta mas imprudente.

## Errores detectados durante las pruebas y su correccion

| Error | Estado |
|---|---|
| Antes los finales se solapaban (dos condiciones verdaderas a la vez) | Corregido: condiciones excluyentes en `finales.js` |
| La Salud podia pasar de 100 o bajar de 0 | Corregido: funcion `limitar()` recorta al rango |
| Opciones sin recursos rompian la navegacion | Corregido: quedan bloqueadas con consecuencia alternativa |
| Pendiente menor | El balance de dificultad se seguira ajustando el proximo sprint |
