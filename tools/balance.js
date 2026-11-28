/* ============================================================
   BALANCE DE LOS 12 LUGARES  (Sprint 5)
   Autor: Bruno Casanova
   Uso:   node tools/balance.js
   ------------------------------------------------------------
   Recorre TODAS las combinaciones de decisiones y muestra con que
   estado se llega a cada final. Sirve para dos cosas:
     - ver si un final es imposible (nadie lo alcanza),
     - ver si un final se alcanza solo por un camino (demasiado fragil).
   ============================================================ */
const fs = require('fs'), path = require('path'), vm = require('vm');
const RAIZ = path.join(__dirname, '..'), JS = path.join(RAIZ, 'webapp', 'js');
const ctx = vm.createContext({ console });
['reglas.js', 'datos.js', 'variables.js', 'finales.js'].forEach(function (n) {
  vm.runInContext(fs.readFileSync(path.join(JS, n), 'utf8'), ctx, { filename: n });
});

const E = vm.runInContext('ESCENAS', ctx);
const aplicar = vm.runInContext('aplicarEfectos', ctx);
const disp = vm.runInContext('opcionDisponible', ctx);
const calc = vm.runInContext('calcularFinal', ctx);
const go = vm.runInContext('esGameOver', ctx);

const porFinal = { A: [], B: [], C: [], GO: [] };
const usoOpcion = {};

function jugar(id, camino) {
  const st = JSON.stringify(vm.runInContext('estado', ctx));
  const hist = JSON.stringify(vm.runInContext('historial', ctx));
  E[id].opciones.forEach(function (o, i) {
    if (!disp(o)) return;
    aplicar(o.efectos || {}, o.set || null);
    const clave = id + '#' + i;
    usoOpcion[clave] = (usoOpcion[clave] || 0) + 1;
    if (go()) {
      porFinal.GO.push({ camino: camino.concat(id + '#' + i), estado: JSON.parse(JSON.stringify(vm.runInContext('estado', ctx))) });
    } else if (o.destino === 'FINAL') {
      const f = calc(vm.runInContext('estado', ctx));
      porFinal[f].push({ camino: camino.concat(id + '#' + i), estado: JSON.parse(JSON.stringify(vm.runInContext('estado', ctx))) });
    } else {
      jugar(o.destino, camino.concat(id + '#' + i));
    }
    vm.runInContext('estado=JSON.parse(' + JSON.stringify(st) + ');historial=JSON.parse(' + JSON.stringify(hist) + ');', ctx);
  });
}

vm.runInContext('reiniciarEstado()', ctx);
jugar('N1', []);

console.log('BALANCE · 12 LUGARES\n=====================\n');
Object.keys(porFinal).forEach(function (k) {
  const lista = porFinal[k];
  if (!lista.length) {
    console.log(k === 'GO'
      ? 'GO: no se alcanza (queda como red de seguridad: con estos numeros siempre hay final)'
      : k + ': NO SE ALCANZA  <-- revisar');
    return;
  }
  const prom = (campo) => Math.round(lista.reduce((a, x) => a + x.estado[campo], 0) / lista.length);
  const min = (campo) => Math.min.apply(null, lista.map(x => x.estado[campo]));
  const max = (campo) => Math.max.apply(null, lista.map(x => x.estado[campo]));
  console.log(k + ': ' + lista.length + ' camino(s)  |  salud ' + min('salud') + '-' + max('salud') +
    ' (prom ' + prom('salud') + ')  moral ' + min('moral') + '-' + max('moral') +
    ' (prom ' + prom('moral') + ')  recursos ' + min('recursos') + '-' + max('recursos'));
});

console.log('\nCaminos mas cortos por final:');
['A', 'B', 'C'].forEach(function (k) {
  if (!porFinal[k].length) return;
  const corto = porFinal[k].reduce((a, b) => (b.camino.length < a.camino.length ? b : a));
  console.log('  ' + k + ' (' + corto.camino.length + ' decisiones): ' + corto.camino.join(' -> '));
});

