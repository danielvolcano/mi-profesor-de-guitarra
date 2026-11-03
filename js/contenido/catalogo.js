// Catálogo del programa: clases, habilidades y conceptos para repasar.
import { clase1 } from './clase1.js';

// Orden del programa. Las clases sin «contenido» aún no están disponibles.
export const PROGRAMA = [
  { id: 's1c1', semana: 1, numero: 1, titulo: 'Conocer tu guitarra', contenido: clase1 },
  { id: 's1c2', semana: 1, numero: 2, titulo: 'Las cuerdas por su número y por su sonido' },
  { id: 's1c3', semana: 1, numero: 3, titulo: 'Repaso y evaluación de la semana 1' },
  { id: 's2c1', semana: 2, numero: 4, titulo: 'El pulgar flamenco' },
  { id: 's2c2', semana: 2, numero: 5, titulo: 'Índice y medio' },
  { id: 's2c3', semana: 2, numero: 6, titulo: 'Coordinación, pulso y evaluación de la semana 2' },
  { id: 's3c1', semana: 3, numero: 7, titulo: 'Qué es un traste' },
  { id: 's3c2', semana: 3, numero: 8, titulo: 'Notas limpias' },
  { id: 's3c3', semana: 3, numero: 9, titulo: 'Dictado de notas y evaluación de la semana 3' },
  { id: 's4c1', semana: 4, numero: 10, titulo: 'La bajada andaluza' },
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
];
