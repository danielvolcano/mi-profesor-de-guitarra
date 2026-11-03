// Pruebas automáticas en navegador (Chromium). NO sustituyen la prueba real con VoiceOver en el iPad.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require(`${execSync('npm root -g').toString().trim()}/playwright`)); }
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const PUERTO = 8765;
const URL_APP = `http://localhost:${PUERTO}/`;
const servidor = spawn('python3', ['-m', 'http.server', String(PUERTO)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 800));
mkdirSync('tests/capturas', { recursive: true });

// Sustituye la voz por un registro, para comprobar qué diría el profesor.
const STUB_VOZ = () => {
  window.__dicho = [];
  class U { constructor(t) { this.text = t; } }
  window.SpeechSynthesisUtterance = U;
  const synth = {
    getVoices: () => [{ name: 'Mónica', lang: 'es-ES' }],
    speak(u) { window.__dicho.push(u.text); setTimeout(() => u.onend && u.onend(), 5); },
    cancel() {}, addEventListener() {},
  };
  Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true });
};

let fallos = 0;
async function prueba(nombre, fn) {
  try { await fn(); console.log(`ok - ${nombre}`); } catch (e) { fallos++; console.log(`FALLO - ${nombre}\n   ${e.message}`); }
}

// Comprobaciones básicas de accesibilidad del código (no sustituyen a VoiceOver real):
// un solo h1 visible, ids únicos, todos los controles visibles con nombre accesible
// y controles de al menos 44 puntos (recomendación de Apple).
async function axe(page, donde) {
  const problemas = await page.evaluate(() => {
    const p = [];
    const vis = (el) => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    const h1 = [...document.querySelectorAll('h1')].filter(vis);
    if (h1.length !== 1) p.push(`hay ${h1.length} h1 visibles`);
    const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
    const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dup.length) p.push(`ids duplicados: ${dup}`);
    for (const el of document.querySelectorAll('button, input, a[href], [role=button]')) {
      if (!vis(el)) continue;
      const nombre = (el.getAttribute('aria-label') || el.textContent || el.closest('label')?.textContent || '').trim();
      if (!nombre) p.push(`control sin nombre: ${el.outerHTML.slice(0, 60)}`);
      const r = el.getBoundingClientRect();
      if (el.tagName === 'BUTTON' && r.height < 44) p.push(`botón pequeño: ${nombre}`);
      if (el.closest('[aria-hidden=true]')) p.push(`control oculto a VoiceOver: ${nombre}`);
    }
    for (const g of document.querySelectorAll('[role=group]')) if (vis(g) && !g.getAttribute('aria-label')) p.push('grupo sin nombre');
    for (const fs of document.querySelectorAll('fieldset')) if (vis(fs) && !fs.querySelector('legend')) p.push('fieldset sin legend');
    return p;
  });
  assert.deepEqual(problemas, [], `accesibilidad en ${donde}: ${problemas.join(' | ')}`);
}

const navegador = await chromium.launch();
const contexto = await navegador.newContext({ viewport: { width: 820, height: 1180 }, locale: 'es-ES' });
await contexto.addInitScript(STUB_VOZ);
const page = await contexto.newPage();
const errores = [];
page.on('pageerror', (e) => errores.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()); });

const foco = () => page.evaluate(() => document.activeElement?.id || document.activeElement?.textContent?.trim());
const tituloPaso = () => page.textContent('#paso-titulo');
const visible = (sel) => page.isVisible(sel);
const dicho = () => page.evaluate(() => window.__dicho.join(' '));
const espera = (ms = 120) => page.waitForTimeout(ms);

await page.goto(URL_APP);

await prueba('primera vez: pantalla de bienvenida accesible, con el foco en el título', async () => {
  assert.ok(await visible('#p-bienvenida'));
  assert.equal(await page.title(), 'Mi profesor de guitarra');
  assert.equal(await page.getAttribute('html', 'lang'), 'es-ES');
  await axe(page, 'bienvenida');
});

