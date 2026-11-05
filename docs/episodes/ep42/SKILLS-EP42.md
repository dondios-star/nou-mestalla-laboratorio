# Skills realmente aplicadas

No se instalaron dependencias ni skills adicionales; se usaron las versiones disponibles. No se actualizaron los paquetes del lockfile. No se ejecutaron instaladores remotos ni se incorporaron servicios de pago.

| Skill | Procedencia / revisión | Lectura y uso |
| --- | --- | --- |
| Remotion best practices, create y markup | Nube 4.0.534 y copia local de remotion-dev/skills `a2824c67f8b4585c294a8101db9f9f0ad3c643f8` (guía 4.0.541) | Router, creación, markup; referencias locales `3d.md`, `compositions.md`, `video-layout.md`, render. Se mantuvo Remotion 4.0.540 y Chromium configurado/probado por el proyecto. ThreeCanvas con dimensiones explícitas y estados por frame. |
| smooth-motion-choreography | paldom/storytelling-animation `2c6dd3408ac13d3695cf3246da16b1c671a1ed30`, MIT | SKILL.md, vocabulario de movimiento y script completo `lint_motion.py`. Curvas quintic existentes, pausas, entradas agrupadas y rebobinado. No se copiaron presets de 30 fps ni se sustituyó el proyecto por plantillas. |
| animation-frame-qa | Mismo commit de Paldom, MIT | SKILL.md, checklist y script completo `qa_frames.py`. Fotogramas del MP4, lectura a 390 px, cambios de luminancia y revisión registrada. Las hojas de contacto no se confunden con reproducción completa. |
| threejs-geometry | CloudAI-X/threejs-skills `0e181866f095b5f06d005133876e926515390d95`, MIT | SKILL.md: BufferGeometry, caras con normales, reutilización y geometría agrupada. Gradas con espesor, aberturas y fachadas propias. |
| threejs-performance | Mismo commit de CloudAI-X, MIT | SKILL.md: geometrías agrupadas, coste de sombras y memoria. Se cachean renders estáticos nativos de la propia geometría. No se trasladan bucles de tiempo real/WebGPU. |
| threejs-materials-lighting | gamedev-skills `19d93f97c9c1ea0f8b306e77aa81e0d3e352d3e9`, Apache-2.0 | SKILL.md: material mate, luz de día, relleno y PCFShadowMap. Misma cámara/luz para A/B/C. No se usa un HDR externo ni postproducción para ocultar defectos. |
| motion-editorial | Skill personal en nube; adaptación de referencia `92aee2f586ac0715cb3cbcb6384834f98a33383d` | SKILL.md y `references/provenance.md`. Foco por escena, separación entre hechos y ficción, marca actual y revisión real. No se ejecutaron comandos del anuncio de referencia. |
| motion-movil-agenda | Skill personal en nube, misma revisión de referencia | SKILL.md y `references/provenance.md`. Móvil común, contactos ficticios, notificaciones, mensaje completo y agenda sin fechas inventadas. |
| cloud-environment-runtime | Plugin de entorno de nube | SKILL.md y `references/networking.md`. Estado del entorno y política de red; sin leer ni imprimir credenciales. |

Las licencias y hashes de las skills locales se mantienen en `.agents/skills/` y `docs/setup/skills-lock.json`. No se declara una auditoría global de todos los recursos o enlaces upstream. `viral-hooks`, `scenario-generation`, `storyboard`, `motion-interfaces`, `buscar-skills` y otras skills de Three.js permanecen disponibles/candidatas; no se presentan como aplicadas ni instaladas por esta tarea.
