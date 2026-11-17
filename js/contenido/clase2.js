// Clase 2 · Semana 1 · «Las cuerdas por su número y por su sonido» (unos 45 minutos)
import { listaTexto } from './clase1.js';

const NOMBRES = { 6: 'sexta', 5: 'quinta', 4: 'cuarta', 3: 'tercera', 2: 'segunda', 1: 'primera' };
const PISTAS = {
  6: 'Es la más gruesa, arriba del todo.',
  5: 'Es la segunda empezando por arriba.',
  4: 'Es la última de las rugosas.',
  3: 'Es la primera de las lisas.',
  2: 'Es la segunda empezando por abajo.',
  1: 'Es la más fina, abajo del todo.',
};

const SI_DUDA_NO = [
  { id: 'si', etiqueta: 'Sí, a la primera', resultado: 'bien', respuesta: ['Muy bien.'] },
  { id: 'duda', etiqueta: 'Me ha costado', resultado: 'duda',
    respuesta: ['Bien, la has encontrado. Con un poco más de práctica saldrá sola.'] },
  { id: 'no', etiqueta: 'No la he encontrado', resultado: 'mal',
    respuesta: ['No pasa nada. Lo anoto y lo repasaremos el próximo día.', 'Recuerda: empieza siempre contando desde la sexta, la más gruesa, que está arriba.'] },
];

function pedirCuerda(id, n, fase, { pista = true } = {}) {
  return {
    id, fase, tipo: 'pregunta', titulo: `Toca la ${NOMBRES[n]}`,
    texto: [`Toca la ${NOMBRES[n]} cuerda con el pulgar.`, ...(pista ? [PISTAS[n]] : []), '¿La has encontrado a la primera?'],
    otraForma: [
      'Busca primero la sexta, la más gruesa y rugosa, arriba del todo.',
      `Desde ahí, baja contando con el dedo: sexta, quinta, cuarta, tercera, segunda y primera, hasta llegar a la ${NOMBRES[n]}.`,
    ],
    ejemplo: { notas: [n] },
    cuerda: n,
    opciones: SI_DUDA_NO,
  };
}

const EVALUADAS = ['eval-5', 'eval-2', 'eval-3', 'eval-4'];

