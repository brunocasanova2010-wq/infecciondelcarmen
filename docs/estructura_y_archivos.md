Qué archivos cambian en el repo
Comparación del repo real (`infecciondelcarmen`) contra la entrega del Sprint 5
Revisado el repo tal como está hoy: tiene un solo commit («Update datos.js»), la estructura del Sprint 3 (6 etapas en fila) y los `assets/` sueltos en la raíz, no dentro de `webapp/`.
Conclusión corta: sí, cambia casi todo. Pero no porque se haya roto nada, sino porque el Sprint 5 convierte 6 etapas en 12 lugares y suma usuarios, arte y pruebas.
---
1. Resumen
Zona del repo	Estado actual	Qué pasa en el Sprint 5
`webapp/js/datos.js`	6 etapas lineales	se reemplaza por 12 lugares ramificados
`webapp/js/finales.js`	3 finales por etapa final	se reemplaza: el final depende del lugar y del estado
`webapp/js/variables.js`	versión Sprint 3	se reemplaza (requisitos genéricos, Rocco, penalización única)
`webapp/js/reglas.js`	igual a tools/reglas.js	se reemplaza junto con `tools/reglas.js`
`webapp/js/juego.js`	motor Sprint 3	se reemplaza (bloqueo real de botones, HUD de llaves y Rocco, recorrido)
`webapp/js/usuarios.js`	no existe	se agrega
`webapp/index.html`	pantalla de inicio simple	se reemplaza (login, saludo, progreso)
`webapp/css/prototipo.css`	Sprint 3	se reemplaza (usuario, iconos, móvil)
`assets/` (raíz)	22 archivos y duplicados	se borra; los assets viven en `webapp/assets/`
`tools/`	10 archivos del Sprint 3	se reemplazan por 6 archivos del Sprint 5
`docs/`	19 documentos del Sprint 3	quedan; se agregan los del Sprint 5
`evidencias/`	5 capturas del Sprint 3	quedan como historial
---
2. Archivo por archivo
2.1 Lo que hay que BORRAR
Archivo	Por qué
`assets/` (carpeta entera de la raíz)	el juego carga desde `webapp/assets/`; si queda en la raíz, las imágenes no aparecen
`assets/fondos/FONDO 1 AULA.svg`, `FONDO 3 BUFFET.svg`, `FONNDO 2 PASIYO.svg`	duplicados con error de tipeo
`assets/fondos/Fondo_04_Laboratorio (1).svg`, `Fondo_05_Gimnasio (1).svg`, `Fondo_06_Estacionamiento (2).svg`	copias repetidas con «(1)» y «(2)» en el nombre
`assets/personajes/Personaje.Infectado.ai` y `.svg`, `Personaje_Lucas 1.ai`	personajes que ya no aparecen en el guion
`tools/prueba_recorridos.js`, `tools/baseline.js`, `tools/matriz_verificacion.js`, `tools/requiere.js`, `tools/resultado_pruebas.json`, `tools/registro_de_pruebas.txt`	pruebas del Sprint 3 escritas para 6 etapas; no entienden 12 lugares
2.2 Lo que hay que REEMPLAZAR (mismo nombre, contenido nuevo)
Archivo	Quién	Qué cambia
`webapp/js/datos.js`	Bruno	12 lugares con fondo propio, opciones con efectos y requisitos
`webapp/js/finales.js`	Bruno	finales A/B/C según el lugar de salida y los umbrales
`webapp/js/variables.js`	Bruno	requisitos genéricos (`recursos`, `llaves`, `perro`), penalización de moral una sola vez
`webapp/js/reglas.js`	Bruno	mismos umbrales que `tools/reglas.js`
`tools/reglas.js`	Bruno	fuente única de reglas
`tools/prueba_reglas.js`	Bruno	9 pruebas de variables y finales
`tools/balance.js`	Bruno	recorre las 237 partidas posibles
`webapp/js/juego.js`	Tomás	motor: botones bloqueados con motivo, HUD de llaves y Rocco, recorrido
`webapp/index.html`	Tomás	login, saludo, progreso, carga de `usuarios.js`
`webapp/css/prototipo.css`	Tomás	estilos de usuario, iconos y celular
`README.md`	Tomás	explicación de los 12 lugares
2.3 Lo que hay que AGREGAR
Archivo	Quién	Para qué
`webapp/js/usuarios.js`	Tomás	registro, sesión persistente, saludo y contadores
`tools/prueba_rutas.js`	Bruno	12 pruebas de la estructura
`tools/resultado_pruebas_rutas.json`	Bruno	resultado guardado de las pruebas
`tools/balance_resultado.json`	Bruno	resultado guardado del balance
`webapp/assets/**`	Santino	12 fondos, 5 personajes, 2 objetos, 2 iconos, la animación
`docs/narrativa.md`	Benja	guion de los 12 lugares
`docs/nodo_rocco.md`	Benja	guion literario y técnico del nodo del perro
`docs/balance_12_lugares.md`	Bruno	por qué los números cierran
`docs/pruebas.md`	Bruno	cómo correr las pruebas
`docs/uso_de_ia.md`	Bruno	qué se hizo con IA y qué no
`docs/arte_y_defensa.md`	Santino	inventario de arte y defensa vector/mapa de bits
---
3. Estructura final del repositorio
```
infecciondelcarmen/
├── README.md
├── webapp/
│   ├── index.html
│   ├── css/prototipo.css
│   ├── js/
│   │   ├── reglas.js          (umbrales y estado inicial)
│   │   ├── usuarios.js        (registro, sesión, contadores)
│   │   ├── datos.js           (los 12 lugares)
│   │   ├── variables.js       (cómo cambian las variables)
│   │   ├── finales.js         (qué final corresponde)
│   │   └── juego.js           (motor y pantallas)
│   └── assets/
│       ├── animacion/  Animacion_Mateo.gif + el .fla original
│       ├── fondos/     12 SVG (uno por lugar)
│       ├── personajes/ Mateo, Lucas, Sofía, Sobreviviente, Rocco
│       ├── objetos/    Objeto_Llave.svg, Objeto_Collar.svg
│       └── iconos/     llave.svg, collar.svg
├── tools/
│   ├── reglas.js
│   ├── prueba_rutas.js
│   ├── prueba_reglas.js
│   └── balance.js
└── docs/
    ├── narrativa.md · nodo_rocco.md · balance_12_lugares.md
    ├── pruebas.md · uso_de_ia.md · arte_y_defensa.md
    ├── estructura_y_archivos.md · aportes_por_integrante.md
    ├── capturas/ (15 capturas reales)
    ├── storyboard/ (6 viñetas)
    └── arte/ (fuentes .ai, SVG y PNG)
```
4. El orden de subida
Tomás primero: sin `index.html` y `juego.js` nuevos, los otros archivos no se entienden.
Bruno después: datos, reglas y pruebas.
Benja: guion y documentos.
Santino al final: los assets, que pesan más y tardan en subir.
> En GitHub web, «Upload files» **no reemplaza** un archivo que ya existe: dice «That file already exists». Para reemplazar hay que abrir el archivo, tocar el lápiz, borrar todo, pegar lo nuevo y hacer *Commit changes*.
