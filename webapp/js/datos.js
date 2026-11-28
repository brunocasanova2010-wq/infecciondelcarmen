/* ============================================================
   Infeccion: Escape del Carmen  -  DATOS DEL JUEGO (Sprint 5)
   Guion: Benja  |  Logica y balance: Bruno  |  Motor: Tomas
   ------------------------------------------------------------
   VERSION 12 LUGARES. Seis etapas fijas se convirtieron en doce
   lugares conectados: desde el aula se puede ir a tres lugares
   distintos y cada uno abre caminos diferentes. Un fondo por lugar,
   ninguno repetido.

   Corredor:
     Aula 3 B -> Pasillo / Buffet / Patio
     Pasillo  -> Laboratorio / Gimnasio
     Buffet   -> Galeria / Patio
     Patio    -> Galeria / Oficina (atajo de Rocco)
     Laboratorio / Gimnasio / Galeria / Oficina -> Galeria / Estacionamiento
     Estacionamiento -> Camioneta (con llaves) / Calle
     Calle    -> Refugio / a pie
     Camioneta, Refugio y Calle llevan a los finales A, B y C.
   ============================================================ */

const RUTAS = {
  fondos: 'assets/fondos/',
  personajes: 'assets/personajes/',
  animacion: 'assets/animacion/'
};

/* Estado inicial: vive en tools/reglas.js (una sola fuente). */

