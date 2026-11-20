// Catálogo del programa: clases, habilidades y conceptos para repasar.
import { clase1 } from './clase1.js';
import { clase2 } from './clase2.js';
import { clase3 } from './clase3.js';
import { clase4 } from './clase4.js';
import { clase5 } from './clase5.js';
import { clase6 } from './clase6.js';
import { clase7 } from './clase7.js';
import { clase8 } from './clase8.js';
import { clase9 } from './clase9.js';
import { clase10 } from './clase10.js';

// Orden del programa. Las clases sin «contenido» aún no están disponibles.
export const PROGRAMA = [
  { id: 's1c1', semana: 1, numero: 1, titulo: 'Conocer tu guitarra', contenido: clase1 },
  { id: 's1c2', semana: 1, numero: 2, titulo: 'Las cuerdas por su número y por su sonido', contenido: clase2 },
  { id: 's1c3', semana: 1, numero: 3, titulo: 'Repaso y evaluación de la semana 1', contenido: clase3 },
  { id: 's2c1', semana: 2, numero: 4, titulo: 'El pulgar flamenco', contenido: clase4 },
  { id: 's2c2', semana: 2, numero: 5, titulo: 'Índice y medio', contenido: clase5 },
  { id: 's2c3', semana: 2, numero: 6, titulo: 'Coordinación, pulso y evaluación de la semana 2', contenido: clase6 },
  { id: 's3c1', semana: 3, numero: 7, titulo: 'Qué es un traste', contenido: clase7 },
  { id: 's3c2', semana: 3, numero: 8, titulo: 'Notas limpias', contenido: clase8 },
  { id: 's3c3', semana: 3, numero: 9, titulo: 'Dictado de notas y evaluación de la semana 3', contenido: clase9 },
  { id: 's4c1', semana: 4, numero: 10, titulo: 'La bajada andaluza', contenido: clase10 },
  { id: 's4c2', semana: 4, numero: 11, titulo: 'Con compás de tangos' },
  { id: 's4c3', semana: 4, numero: 12, titulo: 'Mi primera falseta y evaluación de la semana 4' },
];

export function buscarClase(id) {
  return PROGRAMA.find((c) => c.id === id) || null;
}

export function siguienteClase(id) {
  const i = PROGRAMA.findIndex((c) => c.id === id);
  return i >= 0 && i < PROGRAMA.length - 1 ? PROGRAMA[i + 1] : null;
}

export const HABILIDADES = {
  partes: 'las partes de la guitarra',
  postura: 'la posición flamenca',
  pulgar: 'pulsar con el pulgar',
  cuerdas: 'localizar las seis cuerdas',
  graveAguda: 'distinguir cuerdas graves y agudas',
  manoDerecha: 'colocar la mano derecha',
  pulgarApoyado: 'tocar con el pulgar apoyado',
  oidoGraves: 'distinguir de oído la sexta, la quinta y la cuarta',
  indiceMedio: 'alternar índice y medio',
  oidoAgudas: 'distinguir de oído la primera y la segunda',
  pulso: 'llevar el pulso con palmas',
  secuenciaPulso: 'tocar una secuencia de cuerdas al pulso',
  trastes: 'localizar los trastes',
  manoIzquierda: 'colocar la mano izquierda',
  notasSexta: 'tocar mi, fa y sol limpias en la sexta cuerda',
  oidoNotas: 'reconocer notas de oído',
  bajada: 'tocar la bajada andaluza',
};