const total = porFinal.A.length + porFinal.B.length + porFinal.C.length + porFinal.GO.length;
console.log('\nTotal de partidas posibles: ' + total);
console.log('Umbrales usados: ' + JSON.stringify(vm.runInContext('REGLAS.umbrales', ctx)));
fs.writeFileSync(path.join(__dirname, 'balance_resultado.json'), JSON.stringify({
  total: total,
  finales: { A: porFinal.A.length, B: porFinal.B.length, C: porFinal.C.length, GO: porFinal.GO.length },
  cortos: { A: porFinal.A.length ? porFinal.A.reduce((a, b) => (b.camino.length < a.camino.length ? b : a)).camino : null,
            B: porFinal.B.length ? porFinal.B.reduce((a, b) => (b.camino.length < a.camino.length ? b : a)).camino : null,
            C: porFinal.C.length ? porFinal.C.reduce((a, b) => (b.camino.length < a.camino.length ? b : a)).camino : null }
}, null, 2));
/* ============================================================
   ANALISIS DE BALANCE DEL PROTOTIPO
   Autor: Bruno Casanova (logica / balance)
   ------------------------------------------------------------
   Recorre los 729 caminos posibles y muestra cuantos terminan en
   cada final, y con que recursos llegan. Sirve para justificar las
   decisiones de balance (por que un final es facil o dificil).
   Uso:  node tools/balance.js
   ============================================================ */
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..', 'webapp', 'js');
const fuente = ['datos.js', 'variables.js', 'finales.js']
  .map((f) => fs.readFileSync(path.join(raiz, f), 'utf8')).join('\n');

// variables.js guarda el estado en una variable interna; la exponemos para leerla.
const ctx = {};
new Function('exports', fuente +
  '\nObject.assign(exports,{ESCENAS,ESTADO_INICIAL,calcularFinal,aplicarEfectos,opcionDisponible,esGameOver,reiniciarEstado,leer:function(){return estado;}});'
)(ctx);

const { ESCENAS, calcularFinal, aplicarEfectos, opcionDisponible, esGameOver, reiniciarEstado, leer } = ctx;

const dist = { A: 0, B: 0, C: 0, GO: 0 };
const ejemplo = {};
let sumaSalud = 0, n = 0, llaves = 0, radio = 0, tomas = 0;

for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++)
for (let d = 0; d < 3; d++) for (let e = 0; e < 3; e++) for (let f = 0; f < 3; f++) {
  const camino = [a, b, c, d, e, f];
  reiniciarEstado();
  let id = 'N1', paso = 0, go = false;
  while (id !== 'FINAL') {
    const esc = ESCENAS[id];
    const op = esc.opciones[camino[paso] || 0];
    if (opcionDisponible(op)) aplicarEfectos(op.efectos || {}, op.set || null);
    else aplicarEfectos(op.efectosAlternativos || {}, null);
    if (esGameOver()) { go = true; break; }
    id = op.destino; paso++;
  }
  const e2 = leer();
  const clave = go ? 'GO' : calcularFinal(e2);
  dist[clave]++;
  if (!ejemplo[clave]) ejemplo[clave] = { camino: camino.map((x) => x + 1).join(','), estado: { salud: e2.salud, moral: e2.moral, recursos: e2.recursos } };
  if (!go) { sumaSalud += e2.salud; n++; if (e2.llaves) llaves++; if (e2.radioReparada) radio++; if (e2.tomasRescatado) tomas++; }
}

console.log('Total de caminos:', 729);
console.log('Final A (Supervivientes Organizados):', dist.A);
console.log('Final B (Refugiados en la Fortaleza):', dist.B);
console.log('Final C (Huida Desesperada):', dist.C);
console.log('GAME OVER:', dist.GO);
console.log('Ejemplo de camino para cada final (opciones 1-3 por etapa):');
console.log(JSON.stringify(ejemplo, null, 2));
console.log('--- Promedios de los que terminan con final ---');
console.log('Salud promedio al final:', (sumaSalud / n).toFixed(1));
console.log('% con llaves:', ((llaves / n) * 100).toFixed(1));
console.log('% con radio reparada:', ((radio / n) * 100).toFixed(1));
console.log('% con Tomas rescatado:', ((tomas / n) * 100).toFixed(1));
