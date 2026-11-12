# Aportes por integrante (con archivos, no con cargos)
**Sprint 3 — Infección: Escape del Carmen**

La devolución del Sprint 2 dijo que había "responsabilidades asignadas sin
evidencia real". Esto es lo que **cada uno tiene en el repo**, y cada uno lo sube
**con su propio usuario** (se comprueba en *Insights → Contributors* y en el
historial de commits).

---

## Bruno Casanova — lógica y balance
| Archivo | Qué hizo |
|---|---|
| `webapp/js/variables.js` | Reglas de Salud/Moral/Recursos, límites y consecuencias |
| `webapp/js/finales.js` | Las condiciones que deciden A / B / C |
| `tools/prueba_recorridos.js` | Prueba de los 729 caminos posibles |
| `tools/balance.js` | Analiza cuántos caminos llegan a cada final |
| `tools/matriz_verificacion.js` | Imprime 6 caminos con sus resultados |
| `docs/balance.md` | Por qué se cambiaron los números |
| `docs/verificacion.md` | Tabla de finales y pruebas |
| `docs/registro_pruebas.md` | Registro de cada prueba |
| `docs/correcciones.md` | Respuesta punto por punto a la devolución |

**La decisión que tomó:** el Final A era casi inalcanzable (21 de 729). Lo
detectó con una prueba propia y lo corrigió a 140.

## Benja Chesak — guion
| Archivo | Qué hizo |
|---|---|
| `webapp/js/datos.js` | Los textos de las 6 etapas y de cada opción |
| `docs/narrativa.md` | Historia, personajes, finales completos |

**La decisión que tomó:** Tomás es un personaje que se rescata o se abandona, y
eso cambia el texto del final.

## Santino Sanduay — arte
| Archivo | Qué hizo |
|---|---|
| `webapp/assets/personajes/*.svg` | 5 personajes para el juego |
| `webapp/assets/fondos/*.svg` | 6 fondos para el juego |
| `webapp/assets/_fuente_ai/*.ai` | Los 11 originales editables |
| `webapp/assets/animacion/` | Animación de Mateo (GIF + MP4) |
| `webapp/css/prototipo.css` | Estilo visual del prototipo |
| `docs/evidencia_produccion_grafica.md` | Proceso de producción |
| `docs/arte_ai_y_svg.md` | Por qué se usa SVG |
| `docs/animacion_animate.md` | Storyboard de la animación |
| `docs/nombres_archivos.md` | Tabla de nombres |

**La decisión que tomó:** exportar cada `.ai` a SVG en vez de PNG, para no
perder los vectores.

## Tomás Grzona — integración y repositorio
| Archivo | Qué hizo |
|---|---|
| `webapp/index.html` | Estructura de la página del prototipo |
| `webapp/js/juego.js` | El motor que une escenas, botones y finales |
| `README.md` | Reescrito: solo lista lo que existe |
| `docs/tablero.md` | Organización de las tareas |
| Corrección de `.gitignore` y borrado del README viejo | Limpieza del repo |

**La decisión que tomó:** borrar `public/README 1.md`, que prometía carpetas
inexistentes, en vez de "arreglarlo" con texto.

---

## Lo que NO figura como hecho

Si algo no tiene archivo, no se anota como trabajo hecho. Los pendientes están en
`CAMBIOS_Y_PENDIENTES.md`.
