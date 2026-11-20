// Clase 9 · Semana 3 · «Dictado de notas y evaluación de la semana 3»
// Criterio: al menos 8 de 10 notas pedidas (mi, fa, sol en la sexta) tocadas y limpias.
import { saludo, colocarse, pedirNota, contarBien, listaTexto } from './comun.js';

const DICTADO = ['fa', 'mi', 'sol', 'fa', 'sol', 'mi', 'fa', 'sol', 'fa', 'mi'];
const IDS = DICTADO.map((n, i) => `dictado-${i + 1}`);
const CRITERIO = 8;

export const clase9 = {
  id: 's3c3',
  semana: 3,
  numero: 9,
  titulo: 'Dictado de notas y evaluación de la semana 3',
  objetivo: 'Tocar con sonido limpio las notas que se piden en la sexta cuerda: mi, fa y sol.',
  duracion: 45,
  evaluacionSemanal: true,
  pasos: [
    {
      id: 'bienvenida', fase: 'bienvenida', titulo: 'Bienvenida',
      texto: saludo({
        recuerdo: 'Esta semana has descubierto los trastes y has aprendido tres notas en la sexta cuerda: mi, fa y sol.',
        hoy: 'Hoy repasamos, y al final haremos un dictado de notas: es la evaluación de la semana tres.',
      }),
    },
    colocarse(),
    {
      id: 'repaso-donde', fase: 'explicacion', titulo: 'Repaso: dónde está cada nota',
      texto: [
        'Repasamos dónde está cada nota.',
        'Mi: la sexta cuerda al aire, sin pisar.',
        'Fa: la sexta, traste uno, dedo uno, el índice.',
        'Sol: la sexta, traste tres, dedo tres, el anular.',
        'Pulsa Escuchar ejemplo para oírlas, y Continuar cuando quieras.',
      ],
      ejemplo: { notas: ['E2', 'F2', 'G2'], intervalo: 1.3 },
    },
    {
      id: 'repaso-claves', fase: 'explicacion', titulo: 'Repaso: notas limpias',
      texto: [
        'Y las tres claves para una nota limpia:',
        'pisar con la yema, justo detrás de la barrita, y apretar lo justo.',
        'Pulsa Continuar.',
      ],
    },
    {
      id: 'calentar', fase: 'guiada', titulo: 'Calentamos: subir y bajar',
      texto: [
        'Calentamos: mi, fa, sol, fa, mi. Despacio, tres veces.',
        'Escucha cada nota. Pulsa Continuar cuando termines.',
      ],
      ejemplo: { notas: ['E2', 'F2', 'G2', 'F2', 'E2'], intervalo: 1.1 },
    },
    {
      id: 'calentar-palmas', fase: 'guiada', titulo: 'Calentamos con palmas',
      texto: [
        'Ahora con palmas: mi, fa, sol, fa, una nota por palma, y vuelta a empezar.',
        'Pulsa Empezar las palmas. Cuatro palmas de entrada.',
      ],
      ejemplo: { etiqueta: 'Empezar las palmas', palmas: { bpm: 55, tiempos: 20, cuentaPrevia: 4 } },
    },
    {
      id: 'oido', fase: 'guiada', tipo: 'juegoOido', titulo: 'Oído: ¿mi, fa o sol?',
      texto: ['Juego de oído antes del dictado. Te tocaré mi, fa o sol.', 'Seis rondas. Pulsa Escuchar el sonido.'],
      rondas: 6,
      categorias: [
        { id: 'mi', etiqueta: 'Mi', nombre: 'mi', cuerdas: ['E2'], frase: 'la sexta al aire' },
        { id: 'fa', etiqueta: 'Fa', nombre: 'fa', cuerdas: ['F2'], frase: 'el traste uno' },
        { id: 'sol', etiqueta: 'Sol', nombre: 'sol', cuerdas: ['G2'], frase: 'el traste tres' },
      ],
    },
    {
      id: 'respira', fase: 'guiada', titulo: 'Respira antes de la evaluación',
      texto: ['Muy bien. Suelta las manos y respira hondo.', 'Cuando estés listo, pulsa Continuar.'],
    },

    // EVALUACIÓN SEMANAL
    {
      id: 'eval-intro', fase: 'evaluacion', titulo: 'Evaluación de la semana 3: dictado',
      texto: [
        'Empieza el dictado. Te pediré diez notas, sin pistas.',
        'Tócala y dime si ha sonado limpia.',
        'Si una nota zumba, puedes recolocar el dedo y volver a tocarla antes de contestar.',
        'Para superar la semana, necesitas ocho de diez.',
        'Pulsa Continuar.',
      ],
    },
    ...DICTADO.map((n, i) => pedirNota(IDS[i], n, 'evaluacion', { pista: false, titulo: `Nota ${i + 1} de 10: ${n}` })),
  ],

  evaluar(respuestas) {
    const aciertos = contarBien(respuestas, IDS);
    const respondidas = IDS.filter((id) => respuestas[id]).length;
    const superada = aciertos >= CRITERIO;
    const habilidades = [
      { id: 'trastes', estado: 'practicado', fuente: 'clase' },
      { id: 'notasSexta', estado: 'practicado', fuente: 'clase' },
      { id: 'manoIzquierda', estado: 'practicado', fuente: 'clase' },
    ];
    if (superada) {
      habilidades.push({ id: 'notasSexta', estado: 'dominado', fuente: 'evaluacion-semanal' });
      habilidades.push({ id: 'trastes', estado: 'dominado', fuente: 'evaluacion-semanal' });
      habilidades.push({ id: 'manoIzquierda', estado: 'comprendido', fuente: 'autoevaluacion' });
    }
    const dificultades = [];
    const resueltas = [];
    for (const nota of ['fa', 'sol']) {
      const ids = IDS.filter((_, i) => DICTADO[i] === nota);
      const fallos = ids.filter((id) => respuestas[id] && respuestas[id].resultado !== 'bien').length;
      if (!ids.some((id) => respuestas[id])) continue;
      if (fallos === 0) resueltas.push(`nota-${nota}`);
      else dificultades.push({ id: `nota-${nota}`, habilidad: 'notasSexta', texto: `que ${nota} suene limpio` });
    }
    if (IDS.some((id) => respuestas[id]?.resultado === 'mal')) {
      dificultades.push({ id: 'trastes', habilidad: 'trastes', texto: 'encontrar los trastes contando desde la cejuela' });
    } else if (superada) {
      resueltas.push('trastes');
    }
    const juego = respuestas.oido;
    if (juego?.total) {
      if (juego.aciertos >= juego.total - 1) { habilidades.push({ id: 'oidoNotas', estado: 'dominado', fuente: 'evaluacion-semanal' }); resueltas.push('oido-mi-fa', 'oido-mi-fa-sol'); }
      else dificultades.push({ id: 'oido-mi-fa-sol', habilidad: 'oidoNotas', texto: 'distinguir de oído mi, fa y sol' });
    }

    const resumen = [`En el dictado han sonado limpias ${aciertos} de ${respondidas || 10} notas, según tus respuestas.`];
    if (superada) {
      resumen.push('¡Enhorabuena! Has superado la semana tres. Ya sabes pisar notas limpias con la mano izquierda.');
      if (dificultades.length) resumen.push(`Seguiremos puliendo ${listaTexto(dificultades.map((d) => d.texto))}.`);
      resumen.push('En la próxima clase empieza la semana cuatro, y con ella tu primera música flamenca de verdad: la bajada andaluza.');
    } else {
      resumen.push('Para superar la semana hacen falta ocho. No pasa nada: las notas limpias necesitan su tiempo y unas yemas un poco más duras.');
      resumen.push('En la próxima clase repetiremos este repaso y el dictado.');
    }
    return {
      habilidades, dificultades, resueltas, resumen,
      repetir: !superada,
      evaluacion: { superada, aciertos, total: 10, criterio: `${CRITERIO} de 10 notas limpias` },
    };
  },
};
