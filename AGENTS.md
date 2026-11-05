# Instrucciones del proyecto

Este repositorio prepara cuatro vídeos de pregunta del Nou Mestalla. La tarea de preparación no autoriza producirlos: las instrucciones de producción dentro de los prompts son requisitos para las tareas posteriores. La petición vigente del usuario determina qué episodio y qué alcance ejecutar.

## Al comenzar

- Leer README.md, docs/setup/ENTREGA.md, el prompt íntegro del episodio solicitado y su carpeta en docs/episodes/.
- Comprobar el estado de Git y preservar cambios ajenos. Trabajar en el checkout aislado ya proporcionado por el entorno. No crear worktrees salvo petición explícita del usuario.
- Usar Node 24 y `video/package-lock.json`; instalar con `bash scripts/install.sh` cuando falten dependencias. No actualizar versiones por rutina.
- Consultar las skills de `.agents/skills/` pertinentes; el inventario, procedencia y límites están en docs/setup/SKILLS.md. No ejecutar scripts nuevos sin leerlos.

## Producción

- No modificar `dondios-star/velada-laboratorio`. La procedencia de las piezas reutilizadas está registrada; este proyecto es autónomo.
- Los prompts originales y la imagen de marca de la raíz son fuentes conservadas. La paleta y tipografía vigentes están en `video/src/shared/brand/tokens.ts`: burdeos #4B1931, arena #F4EAD8, Anton e Inter. No sustituirlas por los valores provisionales de los prompts.
- Crear cada episodio dentro de `video/src/episodes/epXX/`, sus assets en `video/public/assets/epXX/` y su documentación en `docs/episodes/epXX/`. Registrar solo las composiciones implementadas. No renderizar otros episodios al validar uno.
- Reutilizar componentes comunes; no trasladar personajes, imágenes, textos, ring, marca de plataformas o elementos argumentales de La Velada.
- La escena `StadiumStudy` es una prueba de render. Su geometría no está contrastada y no satisface la identidad arquitectónica exigida para los episodios.
- Todo movimiento depende de un fotograma explícito. Usar el mismo `sourceFrame` para imagen, cámara y comentarios durante el rebobinado. Evitar CSS animations/transitions, relojes, timers, aleatoriedad sin semilla o incrementos en `useFrame`.
- Usar `ThreeCanvas` con dimensiones, cámara y estados calculados de forma absoluta. Las recetas de Three.js para animación en tiempo real deben adaptarse a Remotion.
- Cargar fuentes y assets locales antes de capturar. No importar referencias fotográficas en `public/` sin confirmar sus derechos y finalidad.
- Distinguir fechas de publicación, de fotografía y del estado representado. Los enlaces pendientes del catálogo no equivalen a investigación realizada. Separar recreación, simulación, foto real y render comercial.
- Cada episodio futuro: 1080 × 1920, 60 fps, 59 s, 3540 frames; sin voz; las alternativas no revelan la respuesta. Los modelos, personajes y materiales definitivos se producen en su tarea, no se dan por existentes.

## Verificación y conservación

`npm run typecheck` y `npm test` se ejecutan desde `video/`. Para cambios de render o dependencias ejecutar la prueba breve y `npm run verify`; para un episodio, revisar además su MP4 completo y sus transiciones a escala móvil. No afirmar que se vio un vídeo por haber generado o visto una hoja de contacto.

No versionar node_modules, cachés, secretos ni exportaciones pesadas. Conservar código, lockfile, documentación, fuentes redistribuibles y skills. No fusionar a main ni publicar episodios sin autorización.
