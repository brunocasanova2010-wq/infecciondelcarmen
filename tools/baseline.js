/* Vuelve a los archivos del juego su estado ANTERIOR (Sprint 3). */
const fs = require('fs');
const path = require('path');
const RAIZ = path.join(__dirname, '..', 'webapp', 'js');
const p = (n) => path.join(RAIZ, n);

const VIEJOS = {
  datos: p('datos.js') + '.sprint3',
  variables: p('variables.js') + '.sprint3',
  finales: p('finales.js') + '.sprint3',
  juego: p('juego.js') + '.sprint3'
};

Object.keys(VIEJOS).forEach(function (n) {
  fs.copyFileSync(VIEJOS[n], p(n + '.js'));
});
console.log('Restaurada la version del Sprint 3 en webapp/js/');
