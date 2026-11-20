import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as P from '../../js/progreso.js';
import { PROGRAMA, HABILIDADES, CONCEPTOS } from '../../js/contenido/catalogo.js';

const T = new Date('2026-11-21T10:00:00').getTime();
const DIA = 24 * 60 * 60000;
const NOTAS_VALIDAS = new Set([1, 2, 3, 4, 5, 6, 'E2', 'F2', 'G2', 'A2', 'B2', 'C3']);
const clases = PROGRAMA.filter((c) => c.contenido).map((c) => c.contenido);

// Respuestas simuladas: elige la opción con el resultado pedido (o la primera) y acierta los juegos.
function responderTodo(clase, { resultado = 'bien', juego = 1 } = {}) {
  const r = {};
  for (const paso of clase.pasos) {
    if (paso.tipo === 'pregunta') {
      const op = paso.opciones.find((o) => o.resultado === resultado && !o.volver && !o.repetir) || paso.opciones[0];
      r[paso.id] = { resultado: op.resultado, opcion: op.id, intentos: 1 };
    } else if (paso.tipo === 'juegoOido') {
      r[paso.id] = { aciertos: Math.round(paso.rondas * juego), total: paso.rondas };
    }
  }
  return r;
}

test('hay 10 clases disponibles, en orden y con ids que coinciden con el programa', () => {
  assert.equal(clases.length, 10);
  PROGRAMA.filter((c) => c.contenido).forEach((c, i) => {
    assert.equal(c.contenido.id, c.id);
    assert.equal(c.contenido.numero, i + 1);
    assert.equal(c.contenido.semana, c.semana);
  });
});

for (const clase of clases) {
  test(`estructura de la clase ${clase.numero}: ${clase.titulo}`, () => {
    const ids = new Set();
    for (const f of ['bienvenida', 'explicacion', 'guiada', 'evaluacion']) assert.ok(clase.pasos.some((p) => p.fase === f), `falta ${f}`);
    assert.ok(clase.pasos.length >= 12 && clase.pasos.length <= 30, `número de pasos: ${clase.pasos.length}`);
    for (const paso of clase.pasos) {
      assert.ok(!ids.has(paso.id), `id repetido ${paso.id}`); ids.add(paso.id);
      const texto = typeof paso.texto === 'function' ? paso.texto(P.estadoInicial()) : paso.texto;
      assert.ok(paso.titulo && texto.length, paso.id);
      for (const f of [...texto, ...(paso.otraForma || [])]) {
        assert.equal(typeof f, 'string', paso.id);
        assert.ok(f.length < 240, `frase larga en ${clase.id}/${paso.id}: ${f}`);
      }
      if (paso.ejemplo) {
        assert.ok(paso.ejemplo.notas || paso.ejemplo.palmas, `${paso.id}: ejemplo vacío`);
        for (const n of paso.ejemplo.notas || []) assert.ok(NOTAS_VALIDAS.has(n), `${paso.id}: nota ${n}`);
        if (paso.ejemplo.palmas) assert.ok(paso.ejemplo.palmas.bpm >= 40 && paso.ejemplo.palmas.bpm <= 80);
      }
      if (paso.tipo === 'pregunta') {
        assert.ok(paso.opciones.length >= 2, paso.id);
        for (const o of paso.opciones) {
          assert.ok(o.id && o.etiqueta && o.respuesta?.length && ['bien', 'duda', 'mal'].includes(o.resultado), `${paso.id}/${o.id}`);
        }
        const etiquetas = paso.opciones.map((o) => o.etiqueta);
        assert.equal(new Set(etiquetas).size, etiquetas.length, `${paso.id}: etiquetas repetidas`);
        // «Volver a intentarlo» siempre vuelve a un paso que tiene algo que tocar.
        for (const o of paso.opciones.filter((x) => x.volver)) {
          const i = clase.pasos.indexOf(paso);
          assert.ok(clase.pasos[i - o.volver]?.ejemplo, `${paso.id}: volver a un paso sin ejemplo`);
        }
      }
      if (paso.tipo === 'juegoOido') {
        assert.ok(paso.rondas >= 4);
        for (const c of paso.categorias || []) {
          assert.ok(c.id && c.etiqueta && c.frase && c.cuerdas.length);
          for (const n of c.cuerdas) assert.ok(NOTAS_VALIDAS.has(n));
        }
      }
    }
  });

  test(`clase ${clase.numero}: el registro solo usa habilidades conocidas y nunca inventa`, () => {
    for (const caso of [{}, responderTodo(clase), responderTodo(clase, { resultado: 'mal', juego: 0.3 }), responderTodo(clase, { resultado: 'duda', juego: 0.5 })]) {
      const r = clase.evaluar(caso);
      for (const h of r.habilidades) assert.ok(HABILIDADES[h.id], `habilidad desconocida ${h.id}`);
      for (const d of r.dificultades) assert.ok(HABILIDADES[d.habilidad] && d.texto && d.id, JSON.stringify(d));
      assert.ok(r.resumen.length >= 2);
      // Sin respuestas, nada pasa de practicado.
      if (caso === null || Object.keys(caso).length === 0) {
        assert.ok(r.habilidades.every((h) => ['presentado', 'practicado'].includes(h.estado)), `${clase.id} sin respuestas: ${JSON.stringify(r.habilidades)}`);
      }
      // Solo una evaluación semanal puede dominar algo.
      if (!clase.evaluacionSemanal) assert.ok(r.habilidades.every((h) => h.estado !== 'dominado'), clase.id);
      for (const h of r.habilidades.filter((x) => x.estado === 'dominado')) assert.equal(h.fuente, 'evaluacion-semanal');
    }
  });
}

