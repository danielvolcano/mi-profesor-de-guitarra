// Clase 4 · Semana 2 · «El pulgar flamenco» (pulgar apoyado)
import { saludo, colocarse, descanso, listaTexto } from './comun.js';

const AUTO = [
  { id: 'si', etiqueta: 'Sí, fuerte y con el pulgar apoyado', resultado: 'bien', respuesta: ['Estupendo. Ese es el pulgar flamenco.'] },
  { id: 'aveces', etiqueta: 'A veces', resultado: 'duda',
    respuesta: ['Muy bien para empezar. Recuerda: el pulgar no sube después de tocar, cae y se queda en la cuerda de abajo.'] },
  { id: 'no', etiqueta: 'Todavía no', resultado: 'mal',
    respuesta: ['Tranquilo, es un movimiento nuevo. Hazlo muy despacio: empuja hacia el suelo y deja que el pulgar se pare en la cuerda siguiente.'] },
];

function evalPulgar(id, n, nombre, siguiente) {
  return {
    id, fase: 'evaluacion', tipo: 'pregunta', titulo: `Pulgar apoyado en la ${nombre}`,
    texto: [
      `Toca la ${nombre} cuatro veces con el pulgar apoyado.`,
      `Después de cada nota, el pulgar tiene que quedarse descansando en la ${siguiente}.`,
      '¿Ha sonado fuerte y redondo, con el pulgar apoyado?',
    ],
    ejemplo: { notas: [n, n, n, n] },
    opciones: AUTO,
  };
}

