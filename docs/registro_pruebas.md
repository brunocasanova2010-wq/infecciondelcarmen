# Registro de pruebas — Sprint 3 (prototipo)
**Autor: Bruno Casanova** (lógica y balance)

Registro de lo que se probó, cómo y qué salió. Cada prueba dice **qué se
buscaba** y **qué dio**. Si una prueba agarró un error, quedó anotado y se
ve el arreglo en `correcciones.md`.

---

## Prueba 1 — Recorridos completos (automática)
**Fecha:** 12/11/2026 · **Herramienta:** `tools/prueba_recorridos.js` · **Node.js**

- **Qué se probó:** los 729 caminos posibles (3×3×3×3×3×3), cargando los
  mismos archivos que usa el juego.
- **Resultado: OK.** 0 recorridos trabados. 0 valores fuera de rango. Finales
  alcanzados: A=140, B=94, C=477. Game Over: 18. Con Tomás rescatado: 470,
  abandonado: 241.
- **Antes de la corrección:** A=21, C=64, Game Over=1. Ver `balance.md`.

## Prueba 2 — Matriz de finales (semi-manual)
**Herramienta:** `tools/matriz_verificacion.js`

- **Qué se probó:** seis caminos elegidos a mano para ver que cada final es
  alcanzable y con qué valores.
- **Resultado: OK.** Tres caminos llegan a Final A, dos a Final C (a pie y
  refugio) y uno a Game Over. Tabla completa en `verificacion.md`.

## Prueba 3 — Opción bloqueada por falta de recurso
**Dónde:** navegador, `webapp/index.html`

- **Qué se probó:** elegir una opción que pide recursos sin tenerlos.
- **Resultado: OK.** El botón aparece como **"[bloqueada]"**, al tocarlo sale
  un aviso y se aplica la **consecuencia alternativa** (por ejemplo −10 de
  Moral). No se rompe el juego.

## Prueba 4 — Game Over independiente
- **Qué se probó:** llegar a Salud 0 en la Etapa 5, antes del final.
- **Resultado: OK.** Sale la pantalla **GAME OVER** con su propio texto, y el
  botón "Reiniciar" vuelve al inicio. No es un final narrativo: es el fin del
  recorrido.
- **Camino probado:** `2, 1, 2, 2, 3, 2`.

## Prueba 5 — Consecuencias narrativas del final
- **Qué se probó:** dos partidas con el mismo final, rescatando y abandonando
  a Tomás.
- **Resultado: OK.** El texto del cierre cambia (ver `verificacion.md`, punto 4).

## Prueba 6 — Recursos del arte (SVG, sin PNG en el juego)
- **Qué se probó:** que cada escena y cada retrato carguen su archivo.
- **Resultado: OK.** Las 16 escenas usan los `.svg` exportados de los `.ai`
  (6 fondos + 5 personajes). El código no referencia ningún `.png`.
- **Comando usado para revisar:** buscar `.png` dentro de `webapp/js` y
  `webapp/index.html` → 0 resultados.

## Prueba 7 — Abrir el juego sin servidor
- **Qué se probó:** doble clic en `webapp/index.html` (sin internet).
- **Resultado: OK.** Carga la portada, los fondos y los retratos.

---

## Lo que falta probar (y lo anoto para no olvidarme)

- **Navegador de celular:** la interfaz no está adaptada a pantalla chica.
  Pendiente para el próximo sprint.
- **Sonido:** no hay audio todavía.
- **Capturas del navegador:** las hace el equipo y se guardan en `docs/capturas/`
  (ver `verificacion.md`, punto 5).
