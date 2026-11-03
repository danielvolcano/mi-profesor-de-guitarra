// Voz del profesor con las voces del propio iPad (Web Speech API).
// Funciona sin conexión con las voces instaladas en el sistema.

const VELOCIDADES = { lenta: 0.8, normal: 1.0, rapida: 1.15 };
const PREFERIDAS = ['Mónica', 'Monica', 'Marisol', 'Jorge', 'Paulina'];

let vozElegida = null;
let turno = 0; // cada llamada a hablar() invalida las anteriores

export function vozDisponible() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

function elegirVoz() {
  if (!vozDisponible()) return null;
  const voces = window.speechSynthesis.getVoices();
  const espana = voces.filter((v) => v.lang && v.lang.replace('_', '-').toLowerCase().startsWith('es-es'));
  const espanol = espana.length ? espana : voces.filter((v) => v.lang && v.lang.toLowerCase().startsWith('es'));
  const mejorada = espanol.find((v) => /premium|enhanced|mejorad/i.test(v.name));
  const conocida = PREFERIDAS.map((n) => espanol.find((v) => v.name.includes(n))).find(Boolean);
  return mejorada || conocida || espanol[0] || null;
}

if (vozDisponible()) {
  vozElegida = elegirVoz();
  window.speechSynthesis.addEventListener?.('voiceschanged', () => { vozElegida = elegirVoz(); });
}

export function nombreVoz() {
  return vozElegida ? vozElegida.name : 'voz del sistema';
}

export function callar() {
  turno++;
  if (vozDisponible()) window.speechSynthesis.cancel();
}

// Dice las frases una a una (en iPad, los textos largos a veces se cortan).
// Devuelve una promesa que se resuelve al terminar o al ser interrumpida.
export function hablar(frases, { velocidad = 'normal', retraso = 0 } = {}) {
  callar();
  const miTurno = turno;
  if (!vozDisponible()) return Promise.resolve(false);
  const lista = (Array.isArray(frases) ? frases : [frases]).filter(Boolean);
  return new Promise((resolver) => {
    const decir = (i) => {
      if (miTurno !== turno) return resolver(false);
      if (i >= lista.length) return resolver(true);
      const u = new SpeechSynthesisUtterance(lista[i]);
      u.lang = 'es-ES';
      if (vozElegida) u.voice = vozElegida;
      u.rate = VELOCIDADES[velocidad] || 1;
      u.onend = () => setTimeout(() => decir(i + 1), 250);
      u.onerror = () => resolver(false);
      window.speechSynthesis.speak(u);
    };
    setTimeout(() => decir(0), retraso);
  });
}
