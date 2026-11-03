# Mi profesor de guitarra

Aplicación web instalable (PWA) para aprender guitarra flamenca desde cero, diseñada para usarse **sin mirar la pantalla**, con VoiceOver en iPad.

- Gratuita, sin anuncios y sin servicios de pago.
- Sin inteligencia artificial ni conexión obligatoria: tras la primera visita funciona sin internet.
- El progreso se guarda solo, en el propio iPad.

## Instalarla en el iPad (una sola vez)

Conviene hacerlo con ayuda de un familiar la primera vez.

1. Abre **Safari** en el iPad y entra en la dirección de la aplicación:
   `https://<usuario>.github.io/mi-profesor-de-guitarra/`
2. Pulsa el botón **Compartir** (el cuadrado con una flecha hacia arriba).
3. Elige **Añadir a pantalla de inicio** y después **Añadir**.
4. A partir de ahora, ábrela **siempre desde el icono «Profesor guitarra»** de la pantalla de inicio, no desde Safari.
   *Importante:* si se usa solo desde Safari, iPadOS puede borrar el progreso tras 7 días sin abrirla. Instalada en la pantalla de inicio, no.
5. La primera vez, la aplicación pregunta quién leerá las explicaciones:
   - **La voz del profesor:** una voz propia de la aplicación. Si se toca la pantalla mientras habla, se calla, para no hablar a la vez que VoiceOver.
   - **VoiceOver:** las explicaciones las lee el propio VoiceOver, con su voz y su velocidad.

   Se puede cambiar en cualquier momento en *Ayuda y configuración*.

**Recomendado:** en *Ajustes → Accesibilidad → Contenido leído → Voces → Español (España)*, descargar una voz «mejorada», como Mónica. La voz del profesor sonará mucho más natural.

## Qué incluye la versión 0.1

- Pantalla de inicio con las 5 opciones. La primera, **Empezar mi clase de hoy**, se acuerda siempre de por dónde va.
- **Clase 1 completa (unos 45 minutos):** partes de la guitarra, posición flamenca, las seis cuerdas, primer sonido con el pulgar, juego de oído, la bajada andaluza y la evaluación.
- En cada paso: Continuar, Repetir, Escuchar ejemplo, Explícamelo de otra forma, Paso anterior, y Pausar y guardar.
- Sonidos de ejemplo sintetizados, sin grabaciones de terceros.
- Mi progreso, hablado y basado solo en lo registrado.
- Repasar lo aprendido.
- Ayuda y configuración: voz, velocidad y volumen.
- Modo familiar: registro detallado, comprobaciones presenciales, repetir clases y copias de seguridad.

Las clases siguientes se irán añadiendo. Mientras no estén, la aplicación lo dice y ofrece repetir la última clase disponible.

## Cómo registra el progreso

Cada habilidad pasa por cuatro estados: **presentado → practicado → comprendido → dominado**.

- **Comprendido** solo se marca por las respuestas del alumno (autoevaluación) o por el juego de oído, que sí lo comprueba la aplicación.
- **Dominado** solo puede marcarlo la evaluación semanal o un familiar que lo haya visto en persona. El código impide marcarlo de otra forma.
- Los minutos de práctica no cuentan los ratos de más de 5 minutos sin tocar la pantalla.

## Para desarrolladores

Es HTML, CSS y JavaScript puro, sin dependencias ni paso de compilación.

```
index.html              estructura de las pantallas
css/app.css             estilo (alto contraste, letra grande)
js/app.js               interfaz, navegación y coordinación de voces
js/progreso.js          registro del progreso (lógica pura)
js/voz.js               voz del profesor (Web Speech API)
js/sonido.js            cuerdas sintetizadas (Karplus-Strong)
js/contenido/           clases y catálogo del programa
sw.js                   funcionamiento sin conexión
tests/                  pruebas automáticas
docs/                   prueba con VoiceOver y tareas pendientes
```

- Probar en local: `python3 -m http.server 8080` y abrir `http://localhost:8080`.
- Pruebas de lógica: `npm test`.
- Pruebas en navegador (necesita Playwright): `npm run test:e2e`.
- **Al publicar cambios**, sube la versión en `sw.js` (`VERSION`) para que los iPad se actualicen.

### Añadir una clase

Crea un archivo en `js/contenido/` con la misma forma que `clase1.js`: pasos y una función `evaluar` que decide qué se registra. Después:

1. Enlázalo en `PROGRAMA`, dentro de `catalogo.js`.
2. Añádelo a la lista de `sw.js`.

### Pruebas automáticas frente a pruebas reales

Las pruebas automáticas comprueban la lógica, el recorrido completo de la clase, el foco, los nombres de los controles y el funcionamiento sin conexión, en Chromium. **No demuestran que la aplicación funcione con VoiceOver.** Eso solo se valida con la prueba real descrita en [`docs/prueba-voiceover.md`](docs/prueba-voiceover.md).
