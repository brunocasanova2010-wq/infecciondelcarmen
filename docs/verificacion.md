# Verificación del prototipo (Sprint 3)
**Autor: Bruno Casanova**

Dos tipos de prueba: **automática** (los 729 caminos posibles) y **manual**
(caminos elegidos a mano, para mostrar que cada final es alcanzable).

---

## 1. Prueba automática de los 729 recorridos

Comando (necesita Node.js):

```
node tools/prueba_recorridos.js
```

Resultado obtenido:

```
Recorridos probados: 729
Se trabó algun recorrido: 0
Valores fuera de rango: 0
Final A (Supervivientes Organizados): 140
Final B (Refugiados en la Fortaleza): 94
Final C (Huida Desesperada): 477
GAME OVER (independiente): 18
Caminos con Tomas rescatado: 470 | con Tomas abandonado: 241
RESULTADO: OK - pasaron todas las pruebas
```

Qué demuestra: **ningún recorrido se traba**, ningún valor se sale de rango
(Salud 0–100, Moral 0–100, Recursos 0–5), y **los cuatro desenlaces son
alcanzables**.

## 2. Tabla de caminos elegidos a mano

Las opciones se cuentan **de arriba hacia abajo (1, 2 o 3)**. Cada número es
la opción elegida en cada una de las 6 etapas.

| Opciones (1-3 en cada etapa) | Resultado | Salud | Moral | Rec. | Tomas | Radio |
|---|---|---|---|---|---|---|
| 1, 2, 1, 1, 3, 1 | **Final A** — Supervivientes Organizados | 80 | 100 | 2 | rescatado | rota |
| 1, 3, 2, 1, 2, 1 | **Final A** — Supervivientes Organizados | 55 | 75 | 2 | rescatado | reparada |
| 1, 2, 2, 1, 2, 1 | **Final A** — Supervivientes Organizados | 50 | 95 | 2 | rescatado | reparada |
| 1, 2, 1, 1, 3, 2 | **Final C** — Huida Desesperada (a pie) | 55 | 95 | 1 | rescatado | rota |
| 1, 2, 1, 1, 3, 3 | **Final C** — Huida Desesperada (refugio) | 80 | 95 | 1 | rescatado | rota |
| 2, 1, 2, 2, 3, 2 | **GAME OVER** | 0 | 90 | 4 | rescatado | rota |

Cada fila dice **qué opción se eligió en cada etapa** (1 = la primera de
arriba, 2 = la segunda, 3 = la tercera). Los números salen de correr
`tools/matriz_verificacion.js` y copiarlos, no de calcularlos a mano.

Reproducir esta tabla: `node tools/matriz_verificacion.js` (imprime cada paso).

## 3. Final B — cómo llegar (y por qué cuesta)

El Final B aparece cuando sobrevivís sin cumplir las condiciones de A:
**te falta algún recurso** o llegás con las llaves. En la práctica: sobrevivir
con lo justo y atrincherarse.

Ejemplo (venían a ajustar recursos): llegar a la Etapa 6 con **1 recurso** y
salir en la camioneta → **Final B**, no A. El jugador ve en el HUD por qué: le
faltó un recurso.

## 4. Consecuencias narrativas (Tomás y la radio)

Probado a mano: dos partidas que terminan en el **mismo final** cambian el
texto del cierre según estas dos decisiones.

| Situación | Texto que aparece en el final |
|---|---|
| Tomás rescatado | "Tomás sale con el grupo: haberlo rescatado mantuvo unida a la cuadrilla." |
| Tomás abandonado | "Tomás quedó atrás en el laboratorio. Su ausencia pesa en cada uno." |
| Radio reparada | "La radio reparada ya había avisado a un puesto de rescate…" |
| Radio rota | "Nadie afuera sabe que lograron salir: la radio quedó muda." |

## 5. Prueba manual en el navegador (para hacer con capturas)

> **Esto lo tienen que hacer ustedes y guardar las capturas en `docs/capturas/`.**
> Cada captura es evidencia de que el juego funciona en el navegador.

1. Abrir `webapp/index.html` con doble clic (Chrome o Edge).
2. Captura **01**: pantalla de inicio (con la cinta PROTOTIPO).
3. Tocar "Probar el prototipo". Captura **02**: Etapa 1 con el HUD.
4. Jugar el camino `1, 2, 1, 1, 3, 1`. Captura **03**: el HUD con los
   valores finales del recorrido.
5. Captura **04**: pantalla del Final A.
6. Volver al inicio y jugar el camino `2, 1, 2, 2, 3, 2`. Captura **05**:
   pantalla de **GAME OVER**.
7. Volver y elegir una opción bloqueada (sin recurso). Captura **06**:
   el aviso **"[bloqueada]"** y el mensaje de la opción.
8. Elegir "Huir a pie" al final. Captura **07**: Final C.

> Nombre de los archivos: `capturas/01_inicio.png`, `02_etapa1.png`, etc.
> Para capturar: tecla **Impr Pant** (o Windows + Mayús + S) y pegar en Paint,
> guardar como PNG.
