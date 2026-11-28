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
    texto: "Suena la chicharra y esta vez nadie se ríe: en el patio hay gente corriendo en círculos y una maestra golpeando la puerta de Dirección. Mateo cuenta cabezas. Falta Tomás, que estaba en el laboratorio. Rocco, el perro del colegio, no se le despega de la pierna: le eriza el lomo y gruñe hacia la puerta. Hay un minuto, una herramienta y tres salidas.",
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
        texto: "Saltar por la ventana al patio, con Rocco adelante",
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
    titulo: "Patio · Rocco se planta",
    fondo: "Patio.svg",
    personaje: "Personaje_Rocco.svg",
    texto: "La reja del patio está vencida y el portón de chapa, arrancado de un gozne. Del otro lado del hueco hay una silueta quieta, meciéndose. Rocco se le planta adelante al grupo, con las patas abiertas y el pelo del lomo parado: no ladra, gruñe. Si lo sueltan, gana tiempo. Si lo llaman, los guía por el hueco del fondo.",
    opciones: [
      {
        texto: "Soltar a Rocco para que lo distraiga y cruzar",
        destino: "GALERIA",
        efectos: { salud: -10, moral: -5 }
      },
      {
        texto: "Levantar la reja caída entre los dos y pasar juntos",
        destino: "OFICINA",
        requiere: { recursos: 1 },
        efectos: { recursos: -1, moral: 15, salud: -5 }
      },
      {
        texto: "Volver por el buffet y rodear el patio",
        destino: "GALERIA",
        efectos: { salud: -5, moral: -10 }
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
        efectos: { salud: -25, moral: 10 },
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
        efectos: { salud: -20, moral: 5 }
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
        efectos: { salud: -25, moral: -10 },
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
