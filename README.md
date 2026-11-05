# Nou Mestalla · laboratorio de vídeo

Base común para los episodios **41, 42, 44 y 45** de Alberto Villa. Los cuatro prompts originales y la referencia de marca se conservan en la raíz. **El episodio 45 está implementado en su rama propia**; los episodios 41, 42 y 44 siguen pendientes y se conservan sin cambios. [Entrega, render y límites de revisión del 45](docs/episodes/ep45/README.md).

Composiciones: `NouMestalla45AforoDecision` (59 s) y `BaseTecnica` (prueba de cinco segundos con geometría provisional). La prueba técnica se conserva; el episodio tiene sus propios modelos y recursos.

## Arranque

Requisitos del entorno probado: Node 24, npm 11, Chromium, Python 3, FFmpeg/ffprobe. Blender está disponible como herramienta opcional. No hace falta una API de IA ni una GPU dedicada.

```bash
bash scripts/install.sh
cd video
npm run studio
```

Validación completa y exportación de la prueba:

```bash
cd video
npm run validate
# Con Studio en marcha, comprobar visor, fuentes y WebGL:
npm run check:studio
```

El MP4 se genera en `video/out/validation/Base_Tecnica_5s.mp4`. Las exportaciones y dependencias se excluyen de Git.

## Organización

| Ruta | Contenido |
| --- | --- |
| `video/src/shared/` | Marca, animación por fotograma, comentarios, móvil y estudio 3D |
| `video/src/validation/` | Prueba técnica, independiente de los episodios |
| `video/src/episodes/ep{41,42,44,45}/` | Contrato y código independiente de cada futuro episodio |
| `video/public/assets/ep{41,42,44,45}/` | Recursos preparados para el render de cada episodio |
| `video/public/fonts/` | Anton e Inter locales, con licencias OFL |
| `referencias/comunes/` | Marca, procedencia del vídeo anterior y catálogo de fuentes del estadio |
| `referencias/episodios/ep{41,42,44,45}/` | Referencias particulares, sin duplicar la biblioteca común |
| `docs/episodes/` | Requisitos y punto de partida de las cuatro conversaciones |
| `.agents/skills/` | Siete skills revisadas y conservadas con sus recursos |

## Estado de la preparación

El render y el visor funcionan con **SwiftShader por software**. Se comprobó H.264, 1080 × 1920, 60 fps, 300 fotogramas, decodificación completa y estabilidad al solicitar fotogramas fuera de orden. Evidencias y límites: [VALIDACION.md](docs/setup/VALIDACION.md).

Se pudo leer el [proyecto editable de La Velada](https://github.com/dondios-star/velada-laboratorio). Se adaptaron componentes genéricos y se copiaron las fuentes con licencia; no se copiaron personajes, planos, escenas, vídeos ni contenido argumental. El repositorio original no se modificó. [Registro de reutilización](docs/setup/REUTILIZACION.md).

Durante la preparación inicial faltaba acceso web. En la producción del 45 se inspeccionó la carpeta `Imágenes`, ya incorporada a main, y se consultaron fuentes oficiales con acceso de red disponible. [Investigación y permisos del 45](docs/episodes/ep45/fuentes.md). El [catálogo común](referencias/comunes/nou-mestalla/catalogo.json) conserva candidatos históricos; no equivale a una investigación completada para los otros episodios.

El adjunto de 53 segundos supera los 32 MiB admitidos por la herramienta de descarga. Se inspeccionaron código y dos capturas del proyecto editable, pero no se pudo reproducir el MP4 completo. Para revisar fielmente su ritmo hace falta una copia comprimida por debajo de ese límite o una ubicación accesible del archivo. **No hace falta el ZIP del proyecto.**

Antes de abrir las cuatro conversaciones, seguir [ENTREGA.md](docs/setup/ENTREGA.md). Inventario y decisiones sobre skills: [SKILLS.md](docs/setup/SKILLS.md).
