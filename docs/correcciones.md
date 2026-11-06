# Correcciones aplicadas en el Sprint 3
## Infeccion: Escape del Carmen

El proyecto tenia una base funcional y una presentacion llamativa, pero con
problemas por debajo. Estas son las prioridades que pidio la catedra y como
quedaron resueltas.

---

### 1. Que Salud, Moral y Recursos tengan consecuencias reales
**Resuelto.** En `js/variables.js` cada decision aplica sus efectos, se recorta
al rango valido (Salud 0-100, Moral 0-100, Recursos 0-5) y se refleja en el HUD.
- Si **Moral llega a 0**, un companero cede y el grupo pierde **-20 de Salud**.
- Si **no hay Recursos**, las opciones que piden recursos quedan **bloqueadas**
  y aplican una consecuencia alternativa (no se pueden elegir "gratis").
- Los Recursos se gastan al usarlos (bengala, herramienta, alarma, radio).

### 2. Corregir la logica de los finales y crear un Game Over independiente
**Resuelto.** En `js/finales.js`:
- Las condiciones de FINAL A / B / C son **mutuamente excluyentes** y cubren el
  100% de los casos (ya no se solapan).
- El **Game Over** es una pantalla propia que se dispara apenas la Salud llega
  a 0 en cualquier momento. **No es un final narrativo**, es el fin del recorrido.

### 3. Mantener consecuencias narrativas (abandonar a Tomas / reparar la radio)
**Resuelto.** En la **Etapa 4** se puede rescatar o **abandonar a Tomas**
(gran impacto en la Moral) y en la **Etapa 5** se puede **reparar la radio**.
Ambas decisiones cambian el **texto del desenlace**: si Tomas quedo atras o si
la radio alerto a un rescate.

### 4. Corregir la correspondencia entre escenas y fondos
**Resuelto.** Mapeo fijo en `js/datos.js`:
Etapa 1 = Aula, 2 = Pasillo, 3 = Buffet, 4 = Laboratorio, 5 = Gimnasio,
6 = Estacionamiento. Cada escena carga su fondo correcto.

### 5. Reorganizar el codigo en archivos separados
**Resuelto.** Antes todo estaba junto; ahora:
```
webapp/
  index.html            (estructura)
  css/estilos.css       (diseno base)
  css/animaciones.css   (animaciones de interfaz)
  js/datos.js           (escenas y arbol de decisiones)
  js/variables.js       (estado y reglas)
  js/finales.js         (finales y Game Over)
  js/juego.js           (motor que conecta todo)
```

### 6. Presentar evidencia real del proceso de produccion grafica
**Resuelto.** Ver `docs/evidencia_produccion_grafica.md` + las previews en
`webapp/assets/`. Se documenta el flujo vectorial por capas usado para los
personajes y fondos.

### 7. Entregar la animacion obligatoria de Adobe Animate
**Entregado (version visible) + guia del .fla.** Ver `docs/animacion_animate.md`
y `webapp/assets/animacion/`. La animacion de Mateo (reaccion de sorpresa, ~3,5 s)
esta exportada en GIF y MP4; el `.fla` fuente lo arma Produccion con el storyboard.

### 8. Completar las pruebas
**Resuelto.** Ver `docs/registro_pruebas.md`: 5 recorridos documentados
(un final A, un final B, un final C, un Game Over y una opcion bloqueada) y
verificacion automatica de las 729 rutas posibles sin pantallas trabadas.