export const clase2 = {
  id: 's1c2',
  semana: 1,
  numero: 2,
  titulo: 'Las cuerdas por su número y por su sonido',
  objetivo: 'Encontrar cada cuerda por su número, aunque se pida salteada, y empezar a reconocerlas por su sonido.',
  duracion: 45,
  pasos: [
    // FASE 1 · BIENVENIDA Y REPASO (5 minutos)
    {
      id: 'bienvenida', fase: 'bienvenida', titulo: 'Bienvenida',
      // El saludo menciona solo lo que está registrado.
      texto: (p) => {
        const frases = [
          'Buenos días. Me alegro de volver a tocar contigo.',
          'En la primera clase conociste tu guitarra, la colocaste en posición flamenca y tocaste sus seis cuerdas.',
        ];
        const pendientes = (p?.dificultades || []).filter((d) => !d.resuelta).map((d) => d.texto);
        if (pendientes.length) {
          frases.push(`El otro día te costó un poco ${listaTexto(pendientes)}. Hoy lo vamos a practicar.`);
        }
        frases.push(
          'Hoy vas a aprender a encontrar cada cuerda por su número, aunque te las pida salteadas. Y vamos a entrenar el oído.',
          'Cuando estés preparado, pulsa Continuar.',
        );
        return frases;
      },
    },
    {
      id: 'postura', fase: 'bienvenida', titulo: 'Colócate',
      texto: [
        'Siéntate en tu silla y coloca la guitarra en posición flamenca, como el otro día.',
        'La guitarra de pie sobre tu pierna derecha, el mástil hacia tu izquierda y el antebrazo derecho sobre el borde de la caja.',
        'Pulsa Continuar cuando estés colocado.',
      ],
      otraForma: [
        'Es como abrazar la guitarra.',
        'La caja descansa sobre tu muslo derecho, tu brazo derecho la sujeta por encima y el mástil apunta a tu izquierda.',
      ],
    },
    {
      id: 'orientacion', fase: 'bienvenida', tipo: 'pregunta', titulo: 'Comprobar la orientación',
      texto: [
        'Comprobamos que está bien colocada.',
        'Toca las cuerdas encima de la boca. ¿La cuerda más gruesa y rugosa está arriba, cerca de tu cara?',
      ],
      opciones: [
        { id: 'si', etiqueta: 'Sí, la más gruesa está arriba', resultado: 'bien', respuesta: ['Perfecto. Empezamos.'] },
        { id: 'no', etiqueta: 'No, la más gruesa está abajo', resultado: 'mal', repetir: true,
          respuesta: [
            'Entonces la guitarra está al revés.',
            'Gírala para que el mástil apunte a tu izquierda y la parte de atrás toque tu tripa.',
            'Cuando la hayas girado, pulsa Intentarlo otra vez.',
          ] },
      ],
    },

    // FASE 2 · EXPLICACIÓN (8 minutos)
    {
      id: 'numeros', fase: 'explicacion', titulo: 'Cada cuerda tiene un número',
      texto: [
        'Los guitarristas no dicen «la de arriba» o «la de abajo». Llaman a cada cuerda por su número.',
        'La sexta es la de arriba, la más gruesa. La primera es la de abajo, la más fina.',
        'Un truco para recordarlo: la sexta es la más gorda, como el número seis, que es el más grande.',
        'Pulsa Continuar.',
      ],
      otraForma: [
        'Piensa en los pisos de un edificio, pero al revés.',
        'Arriba, cerca de tu cara, está el piso seis. Abajo, cerca de tus piernas, está el piso uno.',
      ],
    },
    {
      id: 'contar', fase: 'explicacion', titulo: 'Contar desde la sexta',
      texto: [
        'Para encontrar cualquier cuerda, tienes un método que no falla.',
        'Pon la yema del índice derecho sobre la sexta, la más gruesa.',
        'Ahora baja despacio, cuerda a cuerda, contando en voz alta: sexta, quinta, cuarta, tercera, segunda, primera.',
        'Hazlo dos o tres veces, sin tocar las cuerdas, solo notándolas.',
        'Pulsa Continuar cuando quieras.',
      ],
      otraForma: [
        'Las cuerdas son como los escalones de una escalera.',
        'Si sabes dónde está el primer escalón, la sexta, solo tienes que contar para llegar a cualquier otro.',
      ],
    },
    {
      id: 'mi-mi', fase: 'explicacion', titulo: 'Una curiosidad: las dos mi',
      texto: [
        'Una curiosidad. La sexta y la primera son la misma nota, que se llama mi.',
        'La sexta es un mi grave, y la primera, un mi agudo.',
        'Escucha el ejemplo: primero la sexta y luego la primera. Suenan parecidas, pero una más grave y otra más aguda.',
      ],
      ejemplo: { notas: [6, 1, 6, 1], intervalo: 1.3 },
    },

    // FASE 3 · PRÁCTICA GUIADA (17 minutos)
    {
      id: 'en-orden', fase: 'guiada', titulo: 'Las seis, en orden',
      texto: [
        'Ahora con sonido. Toca con el pulgar las seis cuerdas en orden, de la sexta a la primera.',
        'Al tocar cada una, di su número en voz alta.',
        'Escucha antes el ejemplo si quieres. Después hazlo tú dos veces y pulsa Continuar.',
      ],
      ejemplo: { notas: [6, 5, 4, 3, 2, 1] },
    },
    {
      id: 'salteadas-intro', fase: 'guiada', titulo: 'Ahora, salteadas',
      texto: [
        'Ahora viene lo interesante. Te voy a pedir cuerdas salteadas, sin orden.',
        'Si dudas, busca la sexta y cuenta hacia abajo.',
        'Después de cada una, dime con sinceridad si la has encontrado a la primera.',
        'Pulsa Continuar.',
      ],
    },
    pedirCuerda('guiada-4', 4, 'guiada'),
    pedirCuerda('guiada-2', 2, 'guiada'),
    pedirCuerda('guiada-5', 5, 'guiada'),
    pedirCuerda('guiada-1', 1, 'guiada'),
    pedirCuerda('guiada-3', 3, 'guiada'),
    pedirCuerda('guiada-6', 6, 'guiada'),
    {
      id: 'oido-extremos', fase: 'guiada', tipo: 'juegoOido', titulo: 'Juego de oído: ¿sexta o primera?',
      texto: [
        'Vamos a entrenar el oído. Deja la guitarra quieta.',
        'Yo tocaré la sexta o la primera. Tú me dices cuál ha sonado.',
        'Pista: la sexta suena grave y profunda. La primera, aguda y brillante.',
        'Haremos seis rondas. Pulsa Escuchar el sonido.',
      ],
      rondas: 6,
      categorias: [
        { id: 'sexta', etiqueta: 'Sexta', cuerdas: [6], frase: 'la más grave' },
        { id: 'primera', etiqueta: 'Primera', cuerdas: [1], frase: 'la más aguda' },
      ],
    },
    {
      id: 'oido-grave-aguda', fase: 'guiada', tipo: 'juegoOido', titulo: 'Juego de oído: ¿grave o aguda?',
      texto: [
        'Ahora un poco más difícil, como el otro día.',
        'Puede sonar cualquiera de las seis cuerdas. Dime si es grave o aguda.',
        'Recuerda: graves son la sexta, la quinta y la cuarta. Agudas, la tercera, la segunda y la primera.',
        'Haremos seis rondas. Pulsa Escuchar el sonido.',
      ],
      rondas: 6,
    },
    {
      id: 'descanso', fase: 'guiada', titulo: 'Descanso',
      texto: [
        'Muy bien. Descansamos un momento.',
        'Suelta las manos, mueve los dedos y los hombros.',
        'Cuando quieras seguir, pulsa Continuar.',
      ],
    },

    // FASE 4 · PRÁCTICA AUTÓNOMA (8 minutos)
    {
      id: 'saltos', fase: 'autonoma', titulo: 'Practica tú solo: saltos',
      texto: [
        'Ahora practica tú solo, sin prisa.',
        'Vamos a tocar las cuerdas saltando una sí y una no.',
        'Primero sexta, cuarta y segunda. Después quinta, tercera y primera.',
        'Escucha el ejemplo y repítelo varias veces, diciendo los números en voz alta.',
        'Yo me quedo en silencio. Cuando termines, pulsa Continuar.',
      ],
      otraForma: [
        'Toca una cuerda, sáltate la siguiente y toca la de después.',
        'Empezando por la sexta, te salen la sexta, la cuarta y la segunda.',
        'Empezando por la quinta, te salen la quinta, la tercera y la primera.',
      ],
      ejemplo: { notas: [6, 4, 2, 5, 3, 1] },
    },
    {
      id: 'cremallera', fase: 'autonoma', titulo: 'Practica tú solo: la cremallera',
      texto: [
        'Y para terminar, la cremallera del otro día: sexta y primera, quinta y segunda, cuarta y tercera.',
        'Ahora intenta hacerlo un poco más seguido, sin pararte entre pareja y pareja.',
        'Cuando termines, pulsa Continuar.',
      ],
      ejemplo: { notas: [6, 1, 5, 2, 4, 3], intervalo: 0.9 },
    },

    // FASE 5 · EVALUACIÓN (7 minutos)
    {
      id: 'evaluacion', fase: 'evaluacion', titulo: 'Comprobamos lo aprendido',
      texto: [
        'Vamos a comprobar lo aprendido. Te pediré cuatro cuerdas salteadas, ahora sin pistas.',
        'Contesta con sinceridad. Así sé qué repasar.',
        'Pulsa Continuar.',
      ],
    },
    pedirCuerda('eval-5', 5, 'evaluacion', { pista: false }),
    pedirCuerda('eval-2', 2, 'evaluacion', { pista: false }),
    pedirCuerda('eval-3', 3, 'evaluacion', { pista: false }),
    pedirCuerda('eval-4', 4, 'evaluacion', { pista: false }),
  ],

  evaluar(respuestas) {
    const habilidades = [
      { id: 'cuerdas', estado: 'practicado', fuente: 'clase' },
      { id: 'graveAguda', estado: 'practicado', fuente: 'clase' },
      { id: 'pulgar', estado: 'practicado', fuente: 'clase' },
      { id: 'postura', estado: 'practicado', fuente: 'clase' },
    ];
    const dificultades = [];
    const resueltas = [];

    // Cuerdas: solo cuenta como resuelta si en la evaluación salió a la primera.
    const fallosEval = EVALUADAS.filter((id) => respuestas[id]?.resultado !== 'bien');
    const cuerdaDe = { 'eval-5': 5, 'eval-2': 2, 'eval-3': 3, 'eval-4': 4 };
    for (const id of EVALUADAS) {
      const n = cuerdaDe[id];
      const dif = `cuerda-${NOMBRES[n]}`;
      if (fallosEval.includes(id)) dificultades.push({ id: dif, habilidad: 'cuerdas', texto: `encontrar la ${NOMBRES[n]} cuerda` });
      else resueltas.push(dif);
    }
    // Sexta y primera se piden en la práctica guiada.
    for (const n of [6, 1]) {
      const r = respuestas[`guiada-${n}`]?.resultado;
      if (r === 'bien') resueltas.push(`cuerda-${NOMBRES[n]}`);
      else if (r === 'mal') dificultades.push({ id: `cuerda-${NOMBRES[n]}`, habilidad: 'cuerdas', texto: `encontrar la ${NOMBRES[n]} cuerda` });
    }
    if (fallosEval.length === 0) habilidades.push({ id: 'cuerdas', estado: 'comprendido', fuente: 'autoevaluacion' });

    if (respuestas.orientacion) {
      if (respuestas.orientacion.intentos > 1) dificultades.push({ id: 'orientacion', habilidad: 'postura', texto: 'orientar la guitarra con la cuerda gruesa arriba' });
      else resueltas.push('orientacion');
    }

    // Oído: lo comprueba la propia aplicación.
    const ext = respuestas['oido-extremos'];
    const ga = respuestas['oido-grave-aguda'];
    const bienOido = (j) => j && j.total > 0 && j.aciertos >= j.total - 1;
    if (ga && ga.total > 0) {
      if (bienOido(ga)) {
        habilidades.push({ id: 'graveAguda', estado: 'comprendido', fuente: 'app' });
        resueltas.push('oido-grave-aguda');
        resueltas.push('rugosas-graves');
      } else if (ga.aciertos < ga.total - 1) {
        dificultades.push({ id: 'oido-grave-aguda', habilidad: 'graveAguda', texto: 'distinguir de oído una cuerda grave de una aguda' });
      }
    }
    if (ext && ext.total > 0 && !bienOido(ext)) {
      dificultades.push({ id: 'oido-sexta-primera', habilidad: 'graveAguda', texto: 'distinguir de oído la sexta de la primera' });
    } else if (ext && ext.total > 0) {
      resueltas.push('oido-sexta-primera');
    }

    const resumen = ['Muy bien. Hoy has practicado a encontrar las cuerdas por su número, en orden y salteadas.'];
    const evalBien = EVALUADAS.length - fallosEval.length;
    if (EVALUADAS.some((id) => respuestas[id])) {
      resumen.push(`En la comprobación final has encontrado a la primera ${evalBien} de ${EVALUADAS.length} cuerdas.`);
    }
    const oidos = [];
    if (ext && ext.total) oidos.push(`${ext.aciertos} de ${ext.total} en sexta o primera`);
    if (ga && ga.total) oidos.push(`${ga.aciertos} de ${ga.total} en grave o aguda`);
    if (oidos.length) resumen.push(`En los juegos de oído has acertado ${listaTexto(oidos)}.`);
    if (dificultades.length) {
      resumen.push(`Todavía te cuesta un poco ${listaTexto(dificultades.map((d) => d.texto))}. Lo repasaremos.`);
    }
    resumen.push('En la próxima clase repasaremos todo y haremos la evaluación de la primera semana.');
    return { habilidades, dificultades, resueltas, resumen };
  },
};