await prueba('elegir voz del profesor lleva al inicio con 5 opciones en orden', async () => {
  await page.click('#b-elegir-profesor');
  assert.ok(await visible('#p-inicio'));
  const botones = await page.$$eval('#p-inicio button', (bs) => bs.map((b) => b.textContent));
  assert.deepEqual(botones, ['Empezar mi clase de hoy', 'Repasar lo aprendido', 'Practicar una canción', 'Consultar mi progreso', 'Ayuda y configuración']);
  assert.equal(await page.evaluate(() => document.activeElement.tagName), 'H1');
  await axe(page, 'inicio');
  await page.screenshot({ path: 'tests/capturas/inicio.png' });
});

await prueba('progreso sin clases: no inventa nada', async () => {
  await page.click('#b-progreso');
  assert.match(await page.textContent('#texto-cuerpo'), /Todavía no has hecho ninguna clase/);
  await page.click('#b-texto-volver');
});

await prueba('empezar clase: el profesor saluda y el foco va al paso', async () => {
  await page.click('#b-clase');
  assert.match(await tituloPaso(), /^Paso 1 de \d+\. Bienvenida/);
  assert.equal(await foco(), 'paso-titulo');
  await page.waitForFunction(() => window.__dicho.some((t) => t.startsWith('Buenos días')), null, { timeout: 4000 });
  assert.equal(await page.getAttribute('#paso-texto', 'aria-hidden'), 'true'); // no lo lee VoiceOver a la vez
  assert.ok(!(await visible('#b-anterior')));
  await axe(page, 'clase');
  await page.screenshot({ path: 'tests/capturas/clase.png' });
});

await prueba('continuar mantiene el foco en Continuar (VoiceOver no habla encima)', async () => {
  await page.focus('#b-continuar');
  await page.click('#b-continuar');
  assert.match(await tituloPaso(), /^Paso 2 /);
  assert.equal(await foco(), 'b-continuar');
});

await prueba('repetir, paso anterior y otra explicación', async () => {
  await page.click('#b-repetir');
  await page.click('#b-otra');
  assert.match(await page.textContent('#paso-texto'), /En resumen/);
  await page.click('#b-anterior');
  assert.match(await tituloPaso(), /^Paso 1 /);
  await page.click('#b-continuar');
});

await prueba('pausar, recargar y retomar en el mismo paso', async () => {
  await page.click('#b-continuar'); // paso 3
  await page.click('#b-pausar');
  assert.ok(await visible('#p-inicio'));
  assert.equal(await page.textContent('#b-clase'), 'Continuar mi clase de hoy');
  await page.reload();
  assert.equal(await page.textContent('#b-clase'), 'Continuar mi clase de hoy');
  await page.click('#b-clase');
  assert.match(await tituloPaso(), /^Paso 3 /);
});

await prueba('recorrer la clase completa: preguntas, juego de oído y evaluación', async () => {
  let vueltas = 0;
  while (vueltas++ < 80) {
    await espera(30);
    if (await visible('#p-texto')) break;
    if (await visible('#b-escuchar-juego')) {
      await page.click('#b-escuchar-juego');
      const ultimo = await page.evaluate(() => window.__ultimoSonido[0]);
      const grave = ['E2', 'A2', 'D3'].includes(ultimo);
      await page.click(`#paso-opciones button:text-is("${grave ? 'Grave' : 'Aguda'}")`);
      continue;
    }
    if (await visible('#paso-opciones')) {
      const titulo = await tituloPaso();
      if (/orientación/.test(titulo) && !(await page.evaluate(() => window.__ya))) {
        await page.evaluate(() => { window.__ya = true; });
        await page.click('#paso-opciones button:text-is("No, la más gruesa está abajo")');
        assert.equal(await page.textContent('#b-continuar'), 'Intentarlo otra vez');
        assert.equal(await foco(), 'b-continuar');
        await page.click('#b-continuar');
        assert.ok(await visible('#paso-opciones'), 'tras Intentarlo otra vez se repite la pregunta');
        continue;
      }
      // Sí en todo salvo la tercera cuerda (duda)
      const etiqueta = /tercera/.test(titulo) ? 'No estoy seguro' : null;
      if (etiqueta) await page.click(`#paso-opciones button:text-is("${etiqueta}")`);
      else await page.click('#paso-opciones button >> nth=0');
      continue;
    }
    if (await visible('#b-ejemplo')) await page.click('#b-ejemplo');
    await page.click('#b-continuar');
  }
  assert.ok(await visible('#p-texto'), 'debe llegar a Clase terminada');
  assert.equal(await page.textContent('#texto-titulo'), 'Clase terminada');
  const texto = await page.textContent('#texto-cuerpo');
  assert.match(texto, /acertado 4 de 4/);
  assert.match(texto, /tercera cuerda/);
  assert.match(texto, /Tu progreso se ha guardado/);
  await axe(page, 'clase terminada');
});

