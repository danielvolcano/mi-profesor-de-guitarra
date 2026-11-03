import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as P from '../../js/progreso.js';
import { clase1 } from '../../js/contenido/clase1.js';
import { PROGRAMA } from '../../js/contenido/catalogo.js';

const MARTES = new Date('2026-11-03T10:00:00').getTime();
const MIN = 60000;

function almacen() {
  const m = new Map();
  return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v) };
}

test('estado inicial: clase 1 y sin sesiones', () => {
  const p = P.estadoInicial();
  assert.equal(p.claseActual, 's1c1');
  assert.equal(p.sesiones.length, 0);
  assert.deepEqual(P.resumenProgreso(p, MARTES), ['Todavía no has hecho ninguna clase.', 'Cuando quieras, pulsa Empezar mi clase de hoy.']);
});

test('guardar y cargar conserva los datos; datos corruptos no rompen la app', () => {
  const a = almacen();
  const p = P.estadoInicial();
  p.config.voz = 'voiceover';
  P.guardar(p, a);
  assert.equal(P.cargar(a).config.voz, 'voiceover');
  a.setItem(P.CLAVE, '{roto');
  assert.equal(P.cargar(a).claseActual, 's1c1');
});

test('nunca se marca dominado desde una clase o una autoevaluación', () => {
  const p = P.estadoInicial();
  assert.throws(() => P.subirHabilidad(p, 'cuerdas', 'dominado', 'autoevaluacion', MARTES));
  assert.throws(() => P.subirHabilidad(p, 'cuerdas', 'dominado', 'clase', MARTES));
  P.subirHabilidad(p, 'cuerdas', 'dominado', 'familiar', MARTES);
  assert.equal(p.habilidades.cuerdas.estado, 'dominado');
});

test('los estados solo suben, nunca bajan', () => {
  const p = P.estadoInicial();
  P.subirHabilidad(p, 'cuerdas', 'comprendido', 'autoevaluacion', MARTES);
  P.subirHabilidad(p, 'cuerdas', 'practicado', 'clase', MARTES);
  assert.equal(p.habilidades.cuerdas.estado, 'comprendido');
  assert.equal(p.habilidades.cuerdas.historial.length, 2);
});

test('pausar y retomar: se conserva el paso y se cuenta el tiempo sin los huecos largos', () => {
  const p = P.estadoInicial();
  P.iniciarClase(p, 's1c1', MARTES);
  P.irAPaso(p, 1, MARTES + 2 * MIN);
  P.irAPaso(p, 2, MARTES + 60 * MIN); // 58 minutos sin tocar nada: cuentan 5 como máximo
  P.pausarClase(p, MARTES + 61 * MIN);
  assert.equal(p.sesiones[0].minutos, 8);
  assert.equal(p.sesiones[0].completada, false);
  const enCurso = P.iniciarClase(p, 's1c1', MARTES + 24 * 60 * MIN);
  assert.equal(enCurso.paso, 2);
});

function respuestasPerfectas() {
  return {
    orientacion: { resultado: 'bien', intentos: 1 },
    oido: { aciertos: 4, total: 4, intentos: 1 },
    'eval-6': { resultado: 'bien' }, 'eval-1': { resultado: 'bien' },
    'eval-4': { resultado: 'bien' }, 'eval-3': { resultado: 'bien' },
    'eval-tacto': { resultado: 'bien' },
  };
}

test('clase 1 perfecta: comprendido, nunca dominado, y pasa a la clase 2', () => {
  const p = P.estadoInicial();
  P.iniciarClase(p, 's1c1', MARTES);
  p.enCurso.respuestas = respuestasPerfectas();
  const r = P.terminarClase(p, clase1, MARTES + 40 * MIN);
  assert.equal(p.claseActual, 's1c2');
  assert.equal(p.enCurso, null);
  assert.equal(p.habilidades.cuerdas.estado, 'comprendido');
  assert.equal(p.habilidades.graveAguda.estado, 'comprendido');
  assert.equal(p.habilidades.partes.estado, 'presentado');
  assert.ok(Object.values(p.habilidades).every((h) => h.estado !== 'dominado'));
  assert.equal(p.dificultades.length, 0);
  assert.equal(r.dificultades.length, 0);
});

