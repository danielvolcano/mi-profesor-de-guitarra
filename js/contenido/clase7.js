// Clase 7 · Semana 3 · «Qué es un traste»: primera nota pisada, fa, en la sexta cuerda.
import { saludo, colocarse, descanso, pedirNota, LIMPIA, listaTexto } from './comun.js';

export const clase7 = {
  id: 's3c1',
  semana: 3,
  numero: 7,
  titulo: 'Qué es un traste',
  objetivo: 'Localizar la cejuela y los trastes por el tacto, colocar la mano izquierda y pisar la primera nota: fa.',
  duracion: 45,
  pasos: [
    {
      id: 'bienvenida', fase: 'bienvenida', titulo: 'Bienvenida',
      texto: saludo({
        recuerdo: 'Hasta ahora has tocado las cuerdas al aire, solo con la mano derecha.',
        hoy: 'Hoy empieza la semana tres y despierta la mano izquierda. Vas a pisar tu primera nota.',
      }),
    },
    colocarse(),
    {
      id: 'unas', fase: 'bienvenida', titulo: 'Las uñas de la mano izquierda',
      texto: [
        'Una comprobación antes de empezar.',
        'Con el pulgar derecho, toca las uñas de los dedos de tu mano izquierda.',
        'Para pisar bien, tienen que estar cortas: que al apretar con la yema, la uña no toque la madera.',
        'Si están largas, córtalas cuando puedas. Hoy podemos empezar igual.',
        'Pulsa Continuar.',
      ],
    },

    // EXPLICACIÓN
    {
      id: 'cejuela', fase: 'explicacion', titulo: 'La cejuela',
      texto: [
        'Con la mano izquierda, sigue el mástil hacia el clavijero, hasta casi el final.',
        'Justo antes del clavijero notarás una pieza dura, más alta que la madera, sobre la que se apoyan las seis cuerdas.',
        'Se llama cejuela. Es el punto de partida para contar los trastes.',
        'Cuando la encuentres, pulsa Continuar.',
      ],
      otraForma: [
        'Toca las cuerdas cerca del clavijero. Hay un sitio donde las cuerdas se apoyan sobre una pieza dura antes de llegar a las llaves.',
        'Esa pieza es la cejuela.',
      ],
    },
    {
      id: 'trastes', fase: 'explicacion', titulo: 'Los trastes',
      texto: [
        'Ahora pasa la yema del índice izquierdo por el borde de arriba del mástil, el que queda hacia tu cara, empezando en la cejuela y avanzando hacia la caja.',
        'Notarás unas barritas de metal que cruzan el mástil, como pequeños escalones.',
        'El espacio entre la cejuela y la primera barrita es el traste uno. Entre la primera y la segunda, el traste dos. Y así.',
        'Pulsa Continuar.',
      ],
      otraForma: [
        'Las barritas de metal son como las rayas de un paso de cebra.',
        'Cada hueco entre dos rayas es un traste. El primer hueco, pegado a la cejuela, es el traste uno.',
      ],
    },
    {
      id: 'contar-trastes', fase: 'explicacion', titulo: 'Contar trastes',
      texto: [
        'Vamos a practicar. Pon la yema en la cejuela y avanza hacia la caja, contando los huecos: uno, dos, tres, cuatro, cinco.',
        'Vuelve a la cejuela y hazlo otra vez, más despacio.',
        'Si tu familia te ha pegado un puntito en relieve en el borde del mástil, estará en el traste tres. Te servirá de referencia.',
        'Pulsa Continuar cuando cuentes con seguridad.',
      ],
    },
    {
      id: 'mano-izquierda', fase: 'explicacion', titulo: 'La mano izquierda',
      texto: [
        'Ahora colocamos la mano izquierda.',
        'El pulgar va detrás del mástil, por la parte de atrás, más o menos en el centro.',
        'Los otros cuatro dedos quedan por delante, sobre las cuerdas, curvados como si sujetaras una pelota pequeña.',
        'Cada dedo tiene un número: uno, el índice. Dos, el medio. Tres, el anular. Cuatro, el meñique.',
        'Pulsa Continuar.',
      ],
      otraForma: [
        'La mano izquierda abraza el mástil como una pinza suave: el pulgar detrás y los dedos delante.',
        'No hay que apretar el mástil. El pulgar solo acompaña.',
      ],
    },
    {
      id: 'por-que', fase: 'explicacion', titulo: 'Para qué sirve pisar',
      texto: [
        'Cuando pisas una cuerda en un traste, la cuerda vibra más corta y suena más aguda.',
        'Escucha: primero la sexta al aire, que es mi. Después la sexta pisada en el traste uno, que es fa.',
        'Pulsa Escuchar ejemplo.',
      ],
      ejemplo: { notas: ['E2', 'F2'], intervalo: 1.6 },
    },

    // PRÁCTICA GUIADA
    {
      id: 'pisar-fa', fase: 'guiada', titulo: 'Tu primera nota pisada: fa',
      texto: [
        'Vamos a pisar fa.',
        'Pon la yema del dedo uno, el índice, sobre la sexta cuerda, dentro del traste uno.',
        'Colócala justo detrás de la primera barrita, pegada a ella pero sin subirte encima.',
        'Aprieta la cuerda hasta notar la madera.',
        'Ahora toca la sexta con el pulgar derecho. Pulsa Continuar.',
      ],
      otraForma: [
        'Busca la cejuela con el índice izquierdo, baja a la sexta cuerda y avanza hasta tocar la primera barrita de metal.',
        'Retrocede un poquito, lo justo para quedar detrás de la barrita. Ahí aprietas.',
      ],
      ejemplo: { notas: ['F2'] },
    },
    {
      id: 'fa-como', fase: 'guiada', tipo: 'pregunta', titulo: '¿Cómo ha sonado?',
      texto: ['Toca fa tres o cuatro veces. ¿Cómo ha sonado?'],
      ejemplo: { notas: ['F2'] },
      opciones: LIMPIA,
    },
    {
      id: 'mi-fa-mi', fase: 'guiada', titulo: 'Mi, fa, mi: el sonido del flamenco',
      texto: [
        'Ahora vas a tocar tres notas: mi, fa, mi.',
        'Mi es la sexta al aire. Fa, pisando el traste uno. Y otra vez mi, levantando el dedo.',
        'Este pequeño paso, de mi a fa y de vuelta a mi, es uno de los sonidos más típicos del flamenco.',
        'Escucha el ejemplo y repítelo varias veces.',
      ],
      ejemplo: { notas: ['E2', 'F2', 'E2'], intervalo: 1.1 },
    },
    {
      id: 'oido', fase: 'guiada', tipo: 'juegoOido', titulo: 'Oído: ¿mi o fa?',
      texto: [
        'Juego de oído. Te tocaré mi o fa.',
        'Mi es la sexta al aire, la más grave. Fa suena un poquito más agudo.',
        'Seis rondas. Pulsa Escuchar el sonido.',
      ],
      rondas: 6,
      categorias: [
        { id: 'mi', etiqueta: 'Mi', nombre: 'mi', cuerdas: ['E2'], frase: 'la sexta al aire' },
        { id: 'fa', etiqueta: 'Fa', nombre: 'fa', cuerdas: ['F2'], frase: 'la sexta pisada en el traste uno' },
      ],
    },
    descanso(),

    // PRÁCTICA AUTÓNOMA
    {
      id: 'autonoma', fase: 'autonoma', titulo: 'Practica tú solo: mi, fa, mi',
      texto: [
        'Practica tú solo: mi, fa, mi, despacio y muchas veces.',
        'Al levantar el dedo uno, no lo alejes: déjalo flotando cerca de la cuerda.',
        'Si las yemas te molestan, es normal estas semanas. Si duele, para un momento.',
        'Pulsa Continuar cuando termines.',
      ],
      ejemplo: { notas: ['E2', 'F2', 'E2', 'F2', 'E2'], intervalo: 1.1 },
    },
    {
      id: 'autonoma-palmas', fase: 'autonoma', titulo: 'Practica con palmas',
      texto: [
        'Ahora con palmas lentas: una nota en cada palma.',
        'Mi, fa, mi, fa, y así hasta que se paren.',
        'Pulsa Empezar las palmas. Cuatro palmas de entrada.',
      ],
      ejemplo: { etiqueta: 'Empezar las palmas', palmas: { bpm: 50, tiempos: 20, cuentaPrevia: 4 } },
    },

    // EVALUACIÓN
    {
      id: 'evaluacion', fase: 'evaluacion', titulo: 'Comprobamos lo aprendido',
      texto: ['Vamos a comprobar lo aprendido. Te pediré tres notas.', 'Pulsa Continuar.'],
    },
    pedirNota('eval-fa1', 'fa', 'evaluacion'),
    pedirNota('eval-mi', 'mi', 'evaluacion', { pista: false }),
    pedirNota('eval-fa2', 'fa', 'evaluacion', { pista: false, titulo: 'Toca fa otra vez' }),
  ],

  evaluar(respuestas) {
    const habilidades = [
      { id: 'trastes', estado: 'practicado', fuente: 'clase' },
      { id: 'manoIzquierda', estado: 'practicado', fuente: 'clase' },
      { id: 'notasSexta', estado: 'practicado', fuente: 'clase' },
    ];
    const dificultades = [];
    const resueltas = [];
    const fa = ['eval-fa1', 'eval-fa2'].map((id) => respuestas[id]?.resultado);
    if (fa.every((r) => r === 'bien')) {
      habilidades.push({ id: 'notasSexta', estado: 'comprendido', fuente: 'autoevaluacion' });
      resueltas.push('nota-fa');
    } else if (fa.includes('mal')) {
      dificultades.push({ id: 'trastes', habilidad: 'trastes', texto: 'encontrar el traste uno' });
    } else if (fa.some(Boolean)) {
      dificultades.push({ id: 'nota-fa', habilidad: 'notasSexta', texto: 'que fa suene limpio, sin zumbar' });
    }
    const juego = respuestas.oido;
    if (juego?.total) {
      if (juego.aciertos >= juego.total - 1) { habilidades.push({ id: 'oidoNotas', estado: 'comprendido', fuente: 'app' }); resueltas.push('oido-mi-fa'); }
      else { habilidades.push({ id: 'oidoNotas', estado: 'practicado', fuente: 'clase' }); dificultades.push({ id: 'oido-mi-fa', habilidad: 'oidoNotas', texto: 'distinguir de oído mi y fa' }); }
    }
    const resumen = [
      'Hoy has dado un paso enorme: has encontrado la cejuela y los trastes, y has pisado tu primera nota, fa.',
      'Y has tocado mi, fa, mi: un sonido muy flamenco.',
    ];
    const limpias = fa.filter((r) => r === 'bien').length;
    if (fa.some(Boolean)) resumen.push(`Según tus respuestas, fa ha sonado limpio ${limpias} de 2 veces.`);
    if (juego?.total) resumen.push(`En el juego de oído has acertado ${juego.aciertos} de ${juego.total}.`);
    if (dificultades.length) resumen.push(`Seguiremos practicando ${listaTexto(dificultades.map((d) => d.texto))}.`);
    resumen.push('En la próxima clase aprenderás otra nota, sol, y trucos para que las notas suenen limpias.');
    return { habilidades, dificultades, resueltas, resumen };
  },
};
