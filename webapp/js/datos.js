/* ============================================================
   Infeccion: Escape del Carmen  -  DATOS DEL JUEGO (Sprint 3)
   Autores de contenido: Benja (narrativa) + Bruno (logica/balance)
   Este archivo SOLO contiene datos. El motor esta en juego.js
   ------------------------------------------------------------
   Correspondencia escena <-> fondo (corregida en Sprint 3):
     Etapa 1 -> Fondo_01_Aula
     Etapa 2 -> Fondo_02_Pasillo
     Etapa 3 -> Fondo_03_Buffet
     Etapa 4 -> Fondo_04_Laboratorio
     Etapa 5 -> Fondo_05_Gimnasio
     Etapa 6 -> Fondo_06_Estacionamiento
   ============================================================ */

const RUTAS = {
  fondos: 'assets/fondos/',
  personajes: 'assets/personajes/'
};

/* Estado inicial del juego (lo consume variables.js) */
const ESTADO_INICIAL = {
  salud: 100,      // 0 - 100  (0 = GAME OVER independiente)
  moral: 50,       // 0 - 100
  recursos: 1,     // 0 - 5 (arrancan con 1: una herramienta basica)
  llaves: false,       // llaves de la camioneta (Etapa 3)
  tomasRescatado: false, // consecuencia narrativa (Etapa 4)
  radioReparada: false,  // consecuencia narrativa (Etapa 5)
  salieronCamioneta: false // como escapan (Etapa 6) -> decide el final A o C
};

