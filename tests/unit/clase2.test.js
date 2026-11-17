import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as P from '../../js/progreso.js';
import { clase1 } from '../../js/contenido/clase1.js';
import { clase2 } from '../../js/contenido/clase2.js';
import { PROGRAMA } from '../../js/contenido/catalogo.js';

const T = new Date('2026-11-17T10:00:00').getTime();
const MIN = 60000;

function todoBien() {
  const r = { orientacion: { resultado: 'bien', intentos: 1 },
    'oido-extremos': { aciertos: 6, total: 6 }, 'oido-grave-aguda': { aciertos: 5, total: 6 } };
  for (const id of ['guiada-6', 'guiada-1', 'eval-5', 'eval-2', 'eval-3', 'eval-4']) r[id] = { resultado: 'bien' };
  return r;
}

test('la clase 2 está enlazada tras la clase 1', () => {
  assert.equal(PROGRAMA[1].contenido, clase2);
});

test('estructura válida de la clase 2', () => {
  const ids = new Set();
  for (const paso of clase2.pasos) {
    assert.ok(!ids.has(paso.id), paso.id); ids.add(paso.id);
    const texto = typeof paso.texto === 'function' ? paso.texto(P.estadoInicial()) : paso.texto;
    assert.ok(paso.titulo && texto.length, paso.id);
    for (const f of texto) assert.ok(f.length < 220, `frase larga en ${paso.id}`);
    if (paso.tipo === 'juegoOido' && paso.categorias) {
      for (const c of paso.categorias) assert.ok(c.id && c.etiqueta && c.cuerdas.length && c.frase);
    }
  }
  for (const f of ['bienvenida', 'explicacion', 'guiada', 'autonoma', 'evaluacion']) assert.ok(clase2.pasos.some((p) => p.fase === f), f);
});

test('el saludo menciona solo las dificultades registradas', () => {
  const p = P.estadoInicial();
  const saludo = (q) => clase2.pasos[0].texto(q).join(' ');
  assert.doesNotMatch(saludo(p), /te costó/);
  P.iniciarClase(p, 's1c1', T);
  p.enCurso.respuestas = { 'eval-6': { resultado: 'bien' }, 'eval-1': { resultado: 'bien' }, 'eval-4': { resultado: 'bien' }, 'eval-3': { resultado: 'duda' }, 'eval-tacto': { resultado: 'bien' } };
  P.terminarClase(p, clase1, T);
  assert.match(saludo(p), /te costó un poco encontrar la tercera cuerda/);
});

test('clase 2 bien: resuelve la dificultad de la clase 1, comprendido, nunca dominado, y pasa a la clase 3', () => {
  const p = P.estadoInicial();
  P.iniciarClase(p, 's1c1', T);
  p.enCurso.respuestas = { 'eval-3': { resultado: 'mal' } };
  P.terminarClase(p, clase1, T);
  assert.ok(p.dificultades.some((d) => d.id === 'cuerda-tercera' && !d.resuelta));
  P.iniciarClase(p, 's1c2', T + 2 * 24 * 60 * MIN);
  p.enCurso.respuestas = todoBien();
  const r = P.terminarClase(p, clase2, T + 2 * 24 * 60 * MIN + 40 * MIN);
  assert.equal(p.claseActual, 's1c3');
  assert.equal(p.habilidades.cuerdas.estado, 'comprendido');
  assert.equal(p.habilidades.graveAguda.estado, 'comprendido');
  assert.ok(Object.values(p.habilidades).every((h) => h.estado !== 'dominado'));
  assert.ok(p.dificultades.filter((d) => !d.resuelta).length === 0, JSON.stringify(p.dificultades));
  assert.match(r.resumen.join(' '), /4 de 4 cuerdas/);
  assert.match(r.resumen.join(' '), /6 de 6 en sexta o primera y 5 de 6 en grave o aguda/);
});

test('clase 2 con fallos: anota solo lo que falló', () => {
  const p = P.estadoInicial();
  P.iniciarClase(p, 's1c2', T);
  p.enCurso.respuestas = { ...todoBien(), 'eval-2': { resultado: 'duda' }, 'oido-extremos': { aciertos: 3, total: 6 } };
  const r = P.terminarClase(p, clase2, T + 30 * MIN);
  assert.deepEqual(p.dificultades.map((d) => d.id).sort(), ['cuerda-segunda', 'oido-sexta-primera']);
  assert.equal(p.habilidades.cuerdas.estado, 'practicado');
  assert.match(r.resumen.join(' '), /3 de 4 cuerdas/);
});
