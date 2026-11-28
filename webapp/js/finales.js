/* ============================================================
   FINALES  (Sprint 5 · 12 lugares)
   Logica: Bruno  |  Textos: Benja
   ------------------------------------------------------------
   El lugar donde termina la partida decide el final:
     camioneta -> A (si el grupo esta entero y con provisiones)
     refugio   -> B (si todavia tienen resto para sostenerlo)
     a pie     -> C (huida sin techo)
   Los umbrales viven en tools/reglas.js, no aca.
   ============================================================ */

function calcularFinal(e) {
  const M = REGLAS.umbrales;
  if (e.salida === 'camioneta' && e.llaves && e.salieronCamioneta &&
      e.salud >= M.A.salud && e.moral >= M.A.moral && e.recursos >= M.A.recursos) return 'A';
  if (e.salida === 'refugio' && e.salud >= M.B.salud && e.moral >= M.B.moral) return 'B';
  return 'C';
}

function textoFinal(clave, e) {
  const tomas = e.tomasRescatado
    ? 'Tomás salió del laboratorio con ustedes.'
    : 'Tomás quedó encerrado en el laboratorio.';
  const perro = e.perroAliado
    ? 'Rocco no se separó de Mateo en ningún momento.'
    : 'Rocco se quedó atrás, en el patio del colegio.';
  const radio = e.radioReparada
    ? 'La radio del colegio alcanzó a avisar al puesto de rescate.'
    : 'Nadie contestó del otro lado de la radio.';

  const titulos = {
    A: 'FINAL A — Supervivientes organizados',
    B: 'FINAL B — Refugiados en la estación',
    C: 'FINAL C — Huida a pie'
  };

  let cuerpo;
  if (e.salida === 'camioneta') {
    cuerpo = clave === 'A'
      ? 'Mateo abre el portón con la llave, la camioneta arranca al tercer intento y el grupo sale del colegio con agua, comida y la linterna. Doce lugares después, el colegio queda atrás.'
      : 'La camioneta salió igual, pero el grupo llegó lastimado y con las manos vacías. La salida fue desesperada, no organizada.';
  } else if (e.salida === 'refugio') {
    cuerpo = clave === 'B'
      ? 'La persiana baja hasta el piso y el playón queda a oscuras. Adentro hay agua, una radio de banda y dos empleados que saben usar la radio. El grupo aguanta la noche.'
      : 'Llegaron a la estación de servicio demasiado castigados para sostenerla: alguien tiene que salir a buscar agua antes de que amanezca.';
  } else {
    cuerpo = 'Dejaron la camioneta y el refugio atrás y siguieron a pie por el descampado. No hay paredes, no hay techo y el río queda lejos: la huida continúa.';
  }

  return { titulo: titulos[clave], cuerpo: cuerpo + ' ' + tomas + ' ' + perro + ' ' + radio };
}

const TEXTO_GAME_OVER = {
  titulo: 'GAME OVER',
  cuerpo: 'La salud del grupo llegó a cero antes de encontrar una salida. Reiniciá la partida y probá otro de los doce lugares.'
};
/* ============================================================
   FINALES y GAME OVER  (Sprint 4 - reglas corregidas)
   Autor de balance: Bruno Casanova
   ------------------------------------------------------------
   Las condiciones NO se escriben aca: se leen de tools/reglas.js,
   que es el unico lugar donde estan definidas. Asi el comentario y
   el codigo no pueden volver a contradecirse (devolucion Sprint 3).

   REGLAS (mutuamente excluyentes, cubren el 100% de los casos):
     - GAME OVER: es INDEPENDIENTE. Se dispara apenas Salud <= 0
       en CUALQUIER momento (no es un "final" narrativo).
     - FINAL A (Supervivientes Organizados):
         TENER LAS LLAVES  Y  salir en la camioneta  Y
         salud >= 50  Y  moral >= 40  Y  recursos >= 2
     - FINAL B (Refugiados en la Fortaleza): NO salir en la camioneta
         (se quedan atrincherados a esperar rescate) Y salud >= 40
         Y moral >= 30
     - FINAL C (Huida Desesperada): el resto (salud > 0).
   Las consecuencias narrativas (Tomas y la radio) modifican el TEXTO
   del final, no la categoria.
   ============================================================ */

function calcularFinal(e) {
  const R = REGLAS.finales;

  const M = REGLAS.umbrales;

  // A - solo con llaves, camioneta y el grupo entero (los 3 valores tienen peso).
  if (e.llaves === true && e.salieronCamioneta === true &&
      e.salud >= M.A.salud && e.moral >= M.A.moral && e.recursos >= M.A.recursos) {
    return R[0].clave; // 'A'
  }

  // B - se quedan a esperar rescate, y no estan destruidos.
  if (e.salieronCamioneta === false &&
      e.salud >= M.B.salud && e.moral >= M.B.moral) {
    return R[1].clave; // 'B'
  }

  // C - todo lo demas con salud > 0 (huida a pie, o llegar muy mal).
  return R[2].clave; // 'C'
}

function textoFinal(clave, e) {
  const tomas = e.tomasRescatado
    ? 'Tomas sale con el grupo: haberlo rescatado mantuvo unida a la cuadrilla.'
    : 'Tomas quedo atras en el laboratorio. Su ausencia pesa en cada uno.';
  const radio = e.radioReparada
    ? 'La radio reparada ya habia avisado a un puesto de rescate: alguien sabe donde estan.'
    : 'Nadie afuera sabe que lograron salir: la radio quedo muda.';

  const finales = {
    A: {
      titulo: 'FINAL A - Supervivientes Organizados',
      cuerpo: 'Mateo abre la camioneta con las llaves que consiguieron en el buffet. '
        + 'El grupo cruza el porton completo, con recursos y moral intactas. '
        + tomas + ' ' + radio + ' Escapan ordenados, listos para ayudar a otros.'
    },
    B: {
      titulo: 'FINAL B - Refugiados en la Fortaleza',
      cuerpo: 'Sin fuerzas para cruzar el porton a pie, el grupo se atrinchera en la '
        + 'estacion de servicio y espera. ' + tomas + ' ' + radio
        + (e.radioReparada ? ' El rescate que llamaron por radio llega al amanecer.'
                            : ' Resisten la noche sin saber si vendra ayuda.')
    },
    C: {
      titulo: 'FINAL C - Huida Desesperada',
      cuerpo: 'El grupo se parte: cada uno corre por su lado, sin plan y sin recursos. '
        + tomas + ' ' + radio + ' Sobrevivieron, pero el costo fue altisimo.'
    }
  };
  return finales[clave];
}

const TEXTO_GAME_OVER = {
  titulo: 'GAME OVER',
  cuerpo: 'La Salud del Grupo llego a 0%. La horda los alcanzo antes de encontrar '
    + 'una salida. Esta pantalla es independiente de los finales: no es un desenlace, '
    + 'es el fin del recorrido. Toca "Reiniciar" para intentarlo de nuevo.'
};