const ESCENAS = {

  /* ---------------- 1. AULA ---------------- */
  "N1": {
    etapa: 1,
    titulo: "Aula 3° B · La alarma no era un simulacro",
    fondo: "Fondo_01_Aula.svg",
    personaje: "Personaje_Mateo.svg",
    animacion: "Animacion_Mateo.gif",
    texto: "Suena la chicharra y esta vez nadie se ríe: en el patio hay gente corriendo en círculos y una maestra golpeando la puerta de Dirección. Mateo cuenta cabezas. Faltan Tomás, que estaba en el laboratorio, y Rocco, que se escapó al patio. Hay un minuto, una herramienta y tres salidas.",
    opciones: [
      {
        texto: "Atrancar la puerta con una silla y salir por el pasillo norte",
        destino: "PASILLO",
        efectos: { moral: 5 }
      },
      {
        texto: "Bajar al buffet: hay agua y comida para varios días",
        destino: "BUFFET",
        efectos: { salud: -5 }
      },
      {
        texto: "Saltar por la ventana al patio y buscar a Rocco",
        destino: "PATIO",
        efectos: { salud: -5, moral: 5 }
      }
    ]
  },

  /* ---------------- 2. PASILLO ---------------- */
  "PASILLO": {
    etapa: 2,
    titulo: "Pasillo norte · Dos puertas y un ruido",
    fondo: "Fondo_02_Pasillo.svg",
    personaje: "Personaje_Lucas.svg",
    texto: "El pasillo está a oscuras, salvo las luces de emergencia que parpadean. Del laboratorio sale un golpe rítmico, como una mano abierta contra el vidrio. Del otro lado, la puerta del gimnasio está abierta de par en par y da al estacionamiento. El ruido no va a esperar a que decidan.",
    opciones: [
      {
        texto: "Abrir el laboratorio: alguien golpea desde adentro",
        destino: "LABORATORIO",
        efectos: { moral: 5 }
      },
      {
        texto: "Seguir de largo hasta el gimnasio",
        destino: "GIMNASIO",
        efectos: { salud: -10 }
      }
    ]
  },

  /* ---------------- 3. BUFFET ---------------- */
  "BUFFET": {
    etapa: 2,
    titulo: "Buffet · Provisiones y ruido",
    fondo: "Fondo_03_Buffet.svg",
    personaje: "Personaje_Sofia.svg",
    texto: "Las heladeras siguen frías y la máquina de café gotea sobre el piso. Hay agua, barras de cereal y una lata de duraznos. También hay vidrio roto: cada paso suena como un disparo. Por la ventana se ve el patio, la reja caída y un bulto que se mueve entre los yuyos.",
    opciones: [
      {
        texto: "Cargar las mochilas con todo lo que entre",
        destino: "GALERIA",
        efectos: { recursos: 2, salud: -5, moral: 5 }
      },
      {
        texto: "Romper la máquina expendedora y sacar lo que quede",
        destino: "GALERIA",
        requiere: { recursos: 1 },
        efectos: { recursos: 3, salud: -10 }
      },
      {
        texto: "Pasar por la ventana al patio, sin cargar nada",
        destino: "PATIO",
        efectos: { salud: -5, moral: -5 }
      }
    ]
  },

  /* ---------------- 4. PATIO (nodo de Rocco) ---------------- */
  "PATIO": {
    etapa: 2,
    titulo: "Patio · El perro bajo la reja",
    fondo: "Patio_Reja.svg",
    personaje: "Personaje_Rocco.svg",
    texto: "Bajo la reja caída hay un perro atrapado: es Rocco, el perro del colegio. Tiene el pelaje sucio y una chapa que dice «3° B». Gime, pero no muerde. Del otro lado de la galería se escuchan pasos arrastrados: si no deciden ahora, la reja va a ser su único camino.",
    opciones: [
      {
        texto: "Levantar la reja con la herramienta y liberarlo",
        destino: "GALERIA",
        requiere: { recursos: 1 },
        efectos: { recursos: -1, moral: 20, salud: -5 },
        set: { perro: true, perroAliado: true }
      },
      {
        texto: "Dejarle agua en el plato y seguir sin abrir",
        destino: "GALERIA",
        efectos: { moral: -10, salud: -5 }
      },
      {
        texto: "Silbar para que los siga por el hueco del fondo",
        destino: "OFICINA",
        efectos: { moral: 5, salud: -10 },
        set: { perro: true, perroAliado: true }
      }
    ]
  },

  /* ---------------- 5. LABORATORIO ---------------- */
  "LABORATORIO": {
    etapa: 3,
    titulo: "Laboratorio · Tomás está adentro",
    fondo: "Fondo_04_Laboratorio.svg",
    personaje: "Personaje_Mateo.svg",
    texto: "Tomás está del otro lado del vidrio, con un corte en la mano y la radio del colegio apretada contra el pecho. El pestillo está trabado desde adentro y la puerta tiene un vidrio que ya está rajado. «No la fuerces», dice, «se viene todo abajo». Detrás de él, el pasillo de servicio está vacío.",
    opciones: [
      {
        texto: "Forzar el pestillo con la herramienta y sacarlo",
        destino: "GALERIA",
        requiere: { recursos: 1 },
        efectos: { recursos: -1, moral: 20, salud: -5 },
        set: { tomasRescatado: true }
      },
      {
        texto: "Que te pase la radio por la ventana y seguir",
        destino: "GALERIA",
        efectos: { moral: 5 },
        set: { radioReparada: true }
      },
      {
        texto: "Golpear el vidrio para que salga solo",
        destino: "GALERIA",
        efectos: { salud: -15, moral: 10 },
        set: { tomasRescatado: true }
      }
    ]
  },

  /* ---------------- 6. GIMNASIO ---------------- */
  "GIMNASIO": {
    etapa: 3,
    titulo: "Gimnasio · La puerta de servicio",
    fondo: "Fondo_05_Gimnasio.svg",
    personaje: "Personaje_Lucas.svg",
    texto: "Las colchonetas están tiradas y una pelota rueda sola por el piso de parquet. Al fondo, la puerta que usan los profes para el estacionamiento está cerrada con cadena, pero la cadena tiene un eslabón cortado. Afuera, el portón del estacionamiento se mueve con el viento.",
    opciones: [
      {
        texto: "Cruzar el gimnasio y abrir la puerta de servicio",
        destino: "ESTACIONAMIENTO",
        efectos: { salud: -10, moral: 5 }
      },
      {
        texto: "Volver por la galería: más lejos, pero más seguro",
        destino: "GALERIA",
        efectos: { moral: -5 }
      }
    ]
  },

  /* ---------------- 7. GALERIA (centro) ---------------- */
  "GALERIA": {
    etapa: 3,
    titulo: "Galería · El corredor de vidrio",
    fondo: "Galeria.svg",
    personaje: "Personaje_Sofia.svg",
    texto: "La galería corre paralela al patio: vidrio de un lado, aulas cerradas del otro. En el piso hay marcas de zapatillas que van y vienen, como si alguien hubiera dudado. Al final del corredor, la puerta de la preceptoría tiene luz, y más allá se ve el portón del estacionamiento.",
    opciones: [
      {
        texto: "Entrar a la preceptoría: ahí están las llaves",
        destino: "OFICINA",
        efectos: { moral: 5 }
      },
      {
        texto: "Cruzar la galería hasta la puerta del estacionamiento",
        destino: "ESTACIONAMIENTO",
        efectos: { salud: -10 }
      }
    ]
  },

  /* ---------------- 8. OFICINA ---------------- */
  "OFICINA": {
    etapa: 4,
    titulo: "Preceptoría · Las llaves detrás del vidrio",
    fondo: "Oficina.svg",
    personaje: "Personaje_Mateo.svg",
    texto: "El tablero de llaves está detrás de un vidrio, con una etiqueta escrita a mano: «CAMIONETA». Adentro no hay nadie, pero la puerta del fondo, la que da al estacionamiento, está entreabierta. Sobre el escritorio hay una linterna con pilas nuevas y un manojo que no es el que buscan.",
    opciones: [
      {
        texto: "Romper el vidrio, llevarse la llave y la linterna",
        destino: "ESTACIONAMIENTO",
        efectos: { salud: -5, recursos: 1 },
        set: { llaves: true }
      },
      {
        texto: "Mandar a Rocco por el hueco de la pared, sin hacer ruido",
        destino: "ESTACIONAMIENTO",
        requiere: { perro: true },
        efectos: { moral: 10 },
        set: { llaves: true }
      },
      {
        texto: "Salir por la puerta del fondo sin las llaves",
        destino: "ESTACIONAMIENTO",
        efectos: { moral: -10 }
      }
    ]
  },

  /* ---------------- 9. ESTACIONAMIENTO ---------------- */
  "ESTACIONAMIENTO": {
    etapa: 5,
    titulo: "Estacionamiento · La camioneta y el portón",
    fondo: "Fondo_06_Estacionamiento.svg",
    personaje: "Personaje_Sofia.svg",
    texto: "La camioneta del colegio está donde siempre, con la puerta del acompañante abierta y la radio encendida. El portón está trabado con un candado nuevo. Del otro lado de la calle, la estación de servicio tiene todas las luces prendidas: alguien está adentro.",
    opciones: [
      {
        texto: "Subir a la camioneta y arrancar",
        destino: "CAMIONETA",
        requiere: { llaves: true },
        efectos: { moral: 5 }
      },
      {
        texto: "Salir por el portón peatonal hacia la calle",
        destino: "CALLE",
        efectos: { salud: -5 }
      }
    ]
  },

  /* ---------------- 10. CAMIONETA ---------------- */
  "CAMIONETA": {
    etapa: 6,
    titulo: "Camioneta · El motor no arranca a la primera",
    fondo: "Camioneta.svg",
    personaje: "Personaje_Mateo.svg",
    animacion: "Animacion_Mateo.gif",
    texto: "Adentro huele a nafta y a asiento viejo. La batería está floja: el tablero prende, se apaga, vuelve. Mateo gira la llave y el motor tose dos veces. Por el espejo retrovisor se ven dos siluetas cruzando el portón. Una más y arranca.",
    opciones: [
      {
        texto: "Insistir con el arranque y salir por el portón",
        destino: "FINAL",
        efectos: { salud: -5 },
        set: { salieronCamioneta: true, salida: "camioneta" }
      },
      {
        texto: "Bajar y seguir a pie: la camioneta los va a delatar",
        destino: "CALLE",
        efectos: { moral: -10 }
      }
    ]
  },

  /* ---------------- 11. CALLE ---------------- */
  "CALLE": {
    etapa: 6,
    titulo: "Calle · El semáforo en amarillo",
    fondo: "Calle.svg",
    personaje: "Personaje_Sobreviviente.svg",
    texto: "La calle está vacía y el semáforo parpadea en amarillo. A dos cuadras, la estación de servicio tiene la persiana a medio bajar y alguien mira por la ventanilla. En la otra dirección, el descampado baja hasta el río: sin paredes, sin refugio, solo distancia y pasto alto.",
    opciones: [
      {
        texto: "Cruzar a la estación de servicio",
        destino: "REFUGIO",
        efectos: { salud: -10, moral: 5 }
      },
      {
        texto: "Rodear por el descampado y seguir a pie",
        destino: "FINAL",
        efectos: { salud: -15, moral: -10 },
        set: { salida: "pie" }
      }
    ]
  },

  /* ---------------- 12. REFUGIO ---------------- */
  "REFUGIO": {
    etapa: 6,
    titulo: "Estación de servicio · La persiana a medio bajar",
    fondo: "Refugio.svg",
    personaje: "Personaje_Sobreviviente.svg",
    texto: "Adentro hay dos empleados, una radio de banda y un perro que no es Rocco. La persiana baja hasta la mitad y el playón está limpio. «Si entran, se cierra», dice el encargado. «Después no sale nadie hasta mañana, y mañana no sé qué va a quedar afuera».",
    opciones: [
      {
        texto: "Entrar y bajar la persiana",
        destino: "FINAL",
        efectos: { moral: 10 },
        set: { salida: "refugio" }
      },
      {
        texto: "No entrar: seguir a pie antes de que cierren",
        destino: "FINAL",
        efectos: { moral: -10 },
        set: { salida: "pie" }
      }
    ]
  }

};
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
  fondos: 'assets/fondos/',          // webapp/assets/fondos/
  personajes: 'assets/personajes/',  // webapp/assets/personajes/
  animacion: 'assets/animacion/'     // webapp/assets/animacion/
};

