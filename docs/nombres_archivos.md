# Tabla de nombres: qué muestra cada archivo y dónde se usa
**Autor: Santino Sanduay (nombres) + Tomás Grzona (estructura)**

La devolución del Sprint 2 dijo que "los nombres no coinciden con el contenido".
Esto es la corrección: **cada archivo se llama igual que lo que muestra y que la
escena donde se usa**.

## Fondos

| Archivo | Qué se ve | Escena del juego |
|---|---|---|
| `Fondo_01_Aula.svg` | Aula con bancos y pizarrón | Etapa 1 |
| `Fondo_02_Pasillo.svg` | Pasillo largo con puertas | Etapa 2 |
| `Fondo_03_Buffet.svg` | Buffet con mesas y mostrador | Etapa 3 |
| `Fondo_04_Laboratorio.svg` | Laboratorio con vidrio y mesadas | Etapa 4 |
| `Fondo_05_Gimnasio.svg` | Gimnasio con gradas y aros | Etapa 5 |
| `Fondo_06_Estacionamiento.svg` | Estacionamiento con portón | Etapa 6 |

## Personajes

| Archivo | Qué se ve | Cuándo aparece |
|---|---|---|
| `Personaje_Mateo.svg` | Chico con mochila, ropa azul | Etapas 1, 3, 5, 6 |
| `Personaje_Lucas.svg` | Chico alto con buzo gris | Etapas 2, 3, 5, 6 |
| `Personaje_Sofia.svg` | Chica con pelo atado | Etapas 2, 3, 5, 6 |
| `Personaje_Sobreviviente.svg` | Adulto herido (el que ayuda a Tomás) | Etapa 4 |
| `Personaje_Infectado.svg` | Figura encorvada, ropa rota | Aviso de peligro |

## Animación

| Archivo | Qué es |
|---|---|
| `mateo_reaccion.gif` | Animación visible (loop, ~3,5 s) |
| `mateo_reaccion.mp4` | La misma animación en video |
| `mateo_reaccion_poster.png` | Cuadro fijo del momento de sorpresa (no es recurso del juego, es vista previa) |

## Fuente editable

`webapp/assets/_fuente_ai/` guarda los **11 `.ai` originales** (6 fondos + 5
personajes) con el **mismo nombre** que los SVG. Si un `.ai` se llama
`Fondo_04_Laboratorio.ai`, su export es `Fondo_04_Laboratorio.svg`.

## Regla para los próximos archivos

`Tipo_Numero_NombreQueSeVe.ext` — por ejemplo `Fondo_07_Biblioteca.svg`.
Si no sabés cómo llamarlo, se lo pregunta a Tomás antes de subirlo.
