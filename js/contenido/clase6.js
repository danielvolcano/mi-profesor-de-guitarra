// Clase 6 · Semana 2 · «Pulso con palmas y evaluación de la semana 2»
// Criterio: la secuencia 6-4-3-2, cuatro veces seguidas al pulso de las palmas, con como mucho una parada.
import { saludo, colocarse, descanso, listaTexto } from './comun.js';

const SECUENCIA = [6, 4, 3, 2];

const PARADAS = [
  { id: 'cero', etiqueta: 'Ninguna parada', resultado: 'bien', paradas: 0, respuesta: ['¡Estupendo! Las cuatro vueltas seguidas.'] },
  { id: 'una', etiqueta: 'Una parada', resultado: 'bien', paradas: 1, respuesta: ['Muy bien. Una parada está dentro de lo que pedíamos.'] },
  { id: 'varias', etiqueta: 'Dos o más paradas', resultado: 'mal', paradas: 2, respuesta: ['De acuerdo. Lo apunto y lo seguiremos practicando.'] },
  { id: 'otra', etiqueta: 'Quiero intentarlo otra vez', resultado: 'duda', volver: 1,
    respuesta: ['Claro. Respira, coloca la mano y pulsa Volver a intentarlo.'] },
];

const AUTO = [
  { id: 'si', etiqueta: 'Sí', resultado: 'bien', respuesta: ['Muy bien.'] },
  { id: 'aveces', etiqueta: 'A veces', resultado: 'duda', respuesta: ['Bien. Lo seguiremos practicando de paso.'] },
  { id: 'no', etiqueta: 'Todavía no', resultado: 'mal', respuesta: ['Lo apunto. Lo repasaremos con calma.'] },
];