export const clase4 = {
  id: 's2c1',
  semana: 2,
  numero: 4,
  titulo: 'El pulgar flamenco',
  objetivo: 'Colocar bien la mano derecha y tocar las cuerdas graves con el pulgar apoyado.',
  duracion: 45,
  pasos: [
    {
      id: 'bienvenida', fase: 'bienvenida', titulo: 'Bienvenida',
      texto: saludo({
        recuerdo: 'Empezamos la segunda semana. Ya sabes encontrar las seis cuerdas de tu guitarra.',
        hoy: 'Hoy vas a aprender el pulgar flamenco. Es el dedo más importante del guitarrista flamenco, el que hace sonar los bajos.',
      }),
    },
    colocarse(),

    // EXPLICACIÓN
    {
      id: 'mano-derecha', fase: 'explicacion', titulo: 'La mano derecha',
      texto: [
        'Vamos a colocar bien la mano derecha.',
        'Apoya el antebrazo sobre el borde de arriba de la caja, más o menos a la altura del codo.',
        'Deja caer la mano relajada hasta que quede encima de la boca.',
        'La muñeca, suelta, un poco arqueada, sin apretar.',
        'Pulsa Continuar.',
      ],
      otraForma: [
        'El antebrazo descansa sobre la guitarra como si la abrazaras.',
        'La mano cuelga suelta sobre la boca, como si sostuvieras una pelota pequeña.',
      ],
    },
    {
      id: 'ancla', fase: 'explicacion', titulo: 'Un punto de apoyo',
      texto: [
        'Un truco para que la mano no se pierda.',
        'Apoya suavemente las yemas del índice, el medio y el anular sobre la primera cuerda, la más fina.',
        'Así la mano siempre sabe dónde está, sin necesidad de mirar.',
        'El pulgar queda libre, por encima, cerca de las cuerdas gruesas.',
        'Pulsa Continuar.',
      ],
      otraForma: [
        'Los tres dedos largos se quedan quietos, tocando la primera cuerda, como un ancla.',
        'Solo se mueve el pulgar.',
      ],
    },
    {
      id: 'apoyado', fase: 'explicacion', titulo: 'Qué es el pulgar apoyado',
      texto: [
        'El primer día tocabas con el pulgar dejándolo escapar. Hoy lo haremos a la manera flamenca: apoyado.',
        'El pulgar empuja la cuerda hacia el suelo, la atraviesa, y se queda descansando sobre la cuerda siguiente.',
        'Por ejemplo: tocas la sexta, y el pulgar se para encima de la quinta.',
        'Así el sonido sale más fuerte y redondo.',
        'Pulsa Continuar.',
      ],
      otraForma: [
        'Imagina que el pulgar baja una escalera: pisa un escalón, la sexta, y se queda quieto en el siguiente, la quinta.',
        'No sube después de tocar. Se queda apoyado.',
      ],
    },

    // PRÁCTICA GUIADA
    {
      id: 'sexta', fase: 'guiada', titulo: 'Pulgar apoyado en la sexta',
      texto: [
        'Pon el pulgar sobre la sexta.',
        'Empuja hacia el suelo, despacio, y deja que el pulgar se pare encima de la quinta.',
        'Nota cómo la quinta frena el pulgar.',
        'Vuelve a subir el pulgar a la sexta y repite. Hazlo ocho veces, sin prisa.',
        'Pulsa Continuar cuando termines.',
      ],
      ejemplo: { notas: [6, 6, 6, 6] },
    },
    {
      id: 'sexta-nota', fase: 'guiada', tipo: 'pregunta', titulo: '¿Notas el apoyo?',
      texto: [
        'Una pregunta. Cuando tocas la sexta, ¿notas el pulgar descansando sobre la quinta?',
      ],
      opciones: [
        { id: 'si', etiqueta: 'Sí, lo noto', resultado: 'bien', respuesta: ['Perfecto. Ese es el apoyo.'] },
        { id: 'no', etiqueta: 'No estoy seguro', resultado: 'duda', repetir: true,
          respuesta: [
            'Prueba esto: toca la sexta muy despacio, casi a cámara lenta.',
            'Cuando la sexta suene, el pulgar debería chocar suavemente con la quinta y quedarse ahí.',
            'Pruébalo y pulsa Intentarlo otra vez.',
          ] },
      ],
    },
    {
      id: 'quinta', fase: 'guiada', titulo: 'Pulgar apoyado en la quinta',
      texto: [
        'Ahora en la quinta.',
        'Tocas la quinta y el pulgar se queda descansando en la cuarta.',
        'Ocho veces, despacio. Pulsa Continuar al terminar.',
      ],
      ejemplo: { notas: [5, 5, 5, 5] },
    },
    {
      id: 'cuarta', fase: 'guiada', titulo: 'Pulgar apoyado en la cuarta',
      texto: [
        'Y ahora en la cuarta.',
        'Tocas la cuarta y el pulgar descansa en la tercera, la primera lisa.',
        'Ocho veces. Pulsa Continuar al terminar.',
      ],
      ejemplo: { notas: [4, 4, 4, 4] },
    },
    {
      id: 'parejas', fase: 'guiada', titulo: 'Bajos por parejas',
      texto: [
        'Ahora juntamos las tres: dos veces la sexta, dos la quinta y dos la cuarta.',
        'Siempre con el pulgar apoyado.',
        'Escucha el ejemplo y hazlo tú tres o cuatro veces.',
      ],
      ejemplo: { notas: [6, 6, 5, 5, 4, 4], intervalo: 0.9 },
    },
    {
      id: 'oido', fase: 'guiada', tipo: 'juegoOido', titulo: 'Oído: ¿sexta, quinta o cuarta?',
      texto: [
        'Juego de oído, un poco más difícil que los anteriores.',
        'Te tocaré una de las tres cuerdas graves: la sexta, la quinta o la cuarta.',
        'La sexta es la más grave. La cuarta, la menos grave de las tres.',
        'Seis rondas. Pulsa Escuchar el sonido.',
      ],
      rondas: 6,
      categorias: [
        { id: 'sexta', etiqueta: 'Sexta', cuerdas: [6], frase: 'la más grave' },
        { id: 'quinta', etiqueta: 'Quinta', cuerdas: [5], frase: 'la del medio de las graves' },
        { id: 'cuarta', etiqueta: 'Cuarta', cuerdas: [4], frase: 'la menos grave de las tres' },
      ],
    },
    descanso(),

    // PRÁCTICA AUTÓNOMA
    {
      id: 'autonoma-bajar', fase: 'autonoma', titulo: 'Practica tú solo: subir y bajar',
      texto: [
        'Practica tú solo.',
        'Con el pulgar apoyado: sexta, quinta, cuarta. Y vuelta: cuarta, quinta, sexta.',
        'Sin prisa. Lo importante es que cada nota suene llena.',
        'Yo me quedo en silencio. Cuando termines, pulsa Continuar.',
      ],
      ejemplo: { notas: [6, 5, 4, 4, 5, 6] },
    },
    {
      id: 'autonoma-saltar', fase: 'autonoma', titulo: 'Practica tú solo: sexta y cuarta',
      texto: [
        'Un último ejercicio: alterna sexta y cuarta, saltándote la quinta.',
        'Sexta, cuarta, sexta, cuarta. Diez veces, despacio.',
        'Cuando termines, pulsa Continuar.',
      ],
      ejemplo: { notas: [6, 4, 6, 4, 6, 4] },
    },

    // EVALUACIÓN
    {
      id: 'evaluacion', fase: 'evaluacion', titulo: 'Comprobamos lo aprendido',
      texto: [
        'Vamos a comprobar cómo va el pulgar.',
        'Escúchate bien y contesta con sinceridad.',
        'Pulsa Continuar.',
      ],
    },
    evalPulgar('eval-6', 6, 'sexta', 'quinta'),
    evalPulgar('eval-5', 5, 'quinta', 'cuarta'),
    evalPulgar('eval-4', 4, 'cuarta', 'tercera'),
  ],

  evaluar(respuestas) {
    const ids = ['eval-6', 'eval-5', 'eval-4'];
    const bien = ids.filter((id) => respuestas[id]?.resultado === 'bien').length;
    const habilidades = [
      { id: 'manoDerecha', estado: 'practicado', fuente: 'clase' },
      { id: 'pulgarApoyado', estado: 'practicado', fuente: 'clase' },
    ];
    const dificultades = [];
    const resueltas = [];
    if (bien === ids.length) {
      habilidades.push({ id: 'pulgarApoyado', estado: 'comprendido', fuente: 'autoevaluacion' });
      resueltas.push('pulgar-apoyado');
    } else if (ids.some((id) => respuestas[id])) {
      dificultades.push({ id: 'pulgar-apoyado', habilidad: 'pulgarApoyado', texto: 'tocar con el pulgar apoyado' });
    }
    const juego = respuestas.oido;
    if (juego?.total) {
      if (juego.aciertos >= juego.total - 1) {
        habilidades.push({ id: 'oidoGraves', estado: 'comprendido', fuente: 'app' });
        resueltas.push('oido-graves');
      } else {
        habilidades.push({ id: 'oidoGraves', estado: 'practicado', fuente: 'clase' });
        dificultades.push({ id: 'oido-graves', habilidad: 'oidoGraves', texto: 'distinguir de oído la sexta, la quinta y la cuarta' });
      }
    }
    const resumen = ['Muy bien. Hoy has aprendido a colocar la mano derecha y a tocar con el pulgar apoyado, como los flamencos.'];
    if (ids.some((id) => respuestas[id])) resumen.push(`Según tus respuestas, el pulgar te ha salido bien en ${bien} de las 3 cuerdas graves.`);
    if (juego?.total) resumen.push(`En el juego de oído has acertado ${juego.aciertos} de ${juego.total}.`);
    if (dificultades.length) resumen.push(`Seguiremos practicando ${listaTexto(dificultades.map((d) => d.texto))}.`);
    resumen.push('En la próxima clase despertaremos dos dedos más: el índice y el medio, para las cuerdas agudas.');
    return { habilidades, dificultades, resueltas, resumen };
  },
};
