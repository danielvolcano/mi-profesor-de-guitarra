// Mi profesor de guitarra · aplicación principal
import * as P from './progreso.js';
import { PROGRAMA, CONCEPTOS, HABILIDADES, buscarClase } from './contenido/catalogo.js';
import { hablar, callar, vozDisponible } from './voz.js';
import { tocar, detener, confirmacion, fijarVolumen, CUERDAS } from './sonido.js';

export const VERSION = '0.1.0';
const $ = (id) => document.getElementById(id);
const ahora = () => Date.now();

let p = P.cargar();
fijarVolumen(p.config.volumen);
const guardar = () => { try { P.guardar(p); } catch (e) { avisar('No se ha podido guardar el progreso.'); console.error(e); } };

// ── Coordinación de voces ─────────────────────────────────
// Regla: nunca dos voces a la vez. Si el alumno mueve el foco de VoiceOver
// mientras habla el profesor, el profesor se calla.
let focoProgramatico = false;
let profesorHablando = false;

function modoVoz() {
  if (!vozDisponible()) return 'voiceover';
  return p.config.voz || 'profesor';
}

function enfocar(el) {
  focoProgramatico = true;
  el.focus();
  setTimeout(() => { focoProgramatico = false; }, 80);
}

// Fuerza a VoiceOver a leer un elemento aunque ya tuviera el foco.
function enfocarYLeer(el, previo) {
  if (document.activeElement === el && previo) {
    enfocar(previo);
    setTimeout(() => enfocar(el), 150);
  } else {
    enfocar(el);
  }
}

document.addEventListener('focusin', () => {
  if (!focoProgramatico && profesorHablando) { callar(); profesorHablando = false; }
});

function decir(frases, retraso = 300) {
  if (modoVoz() !== 'profesor') return Promise.resolve(false);
  profesorHablando = true;
  return hablar(frases, { velocidad: p.config.velocidad, retraso }).finally(() => { profesorHablando = false; });
}

function retrasoTras(texto) {
  // Tiempo aproximado para que VoiceOver termine de leer un título corto.
  return 700 + 45 * texto.length;
}

function avisar(texto) {
  const aviso = $('aviso');
  aviso.textContent = '';
  setTimeout(() => { aviso.textContent = texto; }, 50);
}

function silencio() {
  callar();
  profesorHablando = false;
  detener();
}

// ── Navegación entre pantallas ───────────────────────────
function mostrarPantalla(id, titulo) {
  silencio();
  for (const s of document.querySelectorAll('.pantalla')) s.hidden = s.id !== `p-${id}`;
  document.title = titulo ? `${titulo} · Mi profesor de guitarra` : 'Mi profesor de guitarra';
  if (id !== 'clase') soltarPantallaEncendida();
  window.scrollTo(0, 0);
}

function ir(id) {
  if (id === 'inicio') return irInicio();
  if (id === 'ayuda') return irAyuda();
  return null;
}

for (const b of document.querySelectorAll('[data-ir]')) b.addEventListener('click', () => ir(b.dataset.ir));

// ── Pantalla de texto genérica ───────────────────────────
// opciones: { titulo, frases, acciones: [{etiqueta, accion, principal}], volver: {etiqueta, accion}, leer }
let pantallaTexto = null;
function irTexto(opciones) {
  pantallaTexto = opciones;
  mostrarPantalla('texto', opciones.titulo);
  $('texto-titulo').textContent = opciones.titulo;
  const cuerpo = $('texto-cuerpo');
  cuerpo.textContent = opciones.frases.join(' ');
  cuerpo.setAttribute('aria-hidden', modoVoz() === 'profesor' && opciones.leer ? 'true' : 'false');
  const volver = $('b-texto-volver');
  volver.textContent = opciones.volver?.etiqueta || 'Volver al inicio';
  const lista = $('texto-acciones');
  lista.innerHTML = '';
  for (const a of opciones.acciones || []) {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = a.etiqueta;
    if (a.principal) b.className = 'principal';
    b.addEventListener('click', a.accion);
    li.append(b);
    lista.append(li);
  }
  if (opciones.leer && modoVoz() === 'voiceover') {
    enfocar(cuerpo);
  } else {
    enfocar($('texto-titulo'));
    if (opciones.leer) decir(opciones.frases, retrasoTras(opciones.titulo));
  }
}
$('b-texto-volver').addEventListener('click', () => (pantallaTexto?.volver?.accion || irInicio)());

