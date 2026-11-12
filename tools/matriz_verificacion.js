/* ============================================================
   MATRIZ DE VERIFICACION (como la que pide la catedra)
   Autor: Bruno Casanova
   ------------------------------------------------------------
   Corre caminos ELEGIDOS A MANO y muestra que final sale con
   cada uno. Con eso se arma la tabla de docs/verificacion.md
   (opciones contadas de arriba hacia abajo, 1, 2 o 3).
   Uso:  node tools/matriz_verificacion.js
   ============================================================ */
const fs = require('fs');
const path = require('path');
const raiz = path.join(__dirname, '..', 'webapp', 'js');
const fuente = ['datos.js', 'variables.js', 'finales.js']
  .map((f) => fs.readFileSync(path.join(raiz, f), 'utf8')).join('\n');
const ctx = {};
new Function('exports', fuente + '\nObject.assign(exports,{ESCENAS,calcularFinal,aplicarEfectos,opcionDisponible,esGameOver,reiniciarEstado,leer:function(){return estado;}});')(ctx);
const { ESCENAS, calcularFinal, aplicarEfectos, opcionDisponible, esGameOver, reiniciarEstado, leer } = ctx;

function jugar(elegidas) {
  reiniciarEstado();
  const registro = [];
  let id = 'N1', paso = 0;
  while (id !== 'FINAL') {
    const esc = ESCENAS[id];
    const op = esc.opciones[elegidas[paso] - 1];
    const disponible = opcionDisponible(op);
    aplicarEfectos(disponible ? (op.efectos || {}) : (op.efectosAlternativos || {}), disponible ? (op.set || null) : null);
    registro.push(id + ': ' + (paso + 1) + ' -> ' + op.texto);
    if (esGameOver()) return { resultado: 'GAME OVER', registro, estado: leer() };
    id = op.destino; paso++;
  }
  return { resultado: 'Final ' + calcularFinal(leer()), registro, estado: leer() };
}

const casos = [
  { nombre: 'Todo prudente + camioneta', opciones: [1, 2, 1, 1, 3, 1] },
  { nombre: 'Rescate con herramienta + radio', opciones: [1, 3, 2, 1, 2, 1] },
  { nombre: "Rescate + llaves + radio + camioneta", opciones: [1, 2, 2, 1, 2, 1] },
  { nombre: 'Todo riesgoso', opciones: [2, 1, 2, 2, 3, 2] },
  { nombre: 'Prudente pero a pie', opciones: [1, 2, 1, 1, 3, 2] },
  { nombre: 'Prudente pero refugio', opciones: [1, 2, 1, 1, 3, 3] }
];

casos.forEach((c) => {
  const r = jugar(c.opciones);
  console.log('\n== ' + c.nombre + ' ==');
  console.log('Opciones: ' + c.opciones.join(', '));
  console.log('Resultado: ' + r.resultado +
    ' | Salud ' + r.estado.salud + ' - Moral ' + r.estado.moral + ' - Recursos ' + r.estado.recursos +
    ' | Llaves: ' + (r.estado.llaves ? 'si' : 'no') + ' | Tomas: ' + (r.estado.tomasRescatado ? 'rescatado' : 'abandonado') +
    ' | Radio: ' + (r.estado.radioReparada ? 'reparada' : 'rota') + ' | Camioneta: ' + (r.estado.salieronCamioneta ? 'si' : 'no'));
  r.registro.forEach((l) => console.log('   ' + l));
});
