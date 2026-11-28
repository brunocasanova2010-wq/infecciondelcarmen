/* ============================================================
   PRUEBAS DEL JUEGO DE 12 LUGARES  (Sprint 5)
   Autor: Bruno Casanova
   Uso:   node tools/prueba_rutas.js
   ------------------------------------------------------------
   No prueba el dibujo: prueba que la estructura del juego no se
   rompa al editar datos.js. Si alguien escribe un destino que no
   existe, borra un fondo o desconecta un lugar, aca salta.
   ============================================================ */
const fs = require('fs'), path = require('path'), vm = require('vm');
const RAIZ = path.join(__dirname, '..'), JS = path.join(RAIZ, 'webapp', 'js');
const ctx = vm.createContext({ console });
['reglas.js', 'datos.js', 'variables.js', 'finales.js'].forEach(function (n) {
  const c = fs.readFileSync(path.join(JS, n), 'utf8').replace(/if \(typeof module[^\n]*\n?/g, '');
  vm.runInContext(c, ctx, { filename: n });
});

const E = vm.runInContext('ESCENAS', ctx);
let ok = 0; const fallos = [];
function check(nombre, cond, detalle) {
  cond ? ok++ : fallos.push(nombre + ' -> ' + detalle);
  console.log((cond ? '[OK]   ' : '[FALLA]') + ' ' + nombre + (detalle ? '  ->  ' + detalle : ''));
}

const ids = Object.keys(E);
const destinos = [];
ids.forEach(k => E[k].opciones.forEach(o => destinos.push(o.destino)));

/* 1. Ningun boton lleva a la nada */
const invalidos = [...new Set(destinos.filter(d => d !== 'FINAL' && !E[d]))];
check('Todo destino existe', invalidos.length === 0, invalidos.join(','));

/* 2 y 3. Los archivos que pide datos.js estan en la carpeta */
const faltanF = [...new Set(ids.map(k => E[k].fondo))].filter(f => !fs.existsSync(path.join(RAIZ, 'webapp', 'assets', 'fondos', f)));
check('Todos los fondos existen', faltanF.length === 0, faltanF.join(','));
const faltanP = [...new Set(ids.map(k => E[k].personaje))].filter(f => !fs.existsSync(path.join(RAIZ, 'webapp', 'assets', 'personajes', f)));
check('Todos los personajes existen', faltanP.length === 0, faltanP.join(','));

/* 4. Ningun lugar queda sin llegar */
const huerfanos = ids.filter(k => k !== 'N1' && !destinos.includes(k));
check('Sin lugares huerfanos', huerfanos.length === 0, huerfanos.join(','));

/* 5. Sin vueltas atras: el mapa es un arbol, no un laberinto sin salida */
const retro = [];
ids.forEach(k => E[k].opciones.forEach(o => {
  if (o.destino !== 'FINAL' && E[o.destino] && E[o.destino].etapa < E[k].etapa) retro.push(k + '->' + o.destino);
}));
check('Ningun camino retrocede de etapa', retro.length === 0, retro.join(','));

/* 6. La queja del profe: siempre el mismo lugar */
const n1 = new Set(E.N1.opciones.map(o => o.destino));
check('Desde el aula se abren 3 lugares distintos', n1.size === 3, [...n1].join(','));

/* 7. Un fondo por lugar, sin repetir */
const fondosUsados = new Set(ids.map(k => E[k].fondo));
check('12 lugares con 12 fondos distintos', ids.length === 12 && fondosUsados.size === 12, ids.length + ' lugares / ' + fondosUsados.size + ' fondos');

/* 8. Todo lugar ofrece una decision (salvo el final) */
const pocas = ids.filter(k => E[k].opciones.length < 2);
check('Cada lugar tiene al menos 2 opciones', pocas.length === 0, pocas.join(','));

/* 9. Los tres finales se alcanzan de verdad, y ningun camino se cuelga */
const aplicar = vm.runInContext('aplicarEfectos', ctx), disp = vm.runInContext('opcionDisponible', ctx);
const calc = vm.runInContext('calcularFinal', ctx), go = vm.runInContext('esGameOver', ctx);
const res = { A: 0, B: 0, C: 0, GO: 0 }; const caminos = [];
function jugar(id, camino) {
  const st = JSON.stringify(vm.runInContext('estado', ctx)), hist = JSON.stringify(vm.runInContext('historial', ctx));
  E[id].opciones.forEach(function (o, i) {
    if (!disp(o)) return;
    aplicar(o.efectos || {}, o.set || null);
    if (go()) res.GO++;
    else if (o.destino === 'FINAL') { res[calc(vm.runInContext('estado', ctx))]++; caminos.push(camino.concat(i).join('')); }
    else jugar(o.destino, camino.concat(i));
    vm.runInContext('estado=JSON.parse(' + JSON.stringify(st) + ');historial=JSON.parse(' + JSON.stringify(hist) + ');', ctx);
  });
}
vm.runInContext('reiniciarEstado()', ctx);
jugar('N1', []);
check('Todos los caminos llegan a un desenlace', caminos.length + res.GO > 0 && res.A + res.B + res.C + res.GO === caminos.length + res.GO,
  'A=' + res.A + ' B=' + res.B + ' C=' + res.C + ' GO=' + res.GO);
check('Se alcanzan los 3 finales', res.A > 0 && res.B > 0 && res.C > 0, 'A=' + res.A + ' B=' + res.B + ' C=' + res.C);

/* 10. La llave abre una puerta de verdad: sin llave, la camioneta no se puede tomar */
const sinLlave = vm.runInContext('({salud:100,moral:50,recursos:3,llaves:false,perro:false})', ctx);
const opcionCamioneta = E.ESTACIONAMIENTO.opciones.find(o => o.destino === 'CAMIONETA');
const bloqueada = vm.runInContext('(function(st){const guardado=estado;estado=st;const r=!opcionDisponible(' + JSON.stringify(opcionCamioneta) + ');estado=guardado;return r;})', ctx)(sinLlave);
check('Sin llaves, la camioneta esta bloqueada', bloqueada, 'requiere llaves');

/* 11. La animacion del equipo sigue en el juego */
const animOk = fs.existsSync(path.join(RAIZ, 'webapp', 'assets', 'animacion', 'Animacion_Mateo.gif'));
check('La animacion del equipo esta en el juego', animOk, 'Animacion_Mateo.gif');

console.log('\n' + ok + ' OK, ' + fallos.length + ' fallaron');
fs.writeFileSync(path.join(__dirname, 'resultado_pruebas_rutas.json'),
  JSON.stringify({ ok: ok, fallos: fallos, finales: res, caminos: caminos.length }, null, 2));
process.exit(fallos.length ? 1 : 0);
