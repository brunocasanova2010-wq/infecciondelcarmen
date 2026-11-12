# Sprint 3 — Prototipo jugable
## Infección: Escape del Carmen

**Estado:** primera versión funcional del juego. **Fecha del informe:** 13/11/2026.

---

## 1. Qué logramos (resumen)

- **Prototipo navegable de la WebApp** hecho con HTML + CSS + JavaScript. Tiene
  pantalla de inicio, 6 etapas con escenas narrativas y opciones de decisión,
  variables que cambian de verdad y **recorrido completo hasta un final**.
- **Las 3 variables tienen consecuencias reales:** Salud, Moral y Recursos se
  actualizan en cada decisión, se recortan a su rango y se muestran en pantalla
  (HUD). Si no hay recursos, ciertas opciones quedan **bloqueadas**.
- **Game Over independiente:** si la Salud llega a 0% aparece una pantalla propia
  de Game Over (no es un “final” de la historia).
- **Tres finales** (A, B, C) con condiciones que no se pisan entre sí.
- **Consecuencias narrativas:** rescatar o abandonar a Tomás en el laboratorio y
  reparar o no la radio cambian el texto del final.
- **Correspondencia escena → fondo:** cada etapa usa su fondo
  (Aula, Pasillo, Buffet, Laboratorio, Gimnasio, Estacionamiento).
- **Arte propio en SVG:** los fondos y los personajes están como `.svg`
  (vectores, no pierden calidad) y los `.ai` originales quedaron al lado como
  fuente editable.
- **Código separado por archivos:** datos, variables, finales, motor y estilos.
- **Pruebas automáticas en `tools/`:** se probaron los **729 caminos posibles**
  del juego y el reparto de finales.

## 2. Cómo se prueba el prototipo

1. Descargar el repo (botón verde **Code → Download ZIP**) o clonarlo.
2. Abrir `webapp/index.html` con doble clic (Chrome, Edge o Firefox).
3. Tocar **Probar el prototipo** y jugar.

> No necesita internet, servidor ni instalar nada: son archivos estáticos.

## 3. Errores encontrados y cómo los corregimos

| Problema detectado (sprints previos) | Corrección en Sprint 3 |
|---|---|
| Salud/Moral/Recursos no afectaban nada | Motor de variables con rangos y bloqueo de opciones por recursos |
| Los finales se superponían | Condiciones mutuamente excluyentes en `finales.js` |
| No había Game Over propio | Pantalla de Game Over independiente al llegar Salud a 0 |
| Escenas con el fondo equivocado | Mapeo fijo etapa → fondo en `datos.js` |
| Todo el código en un solo archivo | Separado en `datos / variables / finales / juego` + CSS |
| El CSS no se cargaba (estaba en la carpeta equivocada) | `prototipo.css` movido a `webapp/css/` |
| Los `.ai` no se podían ver en el navegador | Cada `.ai` exportado a `.svg` y subido al lado del original |
| Pruebas incompletas | `docs/registro_pruebas.md` con los recorridos reales |

## 4. Pendientes para el próximo sprint

- **Arreglar las rutas de las imágenes:** el código busca `webapp/assets/...` pero
  las imágenes están en `assets/...` (raíz), así que el juego abre sin fondo ni
  retratos. Hay que mover la carpeta `assets` adentro de `webapp/` (o corregir la
  constante `RUTAS` de `datos.js`).
- **Exportar la animación** de Adobe Animate (hoy solo existe el `.fla`) a GIF o
  MP4 y meterla en la Etapa 1, en lugar del retrato fijo de Mateo.
- Sumar sonido ambiente y música.
- Guardado de partida (opcional).

## 5. Tareas por integrante (Sprint 3)

| Integrante | Rol | Aporte en este sprint |
|---|---|---|
| **Benja Chesak** | Guion | Textos de las 6 etapas y de cada opción en `datos.js` |
| **Bruno Casanova** | Lógica / balance | `variables.js`, `finales.js`, los 3 scripts de `tools/` y la documentación de balance |
| **Santino Sanduay** | Arte | Los 6 fondos y los 5 personajes `.svg` (y sus `.ai`), la animación en Animate |
| **Tomás Grzona** | Integración | Motor `juego.js`, `index.html`, `prototipo.css`, README y tablero |

> Cada uno sube SU parte al repositorio con su propio usuario, para que quede
> identificable en *Insights → Contributors*.
