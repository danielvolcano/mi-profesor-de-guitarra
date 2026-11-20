# Mi profesor de guitarra

Aplicación web instalable (PWA) para aprender guitarra flamenca desde cero, diseñada para usarse **sin mirar la pantalla**, con VoiceOver en iPad.

- Gratuita, sin anuncios y sin servicios de pago.
- Sin inteligencia artificial ni conexión obligatoria: tras la primera visita funciona sin internet.
- El progreso se guarda solo, en el propio iPad.

## Instalarla en el iPad (una sola vez)

Conviene hacerlo con ayuda de un familiar la primera vez.

1. Abre **Safari** en el iPad y entra en la dirección de la aplicación:
   `https://danielvolcano.github.io/mi-profesor-de-guitarra/`
2. Pulsa el botón **Compartir** (el cuadrado con una flecha hacia arriba).
3. Elige **Añadir a pantalla de inicio** y después **Añadir**.
4. A partir de ahora, ábrela **siempre desde el icono «Profesor guitarra»** de la pantalla de inicio, no desde Safari.
   *Importante:* si se usa solo desde Safari, iPadOS puede borrar el progreso tras 7 días sin abrirla. Instalada en la pantalla de inicio, no.
5. La primera vez, la aplicación pregunta quién leerá las explicaciones:
   - **La voz del profesor:** una voz propia de la aplicación. Si se toca la pantalla mientras habla, se calla, para no hablar a la vez que VoiceOver.
   - **VoiceOver:** las explicaciones las lee el propio VoiceOver, con su voz y su velocidad.

   Se puede cambiar en cualquier momento en *Ayuda y configuración*.

**Recomendado:** en *Ajustes → Accesibilidad → Contenido leído → Voces → Español (España)*, descargar una voz «mejorada», como Mónica. La voz del profesor sonará mucho más natural.

## Qué incluye la versión 0.3

Diez clases de unos 45 minutos, de la semana 1 al comienzo de la semana 4:

| Clase | Semana | Contenido |
|---|---|---|
| 1 | 1 | Conocer la guitarra: partes, posición flamenca, las seis cuerdas |
| 2 | 1 | Las cuerdas por su número y por su sonido |
| 3 | 1 | **Evaluación de la semana 1**: 11 de 12 cuerdas salteadas a la primera |
| 4 | 2 | El pulgar flamenco (pulgar apoyado) |
| 5 | 2 | Índice y medio, alternando |
| 6 | 2 | Pulso con palmas. **Evaluación de la semana 2**: secuencia 6-4-3-2 al pulso, como mucho una parada |
| 7 | 3 | Qué es un traste: cejuela, mano izquierda y la primera nota pisada (fa) |
| 8 | 3 | Notas limpias: sol, y la escala mi-fa-sol |
| 9 | 3 | **Evaluación de la semana 3**: dictado de 10 notas, al menos 8 limpias |
| 10 | 4 | La bajada andaluza: la, sol, fa, mi, con palmas |

- Si una evaluación semanal no se supera, la clase se repite. La aplicación nunca avanza solo porque haya pasado el tiempo.
- Palmas sintetizadas al pulso, con cuatro palmas de entrada y el «uno» más fuerte.
- Juegos de oído en casi todas las clases: grave o aguda, cuerdas concretas y notas (mi, fa, sol, la).
- *Practicar una canción*: tras la clase 10, permite tocar la bajada andaluza con palmas.
- En cada paso: Continuar, Repetir, Escuchar ejemplo, Explícamelo de otra forma, Paso anterior, y Pausar y guardar.
- Mi progreso, hablado y basado solo en lo registrado.
- Modo familiar: incluye las evaluaciones semanales con su criterio.
- Ajuste de la pausa antes de que hable el profesor, para que no se solape con VoiceOver.

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
