// Registro del progreso. Lógica pura (sin interfaz), probada con pruebas automáticas.
// Regla de oro: nunca afirmar más de lo que se ha registrado.

import { PROGRAMA, HABILIDADES, buscarClase, siguienteClase } from './contenido/catalogo.js';
import { listaTexto } from './contenido/clase1.js';

export const CLAVE = 'mi-profesor-de-guitarra.progreso.v1';
export const ESTADOS = ['presentado', 'practicado', 'comprendido', 'dominado'];
// Solo una evaluación semanal o la comprobación de un familiar pueden marcar algo como dominado.
const FUENTES_DOMINIO = ['evaluacion-semanal', 'familiar'];
const MAX_HUECO_MS = 5 * 60 * 1000; // más de 5 minutos sin tocar nada no cuenta como práctica
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

export function estadoInicial() {
  return {
    version: 1,
    config: { voz: null, velocidad: 'normal', volumen: 0.9, diasPractica: [2, 4, 6] },
    claseActual: PROGRAMA[0].id,
    enCurso: null,
    sesiones: [],
    habilidades: {},
    dificultades: [],
  };
}

export function cargar(almacen = globalThis.localStorage) {
  try {
    const texto = almacen.getItem(CLAVE);
    if (!texto) return estadoInicial();
    const datos = JSON.parse(texto);
    const base = estadoInicial();
    return { ...base, ...datos, config: { ...base.config, ...(datos.config || {}) } };
  } catch {
    return estadoInicial();
  }
}

export function guardar(p, almacen = globalThis.localStorage) {
  almacen.setItem(CLAVE, JSON.stringify(p));
}

export function fechaLocal(ms) {
  const d = new Date(ms);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function subirHabilidad(p, id, estado, fuente, ahora) {
  if (!ESTADOS.includes(estado)) throw new Error(`Estado desconocido: ${estado}`);
  if (estado === 'dominado' && !FUENTES_DOMINIO.includes(fuente)) {
    throw new Error('Solo una evaluación semanal o un familiar pueden marcar una habilidad como dominada');
  }
  const h = (p.habilidades[id] ||= { estado: null, historial: [] });
  if (ESTADOS.indexOf(estado) > ESTADOS.indexOf(h.estado)) h.estado = estado;
  h.historial.push({ fecha: fechaLocal(ahora), estado, fuente });
}

export function anotarDificultad(p, dif, claseId, ahora) {
  const abierta = p.dificultades.find((d) => d.id === dif.id && !d.resuelta);
  if (abierta) {
    abierta.veces = (abierta.veces || 1) + 1;
    abierta.ultimaFecha = fechaLocal(ahora);
    return;
  }
  p.dificultades.push({ ...dif, claseId, fecha: fechaLocal(ahora), veces: 1, resuelta: false });
}

export function resolverDificultad(p, id, ahora) {
  for (const d of p.dificultades) {
    if (d.id === id && !d.resuelta) { d.resuelta = true; d.fechaResuelta = fechaLocal(ahora); }
  }
}

// ── Clase en curso ─────────────────────────────────────────

export function iniciarClase(p, claseId, ahora) {
  if (p.enCurso && p.enCurso.claseId === claseId) {
    p.enCurso.ultimaActividad = ahora; // se retoma donde se dejó
    return p.enCurso;
  }
  p.enCurso = { claseId, paso: 0, respuestas: {}, inicio: ahora, ultimaActividad: ahora, ms: 0 };
  return p.enCurso;
}

export function registrarActividad(p, ahora) {
  if (!p.enCurso) return;
  const hueco = ahora - p.enCurso.ultimaActividad;
  if (hueco > 0) p.enCurso.ms += Math.min(hueco, MAX_HUECO_MS);
  p.enCurso.ultimaActividad = ahora;
}

export function irAPaso(p, paso, ahora) {
  registrarActividad(p, ahora);
  p.enCurso.paso = paso;
}

export function responder(p, pasoId, datos, ahora) {
  registrarActividad(p, ahora);
  const previa = p.enCurso.respuestas[pasoId];
  p.enCurso.respuestas[pasoId] = { ...datos, intentos: (previa?.intentos || 0) + 1 };
}

function apuntarSesion(p, completada, ahora) {
  registrarActividad(p, ahora);
  const minutos = Math.round(p.enCurso.ms / 60000);
  p.sesiones.push({ claseId: p.enCurso.claseId, fecha: fechaLocal(ahora), minutos, completada });
  p.enCurso.ms = 0;
}

// Pausar: guarda el tiempo practicado y deja la clase a medias para retomarla.
export function pausarClase(p, ahora) {
  if (!p.enCurso) return;
  apuntarSesion(p, false, ahora);
}

// Terminar: aplica lo que la clase decide registrar y pasa a la siguiente.
export function terminarClase(p, clase, ahora) {
  const resultado = clase.evaluar(p.enCurso.respuestas);
  apuntarSesion(p, true, ahora);
  for (const h of resultado.habilidades) subirHabilidad(p, h.id, h.estado, h.fuente, ahora);
  for (const id of resultado.resueltas) resolverDificultad(p, id, ahora);
  for (const d of resultado.dificultades) anotarDificultad(p, d, clase.id, ahora);
  const siguiente = siguienteClase(clase.id);
  if (siguiente) p.claseActual = siguiente.id;
  p.enCurso = null;
  return resultado;
}

// ── Textos hablados ─────────────────────────────────────────

export function proximoDiaPractica(p, ahora) {
  const dias = p.config.diasPractica?.length ? p.config.diasPractica : [2, 4, 6];
  const hoy = new Date(ahora).getDay();
  for (let i = 1; i <= 7; i++) {
    const d = (hoy + i) % 7;
    if (dias.includes(d)) return i === 1 ? 'mañana' : `el ${DIAS[d]}`;
  }
  return 'la próxima vez';
}

function lunesDeEstaSemana(ahora) {
  const d = new Date(ahora);
  const desde = (d.getDay() + 6) % 7;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - desde);
  return fechaLocal(d.getTime());
}

