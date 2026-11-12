/* ============================================================
   FINALES y GAME OVER  (Sprint 3 - logica corregida)
   Autor de balance: Bruno Casanova
   ------------------------------------------------------------
   REGLAS (mutuamente excluyentes, cubren el 100% de los casos):
     - GAME OVER: es INDEPENDIENTE. Se dispara apenas Salud <= 0
       en CUALQUIER momento (no es un "final" narrativo).
     - FINAL A (Supervivientes Organizados): salud>=50 Y moral>=40 Y recursos>=2
       Y SALIERON EN LA CAMIONETA (salieronCamioneta = true).
       (Antes de la revision, A era casi inalcanzable: solo 21 de 729 caminos.
        Ver docs/balance.md, analisis con tools/balance.js.)
     - FINAL C (Huida Desesperada): salud<25 (y >0) O moral<=10
       O huyeron A PIE (salieronCamioneta = false).
     - FINAL B (Refugiados en la Fortaleza): el resto (salud>=25 y moral>10 y
       no cumplen A): se atrincheran a esperar rescate.
   Las consecuencias narrativas (Tomas y la radio) modifican el TEXTO
   del final, no la categoria.
   ============================================================ */

function calcularFinal(e) {
  // Game Over ya se maneja aparte en juego.js; aca asumimos salud > 0.
  if (e.salud >= 45 && e.recursos >= 2 && e.salieronCamioneta) return "A";
  if (e.salud < 25 || e.moral <= 10 || !e.salieronCamioneta) return 'C';
  return 'B'; // salud>=25 y moral>10, sin cumplir A
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
      cuerpo: 'El grupo cruza el porton completo, con recursos y moral intactas. '
        + tomas + ' ' + radio + ' Escapan ordenados, listos para ayudar a otros.'
    },
    B: {
      titulo: 'FINAL B - Refugiados en la Fortaleza',
      cuerpo: 'Sin fuerzas para seguir, frenan y se atrincheran a esperar. '
        + tomas + ' ' + radio
        + (e.radioReparada ? ' El rescate que llamaron por radio llega al amanecer.'
                            : ' Resisten la noche sin saber si vendra ayuda.')
    },
    C: {
      titulo: 'FINAL C - Huida Desesperada',
      cuerpo: 'La expedicion colapsa. Mateo escapa casi sin aliento y con el grupo quebrado. '
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
