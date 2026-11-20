// Piezas comunes a las clases: saludo con memoria, peticiones de cuerdas y notas, colocación.
import { listaTexto } from './clase1.js';

export { listaTexto };

export const NOMBRES = { 6: 'sexta', 5: 'quinta', 4: 'cuarta', 3: 'tercera', 2: 'segunda', 1: 'primera' };
export const PISTAS = {
  6: 'Es la más gruesa, arriba del todo.',
  5: 'Es la segunda empezando por arriba.',
  4: 'Es la última de las rugosas.',
  3: 'Es la primera de las lisas.',
  2: 'Es la segunda empezando por abajo.',
  1: 'Es la más fina, abajo del todo.',
};

// Notas que se tocan en estas semanas: dónde están y con qué dedo.
export const NOTAS = {
  mi: { nota: 'E2', donde: 'la sexta cuerda al aire, sin pisar', cuerda: 6, traste: 0, dedo: null },
  fa: { nota: 'F2', donde: 'la sexta cuerda, traste uno, con el dedo uno, el índice', cuerda: 6, traste: 1, dedo: 1 },
  sol: { nota: 'G2', donde: 'la sexta cuerda, traste tres, con el dedo tres, el anular', cuerda: 6, traste: 3, dedo: 3 },
  la: { nota: 'A2', donde: 'la quinta cuerda al aire, sin pisar', cuerda: 5, traste: 0, dedo: null },
};

export function pendientes(p) {
  return (p?.dificultades || []).filter((d) => !d.resuelta).map((d) => d.texto);
}

// Saludo que solo menciona lo registrado.
export function saludo({ recuerdo, hoy }) {
  return (p) => {
    const frases = ['Buenos días. Me alegro de volver a tocar contigo.', recuerdo];
    const pend = pendientes(p);
    if (pend.length) frases.push(`Tengo apuntado que todavía te cuesta un poco ${listaTexto(pend.slice(0, 2))}. Lo tendremos en cuenta hoy.`);
    frases.push(hoy, 'Cuando estés preparado, pulsa Continuar.');
    return frases;
  };
}

export const colocarse = (id = 'postura') => ({
  id, fase: 'bienvenida', titulo: 'Colócate',
  texto: [
    'Siéntate y coloca la guitarra en posición flamenca.',
    'De pie sobre tu pierna derecha, el mástil hacia tu izquierda y el antebrazo derecho sobre el borde de la caja.',
    'Comprueba con la mano que la cuerda más gruesa queda arriba, cerca de tu cara.',
    'Pulsa Continuar cuando estés colocado.',
  ],
  otraForma: [
    'Es como abrazar la guitarra.',
    'La caja descansa sobre tu muslo derecho y el mástil apunta a tu izquierda.',
    'Si la cuerda gruesa queda abajo, la guitarra está al revés: gírala.',
  ],
});

export const descanso = (id = 'descanso') => ({
  id, fase: 'guiada', titulo: 'Descanso',
  texto: [
    'Muy bien. Descansamos un momento.',
    'Suelta las manos, abre y cierra los dedos, y mueve los hombros.',
    'Cuando quieras seguir, pulsa Continuar.',
  ],
});

export const SI_DUDA_NO = [
  { id: 'si', etiqueta: 'Sí, a la primera', resultado: 'bien', respuesta: ['Muy bien.'] },
  { id: 'duda', etiqueta: 'Me ha costado', resultado: 'duda',
    respuesta: ['Bien, la has encontrado. Con un poco más de práctica saldrá sola.'] },
  { id: 'no', etiqueta: 'No la he encontrado', resultado: 'mal',
    respuesta: ['No pasa nada. Lo anoto y lo repasaremos.', 'Recuerda: busca la sexta, la más gruesa, y cuenta hacia abajo.'] },
];

export function pedirCuerda(id, n, fase, { pista = true } = {}) {
  return {
    id, fase, tipo: 'pregunta', titulo: `Toca la ${NOMBRES[n]}`,
    texto: [`Toca la ${NOMBRES[n]} cuerda.`, ...(pista ? [PISTAS[n]] : []), '¿La has encontrado a la primera?'],
    otraForma: [
      'Busca primero la sexta, la más gruesa y rugosa, arriba del todo.',
      `Desde ahí, baja contando con el dedo hasta llegar a la ${NOMBRES[n]}.`,
    ],
    ejemplo: { notas: [n] },
    cuerda: n,
    opciones: SI_DUDA_NO,
  };
}

export const LIMPIA = [
  { id: 'limpia', etiqueta: 'Ha sonado limpia', resultado: 'bien', respuesta: ['Muy bien. Así es como tiene que sonar.'] },
  { id: 'zumba', etiqueta: 'Zumbaba o sonaba apagada', resultado: 'duda',
    respuesta: [
      'Es lo más normal al principio.',
      'Acerca la yema un poco más a la barrita de metal, sin ponerte encima, y aprieta un poco más.',
    ] },
  { id: 'no', etiqueta: 'No he encontrado el traste', resultado: 'mal',
    respuesta: ['No pasa nada. Pon la yema en la cejuela y cuenta las barritas de metal hacia la caja.'] },
];

export function pedirNota(id, nombre, fase, { titulo = null, pista = true } = {}) {
  const n = NOTAS[nombre];
  const pisada = n.traste > 0;
  return {
    id, fase, tipo: 'pregunta', titulo: titulo || `Toca ${nombre}`,
    texto: [
      `Toca ${nombre}.`,
      ...(pista ? [`Es ${n.donde}.`] : []),
      pisada ? '¿Cómo ha sonado?' : '¿La has tocado?',
    ],
    otraForma: pisada
      ? [`${nombre[0].toUpperCase()}${nombre.slice(1)} está en ${n.donde}.`, 'Cuenta los trastes desde la cejuela: la primera barrita de metal cierra el traste uno.']
      : [`${nombre[0].toUpperCase()}${nombre.slice(1)} es ${n.donde}.`],
    ejemplo: { notas: [n.nota] },
    nota: nombre,
    opciones: pisada ? LIMPIA : [
      { id: 'si', etiqueta: 'Sí', resultado: 'bien', respuesta: ['Muy bien.'] },
      { id: 'no', etiqueta: 'No estoy seguro', resultado: 'duda', respuesta: [`Recuerda: ${nombre} es ${n.donde}.`] },
    ],
  };
}

// Cuenta cuántas respuestas de una lista salieron «bien».
export function contarBien(respuestas, ids) {
  return ids.filter((id) => respuestas[id]?.resultado === 'bien').length;
}
