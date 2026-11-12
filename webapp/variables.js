/* ============================================================
   VARIABLES Y ESTADO DEL JUEGO  (Sprint 3)
   Autor de balance: Bruno Casanova
   ------------------------------------------------------------
   Aca viven el estado y las funciones que lo modifican.
   Garantiza que Salud, Moral y Recursos tengan CONSECUENCIAS REALES:
   los valores se recortan a sus rangos y se registra cada cambio.
   ============================================================ */

let estado = {};
let historial = []; // registro de decisiones para la pantalla de pruebas

function reiniciarEstado() {
  estado = Object.assign({}, ESTADO_INICIAL);
  historial = [];
}

function limitar(valor, min, max) {
  return Math.max(min, Math.min(max, valor));
}

/* Aplica los efectos de una opcion al estado y los recorta a su rango. */
function aplicarEfectos(efectos, sets) {
  if (efectos) {
    if (typeof efectos.salud === 'number')    estado.salud    = limitar(estado.salud + efectos.salud, 0, 100);
    if (typeof efectos.moral === 'number')    estado.moral    = limitar(estado.moral + efectos.moral, 0, 100);
    if (typeof efectos.recursos === 'number') estado.recursos = limitar(estado.recursos + efectos.recursos, 0, 5);
  }
  if (sets) {
    if ('llaves' in sets)            estado.llaves = sets.llaves;
    if ('salieronCamioneta' in sets) estado.salieronCamioneta = sets.salieronCamioneta;
    if ('tomasRescatado' in sets) estado.tomasRescatado = sets.tomasRescatado;
    if ('radioReparada' in sets)  estado.radioReparada = sets.radioReparada;
  }
  // Consecuencia de Moral en 0: un companero cede y el grupo pierde salud.
  if (estado.moral <= 0) {
    estado.moral = 0;
    estado.salud = limitar(estado.salud - 20, 0, 100);
  }
}

/* Devuelve true si la opcion esta disponible segun recursos. */
function opcionDisponible(opcion) {
  if (opcion.requiere && typeof opcion.requiere.recursos === 'number') {
    return estado.recursos >= opcion.requiere.recursos;
  }
  return true;
}

/* Game Over independiente: salud en 0 en cualquier momento. */
function esGameOver() {
  return estado.salud <= 0;
}

function registrarPaso(idEscena, textoOpcion) {
  historial.push({
    escena: idEscena,
    opcion: textoOpcion,
    salud: estado.salud,
    moral: estado.moral,
    recursos: estado.recursos
  });
}