function repetirTexto() {
  if (!pantallaTexto) return;
  if (modoVoz() === 'profesor') decir(pantallaTexto.frases, 100);
  else enfocarYLeer($('texto-cuerpo'), $('texto-titulo'));
}

// ── Primera vez ──────────────────────────────────────────
function irBienvenida() {
  mostrarPantalla('bienvenida');
  enfocar(document.querySelector('#p-bienvenida h1'));
}
$('b-probar-voz').addEventListener('click', probarVoz);
$('b-elegir-profesor').addEventListener('click', () => { elegirVoz('profesor'); irInicio(); decir('Perfecto. Te hablaré yo durante las clases.', 1500); });
$('b-elegir-voiceover').addEventListener('click', () => { elegirVoz('voiceover'); irInicio(); });

function elegirVoz(modo) {
  p.config.voz = modo;
  guardar();
}

function probarVoz() {
  if (!vozDisponible()) {
    avisar('Este iPad no permite la voz del profesor. Usa VoiceOver.');
    return;
  }
  profesorHablando = true;
  hablar(['Hola, soy tu profesor de guitarra.', 'Así sonará mi voz durante las clases.'], { velocidad: p.config.velocidad, retraso: 200 })
    .finally(() => { profesorHablando = false; });
}

// ── Inicio ───────────────────────────────────────────────
function irInicio() {
  mostrarPantalla('inicio');
  const b = $('b-clase');
  const estado = $('inicio-estado');
  if (p.enCurso) {
    const c = buscarClase(p.enCurso.claseId);
    b.textContent = 'Continuar mi clase de hoy';
    estado.textContent = `Tienes a medias la clase ${c.numero}: ${c.titulo}.`;
  } else {
    const c = buscarClase(p.claseActual);
    b.textContent = 'Empezar mi clase de hoy';
    estado.textContent = c ? `Clase de hoy: clase ${c.numero}, ${c.titulo}.` : '';
  }
  enfocar(document.querySelector('#p-inicio h1'));
}

$('b-clase').addEventListener('click', () => {
  const id = p.enCurso ? p.enCurso.claseId : p.claseActual;
  const c = buscarClase(id);
  if (c?.contenido) return empezarClase(c.contenido);
  const ultima = [...PROGRAMA].reverse().find((x) => x.contenido);
  irTexto({
    titulo: 'Clase de hoy',
    leer: true,
    frases: [
      `La clase ${c.numero}, ${c.titulo}, estará disponible muy pronto.`,
      `Mientras tanto, puedes repetir la clase ${ultima.numero} o repasar lo aprendido.`,
    ],
    acciones: [
      { etiqueta: `Repetir la clase ${ultima.numero}: ${ultima.titulo}`, principal: true, accion: () => empezarClase(ultima.contenido) },
      { etiqueta: 'Repasar lo aprendido', accion: irRepaso },
    ],
  });
});

// ── Clase ────────────────────────────────────────────────
let clase = null;
let feedback = null; // respuesta mostrada tras una pregunta: { opcion }
let juego = null;    // estado del juego de oído

function empezarClase(contenido) {
  clase = contenido;
  P.iniciarClase(p, clase.id, ahora());
  guardar();
  feedback = null;
  juego = null;
  mostrarPantalla('clase', `Clase ${clase.numero}`);
  pedirPantallaEncendida();
  $('clase-titulo').textContent = `Clase ${clase.numero}: ${clase.titulo}`;
  mostrarPaso({ entrada: true });
}

function pasoActual() { return clase.pasos[p.enCurso.paso]; }

