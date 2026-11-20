# Respuesta a la devolución del Sprint 3
**Infección: Escape del Carmen — Sprint 4**
Bruno Casanova (lógica/balance) · Benja Chesak (guion) · Santino Sanduay (arte) · Tomás Grzona (integración)

Este documento responde **punto por punto** a la devolución. Cada punto dice: qué se corrigió,
con qué archivo y cómo se comprueba. Lo que todavía no está terminado está al final, dicho como es.

---

## 1. Recursos iniciales en 1 sin justificar
**Corregido y justificado.** El estado inicial ya no está escrito en dos lugares: vive solo en
`tools/reglas.js` (`REGLAS.inicial`, `recursos: 1`), y la web carga el mismo archivo como
`webapp/js/reglas.js`. La justificación está en `docs/balance_sprint4.md`: arrancan con **una
herramienta básica** (la barra de metal que Leo encuentra en el aula), y por eso todas las opciones
que piden 1 recurso son coherentes con lo que se ve en la narración.
*Cómo se comprueba:* `node tools/reglas.js` imprime el estado inicial; `demo_devolucion.html`
muestra el HUD con 1/5 en la Etapa 1.

## 2. Las llaves eran decorativas
**Corregido.** Ahora las llaves son condición **obligatoria** del Final A.
*Prueba:* P1 y P7. Antes: había **98 caminos** que llegaban al Final A sin llaves. Ahora: **0**.

## 3. El Final A real no coincidía con el comentario
**Corregido.** Las condiciones ya no se escriben en dos lugares: están en `REGLAS.umbrales`
(`tools/reglas.js`) y `finales.js` las lee de ahí. El comentario y el código ya no pueden separarse.
Final A = llaves + camioneta + salud ≥ 50 + moral ≥ 40 + recursos ≥ 2.
*Prueba:* P2, con cuatro casos: salud 45 → C, moral 35 → C, 1 recurso → C, todo justo en el límite → A.
Antes los tres primeros daban A.

## 4. `!salieronCamioneta` mandaba todo a C
**Corregido.** Quien no usa la camioneta y llega entero (salud ≥ 40 y moral ≥ 30) termina en el
**Final B (Refugiados en la Fortaleza)**. El C queda para la huida a pie o para llegar destruido.
*Prueba:* P3. Antes el refugio daba C; ahora da B.

## 5. Final B incoherente
**Corregido.** El texto del B habla de atrincherarse en la estación de servicio y esperar rescate, y
cambia según la radio: si la reparaste, el rescate llega al amanecer. La categoría la deciden las
variables, no el texto (`webapp/js/finales.js`, `textoFinal`).

## 6. Opciones "bloqueadas" que igual avanzaban
**Corregido.** Se eliminó por completo el mecanismo `bloqueadaTexto` / `efectosAlternativos` de
`datos.js`. Si no tenés el recurso, el botón queda con `disabled = true`, dice
"(te faltan recursos)" y **no hace nada**: no avanza, no aplica efectos, no hay camino escondido.
*Prueba:* P5, que además verifica que en el motor exista `btn.disabled = true` y ya no exista
`efectosAlternativos`.

## 7. Penalización de Moral 0 repetida
**Corregido.** `estado.penalizacionMoral` marca que ya ocurrió: se descuentan 20 de Salud **una sola
vez por partida**.
*Prueba:* P4. Antes: salud 100 → 80 → **40**. Ahora: 100 → 80 → 80.

## 8. Faltan los `.ai`, los bocetos y las versiones
- `.ai`: **están todos** (11), y ahora junto a su SVG en `webapp/assets/fondos/` y
  `webapp/assets/personajes/`, como pide la devolución (no en una carpeta aparte).
- Bocetos y versiones: **todavía no están**. Es lo único de este punto que queda pendiente;
  está anotado en `docs/aportes_por_integrante.md` como tarea de Santino.

## 9. La animación de Animate no estaba exportada
**Pendiente.** En el repo está el proyecto `assets/animacion/movimiento partes de cuerpo (1).fla`,
pero no hay GIF ni MP4. Falta exportarlo desde Animate (Archivo → Exportar → GIF animado) y subirlo.
No se inventa ni se declara como hecho.

## 10. Falta el documento de pruebas
**Hecho, y con resultados reales.** `tools/prueba_reglas.js` corre **7 pruebas** contra el mismo
código que usa la web, y escribe `tools/resultado_pruebas.json`.
Resultado: **antes 1 de 7 OK, después 7 de 7 OK**. La tabla completa está en
`tools/registro_de_pruebas.txt` y `docs/registro_pruebas.md`.

## 11. El código citaba `docs/balance.md` y `tools/balance.js`
**Aclaración respetuosa:** los dos archivos **sí existen** en el repo (`docs/balance.md` y
`tools/balance.js`, este con los "729 caminos"). Puede haber pasado que se miró una rama o un
commit anterior. Igual se agregó `docs/balance_sprint4.md`, que documenta **solo** los cambios de
este sprint, para que no haya dudas.

## 12. Aportes no demostrados
**En proceso.** `docs/aportes_por_integrante.md` ya tenía la tabla por archivo, pero ahora cada uno
sube **sus propios archivos con su usuario**, y el archivo quedó actualizado con lo del Sprint 4
(incluido este documento, asignado a Bruno).

---

## Lo que sigue pendiente (sin maquillar)
1. Exportar la animación (GIF/MP4) desde Animate — Santino.
2. Bocetos y versiones de arte (3 versiones) — Santino.
3. Subir todo a GitHub con el usuario de cada uno.

## Cómo se prueba todo (2 minutos)
1. Abrí `webapp/index.html` en el navegador (con Live Server o GitHub Pages).
2. Se ven fondo y retrato (antes no cargaban).
3. Elegí opciones hasta que no te alcancen los recursos: el botón dice "te faltan recursos" y
   no se puede tocar.
4. Buscá la camioneta **sin** llaves: el final es el C, no el A.
5. Sin la camioneta y con salud y moral altas: Final B.