test('clase 1 con dudas: se anotan las dificultades reales y el resumen las menciona', () => {
  const p = P.estadoInicial();
  P.iniciarClase(p, 's1c1', MARTES);
  p.enCurso.respuestas = { ...respuestasPerfectas(), 'eval-3': { resultado: 'duda' }, oido: { aciertos: 1, total: 4 } };
  const r = P.terminarClase(p, clase1, MARTES + 40 * MIN);
  assert.equal(p.habilidades.cuerdas.estado, 'practicado');
  const ids = p.dificultades.map((d) => d.id).sort();
  assert.deepEqual(ids, ['cuerda-tercera', 'oido-grave-aguda']);
  assert.match(r.resumen.join(' '), /tercera cuerda/);
  const resumen = P.resumenProgreso(p, MARTES + 41 * MIN).join(' ');
  assert.match(resumen, /Esta semana has practicado un día/);
  assert.match(resumen, /Todavía necesitas practicar encontrar la tercera cuerda/);
  assert.match(resumen, /Tu próxima clase es la 2/);
});

test('una dificultad repetida se acumula y se resuelve cuando sale bien', () => {
  const p = P.estadoInicial();
  for (const res of ['mal', 'mal', 'bien']) {
    P.iniciarClase(p, 's1c1', MARTES);
    p.enCurso.respuestas = { ...respuestasPerfectas(), 'eval-6': { resultado: res } };
    P.terminarClase(p, clase1, MARTES + MIN);
  }
  const d = p.dificultades.filter((x) => x.id === 'cuerda-sexta');
  assert.equal(d.length, 1);
  assert.equal(d[0].veces, 2);
  assert.equal(d[0].resuelta, true);
});

test('el próximo día de práctica respeta martes, jueves y sábado', () => {
  const p = P.estadoInicial();
  assert.equal(P.proximoDiaPractica(p, MARTES), 'el jueves');
  const sabado = new Date('2026-11-07T10:00:00').getTime();
  assert.equal(P.proximoDiaPractica(p, sabado), 'el martes');
  const miercoles = new Date('2026-11-04T10:00:00').getTime();
  assert.equal(P.proximoDiaPractica(p, miercoles), 'mañana');
});

test('contenido de la clase 1: estructura válida', () => {
  const ids = new Set();
  let preguntas = 0;
  for (const paso of clase1.pasos) {
    assert.ok(paso.id && !ids.has(paso.id), `id duplicado o vacío: ${paso.id}`);
    ids.add(paso.id);
    assert.ok(['bienvenida', 'explicacion', 'guiada', 'autonoma', 'evaluacion'].includes(paso.fase), paso.id);
    assert.ok(paso.titulo && paso.texto.length > 0, paso.id);
    for (const frase of paso.texto) assert.ok(frase.length < 220, `frase demasiado larga en ${paso.id}`);
    if (paso.tipo === 'pregunta') {
      preguntas++;
      assert.ok(paso.opciones.length >= 2);
      for (const o of paso.opciones) assert.ok(o.respuesta.length && ['bien', 'duda', 'mal'].includes(o.resultado));
    }
    if (paso.ejemplo) for (const n of paso.ejemplo.notas) assert.ok([1, 2, 3, 4, 5, 6, 'A2', 'G2', 'F2', 'E2'].includes(n));
  }
  assert.ok(preguntas >= 5);
  for (const f of ['bienvenida', 'explicacion', 'guiada', 'autonoma', 'evaluacion']) {
    assert.ok(clase1.pasos.some((p) => p.fase === f), `falta la fase ${f}`);
  }
  assert.equal(PROGRAMA[0].contenido, clase1);
});
