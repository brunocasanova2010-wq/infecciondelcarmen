/* ============================================================
   PRUEBAS DE LAS REGLAS DEL JUEGO  (las 4 que pidio la profesora)
   Autor: Bruno Casanova (logica / balance)
   ------------------------------------------------------------
   Cada prueba dice: QUE se busca, RESULTADO ESPERADO y RESULTADO
   OBTENIDO. Si una falla, el programa termina con error y dice cual.
   Uso:  node tools/prueba_reglas.js
   ============================================================ */
const R = require('./requiere.js');

let pasaron = 0, fallaron = 0;
const detalle = [];

function probar(nombre, queBusca, esperado, obtenido, ok, notas) {
  if (ok) pasaron++; else fallaron++;
  detalle.push({
    nombre: nombre, busca: queBusca, esperado: esperado,
    obtenido: obtenido, ok: ok, notas: notas || ''
  });
  console.log((ok ? '[OK]   ' : '[FALLA]') + ' ' + nombre + '  ->  ' + obtenido);
}

/* ---------- PRUEBA 1: las llaves son obligatorias para el Final A ---------- */
(function () {
  const malo = { salud: 100, moral: 80, recursos: 5, llaves: false, salieronCamioneta: true };
  const bueno = { salud: 100, moral: 80, recursos: 5, llaves: true, salieronCamioneta: true };
  const ctx = R.juegoNuevo();
  const calc = R.calcularFinalDe(ctx);
  const sinLlaves = calc(malo), conLlaves = calc(bueno);
  probar('P1 - Llaves obligatorias para el Final A',
    'Que NO se pueda escapar en camioneta y llegar al Final A sin las llaves',
    'sin llaves = C o B ; con llaves = A',
    'sin llaves = ' + sinLlaves + ' ; con llaves = ' + conLlaves,
    sinLlaves !== 'A' && conLlaves === 'A',
    'Antes las llaves solo se mostraban en el HUD y no se usaban.');
})();

/* ---------- PRUEBA 2: Final A y Final B cumplen lo que dice el comentario ---------- */
(function () {
  const ctx = R.juegoNuevo();
  const calc = R.calcularFinalDe(ctx);
  const casos = [
    ['A con salud 45 (no alcanza 50)', { salud: 45, moral: 80, recursos: 3, llaves: true, salieronCamioneta: true }, 'C'],
    ['A con moral 35 (no alcanza 40)', { salud: 90, moral: 35, recursos: 3, llaves: true, salieronCamioneta: true }, 'C'],
    ['A con 1 recurso (no alcanza 2)', { salud: 90, moral: 60, recursos: 1, llaves: true, salieronCamioneta: true }, 'C'],
    ['A completo (justo en el limite)', { salud: 50, moral: 40, recursos: 2, llaves: true, salieronCamioneta: true }, 'A']
  ];
  const filas = casos.map(function (c) {
    const r = calc(c[1]);
    return c[0] + ' = ' + r + (r === c[2] ? '' : ' (ERROR: esperaba ' + c[2] + ')');
  });
  const ok = casos.every(function (c) { return calc(c[1]) === c[2]; });
  probar('P2 - El codigo coincide con el comentario',
    'Que las condiciones escritas en el comentario sean las que usa la funcion',
    'salud>=50, moral>=40, recursos>=2 y llaves',
    filas.join(' | '), ok,
    'Antes la funcion pedia salud>=45, no miraba la moral y no miraba las llaves.');
})();

/* ---------- PRUEBA 3: no escapar en camioneta NO manda siempre al Final C ---------- */
(function () {
  const ctx = R.juegoNuevo();
  const calc = R.calcularFinalDe(ctx);
  // Refugiarse con el grupo entero (salud y moral altas) -> atrincherados = Final B
  const refugio = { salud: 80, moral: 70, recursos: 3, llaves: true, salieronCamioneta: false };
  // Huir a pie destrozado -> Final C
  const huida = { salud: 20, moral: 70, recursos: 3, llaves: false, salieronCamioneta: false };
  const r1 = calc(refugio), r2 = calc(huida);
  probar('P3 - Refugiarse bien no es "Huida Desesperada"',
    'Que quien no usa la camioneta pueda terminar en el Final B si llega entero',
    'refugio con salud 80 / moral 70 = B ; huida a pie con salud 20 = C',
    'refugio = ' + r1 + ' ; huida a pie = ' + r2,
    r1 === 'B' && r2 === 'C',
    'Antes cualquier salida sin camioneta caia en C por la condicion !salieronCamioneta.');
})();

