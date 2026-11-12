/* ============================================================
   PRUEBA AUTOMATICA DE RECORRIDOS  (Sprint 3 - prototipo)
   Autor: Bruno Casanova (logica / balance)
   ------------------------------------------------------------
   Carga los MISMOS archivos del juego y recorre TODAS las
   combinaciones de decisiones (3^6 = 729 caminos). Verifica que:
     1) ningun recorrido se traba (siempre llega a un final o a Game Over);
     2) los valores no se salen de rango (Salud 0-100, Moral 0-100,
        Recursos 0-5);
     3) se pueden alcanzar los 3 finales A / B / C;
     4) el GAME OVER es alcanzable y es distinto de los finales;
     5) hay caminos con Tomas rescatado y caminos con Tomas abandonado.

   COMO CORRERLO:   node tools/prueba_recorridos.js
   Necesita Node.js instalado (ver docs/prueba_automatica.md).
   Termina con codigo 0 si todo esta bien, 1 si hay fallas.
   ============================================================ */
const fs = require('fs');
const path = require('path');

const raiz = path.join(__dirname, '..', 'webapp', 'js');
const fuente = ['datos.js', 'variables.js', 'finales.js']
  .map((f) => fs.readFileSync(path.join(raiz, f), 'utf8'))
  .join('\n');

// Se evaluan los archivos igual que en el navegador. 'leer' expone el estado
// interno de variables.js para poder revisarlo desde aca.
const contexto = {};
new Function('exports', fuente +
  '\nObject.assign(exports,{ESCENAS,ESTADO_INICIAL,calcularFinal,aplicarEfectos,' +
  'opcionDisponible,esGameOver,reiniciarEstado,leer:function(){return estado;}});')(contexto);

const { ESCENAS, calcularFinal, aplicarEfectos, opcionDisponible, esGameOver, reiniciarEstado, leer } = contexto;

const r = { total: 0, trabados: [], fueraDeRango: [], finales: { A: 0, B: 0, C: 0 }, gameOver: 0, tomas: 0, abandono: 0 };

/* Juega un camino completo (indices 0-2 de la opcion elegida en cada etapa). */
function recorrer(camino) {
  reiniciarEstado();
  let id = 'N1';
  let paso = 0;

  while (id !== 'FINAL') {
    if (paso > 20 || !ESCENAS[id]) return { trabado: true, id };
    const op = ESCENAS[id].opciones[camino[paso] || 0];
    if (!op) return { trabado: true, id };

    if (opcionDisponible(op)) aplicarEfectos(op.efectos || {}, op.set || null);
    else aplicarEfectos(op.efectosAlternativos || {}, null);

    const e = leer();
    if (e.salud < 0 || e.salud > 100 || e.moral < 0 || e.moral > 100 ||
        e.recursos < 0 || e.recursos > 5) {
      r.fueraDeRango.push({ id, camino, salud: e.salud, moral: e.moral, recursos: e.recursos });
    }

    if (esGameOver()) return { gameOver: true, tomas: e.tomasRescatado };

    id = op.destino;
    paso++;
  }

  return { final: calcularFinal(leer()), tomas: leer().tomasRescatado };
}

for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++)
for (let d = 0; d < 3; d++) for (let e = 0; e < 3; e++) for (let f = 0; f < 3; f++) {
  const camino = [a, b, c, d, e, f];
  const res = recorrer(camino);
  r.total++;

  if (res.trabado) { r.trabados.push({ camino, id: res.id }); continue; }
  if (res.gameOver) { r.gameOver++; continue; }
  r.finales[res.final]++;
  if (res.tomas) r.tomas++; else r.abandono++;
}

console.log('Recorridos probados:', r.total);
console.log('Se trabó algun recorrido:', r.trabados.length);
console.log('Valores fuera de rango:', r.fueraDeRango.length);
console.log('Final A (Supervivientes Organizados):', r.finales.A);
console.log('Final B (Refugiados en la Fortaleza):', r.finales.B);
console.log('Final C (Huida Desesperada):', r.finales.C);
console.log('GAME OVER (independiente):', r.gameOver);
console.log('Caminos con Tomas rescatado:', r.tomas, '| con Tomas abandonado:', r.abandono);

const ok = r.trabados.length === 0 && r.fueraDeRango.length === 0 &&
  r.finales.A > 0 && r.finales.B > 0 && r.finales.C > 0 &&
  r.gameOver > 0 && r.tomas > 0 && r.abandono > 0;

console.log(ok ? '\nRESULTADO: OK - pasaron todas las pruebas' : '\nRESULTADO: HAY FALLAS');
process.exit(ok ? 0 : 1);
