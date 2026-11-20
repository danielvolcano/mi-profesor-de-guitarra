// Clase 5 · Semana 2 · «Índice y medio»
import { saludo, colocarse, descanso, listaTexto } from './comun.js';

const AUTO = [
  { id: 'si', etiqueta: 'Sí, alternando bien', resultado: 'bien', respuesta: ['Muy bien. Índice, medio, índice, medio: como dos piernas que caminan.'] },
  { id: 'aveces', etiqueta: 'A veces repito dedo', resultado: 'duda',
    respuesta: ['Es normal. Dilo en voz alta mientras tocas: «índice, medio, índice, medio». Ayuda mucho.'] },
  { id: 'no', etiqueta: 'Todavía no', resultado: 'mal',
    respuesta: ['Sin problema. Hazlo muy despacio, una nota cada vez, y piensa en qué dedo toca antes de tocar.'] },
];

export const clase5 = {
  id: 's2c2',
  semana: 2,
  numero: 5,
  titulo: 'Índice y medio',
  objetivo: 'Tocar las cuerdas agudas alternando índice y medio, con el dedo apoyado.',
  duracion: 45,
  pasos: [
    {
      id: 'bienvenida', fase: 'bienvenida', titulo: 'Bienvenida',
      texto: saludo({
        recuerdo: 'En la clase anterior aprendiste el pulgar flamenco, apoyado en la cuerda siguiente.',
        hoy: 'Hoy vas a despertar dos dedos más, el índice y el medio, para tocar las cuerdas agudas.',
      }),
    },
    colocarse(),
    {
      id: 'repaso-pulgar', fase: 'bienvenida', titulo: 'Repaso: el pulgar apoyado',
      texto: [
        'Calentamos con lo del otro día.',
        'Pulgar apoyado: dos veces la sexta, dos la quinta y dos la cuarta.',
        'Recuerda: el pulgar se queda descansando en la cuerda siguiente.',
        'Hazlo dos veces y pulsa Continuar.',
      ],
      ejemplo: { notas: [6, 6, 5, 5, 4, 4], intervalo: 0.9 },
    },

    // EXPLICACIÓN
    {
      id: 'dedos', fase: 'explicacion', titulo: 'Los dedos de la mano derecha',
      texto: [
        'En la mano derecha, cada dedo tiene su trabajo.',
        'El pulgar se encarga de las cuerdas graves, las de arriba.',
        'El índice y el medio se encargan de las agudas, las de abajo.',
        'Hoy trabajaremos con el índice y el medio en la primera y la segunda cuerda.',
        'Pulsa Continuar.',
      ],
    },
    {
      id: 'colocar', fase: 'explicacion', titulo: 'Colocar la mano',
      texto: [
        'Coloca la mano derecha sobre la boca, como el otro día.',
        'Apoya el pulgar sobre la sexta y déjalo ahí quieto. Será tu punto de apoyo.',
        'Ahora pon la yema del índice sobre la primera cuerda, la más fina.',
        'Pulsa Continuar.',
      ],
      otraForma: [
        'El pulgar descansa arriba, en la sexta, como un ancla.',
        'El índice se coloca abajo, en la primera, listo para tocar.',
      ],
    },
    {
      id: 'apoyando', fase: 'explicacion', titulo: 'Tocar apoyando',
      texto: [
        'Igual que el pulgar, el índice también toca apoyado.',
        'El índice empuja la primera cuerda hacia arriba, hacia tu cara, la atraviesa y se queda descansando sobre la segunda.',
        'Es el mismo movimiento que el pulgar, pero al revés: el pulgar baja, los dedos suben.',
        'Pulsa Continuar.',
      ],
      otraForma: [
        'Imagina que con la yema del índice rascas suavemente la primera cuerda hacia tu cara.',
        'Cuando la cuerda se te escapa, el dedo choca con la segunda y se para ahí.',
      ],
    },

    // PRÁCTICA GUIADA
    {
      id: 'indice', fase: 'guiada', titulo: 'El índice en la primera',
      texto: [
        'Toca la primera cuerda con el índice, apoyando en la segunda.',
        'Hazlo ocho veces, despacio. Escucha que cada nota suene clara.',
        'Pulsa Continuar al terminar.',
      ],
      ejemplo: { notas: [1, 1, 1, 1] },
    },
    {
      id: 'medio', fase: 'guiada', titulo: 'El medio en la primera',
      texto: [
        'Ahora lo mismo con el dedo medio, el más largo.',
        'Toca la primera cuerda con el medio, apoyando en la segunda. Ocho veces.',
        'Pulsa Continuar al terminar.',
      ],
      ejemplo: { notas: [1, 1, 1, 1] },
    },
    {
      id: 'alternar', fase: 'guiada', titulo: 'Alternar: índice, medio',
      texto: [
        'Ahora el truco del guitarrista: alternar.',
        'Toca la primera cuerda con el índice, luego con el medio, luego con el índice, luego con el medio.',
        'Como dos piernas que caminan: izquierda, derecha, izquierda, derecha.',
        'Di en voz alta «índice, medio» mientras tocas. Ocho notas, despacio.',
      ],
      otraForma: [
        'Nunca toques dos veces seguidas con el mismo dedo.',
        'Si el índice acaba de tocar, ahora le toca al medio. Y al revés.',
      ],
      ejemplo: { notas: [1, 1, 1, 1, 1, 1, 1, 1], intervalo: 0.8 },
    },
    {
      id: 'alternar-nota', fase: 'guiada', tipo: 'pregunta', titulo: '¿Cómo va el alternar?',
      texto: ['¿Has conseguido alternar índice y medio sin repetir dedo?'],
      opciones: AUTO,
    },
    {
      id: 'segunda', fase: 'guiada', titulo: 'Alternar en la segunda',
      texto: [
        'Ahora en la segunda cuerda, la que está justo encima de la primera.',
        'Índice, medio, índice, medio, apoyando cada vez en la tercera.',
        'Ocho notas, despacio. Pulsa Continuar al terminar.',
      ],
      ejemplo: { notas: [2, 2, 2, 2, 2, 2, 2, 2], intervalo: 0.8 },
    },
    {
      id: 'oido', fase: 'guiada', tipo: 'juegoOido', titulo: 'Oído: ¿primera o segunda?',
      texto: [
        'Juego de oído. Te tocaré la primera o la segunda cuerda.',
        'La primera es la más aguda y brillante. La segunda suena un poco más baja.',
        'Seis rondas. Pulsa Escuchar el sonido.',
      ],
      rondas: 6,
      categorias: [
        { id: 'primera', etiqueta: 'Primera', cuerdas: [1], frase: 'la más aguda' },
        { id: 'segunda', etiqueta: 'Segunda', cuerdas: [2], frase: 'un poco más baja que la primera' },
      ],
    },
    descanso(),

    // PRÁCTICA AUTÓNOMA
    {
      id: 'autonoma-4y4', fase: 'autonoma', titulo: 'Practica tú solo: cuatro y cuatro',
      texto: [
        'Practica tú solo.',
        'Cuatro notas en la primera y cuatro en la segunda, alternando siempre índice y medio.',
        'Repítelo varias veces, sin pararte al cambiar de cuerda.',
        'Yo me quedo en silencio. Pulsa Continuar al terminar.',
      ],
      ejemplo: { notas: [1, 1, 1, 1, 2, 2, 2, 2], intervalo: 0.8 },
    },
    {
      id: 'autonoma-pulgar-dedos', fase: 'autonoma', titulo: 'Practica tú solo: pulgar y dedos',
      texto: [
        'Y para acabar, juntamos el pulgar con los dedos.',
        'Pulgar en la sexta, índice en la segunda, medio en la primera.',
        'Pulgar, índice, medio. Pulgar, índice, medio. Despacio.',
        'Cuando termines, pulsa Continuar.',
      ],
      otraForma: [
        'Primero suena un bajo con el pulgar, arriba. Luego dos notas agudas con los dedos, abajo.',
        'Como un pequeño vals: bom, ti, ti. Bom, ti, ti.',
      ],
      ejemplo: { notas: [6, 2, 1, 6, 2, 1, 6, 2, 1], intervalo: 0.8 },
    },

    // EVALUACIÓN
    {
      id: 'evaluacion', fase: 'evaluacion', titulo: 'Comprobamos lo aprendido',
      texto: ['Vamos a comprobar lo aprendido. Escúchate bien y contesta con sinceridad.', 'Pulsa Continuar.'],
    },
    {
      id: 'eval-1', fase: 'evaluacion', tipo: 'pregunta', titulo: 'Alternar en la primera',
      texto: ['Toca ocho notas en la primera cuerda, alternando índice y medio.', '¿Has alternado sin repetir dedo?'],
      ejemplo: { notas: [1, 1, 1, 1, 1, 1, 1, 1], intervalo: 0.8 },
      opciones: AUTO,
    },
    {
      id: 'eval-2', fase: 'evaluacion', tipo: 'pregunta', titulo: 'Alternar en la segunda',
      texto: ['Ahora ocho notas en la segunda, alternando índice y medio.', '¿Has alternado sin repetir dedo?'],
      ejemplo: { notas: [2, 2, 2, 2, 2, 2, 2, 2], intervalo: 0.8 },
      opciones: AUTO,
    },
  ],

  evaluar(respuestas) {
    const ids = ['eval-1', 'eval-2'];
    const bien = ids.filter((id) => respuestas[id]?.resultado === 'bien').length;
    const habilidades = [
      { id: 'indiceMedio', estado: 'practicado', fuente: 'clase' },
      { id: 'pulgarApoyado', estado: 'practicado', fuente: 'clase' },
    ];
    const dificultades = [];
    const resueltas = [];
    if (bien === ids.length) {
      habilidades.push({ id: 'indiceMedio', estado: 'comprendido', fuente: 'autoevaluacion' });
      resueltas.push('indice-medio');
    } else if (ids.some((id) => respuestas[id])) {
      dificultades.push({ id: 'indice-medio', habilidad: 'indiceMedio', texto: 'alternar índice y medio sin repetir dedo' });
    }
    const juego = respuestas.oido;
    if (juego?.total) {
      if (juego.aciertos >= juego.total - 1) {
        habilidades.push({ id: 'oidoAgudas', estado: 'comprendido', fuente: 'app' });
        resueltas.push('oido-agudas');
      } else {
        habilidades.push({ id: 'oidoAgudas', estado: 'practicado', fuente: 'clase' });
        dificultades.push({ id: 'oido-agudas', habilidad: 'oidoAgudas', texto: 'distinguir de oído la primera de la segunda' });
      }
    }
    const resumen = ['Muy bien. Hoy has despertado el índice y el medio, y has aprendido a alternarlos.'];
    if (ids.some((id) => respuestas[id])) resumen.push(`Según tus respuestas, has alternado bien en ${bien} de las 2 cuerdas.`);
    if (juego?.total) resumen.push(`En el juego de oído has acertado ${juego.aciertos} de ${juego.total}.`);
    if (dificultades.length) resumen.push(`Seguiremos practicando ${listaTexto(dificultades.map((d) => d.texto))}.`);
    resumen.push('En la próxima clase aprenderás a tocar al pulso, con palmas, y haremos la evaluación de la semana dos.');
    return { habilidades, dificultades, resueltas, resumen };
  },
};