function numeroTexto(n, unidad, plural) {
  const palabras = ['ningún', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete'];
  const num = n < palabras.length ? palabras[n] : String(n);
  return `${num} ${n === 1 ? unidad : plural}`;
}

export function resumenProgreso(p, ahora) {
  const frases = [];
  if (!p.sesiones.length) {
    frases.push('Todavía no has hecho ninguna clase.');
    frases.push('Cuando quieras, pulsa Empezar mi clase de hoy.');
    return frases;
  }
  const lunes = lunesDeEstaSemana(ahora);
  const diasSemana = new Set(p.sesiones.filter((s) => s.fecha >= lunes).map((s) => s.fecha)).size;
  const diasTotal = new Set(p.sesiones.map((s) => s.fecha)).size;
  const minutos = p.sesiones.reduce((t, s) => t + (s.minutos || 0), 0);

  frases.push(diasSemana
    ? `Esta semana has practicado ${numeroTexto(diasSemana, 'día', 'días')}.`
    : 'Esta semana todavía no has practicado.');
  frases.push(`En total llevas ${numeroTexto(diasTotal, 'día', 'días')} de práctica, unos ${minutos} minutos.`);

  const por = (estado) => Object.entries(p.habilidades)
    .filter(([, h]) => h.estado === estado).map(([id]) => HABILIDADES[id] || id);
  const dominadas = por('dominado');
  const comprendidas = por('comprendido');
  const practicadas = por('practicado');
  const presentadas = por('presentado');
  if (dominadas.length) frases.push(`Dominas ${listaTexto(dominadas)}.`);
  if (comprendidas.length) frases.push(`Según tus respuestas, ya sabes ${listaTexto(comprendidas)}. Lo confirmaremos en la evaluación de la semana.`);
  if (practicadas.length) frases.push(`Has practicado ${listaTexto(practicadas)}.`);
  if (presentadas.length) frases.push(`Te he explicado ${listaTexto(presentadas)}.`);

  const pendientes = p.dificultades.filter((d) => !d.resuelta).map((d) => d.texto);
  if (pendientes.length) frases.push(`Todavía necesitas practicar ${listaTexto(pendientes)}.`);

  if (p.enCurso) {
    const c = buscarClase(p.enCurso.claseId);
    frases.push(`Tienes a medias la clase ${c.numero}, ${c.titulo}. La próxima vez seguiremos donde lo dejaste.`);
  } else {
    const c = buscarClase(p.claseActual);
    if (c) frases.push(`Tu próxima clase es la ${c.numero}: ${c.titulo}.`);
  }
  return frases;
}
