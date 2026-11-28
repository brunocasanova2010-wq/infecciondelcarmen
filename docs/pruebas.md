Pruebas y evidencias
Sprint 5 · doce lugares
---
1. Cómo se corren
Abrir una terminal en la carpeta del proyecto y escribir:
```
node tools/prueba_rutas.js
node tools/prueba_reglas.js
node tools/balance.js
```
No hace falta instalar nada: Node ya viene con lo necesario.
---
2. Resultado de las pruebas de estructura (13/13)
#	Prueba	Resultado
1	Todo destino existe	OK
2	Todos los fondos existen en disco	OK
3	Todos los personajes existen	OK
4	Sin lugares huérfanos (todos se pueden visitar)	OK
5	Ningún camino retrocede de etapa	OK
6	Desde el aula se abren 3 lugares distintos	OK — Pasillo, Buffet, Patio
7	12 lugares con 12 fondos distintos	OK — 12 / 12
8	Cada lugar tiene al menos 2 opciones	OK
9	Todos los caminos llegan a un desenlace	OK — 237 partidas
10	Se alcanzan los 3 finales	OK — A=11, B=71, C=155
11	Sin llaves, la camioneta está bloqueada	OK
12	La animación del equipo está en el juego	OK
13	Rocco arranca con el grupo y amortigua el daño	OK — con Rocco −15 / sin Rocco −20
3. Resultado de las pruebas de reglas (9/9)
#	Prueba	Resultado
1	El estado inicial está dentro de los rangos	OK
2	Los valores se recortan al máximo	OK
3	Los valores se recortan al mínimo	OK
4	La moral en 0 descuenta salud una sola vez	OK — 100 → 80, y en la siguiente decisión sigue en 80
5	El final A es más exigente que el B	OK
6	Con todo en orden, la camioneta da A	OK
7	Con salud baja, la camioneta no da A	OK
8	El refugio da B	OK
9	Salir a pie da C aunque esté todo bien	OK
4. Prueba en el navegador
Se jugó el juego de punta a punta en Chromium (no solo se abrió la pantalla):
Ruta A: crear cuenta → saludo «¡Hola, bruno!» → Aula → Buffet → Galería → Preceptoría → Estacionamiento → Camioneta → FINAL A.
Ruta B: reiniciar → Aula → Patio → liberar a Rocco → Galería → Estacionamiento → Calle → Refugio → FINAL B.
0 errores de JavaScript en consola.
Las 12 imágenes de fondo cargaron (se midió el ancho natural de cada archivo: 2133 px las del equipo, 1280 px las nuevas).
La sesión se mantiene al recargar la página.
En celular (390 × 844) se ven las 3 opciones sin tener que hacer scroll.
Capturas: `docs/capturas/` (15 imágenes, numeradas en el orden del recorrido).
5. Qué NO está probado
No se probó en Safari ni en Firefox: solo Chromium.
No hay servidor: los usuarios viven en el `localStorage` del navegador. Si se borra la caché, se pierden las cuentas.
No se probó con muchos usuarios a la vez (no aplica: no hay backend).
