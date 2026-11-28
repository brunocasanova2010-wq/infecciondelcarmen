/* ============================================================
   VARIABLES Y ESTADO DEL JUEGO  (Sprint 4)
   Autor de balance: Bruno Casanova
   ------------------------------------------------------------
   Aca viven el estado y las funciones que lo modifican.
   Garantiza que Salud, Moral y Recursos tengan CONSECUENCIAS REALES:
   los valores se recortan a sus rangos y se registra cada cambio.

   CAMBIO DEL SPRINT 4 (devolucion):
   la penalizacion de Moral 0 se aplica UNA SOLA VEZ por partida.
   Antes, mientras la Moral siguiera en 0, cada decision volvia a
   descontar 20 de Salud. Ahora queda marcado en estado.penalizacionMoral.
   ============================================================ */

/* Estado inicial: se toma de tools/reglas.js (fuente unica). En el navegador
   tools/reglas.js se carga ANTES que este archivo, asi que REGLAS ya existe. */
const ESTADO_INICIAL = REGLAS.inicial;

let estado = {};
let historial = []; // registro de decisiones para la pantalla de pruebas

function reiniciarEstado() {
  estado = Object.assign({}, ESTADO_INICIAL);
  estado.salida = '';
  /* Rocco arranca con el grupo: es el perro del colegio y sigue a Mateo
     desde que suena la alarma. No se "encuentra" en ningun lugar. */
  estado.perro = ESTADO_INICIAL.perro;
  estado.perroAliado = ESTADO_INICIAL.perroAliado;
  estado.penalizacionMoral = false; // la penalizacion todavia no ocurrio
  historial = [];
}

function limitar(valor, min, max) {
  return Math.max(min, Math.min(max, valor));
}

/* Aplica los efectos de una opcion al estado y los recorta a su rango. */
function aplicarEfectos(efectos, sets) {
  if (efectos) {
    if (typeof efectos.salud === 'number') {
      /* Rocco es el guardian del grupo: si va con Mateo, todo golpe duele 5 menos. */
      let dano = efectos.salud;
      if (dano < 0 && estado.perro) dano = Math.min(-1, dano + 5);
      estado.salud = limitar(estado.salud + dano, 0, 100);
    }
    if (typeof efectos.moral === 'number')    estado.moral    = limitar(estado.moral + efectos.moral, 0, 100);
    if (typeof efectos.recursos === 'number') estado.recursos = limitar(estado.recursos + efectos.recursos, 0, 5);
  }
  if (sets) {
    if ('llaves' in sets)            estado.llaves = sets.llaves;
    if ('salieronCamioneta' in sets) estado.salieronCamioneta = sets.salieronCamioneta;
    if ('tomasRescatado' in sets) estado.tomasRescatado = sets.tomasRescatado;
    if ('radioReparada' in sets)     estado.radioReparada = sets.radioReparada;
    if ('salida' in sets) estado.salida = sets.salida;
    if ('perro' in sets) estado.perro = sets.perro;
    if ('perroAliado' in sets)     estado.perroAliado = sets.perroAliado;
  }

  /* Consecuencia de Moral en 0: un companero cede y el grupo pierde salud.
     Se aplica UNA SOLA VEZ por partida (queda marcada en penalizacionMoral). */
  if (estado.moral <= 0) {
    estado.moral = 0;
    if (!estado.penalizacionMoral) {
      estado.salud = limitar(estado.salud - REGLAS.penalizacionMoral0, 0, 100);
      estado.penalizacionMoral = true;
    }
  }
}

/* Devuelve true si la opcion esta disponible segun sus requisitos.
   Si pide recursos y no alcanzan, la opcion NO se puede elegir. */
function opcionDisponible(opcion) {
  const requisitos = opcion.requiere || {};
  return Object.keys(requisitos).every(function (clave) {
    if (typeof requisitos[clave] === 'number') return estado[clave] >= requisitos[clave];
    return estado[clave] === requisitos[clave];
  });
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
