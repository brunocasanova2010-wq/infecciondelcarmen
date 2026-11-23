# Aportes por integrante (con archivos, no con cargos)
**Sprint 4 — Infección: Escape del Carmen**

La devolución dijo que había aportes "no demostrados". Por eso acá no hay cargos: hay **archivos**.
Cada uno sube **sus propios archivos con su usuario**, y eso se comprueba en
*Insights → Contributors* y en el historial de commits.

---

## Bruno Casanova — lógica y balance
| Archivo | Qué hizo |
|---|---|
| `tools/reglas.js` **(nuevo)** | Las reglas y el estado inicial en un solo lugar |
| `webapp/js/reglas.js` **(nuevo)** | La misma regla, cargada por la web |
| `webapp/js/variables.js` | Moral 0 descuenta Salud **una sola vez** |
| `webapp/js/finales.js` | A y B leen las condiciones de `reglas.js` |
| `tools/prueba_reglas.js` | 7 pruebas con esperado y obtenido |
| `tools/requiere.js` | Corre el código real de la web en Node |
| `tools/baseline.js` | Restaura el Sprint 3 para comparar |
| `docs/balance_sprint4.md` | Qué números cambiaron y por qué |
| `docs/pendientes_sprint4.md` | Lo que falta y de quién es |
| `docs/respuesta_devolucion_sprint3.md` | Respuesta punto por punto |

**La decisión que tomó:** sacar las reglas del comentario y del código y dejarlas en un solo archivo,
porque estaban escritas en dos lugares distintos y no coincidían. Ahora las pruebas lo verifican:
**1 de 7 OK antes, 7 de 7 después**.

## Benja Chesak — guion
| Archivo | Qué hizo |
|---|---|
| `webapp/js/datos.js` | Textos de las 6 etapas; se quitaron las "opciones trampa" |
| `docs/narrativa.md` | Historia, personajes y finales |

**La decisión que tomó:** ninguna opción puede avanzar si el jugador no tiene el recurso. Si el
camino no se puede tomar, se dice **antes**, en la narración de la escena.

## Santino Sanduay — arte
| Archivo | Qué hizo |
|---|---|
| `webapp/assets/fondos/*.svg` (6) | Fondos del juego |
| `webapp/assets/personajes/*.svg` (5) | Retratos |
| `webapp/assets/fondos/*.ai`, `personajes/*.ai` (11) | Originales editables, al lado de su SVG |
| `webapp/assets/animacion/` | Proyecto de Animate |
| **Movió `assets/` a `webapp/`** | Con la carpeta en la raíz, el juego abría sin fondo ni retrato |
| `docs/versionado_arte.md`, `docs/uso_de_ia.md` | Proceso y declaración de herramientas |

**Aporte del sprint:** encontrar que el problema de las imágenes no era el arte sino **la ruta**:
el código pide `webapp/assets/` y los archivos estaban un nivel arriba.

**Pendiente declarado (no se cuenta como hecho):** exportar la animación a GIF/MP4 y subir los
bocetos y las versiones.

## Tomás Grzona — integración y repositorio
| Archivo | Qué hizo |
|---|---|
| `webapp/index.html` | Cargar `js/reglas.js` **antes** que los demás scripts |
| `webapp/js/juego.js` | El botón bloqueado queda con `disabled` y no avanza |
| `README.md` | Solo lista lo que existe |
| `docs/tablero.md` | Organización de tareas |
| `docs/aportes_por_integrante.md` | Esta tabla |

**La decisión que tomó:** que el botón bloqueado **no sea clickeable**. Antes se podía tocar, decía
"[bloqueada]" y aun así aplicaba una consecuencia escondida.

---

## Lo que NO figura como hecho

- La animación **no está exportada**: en el repo solo está el `.fla`.
- Los **bocetos** y las **versiones** del arte no están subidos.

Todo eso está en `docs/pendientes_sprint4.md`, con dueño y ruta.
