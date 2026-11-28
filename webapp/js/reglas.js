/* ============================================================
   REGLAS DEL JUEGO EN UN SOLO LUGAR (Sprint 4)
   Autor: Bruno Casanova (logica / balance)
   ------------------------------------------------------------
   Antes las reglas estaban escritas en finales.js y en el texto de
   los comentarios, y no coincidian. Ahora viven aca, una sola vez,
   y el resto del juego las consulta. Asi el comentario y el codigo
   no pueden volver a separarse.
   Uso:  node tools/reglas.js   (imprime la tabla de reglas)
   El mismo archivo se carga en la web (webapp/js/reglas.js).
   ============================================================ */

const REGLAS = {
  rango: { salud: [0, 100], moral: [0, 100], recursos: [0, 5] },

  /* Estado con el que arranca toda partida. */
  inicial: { salud: 100, moral: 50, recursos: 1, llaves: false,
             perroAliado: false, tomasRescatado: false, radioReparada: false, salieronCamioneta: false },

  /* Si la Moral toca 0, se descuenta esta Salud UNA sola vez por partida. */
  penalizacionMoral0: 20,

  /* Umbrales numericos de cada final (los usan el juego y las pruebas). */
  umbrales: {
    A: { salud: 50, moral: 40, recursos: 2 },
    B: { salud: 40, moral: 30 }
  },

  /* Finales: se evaluan en este orden y la primera que se cumple gana. */
  finales: [
    { clave: 'A', nombre: 'Supervivientes Organizados',
      condicion: 'llaves Y salieronCamioneta Y salud>=50 Y moral>=40 Y recursos>=2' },
    { clave: 'B', nombre: 'Refugiados en la Fortaleza',
      condicion: 'no salieronCamioneta (se quedan a esperar rescate) Y salud>=40 Y moral>=30' },
    { clave: 'C', nombre: 'Huida Desesperada',
      condicion: 'cualquier otro caso con salud>0' }
  ]
};

// En el navegador no existe "module": se protege la exportacion.
if (typeof module !== 'undefined' && module.exports) { module.exports = { REGLAS }; }

if (typeof require !== 'undefined' && require.main === module) {
  console.log('ESTADO INICIAL: ' + JSON.stringify(REGLAS.inicial));
  console.log('PENALIZACION Moral 0: -' + REGLAS.penalizacionMoral0 + ' Salud (una sola vez)\n');
  REGLAS.finales.forEach(function (f) {
    console.log(f.clave + ' - ' + f.nombre + '\n    ' + f.condicion);
  });
}
/* ============================================================
   REGLAS DEL JUEGO EN UN SOLO LUGAR (Sprint 4)
   Autor: Bruno Casanova (logica / balance)
   ------------------------------------------------------------
   Antes las reglas estaban escritas en finales.js y en el texto de
   los comentarios, y no coincidian. Ahora viven aca, una sola vez,
   y el resto del juego las consulta. Asi el comentario y el codigo
   no pueden volver a separarse.
   Uso:  node tools/reglas.js   (imprime la tabla de reglas)
   El mismo archivo se carga en la web (webapp/js/reglas.js).
   ============================================================ */

const REGLAS = {
  rango: { salud: [0, 100], moral: [0, 100], recursos: [0, 5] },

  /* Estado con el que arranca toda partida. */
  inicial: { salud: 100, moral: 50, recursos: 1, llaves: false,
             tomasRescatado: false, radioReparada: false, salieronCamioneta: false },

  /* Si la Moral toca 0, se descuenta esta Salud UNA sola vez por partida. */
  penalizacionMoral0: 20,

  /* Umbrales numericos de cada final (los usan el juego y las pruebas). */
  umbrales: {
    A: { salud: 50, moral: 40, recursos: 2 },
    B: { salud: 40, moral: 30 }
  },

  /* Finales: se evaluan en este orden y la primera que se cumple gana. */
  finales: [
    { clave: 'A', nombre: 'Supervivientes Organizados',
      condicion: 'llaves Y salieronCamioneta Y salud>=50 Y moral>=40 Y recursos>=2' },
    { clave: 'B', nombre: 'Refugiados en la Fortaleza',
      condicion: 'no salieronCamioneta (se quedan a esperar rescate) Y salud>=40 Y moral>=30' },
    { clave: 'C', nombre: 'Huida Desesperada',
      condicion: 'cualquier otro caso con salud>0' }
  ]
};

// En el navegador no existe "module": se protege la exportacion.
if (typeof module !== 'undefined' && module.exports) { module.exports = { REGLAS }; }

if (typeof require !== 'undefined' && require.main === module) {
  console.log('ESTADO INICIAL: ' + JSON.stringify(REGLAS.inicial));
  console.log('PENALIZACION Moral 0: -' + REGLAS.penalizacionMoral0 + ' Salud (una sola vez)\n');
  REGLAS.finales.forEach(function (f) {
    console.log(f.clave + ' - ' + f.nombre + '\n    ' + f.condicion);
  });
}
