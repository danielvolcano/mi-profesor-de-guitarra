// Clase 3 · Semana 1 · «Repaso y evaluación de la semana 1»
// Criterio: 11 de 12 cuerdas pedidas en orden salteado, encontradas a la primera.
import { saludo, colocarse, pedirCuerda, contarBien, NOMBRES, listaTexto } from './comun.js';

const RONDA1 = [4, 1, 5, 3, 6, 2];
const RONDA2 = [2, 6, 3, 5, 1, 4];
const IDS = [...RONDA1.map((n) => `r1-${n}`), ...RONDA2.map((n) => `r2-${n}`)];
const CRITERIO = 11;

export const clase3 = {
  id: 's1c3',
  semana: 1,
  numero: 3,
  titulo: 'Repaso y evaluación de la semana 1',
  objetivo: 'Comprobar que localiza las seis cuerdas por el tacto en orden salteado.',
  duracion: 45,
  evaluacionSemanal: true,
  pasos: [
    {
      id: 'bienvenida', fase: 'bienvenida', titulo: 'Bienvenida',
      texto: saludo({
        recuerdo: 'Esta semana has conocido tu guitarra y has aprendido a encontrar sus seis cuerdas por el tacto y por el oído.',
        hoy: 'Hoy repasaremos todo con calma y, al final, haremos la evaluación de la semana. No es un examen: solo sirve para saber si estás listo para lo siguiente.',
      }),
    },
    colocarse(),

    // REPASO
    {
      id: 'repaso-contar', fase: 'explicacion', titulo: 'Repaso: el método para encontrar cualquier cuerda',
      texto: [
        'Recuerda el método que no falla.',
        'Pon la yema del índice sobre la sexta, la más gruesa, arriba del todo.',
        'Baja contando: sexta, quinta, cuarta, tercera, segunda, primera.',
        'Hazlo dos veces, solo tocando con la yema, sin hacer sonar las cuerdas.',
        'Pulsa Continuar.',
      ],
    },
    {
      id: 'repaso-tacto', fase: 'explicacion', titulo: 'Repaso: rugosas y lisas',
      texto: [
        'Otra referencia: las tres de arriba son rugosas, de metal. Son las graves.',
        'Las tres de abajo son lisas, de nailon. Son las agudas.',
        'La frontera está entre la cuarta, la última rugosa, y la tercera, la primera lisa.',
        'Busca esa frontera con la yema. Pulsa Continuar cuando la tengas.',
      ],
      otraForma: [
        'Pasa la yema de arriba abajo, despacio. Notarás tres cuerdas ásperas y luego tres suaves.',
        'La cuarta es la última áspera. La tercera es la primera suave.',
      ],
    },
    {
      id: 'calentar', fase: 'guiada', titulo: 'Calentamos: la escalera',
      texto: [
        'Calentamos un poco. Toca con el pulgar las seis cuerdas, de la sexta a la primera, y vuelve.',
        'Di los números en voz alta.',
        'Hazlo tres veces y pulsa Continuar.',
      ],
      ejemplo: { notas: [6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6] },
    },
    {
      id: 'calentar-saltos', fase: 'guiada', titulo: 'Calentamos: saltos y cremallera',
      texto: [
        'Ahora los saltos: sexta, cuarta, segunda. Quinta, tercera, primera.',
        'Y después la cremallera: sexta y primera, quinta y segunda, cuarta y tercera.',
        'Escucha el ejemplo si quieres y practícalo dos veces.',
      ],
      ejemplo: { notas: [6, 4, 2, 5, 3, 1, 6, 1, 5, 2, 4, 3] },
    },
    {
      id: 'oido', fase: 'guiada', tipo: 'juegoOido', titulo: 'Oído: ¿grave o aguda?',
      texto: [
        'Un juego de oído para despertar las orejas.',
        'Te tocaré seis cuerdas al azar. Dime si es grave o aguda.',
        'Pulsa Escuchar el sonido.',
      ],
      rondas: 6,
    },
    {
      id: 'descanso', fase: 'guiada', titulo: 'Respira antes de la evaluación',
      texto: [
        'Muy bien. Antes de la evaluación, suelta las manos y respira hondo.',
        'Tómate el tiempo que necesites. Aquí no hay prisa.',
        'Cuando estés listo, pulsa Continuar.',
      ],
    },

    // EVALUACIÓN SEMANAL
    {
      id: 'eval-intro', fase: 'evaluacion', titulo: 'Evaluación de la semana 1',
      texto: [
        'Empieza la evaluación.',
        'Te pediré las seis cuerdas en desorden, dos veces. En total, doce cuerdas, sin pistas.',
        'Tócala con el pulgar y dime con sinceridad si la has encontrado a la primera.',
        'Para superar la semana, tienes que encontrar a la primera once de las doce.',
        'Pulsa Continuar para empezar la primera ronda.',
      ],
    },
    ...RONDA1.map((n) => pedirCuerda(`r1-${n}`, n, 'evaluacion', { pista: false })),
    {
      id: 'eval-mitad', fase: 'evaluacion', titulo: 'Mitad de la evaluación',
      texto: [
        'Primera ronda terminada. Vamos con la segunda, en otro orden.',
        'Pulsa Continuar.',
      ],
    },
    ...RONDA2.map((n) => pedirCuerda(`r2-${n}`, n, 'evaluacion', { pista: false })),
  ],

  evaluar(respuestas) {
    const aciertos = contarBien(respuestas, IDS);
    const superada = aciertos >= CRITERIO;
    const habilidades = [
      { id: 'cuerdas', estado: 'practicado', fuente: 'clase' },
      { id: 'pulgar', estado: 'practicado', fuente: 'clase' },
      { id: 'postura', estado: 'practicado', fuente: 'clase' },
    ];
    if (superada) habilidades.push({ id: 'cuerdas', estado: 'dominado', fuente: 'evaluacion-semanal' });
    else if (aciertos >= 9) habilidades.push({ id: 'cuerdas', estado: 'comprendido', fuente: 'autoevaluacion' });

    const dificultades = [];
    const resueltas = [];
    for (const n of [1, 2, 3, 4, 5, 6]) {
      const dif = `cuerda-${NOMBRES[n]}`;
      const ok = respuestas[`r1-${n}`]?.resultado === 'bien' && respuestas[`r2-${n}`]?.resultado === 'bien';
      if (ok) resueltas.push(dif);
      else if (respuestas[`r1-${n}`] || respuestas[`r2-${n}`]) dificultades.push({ id: dif, habilidad: 'cuerdas', texto: `encontrar la ${NOMBRES[n]} cuerda` });
    }

    const juego = respuestas.oido;
    if (juego?.total) {
      if (juego.aciertos >= juego.total - 1) {
        habilidades.push({ id: 'graveAguda', estado: 'dominado', fuente: 'evaluacion-semanal' });
        resueltas.push('oido-grave-aguda', 'rugosas-graves');
      } else {
        dificultades.push({ id: 'oido-grave-aguda', habilidad: 'graveAguda', texto: 'distinguir de oído una cuerda grave de una aguda' });
      }
    }

    const resumen = [`En la evaluación has encontrado a la primera ${aciertos} de 12 cuerdas.`];
    if (superada) {
      resumen.push('¡Enhorabuena! Has superado la primera semana. Ya sabes encontrar las seis cuerdas de tu guitarra.');
      if (dificultades.length) resumen.push(`Solo te ha costado un poco ${listaTexto(dificultades.map((d) => d.texto))}. Seguiremos practicándolo de paso.`);
      resumen.push('En la próxima clase empieza la semana dos: aprenderás el pulgar flamenco, para que tus cuerdas suenen fuertes y redondas.');
    } else {
      resumen.push(`Para superar la semana hacen falta once. Te ha costado ${listaTexto(dificultades.map((d) => d.texto))}.`);
      resumen.push('No pasa nada: así se aprende. En la próxima clase repetiremos este repaso y lo volveremos a intentar.');
    }
    return {
      habilidades, dificultades, resueltas, resumen,
      repetir: !superada,
      evaluacion: { superada, aciertos, total: 12, criterio: `${CRITERIO} de 12 cuerdas a la primera` },
    };
  },
};