function textoPaso(paso) {
  if (feedback) return feedback.opcion.respuesta;
  if (paso.tipo === 'juegoOido' && juego) return juego.frases;
  return paso.texto;
}

function mostrarPaso({ entrada = false, frases = null } = {}) {
  const paso = pasoActual();
  const i = p.enCurso.paso;
  if (paso.tipo === 'juegoOido' && !juego) juego = { ronda: 0, aciertos: 0, nota: null, terminado: false, frases: paso.texto };

  const titulo = `Paso ${i + 1} de ${clase.pasos.length}. ${paso.titulo}`;
  $('paso-titulo').textContent = titulo;
  const dichas = frases || textoPaso(paso);
  const texto = $('paso-texto');
  texto.textContent = dichas.join(' ');
  texto.setAttribute('aria-hidden', modoVoz() === 'profesor' ? 'true' : 'false');

  const esPregunta = paso.tipo === 'pregunta' && !feedback;
  const esJuego = paso.tipo === 'juegoOido' && !juego.terminado;
  const opciones = $('paso-opciones');
  opciones.innerHTML = '';
  opciones.hidden = !(esPregunta || esJuego);
  if (esPregunta) {
    for (const op of paso.opciones) opciones.append(botonOpcion(op.etiqueta, () => responderPregunta(op)));
  } else if (esJuego) {
    opciones.setAttribute('aria-label', 'Juego de oído');
    opciones.append(botonOpcion('Escuchar el sonido', escucharJuego, 'b-escuchar-juego'));
    opciones.append(botonOpcion('Grave', () => responderJuego('grave')));
    opciones.append(botonOpcion('Aguda', () => responderJuego('aguda')));
  }
  if (esPregunta) opciones.setAttribute('aria-label', 'Respuestas');

  const continuar = $('b-continuar');
  continuar.hidden = esPregunta || esJuego;
  continuar.textContent = feedback?.opcion.repetir ? 'Intentarlo otra vez' : (i === clase.pasos.length - 1 && !esPregunta ? 'Terminar la clase' : 'Continuar');
  $('b-ejemplo').hidden = !paso.ejemplo;
  $('b-otra').hidden = !paso.otraForma || !!feedback;
  $('b-anterior').hidden = i === 0;

  // Foco y voz
  const activo = document.activeElement;
  const enControles = activo && activo.closest?.('#p-clase .controles') && !activo.hidden;
  if (modoVoz() === 'voiceover') {
    enfocarYLeer(texto, $('paso-titulo'));
  } else if (!entrada && enControles) {
    decir(dichas, 300); // el foco sigue en el mismo botón: VoiceOver no dice nada
  } else if ((feedback || juego?.terminado) && !continuar.hidden) {
    enfocar(continuar);
    decir(dichas, 1300);
  } else if (esJuego && juego.ronda > 0) {
    enfocar($('b-escuchar-juego'));
    decir(dichas, 1300);
  } else {
    enfocar($('paso-titulo'));
    decir(dichas, retrasoTras(titulo));
  }
}

function botonOpcion(etiqueta, accion, id) {
  const b = document.createElement('button');
  if (id) b.id = id;
  b.type = 'button';
  b.textContent = etiqueta;
  b.addEventListener('click', accion);
  return b;
}

function responderPregunta(op) {
  const paso = pasoActual();
  P.responder(p, paso.id, { resultado: op.resultado, opcion: op.id }, ahora());
  guardar();
  feedback = { opcion: op };
  silencio();
  mostrarPaso();
}

