Aportes por integrante · Sprint 5
---
Benja — guion y narrativa
Reescribió el guion para 12 lugares (antes eran 6 etapas).
Escribió los textos de las 12 escenas y las opciones (están en `webapp/js/datos.js`).
Guion literario y técnico del nodo nuevo (Rocco): 6 planos, 17 segundos.
Storyboard de 6 viñetas.
Archivos: `docs/narrativa.md`, `docs/nodo_rocco.md`, `docs/storyboard/`.
Bruno — lógica, balance y pruebas
Estructura de los 12 lugares: qué lleva a qué y con qué consecuencias.
`webapp/js/datos.js`, `finales.js`, `variables.js`, `reglas.js`.
Requisitos reales: sin llaves no hay camioneta, sin Rocco no hay atajo ni descuento de daño, sin herramienta no se levanta la reja del patio.
Pruebas: `tools/prueba_rutas.js` (13), `tools/prueba_reglas.js` (9), `tools/balance.js` (237 partidas).
Documentos: `docs/balance_12_lugares.md`, `docs/pruebas.md`, `docs/estructura_y_archivos.md`, `docs/uso_de_ia.md`.
Santino — arte, personajes y animación
Rocco, la llave y el collar (vectorial, con capas).
Los 6 fondos nuevos de prototipo que completan los 12 lugares.
La adaptación del `.fla` del equipo a GIF.
Documento de arte y defensa: `docs/arte_y_defensa.md`.
Pendiente suyo: reemplazar los 6 fondos de prototipo por su versión final, con el mismo nombre.
Tomás — integración, interfaz y usuarios
`webapp/index.html`, `webapp/css/prototipo.css`, `webapp/js/juego.js`.
Sistema de usuarios completo: registro, inicio de sesión, sesión que sobrevive a recargar, saludo, partidas y contadores por final.
Movió los assets a `webapp/assets/` y borró la carpeta `assets/` de la raíz.
Capturas de la prueba en navegador: `docs/capturas/`.
---
Reparto de archivos (para que nadie pise el trabajo del otro)
Archivo	Dueño
`webapp/js/datos.js`	Bruno (textos escritos por Benja)
`webapp/js/finales.js`, `variables.js`, `reglas.js`	Bruno
`tools/*`	Bruno
`webapp/js/juego.js`, `usuarios.js`	Tomás
`webapp/index.html`, `webapp/css/prototipo.css`	Tomás
`webapp/assets/**`	Santino
`docs/narrativa.md`, `docs/nodo_rocco.md`, `docs/storyboard/`	Benja
`docs/arte_y_defensa.md`, `docs/arte/`	Santino
> Regla del equipo: si Benja quiere cambiar una frase, se la pasa a Bruno; si Santino cambia un dibujo, mantiene el nombre del archivo. Así nadie tiene que tocar el código del otro.
