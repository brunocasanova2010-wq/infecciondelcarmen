# Correcciones para el Sprint 3 (sobre la devolución del Sprint 2)

La devolución del Sprint 2 marcó **5 problemas**. Acá está, punto por punto,
**qué hicimos**, **dónde está la evidencia** y **quién lo hizo**.

> Regla que seguimos: *no alcanza con asignar responsabilidades en un
documento*. Cada punto tiene que apuntar a un archivo real del repositorio.

---

## 1. Producción gráfica propia: no alcanzaba con los `.ai`

**Lo que dijo la cátedra:** los `.ai` cumplen pero no se puede comprobar cómo
se construyeron; piden bocetos, versiones anteriores y explicación.

**Lo que hacemos:**
- **`docs/evidencia_produccion_grafica.md`**: proceso completo (boceto →
  vectorización por capas → animación).
- **`docs/bocetos/`**: carpeta para los **bocetos a mano** (papel o digital)
  y las **versiones anteriores** de cada personaje y fondo, con nombre
  `Mateo_v1.png`, `Mateo_v2.png`, etc.
- **`docs/versionado_arte.md`**: tabla con la fecha y qué cambió en cada versión.
- Los `.ai` se suben con **capas separadas** (verificable con Archivo > Abrir
  en Illustrator).

**Quién:** Santino Sanduay.

---

## 2. Organización de archivos: nombres que no coinciden y README que miente

**Lo que dijo la cátedra:** varios fondos y personajes tienen nombres que no
coinciden con su contenido, y el README menciona carpetas que no existen.

**Lo que hacemos:**
- **README reescrito** (`README.md` en la raíz) que lista **solo lo que existe**
  de verdad en el repo.
- **Tabla de nombres** en `docs/nombres_archivos.md`: qué muestra cada archivo y
  con qué escena del juego se corresponde.
- Los archivos se llaman igual que en el código (`Fondo_01_Aula.svg` ↔ Etapa 1).

**Quién:** Tomás Grzona (estructura) + Santino (nombres del arte).

---

## 3. Responsabilidades y tareas: cada uno debe mostrar su aporte

**Lo que dijo la cátedra:** hay trabajos que figuran como hechos pero no hay
archivos que lo demuestren.

**Lo que hacemos:**
- **`docs/aportes_por_integrante.md`**: cada integrante con **sus archivos
  concretos** y **la decisión que tomó** (no el cargo, el trabajo).
- Cada uno sube **su parte con su usuario**, así se ve en
  *Insights → Contributors* y en el historial de commits.
- Los archivos que no existen **se marcan como pendientes**, no como hechos.

**Quién:** los cuatro, con su propio commit.

---

## 4. Narrativa: todavía había diálogos de ejemplo y finales sin escribir

**Lo que dijo la cátedra:** el archivo tenía "diálogos de ejemplo" y "finales
pendientes de desarrollar".

**Lo que hacemos:**
- **`docs/narrativa.md` reescrito**: sin la frase "Base lista para completar",
  sin "Diálogo (ejemplo)" y con los **3 finales escritos completos**.
- **Una decisión de guion concreta:** Tomás (el compañero del laboratorio) es
  un personaje de la historia; rescatarlo o abandonarlo cambia el cierre.
  Eso está en el código (`tomasRescatado`) y en el texto.
- Los textos del juego salen de `webapp/js/datos.js`, así que **lo que dice el
  documento es lo que se lee jugando**.

**Quién:** Benja Chesak.

---

## 5. Uso de IA: hay que declarar qué se hizo con ayuda

**Lo que dijo la cátedra:** se puede usar IA, pero hay que decir qué se generó
con asistencia, qué modificaron ustedes y cómo llegaron al resultado.

**Lo que hacemos:**
- **`docs/uso_de_ia.md`**: declaración honesta por recurso (código, textos,
  arte, documentos), qué se pidió, qué se cambió a mano y **quién puede
  defender cada parte**.
- La regla del equipo: **nadie entrega algo que no pueda explicar**.

**Quién:** los cuatro (cada uno completa su fila).

---

## Extra: lo que encontramos nosotros (no lo pidió la cátedra)

Al probar los 729 recorridos descubrimos que el **Final A era casi inalcanzable**
(21 de 729) y el Game Over se lograba en un solo camino. Lo corregimos y está
explicado en **`docs/balance.md`**, con la prueba en `tools/`.

Eso es lo que hace Bruno: no "tener el rol de lógica", sino **encontrar el error
con una prueba y arreglarlo**.
