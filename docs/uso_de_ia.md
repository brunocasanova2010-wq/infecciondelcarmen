# Uso de inteligencia artificial en el proyecto

Declaramos el uso de IA porque es más honesto y porque nos obliga a entender lo
que entregamos. **Regla del equipo: nadie entrega algo que no pueda explicar en
voz alta.**

## Resumen rápido

| Parte del proyecto | ¿Usamos IA? | Qué hizo la IA | Qué hicimos nosotros |
|---|---|---|---|
| Arte (.ai, .svg) | **No** | — | Dibujo, capas, exportación y animación a mano |
| Guion / narrativa | **Sí, como borrador** | Propuso variantes de diálogo | Elegimos, reescribimos y agregamos el conflicto de Tomás |
| Código del juego | **Sí, como borrador** | Aportes de estructura inicial | Lo adaptamos, lo probamos y lo corregimos |
| Balance numérico | **No** | — | Lo calculamos con nuestras propias pruebas (729 caminos) |
| Documentos (.md) | **Sí, para ordenar** | Ayudó a ordenar y pasar en limpio | Los datos, las pruebas y las decisiones son nuestros |
| Presentación | **Sí** | Ayudó con el formato | El contenido es nuestro |

---

## Detalle por parte

### Arte gráfico — Santino Sanduay
**No se usó IA generativa de imágenes.** Los personajes y fondos son dibujos
propios hechos en Illustrator: boceto a mano, vectorización por capas, versión
final y exportación a SVG. La prueba está en `docs/bocetos/` (bocetos y
versiones) y en los `.ai` con capas separadas.

### Narrativa — Benja Chesak
Se usó IA **para tirar ideas** (por ejemplo, distintas formas de escribir la
última escena). El texto final lo escribió Benja: la decisión de que **Tomás
pueda rescatarse o abandonarse** y que eso cambie el cierre es del equipo, no
de la IA. Se puede ver en `webapp/js/datos.js` y en `docs/narrativa.md`.

### Código — Bruno Casanova (lógica) y Tomás Grzona (integración)
La IA ayudó a **armar la primera versión de la estructura** (cómo separar los
archivos, cómo mostrar el HUD). Después:
- Bruno cambió los números y encontró el desbalance del Final A **con una
  prueba propia** (729 recorridos).
- Tomás armó la estructura de carpetas y revisó que el juego abra sin errores.

El código que no pudimos explicar, **se sacó**.

### Documentos
Los `.md` los armamos con ayuda de IA para **ordenar y corregir la redacción**.
Los datos técnicos (resultados de pruebas, tiempos, nombres de archivos) son
reales y salen de las herramientas del repo.

---

## Cómo se nota que entendemos lo que entregamos

Cada integrante puede mostrar **su archivo**, **su commit** y **explicar una
decisión**. Si el profe pregunta "¿por qué este número?", la respuesta está en
`balance.md`; si pregunta "¿de dónde salió este dibujo?", la respuesta está en
`evidencia_produccion_grafica.md`.

## Lo que la IA no hizo

- No dibujó el arte.
- No decidió el balance (eso salió de probar 729 caminos).
- No subió nada al repositorio: los commits los hizo cada uno con su usuario.
