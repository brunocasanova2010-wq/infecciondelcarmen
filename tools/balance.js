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
