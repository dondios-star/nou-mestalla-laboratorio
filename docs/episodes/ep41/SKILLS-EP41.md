# Skills utilizadas · episodio 41

Consulta: 2026-11-05. Se distingue disponibilidad cloud de instalación local. No se actualizaron dependencias ni lockfile: Node 24, Remotion 4.0.540, Three.js 0.187.0 y React Three Fiber 9.8.2. Los ejemplos se adaptaron a esas versiones.

## Skills personales y cloud

Disponibles mediante `skills.read`, revisadas y aplicadas, sin instalación local. Para las adaptaciones personales el proveedor no expone commit inmutable ni licencia independiente: se registra el paquete en vez de inventarlos.

| Skill / paquete de sesión | Archivos leídos | Aplicación |
|---|---|---|
| buscar-skills · `c9/6ae7a38218f881918725ff9f40fb8f43/buscar-skills` | SKILL.md | Localizar las dos capacidades ausentes y revisar procedencia, commits y licencias. |
| viral-hooks · `c9/6ae89251d72c8191a3a7bbe841533d45/viral-hooks` | SKILL.md y references/upstream-SKILL.md | Frame 0, conflicto edad/estructura, sin promesas de viralidad. |
| scenario-generation · `c9/6ae892f9796c8191bcd2ce46d8128be4/scenario-generation` | SKILL.md y references/upstream-SKILL.md | Pruebas previas, ventajas/costes y solución condicionada reservada. |
| storyboard · `c9/6ae8938bf9a0819182fcc95594d7bd92/storyboard` | SKILL.md y references/upstream-SKILL.md | Quince escenas, lectura y continuidad. |
| motion-editorial · `c9/6ae8beb11d6c8191b7c8572d79fb08db/motion-editorial` | SKILL.md y references/provenance.md | Jerarquía, identidad, cámara común y revisión de encuadres. |
| motion-interfaces · `c9/6ae8beff299481918d7e8c686815535f/motion-interfaces` | SKILL.md y references/provenance.md | Venta→correo, pestañas persistentes y ampliación del adjunto. |
| Remotion · `c8/remotion-best-practices`, `c8/remotion-create`, `c8/remotion-markup` | Páginas principales de los tres paquetes | ThreeCanvas, secuencias y render por frame. Documentación cloud 4.0.534. |
| cloud-environment-runtime · `c6/cloud-environment-runtime` | SKILL.md y referencia networking | Política de red y ejecución del navegador en el entorno autorizado. |

`c9` = `skill://user`; `c8` = `skill://plugins~Plugin_efd07789186881918253a50acfc32762`; `c6` = `skill://plugin_connector_1p_c5b7d5df5d7081918f2c4be5a633ed5d`.

Las dos skills motion personales declaran adaptación del 2026-11-02 de `yihui-dev/awesome-opus5-5-videos`, commit `92aee2f586ac0715cb3cbcb6384834f98a33383d`, MIT. Se aplicaron instrucciones; no se ejecutaron scripts ni se copiaron marcas de ese repositorio. Las referencias upstream de las otras skills personales se leyeron; no se presentan sus umbrales orientativos como evidencia empírica.

## Skills locales

En `.agents/skills/`. Procedencia y hashes completos en `skills-lock.json` de esta carpeta; se conserva el registro anterior en `docs/setup/skills-lock.json`.

| Skill | Procedencia / versión / licencia | Estado, lectura y aplicación |
|---|---|---|
| remotion-best-practices | remotion-dev/skills · `a2824c67f8b4585c294a8101db9f9f0ad3c643f8` · sin LICENSE propio en ese commit; nota y licencia del proyecto Remotion conservadas | Ya instalada. Leídos SKILL y módulos 3d, compositions, multi-scene-video y render. Snapshot 4.0.541; runtime 4.0.540 preservado. Composiciones, ThreeCanvas y exportación. |
| smooth-motion-choreography | paldom/storytelling-animation · `2c6dd3408ac13d3695cf3246da16b1c671a1ed30` · MIT | Ya instalada. Leídos SKILL, motion-vocabulary, loops-and-transitions y lint_motion.py. Curvas, asentamiento y caja compartida. Linter ejecutado: cero errores, dos avisos por duraciones literales 108/72 exigidas por el brief. |
| animation-frame-qa | Mismo repositorio/commit · MIT | Ya instalada. Leídos SKILL y review-checklist. Revisión de frames decodificados a 390 px y veredictos separados de métricas. No se ejecutó qa_frames.py; se escribió ep41-verify.py. |
| threejs-materials-lighting | gamedev-skills/awesome-gamedev-agent-skills · `19d93f97c9c1ea0f8b306e77aa81e0d3e352d3e9` · Apache-2.0 | Ya instalada. SKILL y materials-lights-table leídos. Hormigón no metálico, rugosidad, relleno y sombras PCF. |
| threejs-gltf-loading | Mismo repositorio/commit · Apache-2.0 | Encontrada, revisada e instalada en ep41. SKILL, loaders-and-animation y licencia leídos. Evaluada, sin carga glTF aplicada: geometría propia y aficionado 2D, sin rig externo. |
| threejs-animation | CloudAI-X/threejs-skills · `0e181866f095b5f06d005133876e926515390d95` · MIT | Encontrada, revisada e instalada en ep41. SKILL completo y licencia leídos. Estados absolutos de cámara/pose; sin mixer, esqueleto ni deltas. |
| threejs-performance | Mismo repositorio/commit · MIT | Ya instalada. SKILL completo leído. Instancias estáticas, materiales compartidos y render medido con SwiftShader. |

`threejs-geometry` y `threejs-react-three-fiber` permanecen instaladas desde la preparación; no se contabilizan como nueva aplicación en ep41. Los recursos auxiliares no consultados no se presentan como auditados.

## Instalación, conservación y límites

Solo se añadieron `threejs-animation` y `threejs-gltf-loading`, desde los commits exigidos, con sus recursos y licencias. Se descargó texto HTTPS; no se ejecutó instalador remoto ni binario de esos repositorios. No se modificó el entorno global, se enviaron secretos o se contrataron servicios. Los scripts propios están versionados y son revisables.

Los originales de las skills se conservan sin adaptación; las decisiones para Remotion están en este documento y en el código. Versionar los paquetes permite recuperarlos tras checkout, pero no garantiza plugins cloud o un entorno ya arrancado en futuras tareas.

La revisión visual usa fotogramas y secuencias decodificadas, junto con métricas del archivo. Una hoja de contacto no acredita reproducción a velocidad normal. QA-EP41.md distingue lo inspeccionado de esa limitación. No se publicó una prueba en redes.
