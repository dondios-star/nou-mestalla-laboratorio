# Skills del proyecto

Instalación local en `.agents/skills/`, conservada con Git. Hay **siete nombres únicos**. El [lock](skills-lock.json) registra URL, commit completo, rutas y SHA-256 de los archivos; no se ejecutó un instalador remoto ni se instaló nada globalmente.

Se conservan los archivos de terceros sin normalizar su formato, incluidos espacios Markdown y ejemplos. La comprobación de whitespace del código propio excluye esa carpeta; su integridad se comprueba con los hashes del lock.

| Skill | Origen | Uso en esta base |
| --- | --- | --- |
| `remotion-best-practices` | remotion-dev/skills, `a2824c6` | Creación, markup, fuentes locales, 3D, composiciones y render |
| `smooth-motion-choreography` | paldom/storytelling-animation, `2c6dd34` | Curvas suaves, pausas y continuidad de objetos |
| `animation-frame-qa` | paldom/storytelling-animation, `2c6dd34` | Muestreo del MP4 y comprobación a escala móvil |
| `threejs-geometry` | CloudAI-X/threejs-skills, `0e18186` | Geometría procedural de prueba |
| `threejs-performance` | CloudAI-X/threejs-skills, `0e18186` | Instancias de columnas, recursos reutilizados y coste de render |
| `threejs-react-three-fiber` | CloudAI-X/threejs-skills, `0e18186` | Cámara y ciclo de recursos de ThreeCanvas |
| `threejs-materials-lighting` | gamedev-skills/awesome-gamedev-agent-skills, `19d93f9` | Materiales simples, luz direccional y sombras |

Se leyó el SKILL.md de cada paquete. Referencias aplicadas: `motion-vocabulary.md`, `loops-and-transitions.md`, `review-checklist.md`, `materials-lights-table.md`; en Remotion, creación, markup y render y sus guías `3d.md`, `local-fonts.md` y `compositions.md`. Se leyeron íntegros `lint_motion.py` y `qa_frames.py`; se ejecutó el primero. El resto de scripts y plantillas incluidos no se han ejecutado y deben leerse antes de usarse. Esto no es una auditoría general de todo el código de terceros.

El paquete oficial Remotion incluye sus módulos como `REFERENCE.md`; no se instalaron otra vez como skills independientes. Su documentación declara versión 4.0.541; la aplicación mantiene 4.0.540, alineada entre todos los paquetes Remotion y verificada con el render. No se ha actualizado la aplicación solo para igualar la versión de una guía.

Los ejemplos de Three.js orientados a tiempo real, `useFrame`, WebGPU o bucles propios **no se trasladan literalmente**. Esta base usa WebGL, valores absolutos derivados del fotograma y render por software. Las skills no aportan modelos, GPU ni permiso de uso de imágenes.

## Licencias

Paldom y CloudAI-X: MIT, conservada en sus carpetas. Gamedev: Apache-2.0, conservada. El repositorio de skills Remotion no contiene un archivo de licencia independiente en el commit revisado; se conserva una nota y una copia de la licencia del proyecto principal como referencia, sin atribuirle licencia MIT ni presentarla como concesión independiente. No se compraron servicios ni modelos.

## Disponibles y candidatas

En el catálogo de esta conversación están las skills personales `buscar-skills`, `viral-hooks`, `scenario-generation`, `storyboard`, `motion-editorial`, `motion-interfaces` y `motion-movil-agenda`. `buscar-skills` se aplicó a la revisión e instalación. Las demás son pautas para la futura producción, no herramientas necesarias para arrancar el motor. No se inventaron paquetes públicos ni se crearon copias duplicadas de esas skills de nube. Su disponibilidad deberá comprobarse en cada nueva conversación; los cuatro prompts conservan los requisitos editoriales necesarios aunque alguna no esté accesible.

`threejs-materials` y `threejs-lighting` no se instalaron separadamente: la necesidad actual queda cubierta por `threejs-materials-lighting`. `threejs-gltf-loading`, `threejs-loaders`, `threejs-asset-pipeline`, `threejs-animation`, `threejs-textures`, `threejs-shaders` y `threejs-postprocessing` quedan como candidatas. Solo se revisarán e instalarán si el modelo, los personajes o un efecto del episodio las necesitan. Esta prueba no carga GLB, rigs ni texturas externas.

Los cuatro episodios comparten este inventario. Cada tarea debe registrar solo las skills que realmente aplique y las incorporaciones nuevas, sin copiar de nuevo las siete carpetas.
