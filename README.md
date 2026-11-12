# Infección: Escape del Carmen

Juego de decisiones con finales múltiples, hecho para la cátedra.
Un simulacro de evacuación en el colegio se convierte en una infección real:
hay que cruzar el edificio en 6 etapas y salir del estacionamiento.

**Sprint 3 — prototipo jugable.**

---

## Cómo jugarlo

1. Descargá el repo (botón verde **Code → Download ZIP**) **o** cloná el proyecto.
2. Abrí `webapp/index.html` con doble clic (Chrome, Edge o Firefox).
   No hace falta servidor ni internet.
3. Elegí opciones. Al final vas a ver uno de los tres finales o un Game Over.

---

## Estructura REAL del repositorio

Esto es todo lo que existe. No hay otras carpetas.

```
infecciondelcarmen/
├── README.md                  <- este archivo
├── webapp/                    <- EL JUEGO
│   ├── index.html             <- abrir este archivo para jugar
│   ├── css/
│   │   └── prototipo.css
│   ├── js/
│   │   ├── datos.js           <- textos de las 6 etapas (guion)
│   │   ├── variables.js       <- salud, moral, recursos (lógica)
│   │   ├── finales.js         <- qué final te toca
│   │   └── juego.js           <- el motor que une todo
│   └── assets/
│       ├── fondos/            <- 6 fondos .svg (los usa el juego)
│       ├── personajes/        <- 5 personajes .svg (los usa el juego)
│       ├── animacion/         <- animación de Mateo (gif, mp4, poster)
│       └── _fuente_ai/        <- los 11 .ai originales (fuente editable)
└── docs/                      <- documentación del trabajo
    ├── narrativa.md
    ├── balance.md
    ├── verificacion.md
    ├── registro_pruebas.md
    ├── correcciones.md
    ├── uso_de_ia.md
    ├── aportes_por_integrante.md
    ├── nombres_archivos.md
    ├── versionado_arte.md
    ├── evidencia_produccion_grafica.md
    ├── arte_ai_y_svg.md
    ├── animacion_animate.md
    ├── tablero.md
    └── sprint3.md
```

> **La carpeta `tools/`** (pruebas automáticas del balance) va en la raíz del
> repo junto a `webapp/` y `docs/`.

---

## Cómo se juega (reglas)

| Recurso | Rango | Qué pasa |
|---|---|---|
| **Salud** | 0–100 | Si llega a 0 → **GAME OVER**, en cualquier momento |
| **Moral** | 0–100 | Si llega a 0, el grupo se quiebra y la salud baja 20 |
| **Recursos** | 0–5 | Algunas opciones piden recursos; sin ellos aparecen **bloqueadas** |

**Finales:** A (Supervivientes Organizados), B (Refugiados en la Fortaleza),
C (Huida Desesperada). Condiciones exactas en `docs/balance.md`.

---

## Documentación

- `docs/narrativa.md` — historia, personajes y finales completos.
- `docs/balance.md` — por qué los números son estos (y las pruebas).
- `docs/verificacion.md` — tabla de caminos → final.
- `docs/registro_pruebas.md` — registro de pruebas.
- `docs/correcciones.md` — respuesta a la devolución del Sprint 2.
- `docs/uso_de_ia.md` — declaración de uso de inteligencia artificial.
- `docs/aportes_por_integrante.md` — qué hizo cada uno, con archivos.

---

## Equipo

| Integrante | Área |
|---|---|
| Benja Chesak | Guion y narrativa |
| Bruno Casanova | Lógica y balance |
| Santino Sanduay | Arte y animación |
| Tomás Grzona | Integración y repositorio |

## Uso de IA

Se usó IA como borrador en código y redacción. El arte es propio y el balance
salió de pruebas propias. Detalle honesto en `docs/uso_de_ia.md`.
