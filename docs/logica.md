# Logica y Balance — Bruno Casanova

## Variables del juego
| Variable | Inicial | Rango | Regla |
|---|---|---|---|
| Salud del Grupo | 100% | 0–100% | Maximo fijo 100%. Si llega a 0% = GAME OVER inmediato. |
| Moral y Lealtad | 50 | 0–100 | Si cae a 0 = crisis de desobediencia / un companero abandona = penalizador -20% Salud. |
| Recursos | 0 | 0–5 | Consumibles (botiquines, herramientas, sirenas, bengalas). |
| Llaves de la camioneta | No posee | posee/no | Objeto clave no consumible. Se obtiene en Nodo 3B. Habilita encender la camioneta en Etapa 6. |

**Bloqueo por recursos:** si una opcion pide 1 Recurso y el jugador tiene 0,
la opcion queda BLOQUEADA ("Requisito Insuficiente") y debe elegir una de costo 0.

---
## Arbol completo de decisiones

### ETAPA 1 — Nodo 1: La Alarma Inicial (Aula)
- A (Bloquear puertas con bancos): +10% Salud, -10 Moral -> Nodo 2A
- B (Correr al buffet por provisiones): +1 Recurso, -10% Salud -> Nodo 2B
- C (Escapar por la ventana al patio): -5% Salud, +5 Moral -> Nodo 2C

### ETAPA 2 — Pasillos
**Nodo 2A (Pasillo Norte):**
- A (Barra de metal del taller): +1 Recurso, -20% Salud -> 3A
- B (Mostradores caidos como cobertura): +5 Moral, -5% Salud -> 3B
- C (Extintor encendido como distraccion): -10 Moral -> 3C

**Nodo 2B (Pasillo Central):**
- A (Paso acelerado al buffet): -15% Salud, +10 Moral -> 3A
- B (Sigilo tras el mostrador): -5% Salud -> 3B
- C (Bengala) [requiere >=1 Recurso]: si posee -1 Recurso, +10% Salud; si 0: bloqueada, alternativa -10 Moral -> 3C

**Nodo 2C (Patio Interno):**
- A (Entrada lateral del buffet): -10% Salud, +5 Moral -> 3A
- B (Bordear por la galeria techada): +10 Moral -> 3B
- C (Puerta de servicios del buffet): +1 Recurso, -10 Moral -> 3C

### ETAPA 3 — Buffet / Preceptoria
**Nodo 3A (Ala de Carga):**
- A (Botiquines): +1 Recurso, +15 Moral -> 4A
- B (Buscar llaves en la oficina): +2 Recursos, OBTIENE LLAVES, -20% Salud -> 4B
- C (Barricar y descansar): +15% Salud, -10 Moral -> 4C

**Nodo 3B (Comedor Principal):**
- A (Raciones y bebidas): +1 Recurso, +10 Moral -> 4A
- B (Registrar preceptoria por las llaves): +2 Recursos, OBTIENE LLAVES, -20% Salud -> 4B
- C (Atravesar el salon rapido): -10% Salud, +5 Moral -> 4C

**Nodo 3C (Deposito Trasero):**
- A (Herramientas de mantenimiento): +1 Recurso, +5 Moral -> 4A
- B (Busqueda en cajones de preceptoria): +2 Recursos, OBTIENE LLAVES, -15% Salud -> 4B
- C (Escape por pasillo tecnico): +5% Salud, -5 Moral -> 4C

### ETAPA 4 — Laboratorio (companero atrapado)
**Nodo 4A (Puerta Principal):**
- A (Rescate con herramienta) [>=1 Recurso]: -1 Recurso, +25 Moral, -5% Salud -> 5A
- B (Forzar la traba a mano): +15 Moral, -20% Salud -> 5B
- C (Ignorar y avanzar): -25 Moral -> 5C

**Nodo 4B (Ventanal Lateral):**
- A (Romper vidrio con herramienta) [>=1 Recurso]: -1 Recurso, +20 Moral, -10% Salud -> 5A
- B (Golpear estructura y abrir traba): +10 Moral, -15% Salud -> 5B
- C (Seguir de largo): -20 Moral, +5% Salud -> 5C

**Nodo 4C (Conducto Tecnico):**
- A (Soplete/herramienta) [>=1 Recurso]: -1 Recurso, +30 Moral -> 5A
- B (Tirar de la reja entre todos): +15 Moral, -25% Salud -> 5B
- C (Abandonar por riesgo de derrumbe): -30 Moral -> 5C

### ETAPA 5 — Gimnasio / Porton Trasero
**Nodo 5A (Salida del Taller):**
- A (Alarma del taller) [>=1 Recurso]: -1 Recurso, -10 Moral, +15% Salud -> 6A
- B (Sigilo bordeando el taller): -30% Salud, -10 Moral -> 6B
- C (Escalar al techo): -10% Salud, +10 Moral -> 6C

**Nodo 5B (Puerta Central):**
- A (Sirena del tablero) [>=1 Recurso]: -1 Recurso, -15 Moral, +20% Salud -> 6A
- B (Empujar portones con colchonetas): -25% Salud -> 6B
- C (Saltar el muro desde las gradas): -15% Salud, +15 Moral -> 6C

**Nodo 5C (Pasillo de Viento):**
- A (Bote de humo/extintor) [>=1 Recurso]: -1 Recurso, -5 Moral, +10% Salud -> 6A
- B (Sprint a traves de infectados): -40% Salud, -15 Moral -> 6B
- C (Conducto de ventilacion): -10% Salud, +5 Moral -> 6C

### ETAPA 6 — Estacionamiento (salida)
**Nodos 6A / 6B / 6C:**
- A (Escapar en camioneta): si posee llaves -0% extra; si NO -15% Salud (puente electrico).
- B (Huir a pie a Plaza San Martin): -20% Salud.
- C (Refugiarse en estacion de servicio) [>=1 Recurso]: -1 Recurso; si 0: -10 Moral extra.

---
## Condiciones de los finales (cubren el 100% de los casos)
- **GAME OVER:** Salud <= 0% en cualquier momento.
- **FINAL A — Supervivientes Organizados:** Salud >= 50% Y Moral >= 40 Y Recursos >= 2.
- **FINAL B — Refugiados en la Fortaleza:** Salud >= 25% Y Moral > 10 (y NO cumple A).
- **FINAL C — Huida Desesperada:** Salud < 25% (y > 0) O Moral <= 10.
