# Reutilización técnica de La Velada

Fuente accesible: https://github.com/dondios-star/velada-laboratorio

Commit leído: `a7e302ced8efb0ccb7dbadc493c42f6c069ff74d`. Proyecto: `video/pilots/Velada_Visibilidad_3D_53s`. Se inspeccionó mediante un clon temporal de lectura; no se modificó ni se envió nada al repositorio original.

| Pieza de origen | Destino y adaptación |
| --- | --- |
| `src/state.ts` | Curvas, interpolación de rectángulos y rebobinado parametrizado en `shared/motion/time.ts` |
| `src/Comments.tsx` | `CommentStack`: contenido, entrada/salida y posición recibidos como datos; sin comentarios ni personas originales |
| `src/Messaging.tsx` | `Phone`: un marco continuo, contacto, texto y adjunto como propiedades; sin conversación original |
| `src/Icons.tsx` | Seis primitivas SVG genéricas; se excluyen logotipos y navegación de plataformas |
| `public/fonts/` | Anton 400 e Inter 400/700, sus archivos WOFF2 y sus licencias OFL |

No se copiaron `Episode`, `Player`, `Stadium3D`, `YouTube`, `ThreeShots`, personajes, contenido de plataformas, imágenes, audio, escenarios ni clips 3D de La Velada. El estudio geométrico del estadio es nuevo y provisional. No hay dependencia del clon temporal para instalar, editar o renderizar.

El [manifiesto](reuse-manifest.json) registra copias exactas con SHA-256 y adaptaciones. Las rutas de origen de ese JSON son relativas al proyecto de 53 segundos indicado arriba. La reutilización interna responde a la petición del propietario; no se añade una licencia general ajena al código del origen.

Se inspeccionaron el código, la documentación editable y las capturas `02_Comentarios.png` y `11_Marca.png`. Eso permite identificar la acumulación de comentarios, la jerarquía Anton/Inter y el cierre de marca; no permite afirmar que se haya visto su movimiento completo. El MP4 adjunto no se pudo descargar por el límite de 32 MiB. El proyecto editable tampoco incluye el MP4 final, según su documentación. No hace falta un ZIP; sí una copia de vídeo accesible para el análisis temporal completo.
