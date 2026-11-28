/* ============================================================
   PRUEBAS DE LAS REGLAS  (Sprint 5)
   Autor: Bruno Casanova
   Uso:   node tools/prueba_reglas.js
   ------------------------------------------------------------
   Verifica que las variables se recorten a su rango, que la
   penalizacion de Moral 0 se aplique una sola vez y que los
   umbrales de los finales esten en orden (A mas exigente que B).
   ============================================================ */
const fs = require('fs'), path = require('path'), vm = require('vm');
const RAIZ = path.join(__dirname, '..'), JS = path.join(RAIZ, 'webapp', 'js');
const ctx = vm.createContext({ console });
['reglas.js', 'variables.js', 'finales.js'].forEach(function (n) {
  vm.runInContext(fs.readFileSync(path.join(JS, n), 'utf8'), ctx, { filename: n });
});
const R = vm.runInContext('REGLAS', ctx);
let ok = 0; const fallos = [];
function check(n, c, d) { c ? ok++ : fallos.push(n + ': ' + d); console.log((c ? '[OK]   ' : '[FALLA]') + ' ' + n + (d ? '  ->  ' + d : '')); }

check('El estado inicial esta dentro de los rangos',
  R.inicial.salud >= 0 && R.inicial.salud <= 100 && R.inicial.moral >= 0 && R.inicial.moral <= 100 &&
  R.inicial.recursos >= 0 && R.inicial.recursos <= 5,
  JSON.stringify(R.inicial));

vm.runInContext('reiniciarEstado()', ctx);
vm.runInContext('aplicarEfectos({salud:80,moral:80,recursos:9},{})', ctx);
let e = vm.runInContext('estado', ctx);
check('Los valores se recortan al maximo', e.salud === 100 && e.moral === 100 && e.recursos === 5,
  'salud ' + e.salud + ' moral ' + e.moral + ' recursos ' + e.recursos);

vm.runInContext('reiniciarEstado()', ctx);
vm.runInContext('aplicarEfectos({salud:-300,moral:-300,recursos:-9},{})', ctx);
e = vm.runInContext('estado', ctx);
check('Los valores se recortan al minimo', e.salud === 0 && e.moral === 0 && e.recursos === 0,
  'salud ' + e.salud + ' moral ' + e.moral + ' recursos ' + e.recursos);

vm.runInContext('reiniciarEstado()', ctx);
vm.runInContext('aplicarEfectos({moral:-100},{})', ctx);   // la moral toca 0 en esta misma llamada
const tras1 = vm.runInContext('estado.salud', ctx);
vm.runInContext('aplicarEfectos({}, {})', ctx);
const tras2 = vm.runInContext('estado.salud', ctx);
check('La Moral en 0 descuenta Salud una sola vez',
  tras1 === 100 - R.penalizacionMoral0 && tras2 === tras1,
  'salud al llegar moral 0 = ' + tras1 + ', siguiente decision = ' + tras2);

check('Final A es mas exigente que Final B',
  R.umbrales.A.salud >= R.umbrales.B.salud && R.umbrales.A.moral >= R.umbrales.B.moral,
  JSON.stringify(R.umbrales));

const base = { salud: 100, moral: 60, recursos: 3, llaves: true, salieronCamioneta: true, salida: 'camioneta', perroAliado: false, tomasRescatado: false, radioReparada: false };
const calc = vm.runInContext('calcularFinal', ctx);
check('Con todo en orden, la camioneta da Final A', calc(base) === 'A', calc(base));
const flojo = Object.assign({}, base, { salud: 30 });
check('Con salud baja, la camioneta NO da Final A', calc(flojo) === 'C', calc(flojo));
const ref = { salud: 60, moral: 40, recursos: 1, llaves: false, salieronCamioneta: false, salida: 'refugio', perroAliado: false, tomasRescatado: false, radioReparada: false };
check('El refugio da Final B', calc(ref) === 'B', calc(ref));
const pie = { salud: 90, moral: 90, recursos: 5, llaves: false, salieronCamioneta: false, salida: 'pie', perroAliado: false, tomasRescatado: false, radioReparada: false };
check('Salir a pie da Final C aunque este todo bien', calc(pie) === 'C', calc(pie));

console.log('\n' + ok + ' OK, ' + fallos.length + ' fallaron');
process.exit(fallos.length ? 1 : 0);
