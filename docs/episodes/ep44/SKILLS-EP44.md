# Skills realmente utilizadas en EP44

No se instalaron paquetes adicionales, skills duplicadas ni servicios externos. Se reutilizan las siete carpetas ya conservadas en `.agents/skills/`; no se declara aplicada una candidata por aparecer en el prompt. El lock completo, licencias y hashes están en `docs/setup/skills-lock.json`. Node 24.22.1; Remotion 4.0.540, Three 0.187.0, React Three Fiber 9.8.2. Se mantiene el lockfile existente.

| Skill / estado | Origen y versión comprobada en el proyecto | Lectura y aplicación |
|---|---|---|
| remotion-best-practices / disponible y aplicada | remotion-dev/skills, `a2824c67f8b4585c294a8101db9f9f0ad3c643f8` | Guías 3d, compositions, multi-scene-video, render; router/create/markup de la skill cloud 4.0.534. ThreeCanvas y metadatos explícitos, fuentes locales, render nativo. Documentación local 4.0.541, no confundida con versión ejecutada 4.0.540 |
| smooth-motion-choreography / instalada, leída, aplicada | paldom/storytelling-animation, `2c6dd3408ac13d3695cf3246da16b1c671a1ed30` | SKILL.md, motion-vocabulary y script `lint_motion.py` íntegro antes de ejecutar. Entradas cortas, pausa quieta, curvas limitadas, sin copiar una plantilla encima del proyecto |
| animation-frame-qa / instalada, leída, aplicada como método | Mismo commit de paldom | SKILL.md y review-checklist. Inspección de frames decodificados, lectura a 390 px, límites de transición. Se usa el script propio `ep44-qa.py`, no se ejecuta `qa_frames.py` de terceros |
| threejs-materials-lighting / instalada, leída, aplicada | gamedev-skills/awesome-gamedev-agent-skills, `19d93f97c9c1ea0f8b306e77aa81e0d3e352d3e9` | SKILL.md y materials-lights-table. Materiales mates/metal/goma, grano procedural, iluminación y sombras con PCF compatible |
| threejs-performance / instalada, leída, aplicada | CloudAI-X/threejs-skills, `0e181866f095b5f06d005133876e926515390d95` | SKILL.md íntegro. Geometría estática fusionada por material; se midió la prueba y se prerenderizaron capas a resolución nativa para evitar repetir el coste de 3D por software |
| threejs-react-three-fiber / instalada, leída, aplicada | Mismo commit de CloudAI-X | SKILL.md, ciclo de recursos, cámara y primitivas. Se descartan bucles en tiempo real, useFrame y resoluciones adaptativas. La advertencia de Three.Clock procede de Fiber, no anima la escena |
| threejs-geometry / instalada previamente, no aplicada como skill en esta tarea | Mismo commit de CloudAI-X | Conservada. La geometría se implementa con APIs del motor instalado; no se declara una lectura nueva íntegra |

## Skills personales cloud

Leídas en sus localizadores nativos de la sesión. No se copiaron como una falsa instalación local ni se inventaron commits de paquetes personales.

- `viral-hooks` (`6ae89251d72c8191a3a7bbe841533d45`): SKILL.md y upstream-SKILL.md íntegros; comparar G1/G2/G3, claridad del objeto, pregunta abierta y continuidad de promesa. No se promete viralidad.
- `scenario-generation` (`6ae892f9796c8191bcd2ce46d8128be4`): SKILL.md y upstream-SKILL.md; separar hechos/supuestos y documentar recomendación condicionada fuera del vídeo.
- `storyboard` (`6ae8938bf9a0819182fcc95594d7bd92`): SKILL.md y upstream-SKILL.md; timeline de 3540 frames, lectura desde asentamiento, tres pruebas antes de decidir.
- `motion-editorial` (`6ae8beb11d6c8191b7c8572d79fb08db`), `motion-interfaces` (`6ae8beff299481918d7e8c686815535f`) y `motion-movil-agenda` (`6ae8bf5ec6448191a4fff61fe0eeb7ab`): SKILL.md y references/provenance.md de cada una. Marca vigente, un marco de teléfono, relevo del adjunto, distinguir oferta/reserva/ejecución. La procedencia de estas adaptaciones cita `yihui-dev/awesome-opus5-5-videos` commit `92aee2f586ac0715cb3cbcb6384834f98a33383d`; no se ejecutan sus ejemplos ni se afirma auditar ese repositorio.
- `buscar-skills` (`6ae7a38218f881918725ff9f40fb8f43`): SKILL.md; inventario primero, distinguir instalado/leído/aplicado. Las capacidades necesarias ya están disponibles, por lo que no se ejecuta un instalador ni se añade otra candidata por rutina.
- `cloud-environment-runtime`: SKILL.md y references/networking.md; estado del entorno, proxy y política vigente, sin leer valores de credenciales. La red observada es unrestricted/enforced. Los comandos de Chromium/red se ejecutan con la capacidad de red del sandbox habilitada.

## Adaptaciones y límites

La petición de 60 fps, un solo episodio y MP4 final prevalece sobre valores de ejemplo. La cámara se detiene durante lectura; la escena 3D se evalúa desde un frame explícito y se reutiliza hacia atrás. No se contrata audio ni se instala GLTF: los modelos son propios. No se ejecuta publicación o prueba en redes; no se valida una plataforma externa por hacer un render local. La revisión por fotogramas y la reproducción técnica se distinguen de ver el MP4 de manera continua.