/* Cada escena:
   id, etapa, fondo, personaje, titulo, texto, opciones[]
   Cada opcion:
     texto, efectos{salud,moral,recursos}, set{...}, requiere{recursos},
     bloqueadaTexto, efectosAlternativos{...}, destino
*/
const ESCENAS = {

  /* ===================== ETAPA 1 ===================== */
  N1: {
    etapa: 1, fondo: 'Fondo_01_Aula.svg', personaje: 'Personaje_Mateo.svg',
    titulo: 'Etapa 1 - La alarma inicial',
    texto: 'Suena la alarma general en plena clase. Desde el patio llegan gritos y algo golpea las puertas del aula. Mateo mira a sus companeros: \"Eso no es un simulacro. Tenemos que movernos, ya.\"',
    opciones: [
      { texto: 'Bloquear las puertas con los bancos', efectos:{salud:+10, moral:-10}, destino:'N2A' },
      { texto: 'Correr al buffet por provisiones', efectos:{salud:-20, recursos:+1}, destino:'N2B' },
      { texto: 'Escapar por la ventana al patio', efectos:{salud:-5, moral:+5}, destino:'N2C' }
    ]
  },

  /* ===================== ETAPA 2 ===================== */
  N2A: {
    etapa: 2, fondo: 'Fondo_02_Pasillo.svg', personaje: 'Personaje_Lucas.svg',
    titulo: 'Etapa 2 - Pasillo Norte',
    texto: 'El pasillo norte esta a oscuras. \"Si hacemos ruido, van a venir todos. Despacio\", susurra Lucas.',
    opciones: [
      { texto: 'Tomar una barra de metal del taller', efectos:{salud:-25, recursos:+1}, destino:'N3A' },
      { texto: 'Usar mostradores caidos como cobertura', efectos:{salud:-5, moral:+5}, destino:'N3B' },
      { texto: 'Encender un extintor como distraccion', efectos:{moral:-10}, destino:'N3C' }
    ]
  },
  N2B: {
    etapa: 2, fondo: 'Fondo_02_Pasillo.svg', personaje: 'Personaje_Mateo.svg',
    titulo: 'Etapa 2 - Pasillo Central',
    texto: 'El pasillo central es el camino directo al buffet, pero el mas expuesto.',
    opciones: [
      { texto: 'Avanzar a paso acelerado', efectos:{salud:-25, moral:+10}, destino:'N3A' },
      { texto: 'Avanzar en sigilo tras el mostrador', efectos:{salud:-5}, destino:'N3B' },
      { texto: 'Usar una bengala para abrir paso', requiere:{recursos:1}, efectos:{recursos:-1, salud:+10}, bloqueadaTexto:'No tenes bengalas (Recursos insuficientes).', efectosAlternativos:{moral:-10}, destino:'N3C' }
    ]
  },
  N2C: {
    etapa: 2, fondo: 'Fondo_02_Pasillo.svg', personaje: 'Personaje_Sofia.svg',
    titulo: 'Etapa 2 - Patio interno',
    texto: 'El patio interno conecta con el buffet por varios lados. Sofia marca las rutas posibles.',
    opciones: [
      { texto: 'Entrar por la puerta lateral del buffet', efectos:{salud:-10, moral:+5}, destino:'N3A' },
      { texto: 'Bordear por la galeria techada', efectos:{moral:+10, recursos:+1, salud:-5}, destino:'N3B' },
      { texto: 'Cruzar por la puerta de servicios', efectos:{recursos:+1, moral:-10, salud:-10}, destino:'N3C' }
    ]
  },

  /* ===================== ETAPA 3 ===================== */
  N3A: {
    etapa: 3, fondo: 'Fondo_03_Buffet.svg', personaje: 'Personaje_Mateo.svg',
    titulo: 'Etapa 3 - Buffet: Ala de carga',
    texto: 'El buffet esta saqueado. \"Esas llaves son nuestra salida. Vale el riesgo\", dice Mateo mirando la oficina.',
    opciones: [
      { texto: 'Juntar botiquines', efectos:{recursos:+2, moral:+15}, destino:'N4A' },
      { texto: 'Buscar las llaves en la oficina', efectos:{salud:-30, recursos:+2, moral:+5}, set:{llaves:true}, destino:'N4B' },
      { texto: 'Barricar y descansar un momento', efectos:{salud:+15, moral:-10, recursos:+1}, destino:'N4C' }
    ]
  },
  N3B: {
    etapa: 3, fondo: 'Fondo_03_Buffet.svg', personaje: 'Personaje_Lucas.svg',
    titulo: 'Etapa 3 - Buffet: Comedor principal',
    texto: 'El comedor principal todavia tiene raciones. La preceptoria, al fondo, podria guardar las llaves.',
    opciones: [
      { texto: 'Juntar raciones y bebidas', efectos:{recursos:+2, moral:+10}, destino:'N4A' },
      { texto: 'Registrar la preceptoria por las llaves', efectos:{salud:-30, recursos:+2, moral:+5}, set:{llaves:true}, destino:'N4B' },
      { texto: 'Atravesar el salon rapido', efectos:{salud:-10, moral:+5}, destino:'N4C' }
    ]
  },
  N3C: {
    etapa: 3, fondo: 'Fondo_03_Buffet.svg', personaje: 'Personaje_Sofia.svg',
    titulo: 'Etapa 3 - Buffet: Deposito trasero',
    texto: 'El deposito trasero conecta con mantenimiento. Hay herramientas utiles y cajones por revisar.',
    opciones: [
      { texto: 'Tomar herramientas de mantenimiento', efectos:{recursos:+2, moral:+5, salud:-10}, destino:'N4A' },
      { texto: 'Revisar los cajones de preceptoria', efectos:{salud:-30, recursos:+2}, set:{llaves:true}, destino:'N4B' },
      { texto: 'Escapar por el pasillo tecnico', efectos:{salud:+5, moral:-5}, destino:'N4C' }
    ]
  },

  /* ===================== ETAPA 4  (Tomas atrapado) ===================== */
  N4A: {
    etapa: 4, fondo: 'Fondo_04_Laboratorio.svg', personaje: 'Personaje_Sobreviviente.svg',
    titulo: 'Etapa 4 - Laboratorio: Tomas atrapado',
    texto: 'Tomas quedo encerrado en el laboratorio, golpeando el vidrio. \"No lo dejamos. Nadie se queda atras\", dice Mateo. La puerta principal esta trabada.',
    opciones: [
      { texto: 'Rescatar a Tomas con una herramienta', requiere:{recursos:1}, efectos:{recursos:-1, moral:+25, salud:-5}, set:{tomasRescatado:true}, bloqueadaTexto:'Necesitas una herramienta/recurso para forzar la puerta.', efectosAlternativos:{}, destino:'N5A' },
      { texto: 'Forzar la traba a mano entre todos', efectos:{salud:-20, moral:+15}, set:{tomasRescatado:true}, destino:'N5B' },
      { texto: 'Abandonar a Tomas y avanzar', efectos:{moral:-25}, set:{tomasRescatado:false}, destino:'N5C' }
    ]
  },
  N4B: {
    etapa: 4, fondo: 'Fondo_04_Laboratorio.svg', personaje: 'Personaje_Sobreviviente.svg',
    titulo: 'Etapa 4 - Laboratorio: Ventanal lateral',
    texto: 'Desde el ventanal lateral ves a Tomas atrapado. Hay que decidir rapido.',
    opciones: [
      { texto: 'Romper el vidrio con una herramienta', requiere:{recursos:1}, efectos:{recursos:-1, moral:+20, salud:-10}, set:{tomasRescatado:true}, bloqueadaTexto:'Sin herramienta no podes romper el ventanal con seguridad.', efectosAlternativos:{}, destino:'N5A' },
      { texto: 'Golpear la estructura y abrir la traba', efectos:{salud:-15, moral:+10}, set:{tomasRescatado:true}, destino:'N5B' },
      { texto: 'Seguir de largo sin Tomas', efectos:{salud:+5, moral:-20}, set:{tomasRescatado:false}, destino:'N5C' }
    ]
  },
  N4C: {
    etapa: 4, fondo: 'Fondo_04_Laboratorio.svg', personaje: 'Personaje_Sobreviviente.svg',
    titulo: 'Etapa 4 - Laboratorio: Conducto tecnico',
    texto: 'El conducto tecnico llega hasta la reja donde esta Tomas, pero el techo cruje.',
    opciones: [
      { texto: 'Cortar la reja con una herramienta', requiere:{recursos:1}, efectos:{recursos:-1, moral:+30}, set:{tomasRescatado:true}, bloqueadaTexto:'Sin herramienta no podes cortar la reja.', efectosAlternativos:{}, destino:'N5A' },
      { texto: 'Tirar de la reja entre todos', efectos:{salud:-25, moral:+15}, set:{tomasRescatado:true}, destino:'N5B' },
      { texto: 'Abandonar por riesgo de derrumbe', efectos:{moral:-30}, set:{tomasRescatado:false}, destino:'N5C' }
    ]
  },

  /* ===================== ETAPA 5  (radio opcional) ===================== */
  N5A: {
    etapa: 5, fondo: 'Fondo_05_Gimnasio.svg', personaje: 'Personaje_Lucas.svg',
    titulo: 'Etapa 5 - Gimnasio: Salida del taller',
    texto: 'El gimnasio es el ultimo filtro. En un rincon hay una radio de emergencia rota. \"Si la arreglamos, alguien puede escucharnos\", dice Lucas.',
    opciones: [
      { texto: 'Activar la alarma del taller para distraer', requiere:{recursos:1}, efectos:{recursos:-1, moral:-10, salud:+15}, bloqueadaTexto:'No tenes recurso para activar la alarma.', efectosAlternativos:{salud:-10}, destino:'N6A' },
      { texto: 'Reparar la radio de emergencia', requiere:{recursos:1}, efectos:{salud:-5, moral:+15}, set:{radioReparada:true}, bloqueadaTexto:'Sin recurso/herramienta no podes reparar la radio.', efectosAlternativos:{moral:-5}, destino:'N6B' },
      { texto: 'Escalar al techo y evitar la horda', efectos:{salud:-10, moral:+10}, destino:'N6C' }
    ]
  },
  N5B: {
    etapa: 5, fondo: 'Fondo_05_Gimnasio.svg', personaje: 'Personaje_Mateo.svg',
    titulo: 'Etapa 5 - Gimnasio: Puerta central',
    texto: 'La puerta central da al estacionamiento, pero esta llena de infectados. Sobre una mesa hay una radio rota.',
    opciones: [
      { texto: 'Hacer sonar la sirena del tablero', requiere:{recursos:1}, efectos:{recursos:-1, moral:-15, salud:+20}, bloqueadaTexto:'No tenes recurso para la sirena.', efectosAlternativos:{salud:-15}, destino:'N6A' },
      { texto: 'Reparar la radio y pedir ayuda', requiere:{recursos:1}, efectos:{salud:-5, moral:+15}, set:{radioReparada:true}, bloqueadaTexto:'Sin recurso no podes reparar la radio.', efectosAlternativos:{moral:-5}, destino:'N6B' },
      { texto: 'Saltar el muro desde las gradas', efectos:{salud:-15, moral:+15}, destino:'N6C' }
    ]
  },
  N5C: {
    etapa: 5, fondo: 'Fondo_05_Gimnasio.svg', personaje: 'Personaje_Sofia.svg',
    titulo: 'Etapa 5 - Gimnasio: Pasillo de viento',
    texto: 'El pasillo de viento es estrecho y peligroso. Sofia encuentra una radio de emergencia bajo los bancos.',
    opciones: [
      { texto: 'Lanzar un bote de humo', requiere:{recursos:1}, efectos:{recursos:-1, moral:-5, salud:+10}, bloqueadaTexto:'No tenes recurso para el humo.', efectosAlternativos:{salud:-10}, destino:'N6A' },
      { texto: 'Reparar la radio antes de salir', requiere:{recursos:1}, efectos:{salud:-5, moral:+15}, set:{radioReparada:true}, bloqueadaTexto:'Sin recurso no podes reparar la radio.', efectosAlternativos:{moral:-5}, destino:'N6B' },
      { texto: 'Cruzar por el conducto de ventilacion', efectos:{salud:-10, moral:+5}, destino:'N6C' }
    ]
  },

  /* ===================== ETAPA 6  (salida -> FINAL) ===================== */
  N6A: {
    etapa: 6, fondo: 'Fondo_06_Estacionamiento.svg', personaje: 'Personaje_Mateo.svg',
    titulo: 'Etapa 6 - Estacionamiento: la salida',
    texto: 'Llegan al estacionamiento. La camioneta esta a metros. \"Arranca. Arranca de una vez\", grita Mateo. Como escapan define todo.',
    opciones: [
      { texto: 'Escapar en la camioneta', efectos:{moral:+10}, set:{salieronCamioneta:true}, destino:'FINAL' },
      { texto: 'Huir a pie a Plaza San Martin', efectos:{salud:-25, moral:+5, recursos:-1}, set:{salieronCamioneta:false}, destino:'FINAL' },
      { texto: 'Refugiarse en la estacion de servicio', requiere:{recursos:1}, efectos:{recursos:-1, moral:+5}, set:{salieronCamioneta:false}, bloqueadaTexto:'Sin recurso el refugio es mas costoso.', efectosAlternativos:{moral:-10}, destino:'FINAL' }
    ]
  },
  N6B: {
    etapa: 6, fondo: 'Fondo_06_Estacionamiento.svg', personaje: 'Personaje_Lucas.svg',
    titulo: 'Etapa 6 - Estacionamiento: la salida',
    texto: 'El estacionamiento esta despejado por ahora. La decision final define como escapan.',
    opciones: [
      { texto: 'Escapar en la camioneta', efectos:{moral:+10}, set:{salieronCamioneta:true}, destino:'FINAL' },
      { texto: 'Huir a pie a Plaza San Martin', efectos:{salud:-25, moral:+5, recursos:-1}, set:{salieronCamioneta:false}, destino:'FINAL' },
      { texto: 'Refugiarse en la estacion de servicio', requiere:{recursos:1}, efectos:{recursos:-1, moral:+5}, set:{salieronCamioneta:false}, bloqueadaTexto:'Sin recurso el refugio es mas costoso.', efectosAlternativos:{moral:-10}, destino:'FINAL' }
    ]
  },
  N6C: {
    etapa: 6, fondo: 'Fondo_06_Estacionamiento.svg', personaje: 'Personaje_Sofia.svg',
    titulo: 'Etapa 6 - Estacionamiento: la salida',
    texto: 'Salen al estacionamiento por la ultima ruta. Llego el momento de decidir el escape.',
    opciones: [
      { texto: 'Escapar en la camioneta', efectos:{moral:+10}, set:{salieronCamioneta:true}, destino:'FINAL' },
      { texto: 'Huir a pie a Plaza San Martin', efectos:{salud:-25, moral:+5, recursos:-1}, set:{salieronCamioneta:false}, destino:'FINAL' },
      { texto: 'Refugiarse en la estacion de servicio', requiere:{recursos:1}, efectos:{recursos:-1, moral:+5}, set:{salieronCamioneta:false}, bloqueadaTexto:'Sin recurso el refugio es mas costoso.', efectosAlternativos:{moral:-10}, destino:'FINAL' }
    ]
  }
};
