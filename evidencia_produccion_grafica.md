# Evidencia del proceso de produccion grafica - Sprint 3
## Infeccion: Escape del Carmen (prototipo)

Este documento muestra que los recursos graficos son produccion propia del
equipo y como llegaron al prototipo.

---

## 1. Flujo de trabajo vectorial

Todos los personajes y fondos se construyeron como **vectores nativos editables**,
con **capas separadas** (no imagenes aplanadas ni incrustadas).

**Capas de cada personaje:** Fondo, Sombra, Piernas, Torso, Brazos, Cabeza,
Cabello, Rostro, Accesorios, Nombre.

**Capas de cada fondo:** Fondo, Estructura, Piso, Mobiliario, Props,
Iluminacion, Etiqueta.

## 2. De los .ai al juego (sin PNG)

El arte fuente son los `.ai` de Illustrator. Como el navegador no lee `.ai`,
se exporto **cada `.ai` a `.svg`** (que sigue siendo vectorial y editable) y es
**lo que usa el prototipo**. **No se uso ningun PNG** como recurso del juego.
Detalle completo en `docs/arte_ai_y_svg.md`.

```
webapp/assets/
  personajes/*.svg   <- usados por el juego (export de los .ai)
  fondos/*.svg       <- usados por el juego (export de los .ai)
  _fuente_ai/        <- los .ai originales (fuente editable)
```

## 3. Piezas producidas

**Personajes (5):** Mateo, Lucas, Sofia, Sobreviviente, Infectado. 
**Fondos (6):** Aula, Pasillo, Buffet, Laboratorio, Gimnasio, Estacionamiento.

## 4. De la pieza estatica a la animacion

Para la animacion obligatoria se partio de la pose base de Mateo y se separaron
sus partes para animarlas por separado. El resultado (reaccion de sorpresa,
~3,5 s) esta en `webapp/assets/animacion/` (GIF y MP4) y su construccion esta
en `docs/animacion_animate.md`.

## 5. Como verificar que es vectorial y editable (para los docentes)

- Abrir un `.ai` de `webapp/assets/_fuente_ai/` con **Illustrator**:
  **Archivo > Abrir** (no "Colocar"). En el panel **Capas** se ve cada parte
  en su propia capa; al seleccionar un trazo aparecen los puntos de ancla.
- Abrir un `.svg` de `webapp/assets/personajes/` con un editor de texto:
  se ven etiquetas `<path d="...">` (geometria vectorial, no pixeles).

## 6. Registro de avance

| Etapa de produccion | Evidencia |
|---|---|
| Bocetos y paleta | preproduccion (Sprint 1-2) |
| Vectorizado por capas | archivos `.ai` por personaje y fondo |
| Export para web | `.svg` en `webapp/assets/` |
| Primera animacion | GIF/MP4 de Mateo + storyboard del `.fla` |
