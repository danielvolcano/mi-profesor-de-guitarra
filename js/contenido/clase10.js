// Clase 10 · Semana 4 · «La bajada andaluza»: la, sol, fa, mi.
import { saludo, colocarse, descanso, pedirNota, listaTexto } from './comun.js';

const BAJADA = ['A2', 'G2', 'F2', 'E2'];

const VUELTAS = [
  { id: 'cero', etiqueta: 'Sin pararme', resultado: 'bien', respuesta: ['¡Olé! Eso ya es música flamenca.'] },
  { id: 'pocas', etiqueta: 'Con una o dos paradas', resultado: 'bien', respuesta: ['Muy bien. Para ser el primer día, es estupendo.'] },
  { id: 'muchas', etiqueta: 'Con muchas paradas', resultado: 'duda', respuesta: ['Normal el primer día. La practicaremos más en la próxima clase.'] },
  { id: 'otra', etiqueta: 'Quiero intentarlo otra vez', resultado: 'duda', volver: 1,
    respuesta: ['Claro. Pulsa Volver a intentarlo.'] },
];

export const clase10 = {
  id: 's4c1',
  semana: 4,
  numero: 10,
  titulo: 'La bajada andaluza',
  objetivo: 'Aprender la, en la quinta al aire, y tocar la bajada andaluza: la, sol, fa, mi.',
  duracion: 45,
  pasos: [
    {
      id: 'bienvenida', fase: 'bienvenida', titulo: 'Bienvenida',
      texto: saludo({
        recuerdo: 'Ya sabes tocar mi, fa y sol en la sexta cuerda.',
        hoy: 'Hoy empieza la semana cuatro. Vas a tocar la bajada andaluza, las cuatro notas que escuchaste el primer día: el corazón de los tangos.',
      }),
    },
    colocarse(),
    {
      id: 'calentar', fase: 'bienvenida', titulo: 'Calentamos',
      texto: ['Calentamos con mi, fa, sol, fa, mi. Despacio, dos veces.', 'Pulsa Continuar al terminar.'],
      ejemplo: { notas: ['E2', 'F2', 'G2', 'F2', 'E2'], intervalo: 1.1 },
    },

    // EXPLICACIÓN
    {
      id: 'escuchar', fase: 'explicacion', titulo: 'Escucha la bajada andaluza',
      texto: [
        '¿Te acuerdas de esto? Lo escuchaste en tu primera clase.',
        'La, sol, fa, mi. Cuatro notas que bajan.',
        'Sobre esta bajada se han cantado tangos, soleares y muchísimo flamenco. Hoy la vas a tocar tú.',
        'Pulsa Escuchar ejemplo.',
      ],
      ejemplo: { notas: BAJADA, intervalo: 1.0 },
    },
    {
      id: 'la', fase: 'explicacion', titulo: 'Una nota nueva: la',
      texto: [
        'Solo te falta una nota: la.',
        'Es muy fácil: es la quinta cuerda al aire, sin pisar nada.',
        'Tócala con el pulgar apoyado. Escucha el ejemplo y pruébalo.',
      ],
      ejemplo: { notas: ['A2'] },
    },
    {
      id: 'mapa', fase: 'explicacion', titulo: 'El mapa de la bajada',
      texto: [
        'Este es el mapa de la bajada:',
        'La: quinta cuerda al aire.',
        'Sol: sexta cuerda, traste tres, dedo tres.',
        'Fa: sexta cuerda, traste uno, dedo uno.',
        'Mi: sexta cuerda al aire.',
        'Pulsa Continuar.',
      ],
      otraForma: [
        'La primera nota está en la quinta cuerda. Las otras tres, en la sexta.',
        'En la sexta vas quitando dedos: primero el tres, luego el uno, hasta que la cuerda suena al aire.',
      ],
    },
    {
      id: 'truco', fase: 'explicacion', titulo: 'El truco de los dedos',
      texto: [
        'Un truco para que la bajada salga fluida.',
        'Antes de empezar, coloca a la vez el dedo uno en el traste uno y el dedo tres en el traste tres, los dos en la sexta.',
        'Toca la, en la quinta al aire. Después toca la sexta: suena sol.',
        'Levanta el dedo tres: suena fa, porque el uno ya estaba puesto. Levanta el uno: suena mi.',
        'Pulsa Continuar.',
      ],
      otraForma: [
        'Los dos dedos se preparan antes, como quien pone dos fichas en un tablero.',
        'Luego solo hay que irlos quitando: primero el tres, después el uno.',
      ],
    },

    // PRÁCTICA GUIADA
    pedirNota('nota-la', 'la', 'guiada', { titulo: 'Toca la' }),
    {
      id: 'dos-y-dos', fase: 'guiada', titulo: 'Por partes: la, sol',
      texto: [
        'Por partes. Primero solo las dos primeras: la, sol.',
        'El pulgar pasa de la quinta a la sexta. Con el dedo tres ya puesto en sol.',
        'Repítelo varias veces y pulsa Continuar.',
      ],
      ejemplo: { notas: ['A2', 'G2', 'A2', 'G2'], intervalo: 1.1 },
    },
    {
      id: 'sol-fa-mi', fase: 'guiada', titulo: 'Por partes: sol, fa, mi',
      texto: [
        'Ahora las tres últimas: sol, fa, mi. Todo en la sexta, quitando dedos.',
        'Repítelo varias veces y pulsa Continuar.',
      ],
      ejemplo: { notas: ['G2', 'F2', 'E2'], intervalo: 1.1 },
    },
    {
      id: 'entera', fase: 'guiada', titulo: 'La bajada entera, despacio',
      texto: [
        'Y ahora entera, muy despacio: la, sol, fa, mi.',
        'Escucha el ejemplo lento y repítelo cuatro o cinco veces.',
      ],
      ejemplo: { notas: BAJADA, intervalo: 1.5 },
    },
    {
      id: 'entera-como', fase: 'guiada', tipo: 'pregunta', titulo: '¿Te ha salido entera?',
      texto: ['¿Te ha salido la bajada entera, las cuatro notas?'],
      opciones: [
        { id: 'si', etiqueta: 'Sí', resultado: 'bien', respuesta: ['¡Muy bien! Acabas de tocar la bajada andaluza.'] },
        { id: 'casi', etiqueta: 'Casi, alguna nota se me escapa', resultado: 'duda',
          respuesta: ['Normal. La que más cuesta suele ser el paso de la quinta a la sexta. Practícalo un poco: la, sol, la, sol.'] },
        { id: 'no', etiqueta: 'Todavía no', resultado: 'mal', repetir: true,
          respuesta: ['Vamos más despacio. Toca la. Respira. Toca sol. Respira. Y así. Sin prisa. Pulsa Intentarlo otra vez cuando quieras.'] },
      ],
    },
    {
      id: 'oido', fase: 'guiada', tipo: 'juegoOido', titulo: 'Oído: ¿mi, fa, sol o la?',
      texto: ['Juego de oído con las cuatro notas de la bajada.', 'La es la más aguda de las cuatro. Mi, la más grave.', 'Seis rondas. Pulsa Escuchar el sonido.'],
      rondas: 6,
      categorias: [
        { id: 'mi', etiqueta: 'Mi', nombre: 'mi', cuerdas: ['E2'], frase: 'la sexta al aire' },
        { id: 'fa', etiqueta: 'Fa', nombre: 'fa', cuerdas: ['F2'], frase: 'el traste uno' },
        { id: 'sol', etiqueta: 'Sol', nombre: 'sol', cuerdas: ['G2'], frase: 'el traste tres' },
        { id: 'la', etiqueta: 'La', nombre: 'la', cuerdas: ['A2'], frase: 'la quinta al aire' },
      ],
    },
    descanso(),

    // PRÁCTICA AUTÓNOMA
    {
      id: 'con-palmas', fase: 'autonoma', titulo: 'La bajada con palmas',
      texto: [
        'Ahora la bajada con palmas: una nota en cada palma.',
        'Pulsa Escuchar ejemplo para oír cómo encaja. La nota la cae siempre en la palma fuerte.',
      ],
      ejemplo: { palmas: { bpm: 55, tiempos: 20, cuentaPrevia: 4 }, notas: BAJADA },
    },
    {
      id: 'autonoma', fase: 'autonoma', titulo: 'Practica tú solo con palmas',
      texto: [
        'Tu turno, con palmas lentas.',
        'Pulsa Empezar las palmas. Cuatro de entrada y, en la palma fuerte, empiezas con la.',
        'Si te pierdes, espera a la siguiente palma fuerte y vuelve a empezar con la.',
        'Repítelo las veces que quieras. Pulsa Continuar al terminar.',
      ],
      ejemplo: { etiqueta: 'Empezar las palmas', palmas: { bpm: 50, tiempos: 36, cuentaPrevia: 4 } },
    },

    // EVALUACIÓN
    {
      id: 'eval-tocar', fase: 'evaluacion', titulo: 'Comprobamos: la bajada cuatro veces',
      texto: [
        'Para terminar, toca la bajada cuatro veces seguidas con las palmas.',
        'Pulsa Empezar las palmas cuando estés listo. Al terminar, pulsa Continuar.',
      ],
      ejemplo: { etiqueta: 'Empezar las palmas', palmas: { bpm: 50, tiempos: 20, cuentaPrevia: 4 } },
    },
    {
      id: 'eval-bajada', fase: 'evaluacion', tipo: 'pregunta', titulo: '¿Cómo ha ido?',
      texto: ['¿Cómo te han salido las cuatro bajadas?'],
      opciones: VUELTAS,
    },
  ],

  evaluar(respuestas) {
    const habilidades = [
      { id: 'bajada', estado: 'practicado', fuente: 'clase' },
      { id: 'notasSexta', estado: 'practicado', fuente: 'clase' },
    ];
    const dificultades = [];
    const resueltas = [];
    const r = respuestas['eval-bajada'];
    if (r?.resultado === 'bien') {
      habilidades.push({ id: 'bajada', estado: 'comprendido', fuente: 'autoevaluacion' });
      resueltas.push('bajada');
    } else if (r) {
      dificultades.push({ id: 'bajada', habilidad: 'bajada', texto: 'tocar la bajada andaluza seguida, al pulso' });
    }
    if (respuestas['entera-como']?.opcion === 'casi') {
      dificultades.push({ id: 'la-sol', habilidad: 'bajada', texto: 'pasar de la quinta a la sexta en la bajada' });
    }
    const juego = respuestas.oido;
    if (juego?.total) {
      if (juego.aciertos >= juego.total - 1) { habilidades.push({ id: 'oidoNotas', estado: 'comprendido', fuente: 'app' }); resueltas.push('oido-bajada'); }
      else dificultades.push({ id: 'oido-bajada', habilidad: 'oidoNotas', texto: 'distinguir de oído mi, fa, sol y la' });
    }
    const resumen = ['¡Hoy has tocado tu primera música flamenca: la bajada andaluza! La, sol, fa, mi.'];
    const texto = { cero: 'sin pararte', pocas: 'con una o dos paradas', muchas: 'con bastantes paradas' }[r?.opcion];
    if (texto) resumen.push(`Con las palmas, te ha salido ${texto}.`);
    if (juego?.total) resumen.push(`En el juego de oído has acertado ${juego.aciertos} de ${juego.total}.`);
    if (dificultades.length) resumen.push(`Seguiremos practicando ${listaTexto(dificultades.map((d) => d.texto))}.`);
    resumen.push('Desde hoy, en Practicar una canción puedes tocar la bajada con palmas siempre que quieras.');
    resumen.push('En la próxima clase la tocaremos con compás de tangos.');
    return { habilidades, dificultades, resueltas, resumen };
  },
};