/* ---------- PRUEBA 4: la Moral 0 descuenta Salud UNA sola vez ---------- */
(function () {
  const ctx = R.juegoNuevo();
  R.fijarEstado(ctx, { salud: 100, moral: 2, recursos: 3 });
  const aplicar = R.aplicarEfectosDe(ctx);
  aplicar({ moral: -2 }, null);      // la moral llega a 0 -> -20 salud
  const trasPrimera = R.estadoDe(ctx).salud;
  aplicar({ moral: -10 }, null);     // la moral sigue en 0 -> NO debe volver a descontar
  aplicar({ recursos: 1 }, null);    // cualquier otra decision tampoco
  const trasTercera = R.estadoDe(ctx).salud;
  probar('P4 - Penalizacion de Moral 0 una sola vez',
    'Que llegar a Moral 0 descuente 20 de Salud una vez por partida',
    'salud 100 -> 80 y queda en 80',
    'salud = ' + trasPrimera + ' y despues = ' + trasTercera,
    trasPrimera === 80 && trasTercera === 80,
    'Antes cada decision con la moral en 0 volvia a descontar 20.');
})();

/* ---------- PRUEBA 5: una opcion bloqueada no avanza ---------- */
(function () {
  const ctx = R.juegoNuevo();
  R.fijarEstado(ctx, { salud: 100, moral: 50, recursos: 0 });
  const r = R.jugarOpcion(ctx, 'N2B', 2); // 'Usar una bengala': pide 1 recurso, hay 0
  const est = R.estadoDe(ctx);
  // Ademas: en la web, el boton tiene que quedar con disabled = true.
  const html = require('fs').readFileSync(require('path').join(R.RAIZ, 'webapp', 'js', 'juego.js'), 'utf8');
  const botonDeshabilitado = /btn\.disabled\s*=\s*true/.test(html) && !/efectosAlternativos/.test(html);
  probar('P5 - La opcion bloqueada no se puede elegir',
    'Que una opcion bloqueada no aplique efectos, no avance y tenga el boton deshabilitado',
    'disponible = false, destino = null, estado intacto, boton con disabled',
    'disponible = ' + r.disponible + ' ; destino = ' + r.destino +
      ' ; salud = ' + est.salud + ' ; recursos = ' + est.recursos +
      ' ; boton disabled = ' + botonDeshabilitado,
    r.disponible === false && r.destino === null && est.salud === 100 && est.recursos === 0 && botonDeshabilitado,
    'Antes la funcion bloqueaba la opcion en las pruebas, pero juego.js la dejaba clickeable y aplicaba una alternativa.');
})();

/* ---------- PRUEBA 6: los 729 caminos cierran en un final valido ---------- */
(function () {
  const r = R.recorrerTodos();
  const total = r.A + r.B + r.C + r.GO;
  probar('P6 - Ningun camino queda colgado (siempre hay desenlace)',
    'Que todo camino que entra al arbol cierre en A, B, C o Game Over (nada queda colgado)',
    'lo que entra se cierra: el conteo es informativo (ver docs/registro_pruebas.md)',
    total + ' desenlaces -> A=' + r.A + ' B=' + r.B + ' C=' + r.C + ' GO=' + r.GO,
    total === r.evaluados && total > 0, '');
})();

/* ---------- PRUEBA 7: no se llega al Final A sin llaves, en ningun camino ---------- */
(function () {
  const r = R.recorrerTodos(true); // con detalle: cuantos A sin llaves
  probar('P7 - Ningun camino llega al Final A sin llaves',
    'Que en los 729 recorridos no exista un Final A con llaves = false',
    '0 caminos',
    r.A_sin_llaves + ' caminos',
    r.A_sin_llaves === 0, '');
})();

console.log('\n' + pasaron + ' pruebas OK, ' + fallaron + ' fallaron (de ' + (pasaron + fallaron) + ')');
require('fs').writeFileSync(require('path').join(__dirname, 'resultado_pruebas.json'),
  JSON.stringify({ fecha: new Date().toISOString(), pasaron: pasaron, fallaron: fallaron, detalle: detalle }, null, 2));
process.exit(fallaron ? 1 : 0);
