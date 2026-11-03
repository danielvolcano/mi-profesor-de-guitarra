// Sonidos de ejemplo sintetizados (algoritmo Karplus-Strong de cuerda pulsada).
// Son sonidos propios: no hay grabaciones de terceros.

export const CUERDAS = { 6: 'E2', 5: 'A2', 4: 'D3', 3: 'G3', 2: 'B3', 1: 'E4' };
const FRECUENCIAS = {
  E2: 82.41, F2: 87.31, G2: 98.0, A2: 110.0, D3: 146.83, G3: 196.0, B3: 246.94, E4: 329.63,
};

let contexto = null;
const cache = new Map();
let reproduccion = 0;
export let volumen = 0.9;

export function fijarVolumen(v) { volumen = v; }

function obtenerContexto() {
  if (!contexto) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    // En Safari 16.4+: que suene aunque el iPad esté en modo silencio.
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch { /* sin soporte */ }
    contexto = new AC();
  }
  if (contexto.state === 'suspended') contexto.resume();
  return contexto;
}

function cuerdaPulsada(ctx, frecuencia, duracion = 2.5) {
  const clave = `${frecuencia}`;
  if (cache.has(clave)) return cache.get(clave);
  const sr = ctx.sampleRate;
  const total = Math.floor(sr * duracion);
  const buffer = ctx.createBuffer(1, total, sr);
  const datos = buffer.getChannelData(0);
  const n = Math.max(2, Math.round(sr / frecuencia - 0.5));
  const linea = new Float32Array(n);
  // Ruido inicial suavizado: sonido más redondo, como una cuerda de nailon.
  let previo = 0;
  for (let i = 0; i < n; i++) { const r = Math.random() * 2 - 1; previo = 0.6 * previo + 0.4 * r; linea[i] = previo; }
  const amortiguacion = frecuencia < 150 ? 0.997 : 0.994;
  let idx = 0;
  for (let i = 0; i < total; i++) {
    const actual = linea[idx];
    const siguiente = linea[(idx + 1) % n];
    linea[idx] = amortiguacion * 0.5 * (actual + siguiente);
    datos[i] = actual;
    idx = (idx + 1) % n;
  }
  // Normalizar
  let max = 0;
  for (let i = 0; i < total; i++) max = Math.max(max, Math.abs(datos[i]));
  if (max > 0) for (let i = 0; i < total; i++) datos[i] = (datos[i] / max) * 0.8;
  cache.set(clave, buffer);
  return buffer;
}

function aNota(n) {
  return typeof n === 'number' ? CUERDAS[n] : n;
}

export function detener() {
  reproduccion++;
}

// Toca una secuencia de cuerdas (números 1-6) o notas ('A2'...). Devuelve una promesa.
export function tocar(notas, { intervalo = 1.1 } = {}) {
  const ctx = obtenerContexto();
  const lista = (Array.isArray(notas) ? notas : [notas]).map(aNota);
  if (typeof window !== 'undefined') window.__ultimoSonido = lista.slice();
  if (!ctx) return Promise.resolve();
  const miReproduccion = ++reproduccion;
  const inicio = ctx.currentTime + 0.05;
  const fuentes = lista.map((nota, i) => {
    const fuente = ctx.createBufferSource();
    fuente.buffer = cuerdaPulsada(ctx, FRECUENCIAS[nota]);
    const g = ctx.createGain();
    g.gain.value = volumen;
    fuente.connect(g).connect(ctx.destination);
    fuente.start(inicio + i * intervalo);
    return fuente;
  });
  const duracion = (lista.length - 1) * intervalo + 2.0;
  return new Promise((resolver) => {
    const comprobar = setInterval(() => {
      if (miReproduccion !== reproduccion) {
        fuentes.forEach((f) => { try { f.stop(); } catch { /* ya parada */ } });
        clearInterval(comprobar);
        resolver();
      }
    }, 100);
    setTimeout(() => { clearInterval(comprobar); resolver(); }, duracion * 1000);
  });
}

// Confirmación sonora suave (dos notas ascendentes): progreso guardado, clase terminada.
export function confirmacion() {
  const ctx = obtenerContexto();
  if (!ctx) return;
  [523.25, 783.99].forEach((f, i) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = f;
    const t = ctx.currentTime + i * 0.15;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.25 * volumen, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + 0.55);
  });
}
