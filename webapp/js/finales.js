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