export const clase6 = {
  id: 's2c3',
  semana: 2,
  numero: 6,
  titulo: 'Pulso con palmas y evaluación de la semana 2',
  objetivo: 'Llevar el pulso y tocar una secuencia de cuerdas al aire siguiendo las palmas.',
  duracion: 45,
  evaluacionSemanal: true,
  pasos: [
    {
      id: 'bienvenida', fase: 'bienvenida', titulo: 'Bienvenida',
      texto: saludo({
        recuerdo: 'Esta semana has aprendido el pulgar apoyado y a alternar índice y medio.',
        hoy: 'Hoy vamos a por algo muy flamenco: el pulso, con palmas. Y al final, la evaluación de la semana dos.',
      }),
    },
    colocarse(),

    // EXPLICACIÓN
    {
      id: 'pulso', fase: 'explicacion', titulo: 'Qué es el pulso',
      texto: [
        'Toda la música tiene un pulso, como el corazón o como los pasos al andar.',
        'Es un latido regular que no se para.',
        'En el flamenco, el pulso se marca con palmas.',
        'Pulsa Escuchar las palmas. Fíjate en que suenan siempre igual de separadas, y en que una de cada cuatro suena más fuerte.',
      ],
      ejemplo: { etiqueta: 'Escuchar las palmas', palmas: { bpm: 60, tiempos: 12, cuentaPrevia: 12 } },
    },
    {
      id: 'contar', fase: 'explicacion', titulo: 'Contar de cuatro en cuatro',
      texto: [
        'Las palmas se cuentan de cuatro en cuatro: uno, dos, tres, cuatro. Uno, dos, tres, cuatro.',
        'La palma fuerte siempre es el uno.',
        'Así se cuentan los tangos, el palo que vas a aprender a acompañar.',
        'Pulsa Empezar las palmas y cuenta en voz alta con ellas, hasta que se paren.',
      ],
      ejemplo: { etiqueta: 'Empezar las palmas', palmas: { bpm: 60, tiempos: 16, cuentaPrevia: 16 } },
    },
    {
      id: 'pie', fase: 'explicacion', titulo: 'Marcar con el pie',
      texto: [
        'Un truco de flamencos: marca el pulso con el pie.',
        'Da un golpecito suave con la punta del pie derecho en cada palma.',
        'Así el pulso se te mete en el cuerpo.',
        'Pulsa Empezar las palmas y marca con el pie, contando en voz alta.',
      ],
      ejemplo: { etiqueta: 'Empezar las palmas', palmas: { bpm: 60, tiempos: 16, cuentaPrevia: 16 } },
    },

    // PRÁCTICA GUIADA
    {
      id: 'una-cuerda', fase: 'guiada', titulo: 'Una nota en cada palma',
      texto: [
        'Ahora tocamos con las palmas.',
        'Escucha cuatro palmas de entrada. Después, toca la sexta con el pulgar apoyado, una vez en cada palma.',
        'Pulsa Escuchar ejemplo para oírlo hecho. Luego hazlo tú con el siguiente paso.',
      ],
      ejemplo: { palmas: { bpm: 60, tiempos: 12, cuentaPrevia: 4 }, notas: [6] },
    },
    {
      id: 'una-cuerda-tu', fase: 'guiada', titulo: 'Tu turno: la sexta con palmas',
      texto: [
        'Tu turno. Pulsa Empezar las palmas.',
        'Escucha cuatro palmas y, en la quinta, empieza a tocar la sexta, una vez por palma.',
        'Si te pierdes, no pasa nada: espera a la palma fuerte y vuelve a entrar.',
        'Repítelo las veces que quieras y pulsa Continuar.',
      ],
      ejemplo: { etiqueta: 'Empezar las palmas', palmas: { bpm: 60, tiempos: 20, cuentaPrevia: 4 } },
    },
    {
      id: 'secuencia', fase: 'guiada', titulo: 'La secuencia sexta, cuarta, tercera, segunda',
      texto: [
        'Ahora una secuencia de cuatro cuerdas: sexta, cuarta, tercera, segunda.',
        'La sexta y la cuarta con el pulgar. La tercera con el índice. La segunda con el medio.',
        'Primero sin palmas, despacio. Escucha el ejemplo y repítelo varias veces.',
      ],
      otraForma: [
        'Pulgar arriba, en la sexta. Pulgar otra vez, en la cuarta.',
        'Luego los dedos, abajo: índice en la tercera, medio en la segunda.',
        'Bom, bom, ti, ti.',
      ],
      ejemplo: { notas: SECUENCIA, intervalo: 1.0 },
    },
    {
      id: 'secuencia-palmas', fase: 'guiada', titulo: 'La secuencia con palmas',
      texto: [
        'Ahora la secuencia con las palmas: una cuerda en cada palma.',
        'Pulsa Escuchar ejemplo para oír cómo encaja: cuatro palmas de entrada y luego la secuencia, cuatro veces.',
      ],
      ejemplo: { palmas: { bpm: 60, tiempos: 20, cuentaPrevia: 4 }, notas: SECUENCIA },
    },
    {
      id: 'secuencia-tu', fase: 'guiada', titulo: 'Tu turno: secuencia con palmas',
      texto: [
        'Tu turno. Pulsa Empezar las palmas.',
        'Cuatro palmas de entrada y, en la quinta, empiezas: sexta, cuarta, tercera, segunda. Y vuelta a empezar.',
        'Practica todas las veces que quieras. Pulsa Continuar cuando estés listo.',
      ],
      ejemplo: { etiqueta: 'Empezar las palmas', palmas: { bpm: 60, tiempos: 20, cuentaPrevia: 4 } },
    },
    descanso(),

    // PRÁCTICA AUTÓNOMA
    {
      id: 'autonoma', fase: 'autonoma', titulo: 'Practica tú solo con palmas',
      texto: [
        'Practica tú solo, con unas palmas más largas.',
        'Pulsa Empezar las palmas: son casi cuarenta segundos.',
        'Toca la secuencia sin pararte. Si te pierdes, espera a la palma fuerte y vuelve a entrar con la sexta.',
        'Pulsa Continuar cuando termines.',
      ],
      ejemplo: { etiqueta: 'Empezar las palmas', palmas: { bpm: 60, tiempos: 36, cuentaPrevia: 4 } },
    },

    // EVALUACIÓN SEMANAL
    {
      id: 'eval-intro', fase: 'evaluacion', titulo: 'Evaluación de la semana 2',
      texto: [
        'Empieza la evaluación de la semana.',
        'Tocarás la secuencia, sexta, cuarta, tercera, segunda, cuatro veces seguidas con las palmas.',
        'Para superar la semana, puedes pararte como mucho una vez.',
        'Pulsa Continuar.',
      ],
    },
    {
      id: 'eval-tocar', fase: 'evaluacion', titulo: 'La secuencia, cuatro veces',
      texto: [
        'Cuando estés listo, pulsa Empezar las palmas.',
        'Escucha cuatro palmas de entrada y toca la secuencia cuatro veces.',
        'Al terminar, pulsa Continuar y me dices cómo ha ido.',
      ],
      ejemplo: { etiqueta: 'Empezar las palmas', palmas: { bpm: 60, tiempos: 20, cuentaPrevia: 4 } },
    },
    {
      id: 'eval-secuencia', fase: 'evaluacion', tipo: 'pregunta', titulo: '¿Cuántas paradas?',
      texto: ['¿Cuántas veces te has parado?'],
      opciones: PARADAS,
    },
    {
      id: 'eval-pulgar', fase: 'evaluacion', tipo: 'pregunta', titulo: 'El pulgar',
      texto: ['En la secuencia, ¿el pulgar ha tocado apoyado, quedándose en la cuerda siguiente?'],
      opciones: AUTO,
    },
    {
      id: 'eval-dedos', fase: 'evaluacion', tipo: 'pregunta', titulo: 'Índice y medio',
      texto: ['¿Y la tercera y la segunda las has tocado con el índice y el medio, sin repetir dedo?'],
      opciones: AUTO,
    },
  ],

  evaluar(respuestas) {
    const sec = respuestas['eval-secuencia'];
    const superada = sec?.resultado === 'bien';
    const habilidades = [
      { id: 'pulso', estado: 'practicado', fuente: 'clase' },
      { id: 'secuenciaPulso', estado: 'practicado', fuente: 'clase' },
    ];
    const dificultades = [];
    const resueltas = [];
    if (superada) {
      habilidades.push({ id: 'secuenciaPulso', estado: 'dominado', fuente: 'evaluacion-semanal' });
      habilidades.push({ id: 'pulso', estado: 'comprendido', fuente: 'autoevaluacion' });
      resueltas.push('secuencia-pulso');
    } else if (sec) {
      dificultades.push({ id: 'secuencia-pulso', habilidad: 'secuenciaPulso', texto: 'tocar la secuencia al pulso sin pararte' });
    }
    // Pulgar y dedos: dominados solo si la secuencia salió y el alumno confirma la técnica.
    for (const [resp, hab, dif, texto] of [
      ['eval-pulgar', 'pulgarApoyado', 'pulgar-apoyado', 'tocar con el pulgar apoyado'],
      ['eval-dedos', 'indiceMedio', 'indice-medio', 'alternar índice y medio sin repetir dedo'],
    ]) {
      const r = respuestas[resp]?.resultado;
      if (!r) continue;
      if (r === 'bien' && superada) { habilidades.push({ id: hab, estado: 'dominado', fuente: 'evaluacion-semanal' }); resueltas.push(dif); }
      else if (r === 'bien') { habilidades.push({ id: hab, estado: 'comprendido', fuente: 'autoevaluacion' }); resueltas.push(dif); }
      else dificultades.push({ id: dif, habilidad: hab, texto });
    }

    const paradas = { cero: 'sin ninguna parada', una: 'con una parada', varias: 'con dos o más paradas' }[sec?.opcion];
    const resumen = [];
    if (paradas) resumen.push(`Has tocado la secuencia con las palmas ${paradas}.`);
    if (superada) {
      resumen.push('¡Enhorabuena! Has superado la semana dos. Ya llevas el pulso y tocas con pulgar, índice y medio.');
      if (dificultades.length) resumen.push(`Seguiremos practicando de paso ${listaTexto(dificultades.map((d) => d.texto))}.`);
      resumen.push('En la próxima clase empieza la semana tres: vas a pisar tus primeras notas con la mano izquierda.');
    } else {
      resumen.push('Para superar la semana, como mucho puede haber una parada. No pasa nada: el pulso necesita su tiempo.');
      resumen.push('En la próxima clase repetiremos esta clase de pulso y lo volveremos a intentar.');
    }
    return {
      habilidades, dificultades, resueltas, resumen,
      repetir: !superada,
      evaluacion: { superada, paradas: sec?.opcion || null, criterio: 'secuencia 6-4-3-2 cuatro veces al pulso, como mucho una parada' },
    };
  },
};