function responderJuego(eleccion) {
  silencio();
  if (!juego.nota) {
    juego.frases = ['Primero pulsa Escuchar el sonido. Después elige Grave o Aguda.'];
    return mostrarPaso();
  }
  const cuerda = juego.nota;
  const correcta = cuerda >= 4 ? 'grave' : 'aguda';
  const nombres = { 6: 'la sexta', 5: 'la quinta', 4: 'la cuarta', 3: 'la tercera', 2: 'la segunda', 1: 'la primera' };
  const acierto = eleccion === correcta;
  if (acierto) juego.aciertos++;
  juego.ronda++;
  juego.nota = null;
  const total = pasoActual().rondas;
  const frases = [acierto ? `¡Bien! Era ${correcta}: ${nombres[cuerda]} cuerda.` : `Era ${correcta}: ${nombres[cuerda]} cuerda.`];
  if (juego.ronda >= total) {
    juego.terminado = true;
    P.responder(p, pasoActual().id, { aciertos: juego.aciertos, total }, ahora());
    guardar();
    frases.push(`Has acertado ${juego.aciertos} de ${total}.`, juego.aciertos >= total - 1 ? 'Tienes buen oído.' : 'Con la práctica lo irás distinguiendo cada vez mejor.', 'Pulsa Continuar.');
  } else {
    frases.push(`Ronda ${juego.ronda + 1} de ${total}. Pulsa Escuchar el sonido.`);
  }
  juego.frases = frases;
  mostrarPaso();
}

function escucharJuego() {
  silencio();
  if (!juego.nota) juego.nota = [6, 5, 4, 3, 2, 1][Math.floor(Math.random() * 6)];
  tocar(juego.nota);
}

$('b-continuar').addEventListener('click', () => {
  silencio();
  const paso = pasoActual();
  if (feedback?.opcion.repetir) { feedback = null; return mostrarPaso(); }
  feedback = null;
  juego = null;
  if (p.enCurso.paso >= clase.pasos.length - 1) return terminar();
  if (paso.tipo === 'info' || !paso.tipo) P.responder(p, paso.id, { resultado: 'visto' }, ahora());
  P.irAPaso(p, p.enCurso.paso + 1, ahora());
  guardar();
  mostrarPaso();
});

$('b-anterior').addEventListener('click', () => {
  silencio();
  if (p.enCurso.paso === 0) return;
  feedback = null;
  juego = null;
  P.irAPaso(p, p.enCurso.paso - 1, ahora());
  guardar();
  mostrarPaso();
});

$('b-repetir').addEventListener('click', () => {
  silencio();
  const paso = pasoActual();
  const frases = textoPaso(paso);
  if (modoVoz() === 'profesor') decir(frases, 150);
  else enfocarYLeer($('paso-texto'), $('paso-titulo'));
});

$('b-otra').addEventListener('click', () => {
  silencio();
  const paso = pasoActual();
  if (!paso.otraForma) return;
  $('paso-texto').textContent = paso.otraForma.join(' ');
  if (modoVoz() === 'profesor') decir(paso.otraForma, 150);
  else enfocarYLeer($('paso-texto'), $('paso-titulo'));
});

$('b-ejemplo').addEventListener('click', () => {
  silencio();
  const paso = pasoActual();
  if (paso.ejemplo) tocar(paso.ejemplo.notas, { intervalo: paso.ejemplo.intervalo || 1.1 });
});

$('b-pausar').addEventListener('click', () => {
  P.pausarClase(p, ahora());
  guardar();
  const n = p.enCurso.paso + 1;
  confirmacion();
  irInicio();
  avisar(`Clase guardada en el paso ${n}.`);
  decir([`Clase guardada en el paso ${n}.`, 'La próxima vez seguiremos justo aquí.'], 1500);
});

function terminar() {
  const c = clase;
  const resultado = P.terminarClase(p, c, ahora());
  guardar();
  confirmacion();
  clase = null;
  irTexto({
    titulo: 'Clase terminada',
    leer: true,
    frases: [...resultado.resumen, 'Tu progreso se ha guardado.', `¡Hasta ${P.proximoDiaPractica(p, ahora())}!`],
    acciones: [{ etiqueta: 'Repetir lo que ha dicho el profesor', accion: repetirTexto }],
  });
}

