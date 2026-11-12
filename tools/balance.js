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
