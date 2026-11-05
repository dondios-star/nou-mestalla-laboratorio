# QA del episodio 45

La revisión distingue inspección visual de imágenes del MP4, verificación automática y reproducción continua. No se asigna una puntuación ni se afirma haber realizado dos visionados completos.

**Archivo final verificado:** 59,000 s, 3540 frames, 1080 × 1920, 60 fps, H.264/yuv420p/bt709, sin audio; 7.313.719 bytes. [Informe técnico y SHA-256](technical-report.json). Se inspeccionaron 40 frames seleccionados del MP4 final, incluidos ambos lados de cada unión y el empalme 749/750, más la hoja de 24 muestras temporales. [Registro visual](visual-report.json) y [contacto compacto inspeccionado](contacto.jpg). El único salto de luminancia detectado es el corte deliberado del frame 720.

## Pruebas realizadas

- `npm run typecheck`: sin errores.
- `npm test`: 6 pruebas pasan. Comprueban límites del tramo, separación entre butacas, escalera libre, subconjunto preservado al ampliar, reducción real de plazas en C y funciones comunes de movimiento/rebobinado.
- `npm run render:smoke` + `npm run verify`: 300 frames, 1080 × 1920, 60 fps, H.264/yuv420p/bt709; decodificación completa correcta. La base técnica se conserva, sin producir otros episodios.
- Studio: fuentes Anton/Inter cargadas localmente y WebGL por software disponible. Advertencia no bloqueante `THREE.Clock deprecated` de R3F; sin fallo material de render. La telemetría externa de Remotion no es un recurso del vídeo.
- Saltos 60 → 1380 → 3000 → 60 → 1380: repeticiones idénticas mediante SHA-256 de PNG, con informe regenerable `out/ep45/seek-report.json`.
- Escaneo de fuentes: sin `useFrame`, `Math.random`, relojes reales ni animaciones CSS dentro del episodio. `Date.now` del script mide tiempo de exportación, no modifica la escena.
- Originales de `Imágenes`, prompts, lockfile y carpetas de episodios 41/42/44 sin modificaciones respecto de la base incorporada.

## Defectos observados y correcciones

| Escena/frame | Problema observado | Corrección y comprobación |
| --- | --- | --- |
| Fondo inicial | Primer estudio demasiado vacío, butacas dispersas. | Tres anillos densos, cortes entre niveles, color naranja, murciélago y cables. Inspección del nuevo render y referencias reales/comerciales separadas. |
| Gancho 0–111 | Quinto amigo empezaba lejos de la quinta plaza. | Parte alineado con ella y se desplaza al cambiar el equipamiento. Hoja de poses 0, 78, 111, 150, 180 y 228 del pase MP4 inspeccionada. |
| Móvil 1000/1380/1610 | La miniatura recortaba la maqueta. | Contenedor más alto, escala y desplazamiento corregidos; revisados los tres mensajes a tamaño móvil. |
| C | El primer layout conservaba tantas plazas como la base. | Cinco columnas de plazas anchas en vez de seis; menos plazas y barra sobre el rellano. Prueba geométrica y captura revisadas. |
| 1710–1740 | Expansión no partía de la posición de la miniatura. | Coordenadas iniciales alineadas con el adjunto y escala .56→1. Inspección de 1710, 1725, 1739 y 1740 del clip decodificado. |
| 1500/1560 en apertura | Texto claro sobre hormigón claro. | Pie burdeos; captura 238 y secuencia corregida revisadas. |
| A/B/C, nota de coste | Nota demasiado pegada a la banda burdeos. | Posición 1495, tamaño 38, interlínea 1.1; captura 1950 revisada. |
| 720–749 | La imagen anterior semitransparente tapaba el título del rol. | Corte por coincidencia del equipamiento a la maqueta, sin rectángulo fantasma. Rótulos se asientan antes de 750. |

## Exportación final y alcance visual

El informe técnico final se genera con `npm run verify:ep45`. Comprueba metadatos, decodifica el archivo completo, busca frames negros y verifica los doce originales. El archivo `technical-report.json` registra el hash y los resultados; una copia compacta se conserva junto a esta documentación.

Se inspeccionaron visualmente las hojas de los clips de apertura/rebobinado y alternativas, además de capturas individuales a escala móvil. Los comentarios protagonistas son legibles por turnos. Se cuentan cinco personas y cuatro plazas en el remate; C muestra menos butacas; B distingue la reserva y otra obra; A muestra capacidad disponible sin ridiculizarla. Las caras, ropa, geometría, cámara e iluminación se mantienen en las muestras revisadas.

La revisión final decodificada incluye muestras de toda la secuencia y ambos lados de los límites 270, 570, 720, 930, 1200, 1470, 1740, 2100, 2460, 2820 y 3360. El área x=90–930, y≈180–1580 guía el contenido principal; algunos rótulos secundarios de simulación están debajo. No se presenta como una zona segura universal de plataformas. Las miniaturas son apoyo, no portadoras del texto esencial.

**Límite de capacidad:** las herramientas disponibles permiten abrir imágenes y decodificar archivos, pero no ofrecen visionado perceptivo continuo de vídeo. No se han realizado las dos pasadas completas a velocidad normal/ralentizada solicitadas. El muestreo visual y la decodificación completa no se presentan como sustitutos de esos dos visionados. También sigue inaccesible el MP4 íntegro de La Velada; se revisaron su editable y las capturas indicadas en fuentes.

El render inicial se mantuvo temporalmente como `review-v1.mp4`. Tras las correcciones se regeneran 0–749 y 1740–2819; los tramos sin cambios 750–1739 y 2820–3539 se conservan por índices exactos. El ensamblado final se vuelve a codificar en H.264 y se valida como un único MP4 de 59 s. El comando estándar `npm run render:ep45` regenera el mismo montaje completo directamente desde el código actualizado. Los archivos intermedios quedan excluidos de Git y de la entrega de fuentes.
