// Clase 1 · Semana 1 · «Conocer tu guitarra» (unos 45 minutos)
// Cada paso es una pantalla de la clase. El texto se dice frase a frase.

const SI_NO = (correcta = 'si') => [
  { id: 'si', etiqueta: 'Sí', resultado: 'bien', respuesta: ['Muy bien.'] },
  { id: 'duda', etiqueta: 'No estoy seguro', resultado: 'duda',
    respuesta: ['No pasa nada. Lo repasaremos con calma en la próxima clase.'] },
  { id: 'no', etiqueta: 'No', resultado: 'mal',
    respuesta: ['Tranquilo, es normal al principio. Lo anoto y lo repasaremos en la próxima clase.'] },
];

function pasoCuerda(id, numero, nombre, pista) {
  return {
    id, fase: 'evaluacion', tipo: 'pregunta', titulo: `Toca la ${nombre}`,
    texto: [`Toca la ${nombre} cuerda con el pulgar.`, pista, '¿Lo has conseguido?'],
    otraForma: ['Recuerda: la sexta es la más gruesa, la más cercana a tu cara. Desde ahí, cuenta las cuerdas hacia tus piernas: sexta, quinta, cuarta, tercera, segunda y primera.'],
    ejemplo: { notas: [numero] },
    opciones: SI_NO(),
  };
}

