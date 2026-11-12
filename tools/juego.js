/* ============================================================
   MOTOR DEL JUEGO  (Sprint 3)
   Integracion: Tomas Grzona
   ------------------------------------------------------------
   Conecta datos.js + variables.js + finales.js con la interfaz.
   Maneja: pantalla de inicio, render de escenas, decisiones,
   actualizacion de variables, Game Over independiente y finales.
   ============================================================ */

let escenaActual = null;

/* --- Referencias al DOM --- */
const $ = (sel) => document.querySelector(sel);

function mostrarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
  $(id).classList.add('activa');
}

/* Actualiza la barra de estado (HUD) con animacion de cambio. */
function actualizarHUD() {
  const barras = {
    salud: $('#barra-salud'),
    moral: $('#barra-moral')
  };
  barras.salud.style.width = estado.salud + '%';
  barras.moral.style.width = estado.moral + '%';
  $('#valor-salud').textContent = estado.salud + '%';
  $('#valor-moral').textContent = estado.moral;
  $('#valor-recursos').textContent = estado.recursos + ' / 5';
  $('#valor-llaves').textContent = estado.llaves ? 'Si' : 'No';

  // Cambio visual del indicador segun nivel de salud (consecuencia visible).
  barras.salud.classList.toggle('critico', estado.salud <= 25);

  // Efecto de "flash" al cambiar: dispara animacion CSS.
  const hud = $('#hud');
  hud.classList.remove('cambio');
  void hud.offsetWidth; // reinicia la animacion
  hud.classList.add('cambio');
}

/* Dibuja una escena por su id. */
function renderEscena(id) {
  if (id === 'FINAL') { renderFinal(); return; }

  escenaActual = id;
  const esc = ESCENAS[id];
  const escena = $('#pantalla-juego');

  escena.style.backgroundImage = "url('" + RUTAS.fondos + esc.fondo + "')";
  $('#etiqueta-etapa').textContent = esc.titulo;
  $('#retrato').src = RUTAS.personajes + esc.personaje;
  $('#retrato').alt = esc.personaje;

  // Panel narrativo con animacion de aparicion.
  const panel = $('#panel-narrativo');
  panel.classList.remove('aparece');
  void panel.offsetWidth;
  panel.classList.add('aparece');
  $('#texto-escena').textContent = esc.texto;

  // Botones de decision.
  const cont = $('#opciones');
  cont.innerHTML = '';
  esc.opciones.forEach((op) => {
    const btn = document.createElement('button');
    btn.className = 'btn-opcion';
    const disponible = opcionDisponible(op);
    if (!disponible) {
      btn.classList.add('bloqueada');
      btn.textContent = op.texto + '  [bloqueada]';
      btn.title = op.bloqueadaTexto || 'Requisitos insuficientes';
    } else {
      btn.textContent = op.texto;
    }
    btn.addEventListener('click', () => elegir(op, id));
    cont.appendChild(btn);
  });

  actualizarHUD();
  mostrarPantalla('#pantalla-juego');
}

/* Procesa la eleccion de una opcion. */
function elegir(op, idEscena) {
  let textoReg = op.texto;

  if (!opcionDisponible(op)) {
    // Opcion bloqueada: aplica la alternativa (consecuencia por no tener recurso).
    aplicarEfectos(op.efectosAlternativos || {}, null);
    textoReg = op.texto + ' (BLOQUEADA -> alternativa)';
    $('#aviso').textContent = op.bloqueadaTexto || 'Opcion bloqueada.';
    mostrarAviso();
  } else {
    aplicarEfectos(op.efectos || {}, op.set || null);
  }

  registrarPaso(idEscena, textoReg);
  actualizarHUD();

  // Game Over independiente: se evalua ANTES de seguir navegando.
  if (esGameOver()) { renderGameOver(); return; }

  renderEscena(op.destino);
}

function mostrarAviso() {
  const a = $('#aviso');
  a.classList.remove('oculto');
  a.classList.add('visible');
  setTimeout(() => { a.classList.remove('visible'); a.classList.add('oculto'); }, 2600);
}

function renderFinal() {
  const clave = calcularFinal(estado);
  const f = textoFinal(clave, estado);
  $('#titulo-final').textContent = f.titulo;
  $('#cuerpo-final').textContent = f.cuerpo;
  $('#resumen-final').innerHTML =
    'Salud: <b>' + estado.salud + '%</b> &middot; Moral: <b>' + estado.moral +
    '</b> &middot; Recursos: <b>' + estado.recursos + '</b> &middot; Llaves: <b>' +
    (estado.llaves ? 'Si' : 'No') + '</b>';
  $('#pantalla-final').className = 'pantalla final-' + clave + ' activa';
  mostrarPantalla('#pantalla-final');
}

function renderGameOver() {
  $('#titulo-gameover').textContent = TEXTO_GAME_OVER.titulo;
  $('#cuerpo-gameover').textContent = TEXTO_GAME_OVER.cuerpo;
  mostrarPantalla('#pantalla-gameover');
}

function empezar() {
  reiniciarEstado();
  renderEscena('N1');
}

/* --- Enlaces de la interfaz --- */
window.addEventListener('DOMContentLoaded', () => {
  $('#btn-empezar').addEventListener('click', empezar);
  $('#btn-reiniciar-final').addEventListener('click', () => mostrarPantalla('#pantalla-inicio'));
  $('#btn-reiniciar-go').addEventListener('click', () => mostrarPantalla('#pantalla-inicio'));
});
