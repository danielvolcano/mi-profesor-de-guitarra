// Clase 8 · Semana 3 · «Notas limpias»: sol en el traste 3 y la escala mi-fa-sol.
import { saludo, colocarse, descanso, pedirNota, listaTexto } from './comun.js';

export const clase8 = {
  id: 's3c2',
  semana: 3,
  numero: 8,
  titulo: 'Notas limpias',
  objetivo: 'Aprender sol en el traste tres y conseguir notas limpias: yema, cerca de la barrita y presión justa.',
  duracion: 45,
  pasos: [
    {
      id: 'bienvenida', fase: 'bienvenida', titulo: 'Bienvenida',
      texto: saludo({
        recuerdo: 'En la clase anterior pisaste tu primera nota, fa, en la sexta cuerda.',
        hoy: 'Hoy aprenderás una nota nueva, sol, y los trucos para que tus notas suenen limpias.',
      }),
    },
    colocarse(),
    {
      id: 'repaso', fase: 'bienvenida', titulo: 'Repaso: mi, fa, mi',
      texto: [
        'Calentamos con mi, fa, mi.',
        'Recuerda: fa es la sexta cuerda, traste uno, con el dedo uno, justo detrás de la barrita.',
        'Hazlo varias veces y pulsa Continuar.',
      ],
      ejemplo: { notas: ['E2', 'F2', 'E2'], intervalo: 1.1 },
    },

    // EXPLICACIÓN
    {
      id: 'claves', fase: 'explicacion', titulo: 'Tres claves para una nota limpia',
      texto: [
        'Para que una nota suene limpia, hay tres claves.',
        'Uno: pisa con la yema, la punta del dedo, con el dedo curvado como un martillito.',
        'Dos: coloca el dedo justo detrás de la barrita de metal, pegado a ella pero sin subirte encima.',
        'Tres: aprieta lo justo. Ni tan poco que zumbe, ni tanto que te canses.',
        'Pulsa Continuar.',
      ],
      otraForma: [
        'Si la nota zumba, casi siempre es porque el dedo está lejos de la barrita o aprieta poco.',
        'Si suena apagada, puede que otro dedo esté rozando la cuerda, o que pises con la parte plana del dedo.',
      ],
    },
    {
      id: 'presion', fase: 'explicacion', titulo: 'Encontrar la presión justa',
      texto: [
        'Un ejercicio para encontrar la presión justa.',
        'Pon el dedo uno en fa, pero apoyado, sin apretar, y toca la sexta: sonará apagado.',
        'Ahora ve apretando poco a poco mientras tocas, hasta que la nota suene clara.',
        'Ese es el punto. No hace falta apretar más.',
        'Pulsa Continuar cuando lo hayas probado.',
      ],
    },
    {
      id: 'sol', fase: 'explicacion', titulo: 'Una nota nueva: sol',
      texto: [
        'La nota nueva se llama sol. Está en la sexta cuerda, traste tres.',
        'Se pisa con el dedo tres, el anular.',
        'Para encontrarlo, cuenta desde la cejuela: traste uno, traste dos, traste tres. Si tienes el puntito en relieve, está justo ahí.',
        'Escucha cómo suena: mi, fa, sol.',
      ],
      ejemplo: { notas: ['E2', 'F2', 'G2'], intervalo: 1.2 },
    },
    {
      id: 'un-dedo-por-traste', fase: 'explicacion', titulo: 'Un dedo para cada traste',
      texto: [
        'Un truco de guitarrista: un dedo para cada traste.',
        'El dedo uno se encarga del traste uno. El dedo tres, del traste tres.',
        'El dedo dos queda en el aire, encima del traste dos, sin pisar.',
        'Así la mano no tiene que moverse para cambiar de nota.',
        'Pulsa Continuar.',
      ],
    },

    // PRÁCTICA GUIADA
    { ...pedirNota('sol-1', 'sol', 'guiada', { titulo: 'Pisa sol' }) },
    {
      id: 'mi-fa-sol', fase: 'guiada', titulo: 'Subir: mi, fa, sol',
      texto: [
        'Ahora sube: mi, fa, sol.',
        'Mi, al aire. Fa, dedo uno en el traste uno. Sol, dedo tres en el traste tres.',
        'Un truco: cuando pongas el tres para sol, puedes dejar el uno puesto en fa. No molesta.',
        'Escucha y repite varias veces.',
      ],
      ejemplo: { notas: ['E2', 'F2', 'G2'], intervalo: 1.1 },
    },
    {
      id: 'subir-bajar', fase: 'guiada', titulo: 'Subir y bajar',
      texto: [
        'Ahora sube y baja: mi, fa, sol, fa, mi.',
        'Para bajar de sol a fa, levanta el dedo tres. Si el uno estaba puesto, fa suena enseguida.',
        'Escucha y repite despacio.',
      ],
      ejemplo: { notas: ['E2', 'F2', 'G2', 'F2', 'E2'], intervalo: 1.1 },
    },
    {
      id: 'yemas', fase: 'guiada', tipo: 'pregunta', titulo: '¿Cómo están las yemas?',
      texto: ['Una pregunta sobre tus dedos. ¿Te molestan las yemas de la mano izquierda?'],
      opciones: [
        { id: 'no', etiqueta: 'No, bien', resultado: 'bien', respuesta: ['Estupendo. Seguimos.'] },
        { id: 'poco', etiqueta: 'Un poco', resultado: 'bien',
          respuesta: ['Es completamente normal. En dos o tres semanas se te harán unas pequeñas durezas y dejará de molestar.'] },
        { id: 'mucho', etiqueta: 'Bastante', resultado: 'duda',
          respuesta: ['Entonces descansa la mano izquierda un rato. En el resto de la clase, toca solo lo que te resulte cómodo. Mejor poco y a menudo.'] },
      ],
    },
    {
      id: 'oido', fase: 'guiada', tipo: 'juegoOido', titulo: 'Oído: ¿mi, fa o sol?',
      texto: [
        'Juego de oído. Te tocaré mi, fa o sol.',
        'Mi es la más grave. Sol, la más aguda de las tres.',
        'Seis rondas. Pulsa Escuchar el sonido.',
      ],
      rondas: 6,
      categorias: [
        { id: 'mi', etiqueta: 'Mi', nombre: 'mi', cuerdas: ['E2'], frase: 'la sexta al aire' },
        { id: 'fa', etiqueta: 'Fa', nombre: 'fa', cuerdas: ['F2'], frase: 'el traste uno' },
        { id: 'sol', etiqueta: 'Sol', nombre: 'sol', cuerdas: ['G2'], frase: 'el traste tres' },
      ],
    },
    descanso(),

    // PRÁCTICA AUTÓNOMA
    {
      id: 'autonoma', fase: 'autonoma', titulo: 'Practica tú solo: mi, fa, sol, fa, mi',
      texto: [
        'Practica tú solo: mi, fa, sol, fa, mi. Muchas veces, despacio.',
        'Escucha cada nota. Si alguna zumba, para y recoloca el dedo.',
        'Pulsa Continuar cuando termines.',
      ],
      ejemplo: { notas: ['E2', 'F2', 'G2', 'F2', 'E2'], intervalo: 1.1 },
    },
    {
      id: 'autonoma-palmas', fase: 'autonoma', titulo: 'Practica con palmas',
      texto: [
        'Ahora con palmas lentas, una nota en cada palma: mi, fa, sol, fa. Y vuelta a empezar.',
        'Pulsa Escuchar ejemplo para oírlo, y después hazlo tú con el ejemplo sonando o en silencio.',
      ],
      ejemplo: { palmas: { bpm: 50, tiempos: 20, cuentaPrevia: 4 }, notas: ['E2', 'F2', 'G2', 'F2'] },
    },

    // EVALUACIÓN
    {
      id: 'evaluacion', fase: 'evaluacion', titulo: 'Comprobamos lo aprendido',
      texto: ['Te pediré tres notas pisadas, sin pistas. Escúchate bien.', 'Pulsa Continuar.'],
    },
    pedirNota('eval-sol1', 'sol', 'evaluacion', { pista: false }),
    pedirNota('eval-fa', 'fa', 'evaluacion', { pista: false }),
    pedirNota('eval-sol2', 'sol', 'evaluacion', { pista: false, titulo: 'Toca sol otra vez' }),
  ],

  evaluar(respuestas) {
    const habilidades = [
      { id: 'trastes', estado: 'practicado', fuente: 'clase' },
      { id: 'manoIzquierda', estado: 'practicado', fuente: 'clase' },
      { id: 'notasSexta', estado: 'practicado', fuente: 'clase' },
    ];
    const dificultades = [];
    const resueltas = [];
    const ids = ['eval-sol1', 'eval-fa', 'eval-sol2'];
    const res = ids.map((id) => respuestas[id]?.resultado);
    const limpias = res.filter((r) => r === 'bien').length;
    if (limpias === ids.length) {
      habilidades.push({ id: 'notasSexta', estado: 'comprendido', fuente: 'autoevaluacion' });
      habilidades.push({ id: 'trastes', estado: 'comprendido', fuente: 'autoevaluacion' });
      resueltas.push('nota-fa', 'nota-sol', 'trastes');
    } else if (res.some(Boolean)) {
      const sol = [res[0], res[2]];
      if (sol.some((r) => r !== 'bien')) dificultades.push({ id: 'nota-sol', habilidad: 'notasSexta', texto: 'que sol suene limpio, en el traste tres' });
      if (res[1] && res[1] !== 'bien') dificultades.push({ id: 'nota-fa', habilidad: 'notasSexta', texto: 'que fa suene limpio, sin zumbar' });
      else if (res[1] === 'bien') resueltas.push('nota-fa');
      if (res.includes('mal')) dificultades.push({ id: 'trastes', habilidad: 'trastes', texto: 'encontrar los trastes contando desde la cejuela' });
    }
    const juego = respuestas.oido;
    if (juego?.total) {
      if (juego.aciertos >= juego.total - 1) { habilidades.push({ id: 'oidoNotas', estado: 'comprendido', fuente: 'app' }); resueltas.push('oido-mi-fa', 'oido-mi-fa-sol'); }
      else { habilidades.push({ id: 'oidoNotas', estado: 'practicado', fuente: 'clase' }); dificultades.push({ id: 'oido-mi-fa-sol', habilidad: 'oidoNotas', texto: 'distinguir de oído mi, fa y sol' }); }
    }
    const resumen = ['Hoy has aprendido sol y los trucos para que las notas suenen limpias.', 'Y ya tocas tres notas seguidas: mi, fa, sol.'];
    if (res.some(Boolean)) resumen.push(`En la comprobación, ${limpias} de 3 notas han sonado limpias, según tus respuestas.`);
    if (juego?.total) resumen.push(`En el juego de oído has acertado ${juego.aciertos} de ${juego.total}.`);
    if (dificultades.length) resumen.push(`Seguiremos practicando ${listaTexto(dificultades.map((d) => d.texto))}.`);
    resumen.push('En la próxima clase haremos un dictado de notas y la evaluación de la semana tres.');
    return { habilidades, dificultades, resueltas, resumen };
  },
};
