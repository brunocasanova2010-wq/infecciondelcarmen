# Versiones del arte
**Sprint 4 — Santino Sanduay**

## Cómo está organizado hoy

| Pieza | `.ai` (editable) | `.svg` (el que usa el juego) |
|---|---|---|
| 6 fondos | `webapp/assets/fondos/` | `webapp/assets/fondos/` (mismo nombre) |
| 5 personajes | `webapp/assets/personajes/` | `webapp/assets/personajes/` |

**Regla que pidió la devolución:** el `.ai` va **junto a su `.svg`**, con el mismo nombre y en la
misma carpeta. No en una carpeta aparte como `_fuente_ai/`.

## Numeración de versiones

Cuando una pieza se rehace, no se pisa el archivo final: se guarda la etapa en
`docs/versiones/<pieza>/` con el sufijo `_v1`, `_v2`, `_final`, y al lado un `QUE_CAMBIO.md` de
tres líneas explicando la corrección.

## Estado real (Sprint 4)

| Cosa | Estado |
|---|---|
| 11 `.ai` + 11 `.svg` en `webapp/assets/` | **Hecho** |
| Carpeta `assets/` movida de la raíz a `webapp/` | **Hecho** |
| `docs/versiones/` con v1 / v2 / final | **Pendiente** |
| Animación exportada (GIF + MP4) | **Pendiente** |
| Bocetos en `docs/bocetos/` | **Pendiente** |

Los tres pendientes son de Santino y están explicados paso a paso en la carpeta
`0_QUE_FALTA_Y_DONDE/PARTES_QUE_FALTAN/`.
