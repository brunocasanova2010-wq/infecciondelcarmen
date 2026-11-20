/* ============================================================
   Carga el codigo del juego fuera del navegador, para las pruebas.
   Autor: Bruno Casanova (logica / balance)
   ------------------------------------------------------------
   Lee webapp/js/datos.js, variables.js y finales.js y los corre en
   un contexto aislado de Node.js. Asi las pruebas usan EL MISMO
   codigo que corre en el navegador (no una copia).
   Uso:  node tools/prueba_reglas.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RAIZ = path.join(__dirname, '..');
const JS = path.join(RAIZ, 'webapp', 'js');

function crearContexto() {
  const ctx = vm.createContext({ console: console, Math: Math, Object: Object });
  // reglas.js va primero: los otros archivos lo consultan.
  ['../tools/reglas.js', 'datos.js', 'variables.js', 'finales.js'].forEach(function (n) {
    const ruta = n.indexOf('..') === 0 ? path.join(__dirname, 'reglas.js') : path.join(JS, n);
    let codigo = fs.readFileSync(ruta, 'utf8');
    // En el contexto de pruebas no hay "module" ni "require": se quita la
    // exportacion para que el archivo corra tal cual (mismo codigo que la web).
    if (n.indexOf('reglas') !== -1) {
      codigo = codigo.replace(/if \(typeof module[^\n]*\n?/g, '');
    }
    vm.runInContext(codigo, ctx, { filename: n });
  });
  return ctx;
}

function juegoNuevo() {
  const ctx = crearContexto();
  vm.runInContext('reiniciarEstado();', ctx);
  return ctx;
}

function estadoDe(ctx) {
  return JSON.parse(vm.runInContext('JSON.stringify(estado)', ctx));
}

/* Fija valores del estado para una prueba (devuelve el estado ya cambiado). */
function fijarEstado(ctx, parcial) {
  vm.runInContext('Object.keys(' + JSON.stringify(parcial) + ').forEach(function (k) { ' +
    'estado[k] = ' + JSON.stringify(parcial) + '[k]; });', ctx);
  return estadoDe(ctx);
}

function aplicarEfectosDe(ctx) {
  return vm.runInContext('aplicarEfectos', ctx);
}

function calcularFinalDe(ctx) {
  return vm.runInContext('calcularFinal', ctx);
}

/* Corre una opcion. Si esta bloqueada NO avanza: destino null. */
function jugarOpcion(ctx, idEscena, k) {
  const escena = vm.runInContext('ESCENAS[' + JSON.stringify(idEscena) + ']', ctx);
  const op = escena.opciones[k];
  const disponible = vm.runInContext('opcionDisponible', ctx)(op);
  if (!disponible) return { op: op, disponible: false, destino: null };
  vm.runInContext('aplicarEfectos', ctx)(op.efectos || {}, op.set || null);
  vm.runInContext('registrarPaso', ctx)(idEscena, op.texto);
  return { op: op, disponible: true, destino: op.destino };
}

/* Recorre los 729 caminos posibles. */
function recorrerTodos(conDetalle) {
  const ctx = crearContexto();
  const ESCENAS = vm.runInContext('ESCENAS', ctx);
  const aplicar = vm.runInContext('aplicarEfectos', ctx);
  const disponibleFn = vm.runInContext('opcionDisponible', ctx);
  const calc = vm.runInContext('calcularFinal', ctx);
  const go = vm.runInContext('esGameOver', ctx);
  const res = { A: 0, B: 0, C: 0, GO: 0, A_sin_llaves: 0 };
  let evaluados = 0; // hojas del arbol que llegan a Game Over o a FINAL

  function jugar(prof, id) {
    const esc = ESCENAS[id];
    for (let k = 0; k < esc.opciones.length; k++) {
      const antes = JSON.parse(vm.runInContext('JSON.stringify(estado)', ctx));
      const historial = vm.runInContext('JSON.stringify(historial)', ctx);
      const op = esc.opciones[k];
      // Opcion bloqueada = no se puede elegir: ese camino no existe.
      if (!disponibleFn(op)) continue;
      aplicar(op.efectos || {}, op.set || null);
      if (go()) {
        res.GO++; evaluados++;
      } else if (op.destino === 'FINAL') {
        evaluados++;
        const f = calc(vm.runInContext('estado', ctx));
        res[f]++;
        if (f === 'A' && !vm.runInContext('estado.llaves', ctx)) res.A_sin_llaves++;
      } else {
        jugar(prof + 1, op.destino);
      }
      // restaurar
      vm.runInContext('estado = JSON.parse(' + JSON.stringify(JSON.stringify(antes)) + ');', ctx);
      vm.runInContext('historial = JSON.parse(' + JSON.stringify(historial) + ');', ctx);
    }
  }
  vm.runInContext('reiniciarEstado();', ctx);
  jugar(0, 'N1');
  res.evaluados = evaluados;
  return res;
}

module.exports = {
  crearContexto: crearContexto, juegoNuevo: juegoNuevo, estadoDe: estadoDe,
  fijarEstado: fijarEstado, aplicarEfectosDe: aplicarEfectosDe,
  calcularFinalDe: calcularFinalDe, jugarOpcion: jugarOpcion,
  recorrerTodos: recorrerTodos, RAIZ: RAIZ
};