// Que la pantalla no se apague mientras toca la guitarra.
let bloqueoPantalla = null;
async function pedirPantallaEncendida() {
  try { if ('wakeLock' in navigator) bloqueoPantalla = await navigator.wakeLock.request('screen'); } catch { /* sin soporte */ }
}
function soltarPantallaEncendida() {
  try { bloqueoPantalla?.release(); } catch { /* nada */ }
  bloqueoPantalla = null;
}
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && !$('p-clase').hidden) pedirPantallaEncendida();
  if (document.visibilityState === 'hidden' && p.enCurso) { P.registrarActividad(p, ahora()); guardar(); silencio(); }
});

// ── Repasar lo aprendido ─────────────────────────────────
function irRepaso() {
  const vistos = CONCEPTOS.filter((c) => p.habilidades[c.habilidad]?.estado);
  irTexto({
    titulo: 'Repasar lo aprendido',
    frases: vistos.length
      ? ['Elige qué quieres repasar.']
      : ['Todavía no hemos visto ningún concepto.', 'Empieza tu clase de hoy y aquí podrás repasar lo que vayas aprendiendo.'],
    leer: !vistos.length,
    acciones: vistos.map((c) => ({ etiqueta: c.titulo, accion: () => irConcepto(c) })),
  });
}

function irConcepto(c) {
  const acciones = [{ etiqueta: 'Repetir', accion: repetirTexto }];
  if (c.ejemplo) acciones.unshift({ etiqueta: 'Escuchar ejemplo', principal: true, accion: () => { silencio(); tocar(c.ejemplo.notas); } });
  irTexto({
    titulo: c.titulo, frases: c.texto, leer: true, acciones,
    volver: { etiqueta: 'Volver a Repasar', accion: irRepaso },
  });
}

$('b-repaso').addEventListener('click', irRepaso);

// ── Practicar una canción ────────────────────────────────
$('b-cancion').addEventListener('click', () => irTexto({
  titulo: 'Practicar una canción',
  leer: true,
  frases: [
    'Tu primera pieza será la bajada andaluza: la, sol, fa, mi. Es el corazón de los tangos.',
    'La aprenderás a tocar en la semana cuatro. Mientras tanto, puedes escucharla para irla metiendo en el oído.',
  ],
  acciones: [
    { etiqueta: 'Escuchar la bajada andaluza', principal: true, accion: () => { silencio(); tocar(['A2', 'G2', 'F2', 'E2'], { intervalo: 0.9 }); } },
    { etiqueta: 'Escuchar las seis cuerdas al aire', accion: () => { silencio(); tocar([6, 5, 4, 3, 2, 1]); } },
  ],
}));

// ── Progreso ─────────────────────────────────────────────
$('b-progreso').addEventListener('click', () => irTexto({
  titulo: 'Mi progreso',
  leer: true,
  frases: P.resumenProgreso(p, ahora()),
  acciones: [{ etiqueta: 'Repetir', accion: repetirTexto }],
}));

// ── Ayuda y configuración ────────────────────────────────
function irAyuda() {
  mostrarPantalla('ayuda', 'Ayuda y configuración');
  marcarRadio('voz', modoVoz());
  marcarRadio('velocidad', p.config.velocidad);
  marcarRadio('volumen', String(p.config.volumen));
  enfocar(document.querySelector('#p-ayuda h1'));
}
function marcarRadio(nombre, valor) {
  for (const r of document.querySelectorAll(`input[name=${nombre}]`)) r.checked = r.value === valor;
}
$('b-ayuda').addEventListener('click', irAyuda);
$('b-probar-voz-2').addEventListener('click', probarVoz);
$('b-probar-sonido').addEventListener('click', () => { silencio(); tocar([6, 5, 4, 3, 2, 1]); });
$('b-como-funciona').addEventListener('click', () => irTexto({
  titulo: 'Cómo funciona',
  leer: true,
  volver: { etiqueta: 'Volver a Ayuda', accion: irAyuda },
  frases: [
    'En la pantalla de inicio, el primer botón es siempre tu clase de hoy. La aplicación recuerda por dónde vas.',
    'Durante la clase, desliza el dedo a la derecha para llegar al botón Continuar, y tócalo dos veces para avanzar.',
    'Si tocas la pantalla mientras habla el profesor, se calla. Pulsa Repetir para volver a oírlo.',
    'El botón Pausar y guardar, arriba del todo, guarda la clase. La próxima vez seguirás en el mismo paso.',
    'El progreso se guarda solo, en este iPad. No hace falta internet para dar las clases.',
    'Si prefieres que lea VoiceOver en lugar del profesor, cámbialo aquí, en Ayuda y configuración.',
  ],
  acciones: [{ etiqueta: 'Repetir', accion: repetirTexto }],
}));

