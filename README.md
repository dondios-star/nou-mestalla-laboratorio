# Nou Mestalla · laboratorio de vídeo

Base común para los episodios **41, 42, 44 y 45** de Alberto Villa. Los cuatro prompts originales y la referencia de marca se conservan en la raíz. **El episodio 41 está implementado en la rama `codex/ep41-decision`.** Los episodios 42, 44 y 45 se conservan pendientes. [Producción y entrega del 41](docs/episodes/ep41/README.md).

Se conservan dos composiciones: `NouMestalla41Decision` (59 s) y `BaseTecnica`, una prueba de cinco segundos con comentarios, rebobinado, móvil, tipografía local y geometría 3D provisional. No es una reconstrucción validada del Nou Mestalla.

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
| `.agents/skills/` | Nueve skills conservadas y conservadas con sus recursos |

## Estado de la preparación

El render y el visor funcionan con **SwiftShader por software**. Se comprobó H.264, 1080 × 1920, 60 fps, 300 fotogramas, decodificación completa y estabilidad al solicitar fotogramas fuera de orden. Evidencias y límites: [VALIDACION.md](docs/setup/VALIDACION.md).

Se pudo leer el [proyecto editable de La Velada](https://github.com/dondios-star/velada-laboratorio). Se adaptaron componentes genéricos y se copiaron las fuentes con licencia; no se copiaron personajes, planos, escenas, vídeos ni contenido argumental. El repositorio original no se modificó. [Registro de reutilización](docs/setup/REUTILIZACION.md).

**Registro de la preparación inicial (superado para el episodio 41):** la política de este entorno bloquea las páginas del Valencia CF y las fuentes fotográficas. Se guardó una propuesta de dominios en la configuración del entorno. El [catálogo](referencias/comunes/nou-mestalla/catalogo.json) contiene fuentes candidatas procedentes de los prompts; todavía no hay fotografías ni renders del estadio descargados o verificados.

El adjunto de 53 segundos supera los 32 MiB admitidos por la herramienta de descarga. Se inspeccionaron código y dos capturas del proyecto editable, pero no se pudo reproducir el MP4 completo. Para revisar fielmente su ritmo hace falta una copia comprimida por debajo de ese límite o una ubicación accesible del archivo. **No hace falta el ZIP del proyecto.**

Antes de abrir las cuatro conversaciones, seguir [ENTREGA.md](docs/setup/ENTREGA.md). Inventario y decisiones sobre skills: [SKILLS.md](docs/setup/SKILLS.md).

## Actualización del episodio 41

Se incorporó `origin/main` en `9b977f2`, incluida la carpeta `Imágenes/`. Sus doce originales se inspeccionaron y conservan sin cambios. La investigación web, el inventario por imagen, las fuentes y los límites están en [ASSETS-EP41.md](docs/episodes/ep41/ASSETS-EP41.md) y [FUENTES-EP41.md](docs/episodes/ep41/FUENTES-EP41.md). El vídeo completo de referencia continúa no disponible; no se afirma haberlo visto.
