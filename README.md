# Infección: Escape del Carmen

Aventura gráfica interactiva de toma de decisiones (point & click / survival horror).
Proyecto Integrador 2026 — Colegio del Carmen.

## Equipo y responsabilidades
| Integrante | Rol | Qué sube al repo |
|---|---|---|
| Benja Chesak | Guion | `docs/narrativa.md` (situación + diálogos de los 6 nodos, lore, textos de los 3 finales) |
| Bruno Casanova | Lógica y Balance | `docs/logica.md` (árbol de decisiones, variables Salud/Moral/Recursos, condiciones de finales) |
| Santino Sanduay | Dirección de Arte | `assets/personajes/*.ai`, `assets/fondos/*.ai`, `assets/previews/*.png`, identidad visual |
| Tomas Grzona | Integración / Estructura | estructura del repo, mockups de pantallas, navegación y tablero de tareas |

## Estructura del proyecto
```
assets/
  personajes/   # .ai editables por personaje (capas separadas)
  fondos/       # .ai editables por escenario (6 etapas / nodos)
  previews/     # PNG de referencia (bocetos / avances)
docs/
  preproduccion.md  # documento único de preproducción (Sprint 2)
  narrativa.md      # guion y finales
  logica.md         # árbol de nodos y variables
```

## Variables del juego
- **Salud del Grupo:** 0–100% (0% = Game Over).
- **Moral y Lealtad:** 0–100 pts.
- **Recursos:** 0–5 unidades (consumibles).
- **Objeto clave:** Llaves de la camioneta (se obtiene en el Nodo 3B).

## Finales
- **A – Supervivientes Organizados:** Salud ≥ 50 y Moral ≥ 40 y Recursos ≥ 2.
- **B – Refugiados en la Fortaleza:** Salud ≥ 25 y Moral > 10 (y no cumple A).
- **C – Huida Desesperada:** Salud < 25 (y > 0) o Moral ≤ 10.

## Estado
Sprint 2 — preproducción y estructura. Ver `GUIA_GITHUB.md` para cómo sube su parte cada integrante.