for (const r of document.querySelectorAll('input[name=voz]')) {
  r.addEventListener('change', () => { elegirVoz(r.value); if (r.value === 'profesor') decir('Ahora te hablaré yo.', 1200); });
}
for (const r of document.querySelectorAll('input[name=velocidad]')) {
  r.addEventListener('change', () => { p.config.velocidad = r.value; guardar(); decir('Así hablaré a partir de ahora.', 1200); });
}
for (const r of document.querySelectorAll('input[name=volumen]')) {
  r.addEventListener('change', () => { p.config.volumen = Number(r.value); fijarVolumen(p.config.volumen); guardar(); tocar(6); });
}

// ── Modo familiar ────────────────────────────────────────
$('b-familiar').addEventListener('click', () => irTexto({
  titulo: 'Modo familiar',
  frases: ['Esta sección es para familiares: registro detallado, comprobaciones y copias de seguridad. ¿Quieres entrar?'],
  leer: false,
  volver: { etiqueta: 'Volver a Ayuda', accion: irAyuda },
  acciones: [{ etiqueta: 'Entrar en el modo familiar', accion: irFamiliar }],
}));

const NOMBRE_FUENTE = {
  clase: 'clase', autoevaluacion: 'autoevaluación del alumno', app: 'comprobado por la app (juego de oído)',
  familiar: 'comprobación de un familiar', 'evaluacion-semanal': 'evaluación semanal',
};

function irFamiliar() {
  mostrarPantalla('familiar', 'Modo familiar');
  const reg = $('familiar-registro');
  const c = buscarClase(p.claseActual);
  const filasSes = p.sesiones.map((s) => `<tr><td>${s.fecha}</td><td>${buscarClase(s.claseId)?.titulo || s.claseId}</td><td>${s.minutos} min</td><td>${s.completada ? 'terminada' : 'pausada'}</td></tr>`).join('');
  const filasHab = Object.entries(p.habilidades).map(([id, h]) => {
    const ult = h.historial[h.historial.length - 1];
    return `<tr><td>${HABILIDADES[id] || id}</td><td>${h.estado}</td><td>${NOMBRE_FUENTE[ult?.fuente] || ''} (${ult?.fecha || ''})</td></tr>`;
  }).join('');
  const difs = p.dificultades.map((d) => `<li>${d.texto} — ${d.resuelta ? `resuelta el ${d.fechaResuelta}` : `pendiente (desde ${d.fecha}, ${d.veces} ${d.veces === 1 ? 'vez' : 'veces'})`}</li>`).join('');
  reg.innerHTML = `
    <p>Clase actual: ${c ? `${c.numero}, ${c.titulo}` : '—'}${p.enCurso ? ` · a medias en el paso ${p.enCurso.paso + 1}` : ''}.</p>
    <h3>Sesiones</h3>
    ${filasSes ? `<table><thead><tr><th>Fecha</th><th>Clase</th><th>Tiempo</th><th>Estado</th></tr></thead><tbody>${filasSes}</tbody></table>` : '<p>Sin sesiones todavía.</p>'}
    <h3>Habilidades</h3>
    ${filasHab ? `<table><thead><tr><th>Habilidad</th><th>Estado</th><th>Última prueba</th></tr></thead><tbody>${filasHab}</tbody></table>` : '<p>Ninguna todavía.</p>'}
    <h3>Dificultades</h3>
    ${difs ? `<ul>${difs}</ul>` : '<p>Ninguna anotada.</p>'}`;

  const hab = $('familiar-habilidades');
  hab.innerHTML = '';
  for (const [id, h] of Object.entries(p.habilidades)) {
    if (h.estado === 'dominado') continue;
    hab.append(botonOpcion(`Lo he comprobado: ${HABILIDADES[id] || id}`, () => {
      if (!window.confirm(`¿Has visto en persona que domina «${HABILIDADES[id]}»?`)) return;
      P.subirHabilidad(p, id, 'dominado', 'familiar', ahora());
      guardar();
      irFamiliar();
      avisar('Comprobación anotada.');
    }));
  }
  if (!hab.children.length) hab.textContent = 'No hay habilidades pendientes de comprobar.';
  $('familiar-version').textContent = `Versión ${VERSION}.`;
  enfocar(document.querySelector('#p-familiar h1'));
}

