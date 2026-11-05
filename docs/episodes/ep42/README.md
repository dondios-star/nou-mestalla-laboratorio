# Episodio 42 · Revisión antes del reinicio

Composición implementada en la rama `codex/ep42-reinicio`. Solo se produce este episodio; los contratos 41, 44 y 45 se conservan. El vídeo es una simulación educativa situada antes del reinicio de enero de 2025, sin narración, música ni efectos. La respuesta reservada está en un documento separado y no aparece en el MP4.

| Entrega | Valor |
| --- | --- |
| Composición | `NouMestalla42ReinicioDecision` |
| MP4 | `video/out/ep42/Nou_Mestalla_42_Reinicio_Decision_59s.mp4` |
| Formato | 1080 × 1920, 60 fps, 59 s, 3540 fotogramas, H.264 CRF 18, yuv420p, Rec.709 |
| Código | `video/src/episodes/ep42/` |
| Renders originales locales | `video/public/assets/ep42/` |
| Marca | Anton / Inter; burdeos #4B1931 y arena #F4EAD8 |

## Abrir y renderizar

Desde la raíz del repositorio, con Node 24, Chromium en `/usr/bin/chromium`, Python 3 con Pillow y FFmpeg/ffprobe:

```bash
bash scripts/install.sh
cd video
npm run studio
```

Abrir `http://localhost:3000` y seleccionar `NouMestalla42ReinicioDecision`. No hace falta una clave de IA. Los scripts usan SwiftShader por software; en un sandbox que impida arrancar Chromium hace falta permitir su ejecución.

En otra terminal, desde `video/`:

```bash
npm run typecheck
npm test
npm run render:ep42
npm run verify:ep42
```

El render usa las versiones fijadas del proyecto: Remotion 4.0.540, React 19.3.1 y Three.js 0.187.0. No actualizar el lockfile para repetirlo.

## Editar

- `Episode.tsx`: textos, composición, móvil, comentarios, transiciones y cierre.
- `state.ts`: tiempos, estado de las tres alternativas y rebobinado compartido.
- `geometry.ts`: graderíos, galerías, losas, huecos y estructura procedural.
- `Stadium.tsx`: cámaras, luz, materiales y ampliación didáctica de vestíbulos.

Los PNG de cámaras estáticas y miniaturas proceden del modelo editable. Si se cambia geometría, materiales, cámara o estados de las ramas, regenerarlos antes del MP4:

```bash
npm run assets:ep42
npm run render:ep42
npm run verify:ep42
```

Pruebas complementarias: `node scripts/ep42-render.mjs seek`, `opening`, `comparison` o `stills 100,900,2380`. No registran composiciones adicionales. La exportación completa está excluida de Git; las fuentes, fuentes tipográficas y renders propios necesarios sí se versionan.

## Documentación

- [Fuentes, imágenes, fechas y derechos](FUENTES-EP42.md).
- [Montaje y pausas de lectura](STORYBOARD-EP42.md), [timeline para QA](storyboard.json).
- [Skills aplicadas](SKILLS-EP42.md).
- [Respuesta reservada](RESPUESTA-EP42.md).
- [Revisión efectuada y límites](REVISION-EP42.md).

`Velada_Visibilidad_3D_53s.mp4` no estaba accesible y no se analizó. Se reutilizan los componentes comunes realmente presentes. No se modifican ni eliminan los originales de `Imágenes/`; las fotografías sirven como referencia y no se insertan en el vídeo.
