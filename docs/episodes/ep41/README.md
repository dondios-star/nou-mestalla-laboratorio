# Episodio 41 · Financiación antes de iniciar

Implementado en la rama `codex/ep41-decision`. Composición independiente: `NouMestalla41Decision`. Se conserva `BaseTecnica`; los episodios 42, 44 y 45 no se han producido ni modificado.

Contrato: 1080 × 1920 nativos, 60 fps, 59 s, 3540 frames (0–3539). H.264, yuv420p, BT.709, CRF 18. Sin voz, música ni efectos. La respuesta se reserva en `SOLUCION-EP41.md` y no aparece en el MP4.

## Abrir Studio

Desde la raíz, con Node 24, npm, Chromium, FFmpeg y Python 3 con Pillow:

```bash
# Solo si faltan dependencias:
bash scripts/install.sh
cd video
npm run studio
```

Seleccionar `NouMestalla41Decision`. Visor local: `http://localhost:3000/NouMestalla41Decision`; no es un enlace descargable. El archivo entregado está en `outputs/ep41/Nou_Mestalla_41_Decision_59s.mp4`, relativo a la raíz. Se puede abrir en el visor del chat, VLC o un navegador compatible con H.264.

## Repetir render y comprobación

```bash
cd video
npm run typecheck
npm test
npm run render:ep41
npm run verify:ep41
```

`verify:ep41` exige que `outputs/ep41/qa-final/` no exista: archivar esa carpeta con otro nombre antes de repetirlo. Genera datos técnicos y 60 muestras decodificadas; deja la valoración visual pendiente hasta inspeccionarlas. El render usa `/usr/bin/chromium`, ANGLE/SwiftShader por software, dos capturas concurrentes y PNG intermedio. Los recursos son locales. En un sandbox restrictivo Chromium necesita los permisos de ejecución adecuados.

```bash
# Validar la base técnica sin producir otros episodios:
npm run render:smoke
npm run verify
# Capturas, determinismo y tramo crítico nativo:
npm run stills:ep41 -- 0,1350,2440,3000
node scripts/ep41-render.mjs seek
# Comprobación técnica de reproducción 1x en Chromium (no inspección visual continua):
node scripts/ep41-playback.mjs
node scripts/ep41-render.mjs critical 2256-2600
```

## Archivos editables

- `video/src/episodes/ep41/Episode.tsx`: montaje, correo, alternativas y cierre.
- `Opening.tsx`: tres edades, comentarios y escena compartida con el rebobinado.
- `NouMestalla3D.tsx`: geometría, cámara, materiales y maqueta A/B/C.
- `timeline.ts`: tiempos, estados de edad y textos.
- `video/public/assets/ep41/`: ficha original del aficionado ficticio.
- `video/src/shared/`: marca, tipografía, curvas y pose de comentarios reutilizadas.
- `outputs/ep41/`: MP4, gancho, comparación A/B/C, hoja de contacto y ZIP editable; excluidos de Git.
- Esta carpeta: storyboard, solución reservada, fuentes, assets, skills y QA.

El ZIP conserva código, recursos locales y documentos para repetir el render; incluye también el gancho, la comparación A/B/C y la hoja de contacto en outputs/ep41/. Las fuentes incluyen licencias OFL; la fotografía de referencia conserva atribución CC BY-SA. No se versionan dependencias, cachés o exportaciones pesadas.

## Alcance y límites

Los doce originales de `Imágenes/`, los prompts y la marca se conservan. Las fotos se estudiaron sin insertar sus píxeles en el MP4. El exterior es una reconstrucción procedural aproximada y el entorno urbano es sintético; la maqueta no es un proyecto estructural validado. El aficionado es una capa 2D generada en tres edades sobre un escenario 3D.

El MP4 completo de La Velada de 53 segundos no estaba accesible y no se analizó. Sí se usaron componentes comunes con procedencia registrada en `docs/setup/REUTILIZACION.md`. Las comprobaciones y límites de revisión del vídeo están en `QA-EP41.md`.
