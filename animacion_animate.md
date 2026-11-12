# Animacion de personaje - Adobe Animate (Sprint 3)
## Infeccion: Escape del Carmen

**Personaje:** Mateo (protagonista). 
**Accion:** mira hacia atras y reacciona con sorpresa al escuchar la alarma. 
**Duracion:** ~3,5 segundos (dentro del rango 2-5 s exigido). 
**Escena del juego donde se usa:** **Etapa 1 - La alarma inicial** (y reutilizable
como reaccion en la Etapa 4 cuando el grupo ve a Tomas atrapado). 
**Activacion prevista:** se reproduce una vez al entrar a la escena, antes de
mostrar las opciones de decision.

---

## Que se entrega en este sprint

| Archivo | Que es |
|---|---|
| `webapp/assets/animacion/mateo_reaccion.gif` | Exportacion visible (loop) para ver la animacion sin abrir Animate |
| `webapp/assets/animacion/mateo_reaccion.mp4` | Misma animacion en video, para integrar a la WebApp |
| `webapp/assets/animacion/mateo_reaccion_poster.png` | Cuadro fijo (poster) del momento de sorpresa |

> Esta version sirve como **referencia y recurso provisorio** aprobado por el
> alcance del sprint. El **archivo fuente `.fla` de Adobe Animate** debe armarlo
> el area de Produccion Multimedial siguiendo el storyboard de abajo (el .fla es
> un formato propio de Animate que se crea dentro del programa).

---

## Storyboard (4 fases, para reproducir en Animate)

| Tiempo | Frames (24 fps) | Que pasa | Que animar |
|---|---|---|---|
| 0,0 - 0,9 s | 1 - 22 | Mateo en reposo, respirando | leve sube/baja del torso (motion tween) |
| 0,9 - 1,7 s | 22 - 41 | Gira la cabeza hacia atras | rotacion/posicion de la cabeza |
| 1,7 - 2,5 s | 41 - 60 | Sorpresa: ojos grandes, boca abierta, retroceso | escala de ojos, boca en "O", cuerpo un paso atras, signo "!" |
| 2,5 - 3,5 s | 60 - 84 | Se asienta en alerta | vuelve a una pose intermedia |

---

## Paso a paso en Adobe Animate (para el area de Produccion)

1. Abri **Adobe Animate** y crea un documento nuevo: **Archivo > Nuevo**,
   plataforma **ActionScript 3.0** o **HTML5 Canvas**, escenario **480 x 540 px**,
   **24 fps**.
2. Guarda ya el proyecto: **Archivo > Guardar como** ->
   `mateo_reaccion.fla` (este es el **archivo fuente editable** que se entrega).
3. Importa los retratos vectoriales de Mateo o dibuja con la **Herramienta Pluma**
   las partes por separado: cuerpo, brazos, cabeza, cabello, ojos, boca.
4. Convertí cada parte en **simbolo**: seleccionala y toca **F8** ->
   tipo **Grafico** o **Clip de pelicula**. Ponele nombre (cabeza, ojo_izq, etc.).
5. Repartí las partes en **capas** separadas en la Linea de tiempo
   (una capa por parte; asi se animan independientes).
6. Fase 1 (reposo): en el frame 1 ubica todo. En el frame 22, click derecho ->
   **Crear interpolacion de movimiento** y subi/baja levemente el torso.
7. Fase 2 (giro): entre frames 22 y 41, interpola la **posicion y rotacion**
   de la capa de la cabeza para que "mire atras".
8. Fase 3 (sorpresa): en el frame 60 escala los ojos mas grandes, cambia la boca
   a una "O" (reemplazo de simbolo o fotograma clave), desplaza el cuerpo un poco
   hacia atras y mostra un simbolo de **"!"** apareciendo (interpolacion de alfa).
9. Fase 4 (se asienta): entre 60 y 84 volve a una pose de alerta intermedia.
10. Proba con **Enter**. Ajusta los fotogramas clave hasta que quede fluido.
11. Exporta la version visible: **Archivo > Exportar > Exportar video/multimedia**
    (MP4) y tambien **Exportar GIF animado** si lo pide la catedra.
12. Entrega **los dos**: el `.fla` (fuente) y el video/GIF exportado.

---

## Integracion a la WebApp (cuando este el .fla exportado)

Reemplazar el recurso provisorio por el export final con el mismo nombre, o
agregar en la Etapa 1 un `<video>` que se reproduzca al entrar a la escena:

```html
<video src="assets/animacion/mateo_reaccion.mp4" autoplay muted playsinline></video>
```

Mientras tanto, el GIF/MP4 provisorio ya muestra la reaccion esperada.