export const clase1 = {
  id: 's1c1',
  semana: 1,
  numero: 1,
  titulo: 'Conocer tu guitarra',
  objetivo: 'Conocer las partes de la guitarra, colocarla en posición flamenca, localizar las seis cuerdas y sacar los primeros sonidos.',
  duracion: 45,
  pasos: [
    // FASE 1 · BIENVENIDA (5 minutos)
    {
      id: 'bienvenida', fase: 'bienvenida', titulo: 'Bienvenida',
      texto: [
        'Buenos días. Soy tu profesor de guitarra.',
        'Vamos a aprender juntos, poco a poco y a tu ritmo.',
        'Aquí nadie tiene prisa. Puedes repetir cualquier explicación todas las veces que quieras.',
        'Hoy vamos a conocer tu guitarra y a sacar tus primeros sonidos.',
        'Cuando estés preparado, pulsa Continuar.',
      ],
    },
    {
      id: 'botones', fase: 'bienvenida', titulo: 'Cómo funciona la clase',
      texto: [
        'Antes de empezar, te cuento cómo funciona la clase.',
        'Debajo de mis explicaciones siempre encontrarás los mismos botones, en el mismo orden.',
        'Continuar, para pasar al siguiente paso.',
        'Repetir, para volver a oírme.',
        'Escuchar ejemplo, cuando haya un sonido de muestra.',
        'Explícamelo de otra forma, si algo no queda claro.',
        'Y Paso anterior, para volver atrás.',
        'Arriba del todo está el botón Pausar y guardar. Si lo pulsas, la clase se guarda y la próxima vez seguiremos justo aquí.',
        'Si tocas la pantalla mientras hablo, me callo para no hablar a la vez que VoiceOver. Pulsa Repetir para volver a oírme.',
      ],
      otraForma: [
        'En resumen: Continuar para avanzar, y Repetir para volver a oírme. Con esos dos botones tienes suficiente para empezar.',
      ],
    },
    {
      id: 'sentarse', fase: 'bienvenida', titulo: 'Prepárate',
      texto: [
        'Siéntate en una silla sin brazos.',
        'Apoya bien la espalda y pon los dos pies en el suelo.',
        'Deja la guitarra a tu lado, por ahora sin cogerla.',
        'Pulsa Continuar cuando estés sentado.',
      ],
    },

    // FASE 2 · EXPLICACIÓN (8 minutos)
    {
      id: 'caja', fase: 'explicacion', titulo: 'La caja y la boca',
      texto: [
        'Coge la guitarra con las dos manos y déjala tumbada sobre tus rodillas, con las cuerdas mirando hacia arriba.',
        'La parte grande y hueca se llama caja. Es la que hace que el sonido sea fuerte.',
        'Pasa la mano por encima de la caja.',
        'Notarás que en el centro hay un agujero redondo. Se llama boca.',
        'Cuando hayas encontrado la boca, pulsa Continuar.',
      ],
      otraForma: [
        'La caja es como una cajita de madera hueca, con forma de ocho.',
        'La boca es el agujero redondo que hay en la tapa, más o menos del tamaño de tu mano abierta.',
        'Si tocas las cuerdas, la boca está justo debajo de ellas, en el centro de la caja.',
      ],
    },
    {
      id: 'mastil', fase: 'explicacion', titulo: 'El mástil y el clavijero',
      texto: [
        'De la caja sale un brazo largo de madera. Se llama mástil.',
        'Recorre el mástil con la mano hasta el final.',
        'Allí encontrarás unas piezas que giran, como pequeñas llaves. Es el clavijero, y sirve para afinar.',
        'No las gires: tu guitarra ya está afinada.',
        'Pulsa Continuar.',
      ],
      otraForma: [
        'Imagina que la guitarra es una cuchara gigante. La caja es la parte ancha y el mástil es el mango.',
        'Al final del mango están las llaves de afinar, que forman el clavijero. Esas no las tocamos.',
      ],
    },
    {
      id: 'cuerdas', fase: 'explicacion', titulo: 'Las cuerdas',
      texto: [
        'Por encima del mástil y de la boca pasan seis cuerdas.',
        'Van desde el clavijero hasta un taco de madera que está en la caja, al otro lado de la boca. Ese taco se llama puente, y allí están atadas las cuerdas.',
        'Pasa suavemente un dedo de un lado a otro, cruzando las cuerdas encima de la boca.',
        'Cuéntalas. Deberían ser seis.',
        'Pulsa Continuar.',
      ],
      otraForma: [
        'Las cuerdas van a lo largo de toda la guitarra, como los raíles de una vía de tren.',
        'Empiezan en el clavijero, pasan por encima del mástil y de la boca, y terminan atadas en el puente.',
      ],
    },
    {
      id: 'sonido', fase: 'explicacion', titulo: 'Cómo nace el sonido',
      texto: [
        'Vamos a descubrir cómo nace el sonido.',
        'Con la guitarra todavía tumbada, apoya la mano izquierda plana sobre la caja, al lado de la boca.',
        'Con un dedo de la mano derecha, engancha suavemente una cuerda cualquiera y suéltala.',
        'Notarás un cosquilleo en la madera, bajo tu mano izquierda.',
        'Eso es el sonido. La cuerda vibra, y la caja hace más grande esa vibración.',
        'Pruébalo varias veces y, cuando quieras, pulsa Continuar.',
      ],
      otraForma: [
        'Una cuerda pulsada tiembla muy deprisa, como una goma elástica estirada.',
        'Ese temblor pasa a la madera de la caja, que vibra con ella y hace que el sonido se oiga fuerte. Por eso notas el cosquilleo en la mano.',
      ],
      ejemplo: { notas: [5] },
    },

    // FASE 3 · PRÁCTICA GUIADA (17 minutos)
    {
      id: 'postura', fase: 'guiada', titulo: 'La posición flamenca',
      texto: [
        'Ahora vamos a colocar la guitarra para tocar.',
        'Ponla de pie sobre tu pierna derecha. La parte más estrecha de la caja, la cintura, se apoya en tu muslo.',
        'El mástil apunta hacia tu izquierda, un poco hacia arriba.',
        'La parte de atrás de la caja toca tu tripa y tu pecho.',
        'Apoya el antebrazo derecho encima de la caja, en el borde de arriba.',
        'Si te resulta cómodo, cruza la pierna derecha sobre la izquierda. Es la posición de los guitarristas flamencos.',
        'Pulsa Continuar cuando la guitarra esté estable.',
      ],
      otraForma: [
        'Es como abrazar la guitarra.',
        'La caja descansa sobre tu muslo derecho. Tu brazo derecho la sujeta por encima.',
        'Y tu mano izquierda queda libre para coger el mástil, que apunta a tu izquierda.',
      ],
    },
    {
      id: 'orientacion', fase: 'guiada', tipo: 'pregunta', titulo: 'Comprobar la orientación',
      texto: [
        'Vamos a comprobar que la guitarra está bien colocada.',
        'Con la mano derecha, toca las cuerdas justo encima de la boca.',
        'La cuerda más cercana a tu cara debería ser la más gruesa.',
        '¿Es así?',
      ],
      otraForma: [
        'Toca la cuerda de arriba y después la de abajo.',
        'La gruesa es rugosa, como un muelle muy fino. La fina es lisa y suave.',
        'La rugosa tiene que quedar arriba, cerca de tu cara.',
      ],
      opciones: [
        { id: 'si', etiqueta: 'Sí, la más gruesa está arriba', resultado: 'bien',
          respuesta: ['Perfecto. La guitarra está bien colocada.'] },
        { id: 'no', etiqueta: 'No, la más gruesa está abajo', resultado: 'mal', repetir: true,
          respuesta: [
            'Seguramente la guitarra está al revés.',
            'Gírala para que el mástil apunte a tu izquierda y la parte de atrás toque tu tripa.',
            'Cuando la hayas girado, pulsa Intentarlo otra vez y volvemos a comprobarlo.',
          ] },
        { id: 'duda', etiqueta: 'No estoy seguro', resultado: 'duda', repetir: true,
          respuesta: [
            'Vamos a comprobarlo con el tacto.',
            'Toca la cuerda de arriba y después la de abajo.',
            'La gruesa es rugosa, como un muelle muy fino. La fina es lisa y suave.',
            'Pulsa Intentarlo otra vez cuando quieras.',
          ] },
      ],
    },
    {
      id: 'sexta', fase: 'guiada', titulo: 'La sexta cuerda',
      texto: [
        'La cuerda más gruesa, la que está más cerca de tu cara, se llama sexta cuerda.',
        'Tócala con la yema del dedo índice y fíjate en que es rugosa. Está envuelta en un hilo de metal.',
        'Es la cuerda que suena más grave, más profunda.',
        'Pulsa Escuchar ejemplo para oír cómo suena. Después, pulsa Continuar.',
      ],
      ejemplo: { notas: [6] },
    },
    {
      id: 'primer-sonido', fase: 'guiada', titulo: 'Tu primer sonido',
      texto: [
        'Ahora vas a tocarla tú.',
        'Coloca la mano derecha encima de la boca.',
        'Apoya la yema del pulgar sobre la sexta cuerda.',
        'Empuja la cuerda suavemente hacia abajo, hacia el suelo, y deja que el pulgar se escape.',
        '¡Ese es tu primer sonido!',
        'Hazlo tres veces más, despacio, escuchando cómo vibra.',
        'Pulsa Continuar cuando quieras.',
      ],
      otraForma: [
        'El pulgar empuja la cuerda como si quisieras pasar por encima de ella.',
        'Cuando la cuerda se te escapa del dedo, suena.',
        'No hace falta fuerza. Es un movimiento suave, de arriba abajo.',
      ],
      ejemplo: { notas: [6, 6, 6] },
    },
    {
      id: 'graves', fase: 'guiada', titulo: 'Las cuerdas graves',
      texto: [
        'Debajo de la sexta está la quinta cuerda. Y debajo de la quinta, la cuarta.',
        'Las tres son rugosas, de metal. Son las cuerdas graves.',
        'Toca con el pulgar la sexta, luego la quinta y luego la cuarta.',
        'Escucha cómo cada una suena un poco más aguda que la anterior.',
        'Pulsa Escuchar ejemplo si quieres oírlo primero.',
      ],
      ejemplo: { notas: [6, 5, 4] },
    },
    {
      id: 'agudas', fase: 'guiada', titulo: 'Las cuerdas agudas',
      texto: [
        'Las tres cuerdas siguientes son la tercera, la segunda y la primera.',
        'Son lisas, de nailon. Son las cuerdas agudas.',
        'La tercera es la lisa más gruesa. La primera, la más cercana a tus piernas, es la más fina de todas.',
        'Tócalas también con el pulgar, una a una, de la tercera a la primera.',
        'Pulsa Continuar cuando termines.',
      ],
      otraForma: [
        'Piensa en una escalera de sonidos.',
        'La sexta es el escalón más bajo, el más grave.',
        'Cada cuerda que bajas hacia tus piernas sube un escalón de sonido, hasta la primera, que es la más aguda.',
      ],
      ejemplo: { notas: [3, 2, 1] },
    },
    {
      id: 'escalera', fase: 'guiada', titulo: 'La escalera de las seis cuerdas',
      texto: [
        'Ahora vamos a tocar las seis seguidas, como si subieras una escalera.',
        'Con el pulgar, toca la sexta, la quinta, la cuarta, la tercera, la segunda y la primera.',
        'Despacio. Deja que cada cuerda suene antes de tocar la siguiente.',
        'Escucha el ejemplo primero, y luego hazlo tú dos o tres veces.',
      ],
      ejemplo: { notas: [6, 5, 4, 3, 2, 1] },
    },
    {
      id: 'oido', fase: 'guiada', tipo: 'juegoOido', titulo: 'Juego de oído',
      texto: [
        'Vamos a jugar un poco con el oído. Deja la guitarra quieta.',
        'Yo tocaré una cuerda y tú me dirás si es grave, de sonido profundo, o aguda, de sonido más fino.',
        'Haremos cuatro rondas.',
        'Pulsa Escuchar el sonido y después elige Grave o Aguda.',
      ],
      rondas: 4,
    },
    {
      id: 'flamenco', fase: 'guiada', titulo: 'Un momento flamenco',
      texto: [
        'Ahora escucha esto con atención.',
        'Son cuatro notas que bajan: la, sol, fa, mi.',
        'Se llama la bajada andaluza, y es el corazón de los tangos y de muchísimo flamenco.',
        'Dentro de pocas semanas la tocarás tú en tu guitarra.',
        'Pulsa Escuchar ejemplo. Puedes oírla todas las veces que quieras.',
      ],
      ejemplo: { notas: ['A2', 'G2', 'F2', 'E2'], intervalo: 0.9 },
    },
    {
      id: 'descanso', fase: 'guiada', titulo: 'Descanso',
      texto: [
        'Muy bien. Vamos a descansar un momento.',
        'Deja la guitarra apoyada en tus piernas y suelta las manos.',
        'Mueve un poco los dedos y los hombros.',
        'Cuando quieras seguir, pulsa Continuar.',
      ],
    },

    // FASE 4 · PRÁCTICA AUTÓNOMA (10 minutos)
    {
      id: 'autonoma-escalera', fase: 'autonoma', titulo: 'Practica tú solo: la escalera',
      texto: [
        'Ahora practica tú solo, sin prisa.',
        'Vuelve a colocar la guitarra en posición flamenca.',
        'Toca las seis cuerdas, de la sexta a la primera. Luego vuelve de la primera a la sexta.',
        'Mientras tocas, di el número de cada cuerda en voz alta.',
        'Hazlo tres o cuatro veces.',
        'Yo me quedo en silencio. Cuando termines, pulsa Continuar.',
      ],
      ejemplo: { notas: [6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6] },
    },
    {
      id: 'autonoma-cremallera', fase: 'autonoma', titulo: 'Practica tú solo: la cremallera',
      texto: [
        'Un ejercicio más, un poco más difícil.',
        'Vamos a tocar las cuerdas por parejas, de fuera hacia dentro, como si cerraras una cremallera.',
        'Sexta y primera. Quinta y segunda. Cuarta y tercera.',
        'Escucha el ejemplo y repítelo varias veces, despacio.',
        'Cuando termines, pulsa Continuar.',
      ],
      otraForma: [
        'Primero la cuerda de arriba del todo, la sexta, y luego la de abajo del todo, la primera.',
        'Después, la segunda empezando por arriba, que es la quinta, y la segunda empezando por abajo, que es la segunda.',
        'Y por último las dos del centro: la cuarta y la tercera.',
      ],
      ejemplo: { notas: [6, 1, 5, 2, 4, 3] },
    },

    // FASE 5 · EVALUACIÓN (5 minutos)
    {
      id: 'evaluacion', fase: 'evaluacion', titulo: 'Comprobamos lo aprendido',
      texto: [
        'Vamos a comprobar lo que has aprendido.',
        'No es un examen. Solo sirve para saber qué repasar.',
        'Te pediré cuatro cuerdas. Contesta con sinceridad si lo has conseguido.',
        'Pulsa Continuar.',
      ],
    },
    pasoCuerda('eval-6', 6, 'sexta', 'Es la más gruesa.'),
    pasoCuerda('eval-1', 1, 'primera', 'Es la más fina.'),
    pasoCuerda('eval-4', 4, 'cuarta', 'Es la última de las rugosas.'),
    pasoCuerda('eval-3', 3, 'tercera', 'Es la primera de las lisas.'),
    {
      id: 'eval-tacto', fase: 'evaluacion', tipo: 'pregunta', titulo: 'Última pregunta',
      texto: [
        'Última pregunta.',
        'Las cuerdas rugosas, las de metal, ¿son las graves o las agudas?',
      ],
      opciones: [
        { id: 'graves', etiqueta: 'Graves', resultado: 'bien',
          respuesta: ['Correcto. Las tres cuerdas de metal son las graves.'] },
        { id: 'agudas', etiqueta: 'Agudas', resultado: 'mal',
          respuesta: ['Casi. Las rugosas, de metal, son las graves, las de sonido profundo. Lo repasaremos en la próxima clase.'] },
      ],
    },
  ],

  // Decide qué se registra al terminar, a partir de las respuestas reales.
  // respuestas: { idPaso: { resultado, opcion } }, y para el juego { aciertos, total }.
  evaluar(respuestas) {
    const habilidades = [
      { id: 'partes', estado: 'presentado', fuente: 'clase' },
      { id: 'postura', estado: 'practicado', fuente: 'clase' },
      { id: 'pulgar', estado: 'practicado', fuente: 'clase' },
      { id: 'cuerdas', estado: 'practicado', fuente: 'clase' },
      { id: 'graveAguda', estado: 'practicado', fuente: 'clase' },
    ];
    const dificultades = [];
    const resueltas = [];
    const nombres = { 'eval-6': 'sexta', 'eval-1': 'primera', 'eval-4': 'cuarta', 'eval-3': 'tercera' };

    const fallos = Object.keys(nombres).filter((id) => respuestas[id]?.resultado !== 'bien');
    for (const id of Object.keys(nombres)) {
      const dif = `cuerda-${nombres[id]}`;
      if (fallos.includes(id)) {
        dificultades.push({ id: dif, habilidad: 'cuerdas', texto: `encontrar la ${nombres[id]} cuerda` });
      } else if (respuestas[id]) {
        resueltas.push(dif);
      }
    }
    if (fallos.length === 0) habilidades.push({ id: 'cuerdas', estado: 'comprendido', fuente: 'autoevaluacion' });

    const juego = respuestas.oido;
    const tacto = respuestas['eval-tacto']?.resultado;
    if (tacto && tacto !== 'bien') {
      dificultades.push({ id: 'rugosas-graves', habilidad: 'graveAguda', texto: 'recordar que las cuerdas rugosas son las graves' });
    } else if (tacto) {
      resueltas.push('rugosas-graves');
    }
    if (juego && juego.total > 0) {
      if (juego.aciertos >= juego.total - 1 && tacto === 'bien') {
        habilidades.push({ id: 'graveAguda', estado: 'comprendido', fuente: 'app' });
        resueltas.push('oido-grave-aguda');
      } else if (juego.aciertos < juego.total - 1) {
        dificultades.push({ id: 'oido-grave-aguda', habilidad: 'graveAguda', texto: 'distinguir de oído una cuerda grave de una aguda' });
      }
    }
    if (respuestas.orientacion && respuestas.orientacion.intentos > 1) {
      dificultades.push({ id: 'orientacion', habilidad: 'postura', texto: 'orientar la guitarra con la cuerda gruesa arriba' });
    } else if (respuestas.orientacion) {
      resueltas.push('orientacion');
    }

    const resumen = [
      'Muy bien. Hoy has aprendido las partes de tu guitarra, a colocarla en posición flamenca y a reconocer sus seis cuerdas.',
      'Y has tocado tus primeros sonidos.',
    ];
    if (juego && juego.total > 0) resumen.push(`En el juego de oído has acertado ${juego.aciertos} de ${juego.total}.`);
    if (dificultades.length) {
      resumen.push(`Todavía te cuesta un poco ${listaTexto(dificultades.map((d) => d.texto))}. En la próxima clase empezaremos repasándolo.`);
    } else {
      resumen.push('Según tus respuestas, has encontrado todas las cuerdas. En la próxima clase lo comprobaremos otra vez.');
    }
    resumen.push('En la próxima clase aprenderemos a reconocer las cuerdas por su número y por su sonido.');
    return { habilidades, dificultades, resueltas, resumen };
  },
};

export function listaTexto(items) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}`;
}