$('b-reiniciar-clase').addEventListener('click', () => {
  if (!window.confirm('¿Volver a empezar la clase actual desde el principio?')) return;
  if (p.enCurso) P.pausarClase(p, ahora());
  p.enCurso = null;
  guardar();
  irFamiliar();
  avisar('Hecho. La clase empezará desde el principio.');
});

$('b-repetir-anterior').addEventListener('click', () => {
  const i = PROGRAMA.findIndex((c) => c.id === p.claseActual);
  const anterior = PROGRAMA.slice(0, Math.max(i, 1)).reverse().find((c) => c.contenido);
  if (!anterior || !window.confirm(`¿Hacer otra vez la clase ${anterior.numero}, ${anterior.titulo}?`)) return;
  if (p.enCurso) P.pausarClase(p, ahora());
  p.enCurso = null;
  p.claseActual = anterior.id;
  guardar();
  irFamiliar();
  avisar('Hecho.');
});

$('b-exportar').addEventListener('click', async () => {
  const datos = JSON.stringify(p, null, 2);
  const nombre = `progreso-guitarra-${P.fechaLocal(ahora())}.json`;
  const archivo = new File([datos], nombre, { type: 'application/json' });
  try {
    if (navigator.canShare?.({ files: [archivo] })) { await navigator.share({ files: [archivo], title: 'Progreso de guitarra' }); return; }
  } catch { /* cancelado */ return; }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(archivo);
  a.download = nombre;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
});

$('i-importar').addEventListener('change', async (e) => {
  const f = e.target.files?.[0];
  if (!f) return;
  try {
    const datos = JSON.parse(await f.text());
    if (datos.version !== 1 || !Array.isArray(datos.sesiones)) throw new Error('formato');
    if (!window.confirm('Esto sustituirá el progreso actual por el de la copia. ¿Continuar?')) return;
    localStorage.setItem(P.CLAVE, JSON.stringify(datos));
    p = P.cargar();
    fijarVolumen(p.config.volumen);
    irFamiliar();
    avisar('Copia importada.');
  } catch {
    avisar('El archivo no es una copia válida del progreso.');
  } finally {
    e.target.value = '';
  }
});

$('b-borrar').addEventListener('click', () => {
  if (!window.confirm('¿Borrar TODO el progreso? No se puede deshacer.')) return;
  if (!window.confirm('Confírmalo otra vez: ¿borrar todo el progreso?')) return;
  const voz = p.config.voz;
  p = P.estadoInicial();
  p.config.voz = voz;
  guardar();
  irFamiliar();
  avisar('Progreso borrado.');
});

// ── Arranque ─────────────────────────────────────────────
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => { /* sin conexión offline */ });
}
try { navigator.storage?.persist?.(); } catch { /* sin soporte */ }

if (!vozDisponible() && !p.config.voz) { p.config.voz = 'voiceover'; guardar(); }
if (!p.config.voz) irBienvenida();
else irInicio();

// Para las pruebas automáticas
window.__app = { estado: () => p, CUERDAS };
