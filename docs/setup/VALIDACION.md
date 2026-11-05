# Validación de la base · 5 de noviembre de 2026

Prueba `BaseTecnica`, de cinco segundos. No se produjo ningún episodio.

| Comprobación | Resultado |
| --- | --- |
| Instalación reproducible | `bash scripts/install.sh`: `npm ci` desde el lockfile, completado |
| TypeScript | Sin errores |
| Funciones temporales | Tres pruebas: extremos y monotonía del rebobinado, acceso fuera de orden, continuidad de rectángulos |
| Studio | Composición visible, canvas WebGL y tres fuentes cargadas |
| Fuente de vídeo | 1080 × 1920, 60 fps, 300 frames |
| Archivo | H.264, yuv420p, BT.709, duración 5,000 s |
| Decodificación FFmpeg | Completa, sin errores |
| Movimiento | Frames consecutivos 30/31 diferentes durante el movimiento |
| Acceso aleatorio | Secuencia 60 → 220 → 0 → 60: ambas capturas del frame 60 idénticas por SHA-256 |
| Render | Chromium del sistema, ANGLE/SwiftShader por software; concurrencia 2 |

El render tardó aproximadamente 127 segundos incluyendo empaquetado y capturas en esta máquina. No es una estimación garantizada del coste de un episodio completo.

Se inspeccionó la captura de resolución completa del frame 60 y la hoja de contacto de los frames 0, 60, 119, 120, 150, 179, 220 y 299, extraídos del MP4. Se ven las fuentes, tildes, comentarios, geometría, rebobinado y móvil. No se detectaron texto recortado, glifos ausentes ni canvas negro en esas muestras. **La revisión es por muestras, no una reproducción humana completa del vídeo.**

El rebobinado vuelve a solicitar el mismo tiempo de cámara, geometría y comentarios; no cambia solamente un rótulo. La cámara empieza el tramo inverso en el mismo fotograma que terminó el tramo hacia delante.

Se conservan los informes y la hoja de contacto en [validation/](validation/). El MP4 está en `video/out/validation/Base_Tecnica_5s.mp4`, excluido de Git y reproducible con `npm run validate`.

SHA-256 del MP4 comprobado: `0066e2580615c9dd9d87393676b300da85e01f1f6f3c2dae5290b76c8165d306`.

Límites: la geometría es un estudio técnico sin fidelidad arquitectónica validada; no hay personajes, audio, modelos GLB o secuencias de episodio. Fiber emite una advertencia de deprecación de `THREE.Clock`; el código propio no usa ese reloj para animar y la prueba de acceso aleatorio pasa. El linter de motion no reportó errores; señaló el literal `durationInFrames={300}` del registro, conservado para que la composición de prueba sea explícita.