await prueba('el registro es honesto: practicado y dificultades, nada dominado', async () => {
  const p = await page.evaluate(() => window.__app.estado());
  assert.equal(p.claseActual, 's1c2');
  assert.equal(p.habilidades.cuerdas.estado, 'practicado');
  assert.equal(p.habilidades.graveAguda.estado, 'comprendido');
  assert.ok(Object.values(p.habilidades).every((h) => h.estado !== 'dominado'));
  assert.deepEqual(p.dificultades.map((d) => d.id).sort(), ['cuerda-tercera', 'orientacion']);
  assert.equal(p.sesiones.filter((s) => s.completada).length, 1);
});

await prueba('mi progreso habla solo de lo registrado', async () => {
  await page.click('#b-texto-volver');
  await page.click('#b-progreso');
  const t = await page.textContent('#texto-cuerpo');
  assert.match(t, /Esta semana has practicado un día/);
  assert.match(t, /Todavía necesitas practicar encontrar la tercera cuerda/);
  assert.match(t, /Tu próxima clase es la 2/);
  assert.doesNotMatch(t, /Dominas/);
  await page.click('#b-texto-volver');
});

await prueba('la clase 2 aún no existe: lo dice y ofrece repetir la clase 1', async () => {
  await page.click('#b-clase');
  assert.match(await page.textContent('#texto-cuerpo'), /estará disponible muy pronto/);
  await page.click('#texto-acciones button >> nth=0');
  assert.match(await tituloPaso(), /^Paso 1 /);
  await page.click('#b-pausar');
});

await prueba('repasar lo aprendido muestra los conceptos ya vistos', async () => {
  await page.click('#b-repaso');
  const conceptos = await page.$$eval('#texto-acciones button', (bs) => bs.map((b) => b.textContent));
  assert.ok(conceptos.includes('Las seis cuerdas'));
  await page.click('#texto-acciones button:text-is("Las seis cuerdas")');
  assert.equal(await page.textContent('#b-texto-volver'), 'Volver a Repasar');
  await axe(page, 'concepto');
  await page.click('#b-texto-volver');
  await page.click('#b-texto-volver');
});

await prueba('ayuda: cambiar a modo VoiceOver hace que el foco vaya al texto de la clase', async () => {
  await page.click('#b-ayuda');
  await axe(page, 'ayuda');
  await page.check('input[name=voz][value=voiceover]');
  await page.click('#p-ayuda .volver');
  await page.click('#b-clase');
  await espera(300);
  assert.equal(await foco(), 'paso-texto');
  assert.equal(await page.getAttribute('#paso-texto', 'aria-hidden'), 'false');
  await page.click('#b-pausar');
});

await prueba('modo familiar: registro, comprobación y copia', async () => {
  await page.click('#b-ayuda');
  await page.click('#b-familiar');
  await page.click('#texto-acciones button');
  assert.ok(await visible('#p-familiar'));
  assert.match(await page.textContent('#familiar-registro'), /Sesiones/);
  page.once('dialog', (d) => d.accept());
  await page.click('#familiar-habilidades button >> nth=0');
  const p = await page.evaluate(() => window.__app.estado());
  const dominadas = Object.values(p.habilidades).filter((h) => h.estado === 'dominado');
  assert.equal(dominadas.length, 1);
  assert.equal(dominadas[0].historial.at(-1).fuente, 'familiar');
  await axe(page, 'familiar');
});

await prueba('funciona sin conexión tras la primera visita', async () => {
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await espera(500);
  await contexto.setOffline(true);
  await page.reload();
  assert.ok(await visible('#p-inicio'));
  await page.click('#b-clase');
  assert.ok(await visible('#p-clase'));
  await contexto.setOffline(false);
});

await prueba('sin errores en la consola', async () => {
  assert.deepEqual(errores, []);
});

await navegador.close();
servidor.kill();
console.log(fallos ? `\n${fallos} prueba(s) fallida(s)` : '\nTodas las pruebas automáticas han pasado');
process.exit(fallos ? 1 : 0);