/* EL ESTADO INICIAL NO SE DEFINE ACA.
   Vive en tools/reglas.js (REGLAS.inicial) y es el mismo archivo que
   carga la web como webapp/js/reglas.js. Un solo lugar, un solo valor:
   asi el codigo y la documentacion no pueden contradecirse.
   Arrancan con 1 recurso (una herramienta basica) y la explicacion del
   porque esta en docs/balance_sprint4.md. */

/* Cada escena:
   id, etapa, fondo, personaje, titulo, texto, opciones[]
   Cada opcion:
     texto, efectos{salud,moral,recursos}, set{...}, requiere{recursos}, destino

   REGLA DE ORO (Sprint 4): si la opcion pide recursos y no alcanzan,
   el boton queda DESHABILITADO. No avanza, no aplica otra cosa y dice
   en pantalla "Te faltan recursos". Nunca hay un camino escondido.
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
      { texto: 'Usar una bengala para abrir paso', requiere:{recursos:1}, efectos:{recursos:-1, salud:+10}, destino:'N3C' }
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
      { texto: 'Rescatar a Tomas con una herramienta', requiere:{recursos:1}, efectos:{recursos:-1, moral:+25, salud:-5}, set:{tomasRescatado:true}, destino:'N5A' },
      { texto: 'Forzar la traba a mano entre todos', efectos:{salud:-20, moral:+15}, set:{tomasRescatado:true}, destino:'N5B' },
      { texto: 'Abandonar a Tomas y avanzar', efectos:{moral:-25}, set:{tomasRescatado:false}, destino:'N5C' }
    ]
  },
  N4B: {
    etapa: 4, fondo: 'Fondo_04_Laboratorio.svg', personaje: 'Personaje_Sobreviviente.svg',
    titulo: 'Etapa 4 - Laboratorio: Ventanal lateral',
    texto: 'Desde el ventanal lateral ves a Tomas atrapado. Hay que decidir rapido.',
    opciones: [
      { texto: 'Romper el vidrio con una herramienta', requiere:{recursos:1}, efectos:{recursos:-1, moral:+20, salud:-10}, set:{tomasRescatado:true}, destino:'N5A' },
      { texto: 'Golpear la estructura y abrir la traba', efectos:{salud:-15, moral:+10}, set:{tomasRescatado:true}, destino:'N5B' },
      { texto: 'Seguir de largo sin Tomas', efectos:{salud:+5, moral:-20}, set:{tomasRescatado:false}, destino:'N5C' }
    ]
  },
  N4C: {
    etapa: 4, fondo: 'Fondo_04_Laboratorio.svg', personaje: 'Personaje_Sobreviviente.svg',
    titulo: 'Etapa 4 - Laboratorio: Conducto tecnico',
    texto: 'El conducto tecnico llega hasta la reja donde esta Tomas, pero el techo cruje.',
    opciones: [
      { texto: 'Cortar la reja con una herramienta', requiere:{recursos:1}, efectos:{recursos:-1, moral:+30}, set:{tomasRescatado:true}, destino:'N5A' },
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
      { texto: 'Activar la alarma del taller para distraer', requiere:{recursos:1}, efectos:{recursos:-1, moral:-10, salud:+15}, destino:'N6A' },
      { texto: 'Reparar la radio de emergencia', requiere:{recursos:1}, efectos:{salud:-5, moral:+15}, set:{radioReparada:true}, destino:'N6B' },
      { texto: 'Escalar al techo y evitar la horda', efectos:{salud:-10, moral:+10}, destino:'N6C' }
    ]
  },
  N5B: {
    etapa: 5, fondo: 'Fondo_05_Gimnasio.svg', personaje: 'Personaje_Mateo.svg',
    titulo: 'Etapa 5 - Gimnasio: Puerta central',
    texto: 'La puerta central da al estacionamiento, pero esta llena de infectados. Sobre una mesa hay una radio rota.',
    opciones: [
      { texto: 'Hacer sonar la sirena del tablero', requiere:{recursos:1}, efectos:{recursos:-1, moral:-15, salud:+20}, destino:'N6A' },
      { texto: 'Reparar la radio y pedir ayuda', requiere:{recursos:1}, efectos:{salud:-5, moral:+15}, set:{radioReparada:true}, destino:'N6B' },
      { texto: 'Saltar el muro desde las gradas', efectos:{salud:-15, moral:+15}, destino:'N6C' }
    ]
  },
  N5C: {
    etapa: 5, fondo: 'Fondo_05_Gimnasio.svg', personaje: 'Personaje_Sofia.svg',
    titulo: 'Etapa 5 - Gimnasio: Pasillo de viento',
    texto: 'El pasillo de viento es estrecho y peligroso. Sofia encuentra una radio de emergencia bajo los bancos.',
    opciones: [
      { texto: 'Lanzar un bote de humo', requiere:{recursos:1}, efectos:{recursos:-1, moral:-5, salud:+10}, destino:'N6A' },
      { texto: 'Reparar la radio antes de salir', requiere:{recursos:1}, efectos:{salud:-5, moral:+15}, set:{radioReparada:true}, destino:'N6B' },
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
      { texto: 'Refugiarse en la estacion de servicio', requiere:{recursos:1}, efectos:{recursos:-1, moral:+5}, set:{salieronCamioneta:false}, destino:'FINAL' }
    ]
  },
  N6B: {
    etapa: 6, fondo: 'Fondo_06_Estacionamiento.svg', personaje: 'Personaje_Lucas.svg',
    titulo: 'Etapa 6 - Estacionamiento: la salida',
    texto: 'El estacionamiento esta despejado por ahora. La decision final define como escapan.',
    opciones: [
      { texto: 'Escapar en la camioneta', efectos:{moral:+10}, set:{salieronCamioneta:true}, destino:'FINAL' },
      { texto: 'Huir a pie a Plaza San Martin', efectos:{salud:-25, moral:+5, recursos:-1}, set:{salieronCamioneta:false}, destino:'FINAL' },
      { texto: 'Refugiarse en la estacion de servicio', requiere:{recursos:1}, efectos:{recursos:-1, moral:+5}, set:{salieronCamioneta:false}, destino:'FINAL' }
    ]
  },
  N6C: {
    etapa: 6, fondo: 'Fondo_06_Estacionamiento.svg', personaje: 'Personaje_Sofia.svg',
    titulo: 'Etapa 6 - Estacionamiento: la salida',
    texto: 'Salen al estacionamiento por la ultima ruta. Llego el momento de decidir el escape.',
    opciones: [
      { texto: 'Escapar en la camioneta', efectos:{moral:+10}, set:{salieronCamioneta:true}, destino:'FINAL' },
      { texto: 'Huir a pie a Plaza San Martin', efectos:{salud:-25, moral:+5, recursos:-1}, set:{salieronCamioneta:false}, destino:'FINAL' },
      { texto: 'Refugiarse en la estacion de servicio', requiere:{recursos:1}, efectos:{recursos:-1, moral:+5}, set:{salieronCamioneta:false}, destino:'FINAL' }
    ]
  }
};