// Conceptos que se pueden repasar cuando su habilidad ya se ha presentado.
export const CONCEPTOS = [
  {
    id: 'partes', habilidad: 'partes', titulo: 'Las partes de la guitarra',
    texto: [
      'La caja es la parte grande y hueca. En su centro está la boca, el agujero redondo.',
      'De la caja sale el mástil, el brazo largo de madera.',
      'Al final del mástil está el clavijero, con las llaves que sirven para afinar.',
      'Las seis cuerdas van desde el clavijero hasta el puente, el taco de madera de la caja donde están atadas.',
    ],
  },
  {
    id: 'postura', habilidad: 'postura', titulo: 'La posición flamenca',
    texto: [
      'La guitarra va de pie sobre tu pierna derecha, con la cintura de la caja apoyada en el muslo.',
      'El mástil apunta a tu izquierda, un poco hacia arriba.',
      'El antebrazo derecho descansa sobre el borde de arriba de la caja.',
      'Si te resulta cómodo, cruza la pierna derecha sobre la izquierda.',
      'Para comprobarlo: la cuerda más gruesa tiene que quedar arriba, cerca de tu cara.',
    ],
  },
  {
    id: 'cuerdas', habilidad: 'cuerdas', titulo: 'Las seis cuerdas',
    texto: [
      'La sexta es la más gruesa y está arriba, cerca de tu cara.',
      'Hacia tus piernas vienen la quinta, la cuarta, la tercera, la segunda y la primera.',
      'La primera es la más fina y está abajo, cerca de tus piernas.',
    ],
    ejemplo: { notas: [6, 5, 4, 3, 2, 1] },
  },
  {
    id: 'contar', habilidad: 'cuerdas', titulo: 'Encontrar cualquier cuerda',
    texto: [
      'Pon la yema del índice sobre la sexta, la más gruesa, arriba del todo.',
      'Baja despacio, cuerda a cuerda, contando: sexta, quinta, cuarta, tercera, segunda, primera.',
      'Así llegas siempre a la cuerda que buscas.',
    ],
  },
  {
    id: 'graveAguda', habilidad: 'graveAguda', titulo: 'Cuerdas graves y agudas',
    texto: [
      'La sexta, la quinta y la cuarta son rugosas, de metal. Son las graves, de sonido profundo.',
      'La tercera, la segunda y la primera son lisas, de nailon. Son las agudas, de sonido más fino.',
    ],
    ejemplo: { notas: [6, 1] },
  },
  {
    id: 'pulgar', habilidad: 'pulgar', titulo: 'Pulsar con el pulgar',
    texto: [
      'La mano derecha se coloca encima de la boca.',
      'Apoya la yema del pulgar sobre la cuerda y empújala suavemente hacia el suelo, dejando que el pulgar se escape.',
      'No hace falta fuerza. Es un movimiento suave, de arriba abajo.',
    ],
    ejemplo: { notas: [6, 6] },
  },
  {
    id: 'pulgarApoyado', habilidad: 'pulgarApoyado', titulo: 'El pulgar apoyado',
    texto: [
      'El pulgar empuja la cuerda hacia el suelo, la atraviesa y se queda descansando en la cuerda siguiente.',
      'Por ejemplo: tocas la sexta y el pulgar se para encima de la quinta.',
      'Así suena más fuerte y redondo. Es el pulgar flamenco.',
    ],
    ejemplo: { notas: [6, 6, 5, 5, 4, 4], intervalo: 0.9 },
  },
  {
    id: 'indiceMedio', habilidad: 'indiceMedio', titulo: 'Índice y medio',
    texto: [
      'El índice y el medio tocan las cuerdas agudas, apoyando en la cuerda de al lado, hacia tu cara.',
      'Se alternan como dos piernas que caminan: índice, medio, índice, medio. Nunca dos veces seguidas el mismo dedo.',
    ],
    ejemplo: { notas: [1, 1, 1, 1, 2, 2, 2, 2], intervalo: 0.8 },
  },
  {
    id: 'pulso', habilidad: 'pulso', titulo: 'El pulso con palmas',
    texto: [
      'El pulso es un latido regular que no se para.',
      'Se cuenta de cuatro en cuatro: uno, dos, tres, cuatro. La palma fuerte es el uno.',
      'Marcarlo con la punta del pie ayuda a llevarlo dentro.',
    ],
    ejemplo: { palmas: { bpm: 60, tiempos: 16, cuentaPrevia: 16 } },
  },
  {
    id: 'trastes', habilidad: 'trastes', titulo: 'La cejuela y los trastes',
    texto: [
      'La cejuela es la pieza dura donde se apoyan las cuerdas, justo antes del clavijero.',
      'Desde ahí, las barritas de metal dividen el mástil en trastes. El hueco entre la cejuela y la primera barrita es el traste uno.',
      'Se cuentan pasando la yema por el borde de arriba del mástil.',
    ],
  },
  {
    id: 'notasLimpias', habilidad: 'notasSexta', titulo: 'Notas limpias: mi, fa y sol',
    texto: [
      'Mi es la sexta al aire. Fa, la sexta en el traste uno con el dedo uno. Sol, la sexta en el traste tres con el dedo tres.',
      'Para que suenen limpias: pisa con la yema, justo detrás de la barrita, y aprieta lo justo.',
    ],
    ejemplo: { notas: ['E2', 'F2', 'G2'], intervalo: 1.2 },
  },
  {
    id: 'bajada', habilidad: 'bajada', titulo: 'La bajada andaluza',
    texto: [
      'La, sol, fa, mi.',
      'La es la quinta al aire. Sol, la sexta en el traste tres. Fa, la sexta en el traste uno. Mi, la sexta al aire.',
      'Truco: pon a la vez los dedos uno y tres en la sexta, y ve quitándolos.',
    ],
    ejemplo: { notas: ['A2', 'G2', 'F2', 'E2'], intervalo: 1.0 },
  },
];