test('las evaluaciones semanales: superadas avanzan, no superadas se repiten', () => {
  for (const clase of clases.filter((c) => c.evaluacionSemanal)) {
    const ok = clase.evaluar(responderTodo(clase));
    assert.equal(ok.repetir, false, `${clase.id} debería superarse`);
    assert.equal(ok.evaluacion.superada, true);
    assert.ok(ok.habilidades.some((h) => h.estado === 'dominado'));
    const mal = clase.evaluar(responderTodo(clase, { resultado: 'mal', juego: 0.3 }));
    assert.equal(mal.repetir, true, `${clase.id} no debería superarse`);
    assert.equal(mal.evaluacion.superada, false);
    assert.ok(mal.habilidades.every((h) => h.estado !== 'dominado'));
    assert.match(mal.resumen.join(' '), /repetiremos/);
  }
});

test('clase 3: el criterio es 11 de 12 exactamente', async () => {
  const { clase3 } = await import('../../js/contenido/clase3.js');
  const r = responderTodo(clase3);
  r['r1-4'] = { resultado: 'duda' };
  assert.equal(clase3.evaluar(r).evaluacion.superada, true);
  r['r2-2'] = { resultado: 'mal' };
  const res = clase3.evaluar(r);
  assert.equal(res.evaluacion.superada, false);
  assert.deepEqual(res.dificultades.map((d) => d.id).sort(), ['cuerda-cuarta', 'cuerda-segunda']);
});

test('clase 6: una parada supera, dos no', async () => {
  const { clase6 } = await import('../../js/contenido/clase6.js');
  const base = responderTodo(clase6);
  assert.equal(clase6.evaluar({ ...base, 'eval-secuencia': { resultado: 'bien', opcion: 'una' } }).evaluacion.superada, true);
  assert.equal(clase6.evaluar({ ...base, 'eval-secuencia': { resultado: 'mal', opcion: 'varias' } }).evaluacion.superada, false);
});

test('clase 9: el criterio es 8 de 10 notas limpias', async () => {
  const { clase9 } = await import('../../js/contenido/clase9.js');
  const r = responderTodo(clase9);
  r['dictado-1'] = { resultado: 'duda' }; r['dictado-3'] = { resultado: 'duda' };
  assert.equal(clase9.evaluar(r).evaluacion.superada, true);
  r['dictado-5'] = { resultado: 'duda' };
  assert.equal(clase9.evaluar(r).evaluacion.superada, false);
});

test('recorrido completo: de la clase 1 a la 10, con una semana repetida', () => {
  const p = P.estadoInicial();
  let t = T;
  let repetida = false;
  let vueltas = 0;
  while (vueltas++ < 20) {
    const c = PROGRAMA.find((x) => x.id === p.claseActual);
    if (!c?.contenido) break;
    P.iniciarClase(p, c.id, t);
    // La primera vez que se llega a la evaluación de la semana 2, sale mal.
    const malo = c.id === 's2c3' && !repetida;
    if (malo) repetida = true;
    p.enCurso.respuestas = responderTodo(c.contenido, malo ? { resultado: 'mal', juego: 0.3 } : {});
    P.terminarClase(p, c.contenido, t + 40 * 60000);
    t += 2 * DIA;
  }
  assert.equal(p.claseActual, 's4c2');
  assert.equal(p.sesiones.length, 11, 'diez clases y una repetida');
  assert.equal(p.sesiones.filter((s) => s.claseId === 's2c3').length, 2);
  assert.deepEqual(p.evaluaciones.map((e) => [e.claseId, e.superada]), [['s1c3', true], ['s2c3', false], ['s2c3', true], ['s3c3', true]]);
  for (const id of ['cuerdas', 'secuenciaPulso', 'notasSexta', 'trastes']) assert.equal(p.habilidades[id].estado, 'dominado', id);
  assert.equal(p.habilidades.bajada.estado, 'comprendido');
  assert.ok(p.dificultades.filter((d) => !d.resuelta).length === 0, JSON.stringify(p.dificultades.filter((d) => !d.resuelta)));
  const resumen = P.resumenProgreso(p, t).join(' ');
  assert.match(resumen, /Dominas/);
  assert.match(resumen, /la bajada andaluza/);
});

test('cada concepto para repasar apunta a una habilidad conocida', () => {
  for (const c of CONCEPTOS) assert.ok(HABILIDADES[c.habilidad], c.id);
});
