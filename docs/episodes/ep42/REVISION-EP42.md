# Revisión del episodio 42

Fecha: 05/11/2026. Solo se revisa y entrega este episodio. La reproducción visual continua a velocidad normal no está disponible con las herramientas de esta sesión: la inspección visual se realiza sobre imágenes y tiras de fotogramas, además de decodificación completa. **No se declara validada la fluidez en reproducción real ni la vista previa en una cuenta de LinkedIn.**

## Referencias y alcance

Se abrieron las doce imágenes de `Imágenes/`, la referencia de marca y las dos referencias web descritas en FUENTES. Los doce SHA-256 se volvieron a comparar y permanecen iguales. Las imágenes recientes con pilares, anillo y cables de 2026 no se representan como estado anterior a 2025. El MP4 de La Velada no estaba accesible. El modelo propio es una recreación simplificada de referencia, sin precisión métrica certificada; los vestíbulos y sectores son didácticos.

## Observaciones y correcciones comprobadas

| Plano / frames | Observación real | Corrección y comprobación |
| --- | --- | --- |
| Interior, 0–239 | El primer estudio ocultaba demasiado el graderío y algunas galerías parecían ranuras abiertas | Se cambiaron cámara, espesor y bandas de graderío; se eliminaron elementos de primer término que estorbaban. Las vistas 0/100 muestran tres niveles, accesos y escala humana; sin cubierta moderna ni daños inventados. |
| Tipografía / móvil | La primera composición no heredaba la fuente de cuerpo | Se aplicó Inter en el contenedor raíz; Anton/Inter locales cargadas en Studio. Se abrieron los mensajes asentados 900/1200/1500 a 390 px. |
| Comentarios, 359–378 | El primer comentario cambiaba de posición al aparecer el segundo | Su traslado, escala y opacidad ahora comparten una entrada de 18 frames; el texto y los saltos de línea no cambian. 310/420 muestran los dos remates legibles, con secundarios atenuados. |
| Mesa → teléfono, 720–780 | El primer montaje duplicaba el marco durante el relevo | Se reutiliza una sola instancia del móvil y se transforma el conjunto hasta la conversación frontal. Los mensajes no giran durante su pausa de lectura. |
| Pregunta, 1680–1716 | La pregunta aparecía sobre el nombre y la fecha del teléfono | El teléfono termina de retirarse antes de entrar el nuevo título. Se abrieron 1700 y 1716: el primero corresponde al tránsito del plano; el segundo muestra la pregunta asentada sin textos superpuestos. |
| Elección, 3050 | La miniatura inicial contenía un resto diminuto del texto del plano anterior | Se sustituyó por un render limpio de la cámara original; tres tarjetas verticales A/B/C con sus propios estados y sin respuesta señalada. |
| Márgenes, todos los planos | La primera maquetación excedía la guía visual oficial de LinkedIn | Se abrió la ilustración que enlaza LinkedIn Help y se recolocó el contenido esencial dentro de x=112–870 / y=260–1360. Se inspeccionaron máscaras sobre gancho, comentarios, mesa, mensajes, pregunta, alternativas, elección y cierre. El pie repetido es decorativo; el nombre del cierre sí está dentro. |
| Mesa, 670 | Tras recolocar el título, texto claro y plano claro se solapaban | Se añadieron fondos burdeos al título y al rótulo superior. La nueva vista 670 muestra ambos legibles. |
| A/B/C, 2020/2380/2740 | Era necesario conservar una comparación equivalente y acotar el alcance de C | Misma cámara, luz y geometría inicial. A libera tres paquetes; B libera 1 antes del acabado local, conserva 2 en revisión y 3 pendiente; C muestra solo frentes dependientes y rutas como propuesta. Ninguna rama hereda el acabado de B. |
| Comentarios / rebobinado, 310/540/556 | En el primer MP4, el rótulo histórico coincidía con el de publicación y el rótulo del rebobinado tapaba el gancho | Se oculta el rótulo histórico dentro de la publicación y se traslada REBOBINANDO a y=640, sin pictogramas emoji. Las nuevas vistas 310/540 muestran separación. |
| Salida del adjunto, 1679–1700 | Tras ajustar el móvil a los márgenes, el plano independiente conservaba la posición antigua y aparecían dos miniaturas | Se oculta solo la miniatura interna durante el relevo, conservando su espacio; el plano independiente arranca en la misma caja visible (338,5 / 1096,3 / 288 / 158,4). Las vistas 1679/1680 coinciden y 1690/1700 contienen un único plano. El texto auxiliar entra después de retirar el móvil. |
| Cámaras/estados asentados | Recalcular vistas idénticas encarecía SwiftShader | Se conservan PNG nativos sin pérdida del modelo editable. Las transiciones live→PNG 1979/1980, 2339/2340 y 2699/2700 tienen diferencia media máxima de 0,00133 por canal sobre 255, localizada en antialiasing; se revisan también en el MP4. El movimiento anterior sigue evaluándose por frame a 60 fps. |

## Comprobaciones de código y render

- `npm run typecheck`: correcto.
- `npm test`: 6 pruebas correctas; duración/continuidad, rebobinado, ejecución posterior a liberación, reinicio de ramas y utilidades comunes.
- Lint de movimiento de la skill local: 0 errores, 0 advertencias.
- Prueba técnica independiente: H.264, 1080 × 1920, 60 fps, 300 frames; decodificación completa correcta.
- Studio: fuentes locales y WebGL mediante ANGLE/SwiftShader comprobados.
- Búsqueda fuera de orden: 100 → 2380 → 540 → 2740 → 100 → 540 → 2380; hashes idénticos al repetir cada frame. Informe en `video/out/ep42/seek-report.json`.
- El render no necesita servicios de pago, red para assets, narración ni música. El aviso de deprecación de THREE.Clock procede del stack instalado; el estado de las escenas se calcula con frames explícitos.

## MP4 entregado

`Nou_Mestalla_42_Reinicio_Decision_59s.mp4`: 59,000 s, 1080 × 1920, 60 fps constantes, 3540 fotogramas, H.264, yuv420p, Rec.709, sin pista de audio. Decodificación completa con FFmpeg y parada ante error: correcta.

SHA-256: `e345ba96c20acd941b5ffc4e510d457520c11e7f44c8d93e661d4ffea798ddc5`.

Del MP4 final se abrieron 144 fotogramas seleccionados en 24 tiras, incluidas entradas/salidas, cambios de cámara y relevos del móvil; una hoja de 59 muestras repartidas por toda la pieza; 17 vistas de lectura a 390 px y 15 máscaras con la guía oficial de LinkedIn. En esta muestra no permanecen las superposiciones corregidas. El análisis de luminancia de los 3540 frames detecta dos saltos: frame 240 (−42,4) y 3240 (−140,7), correspondientes al oscurecimiento de la publicación y al corte burdeos del cierre. Se inspeccionaron ambos cortes.

Se conservan los informes [técnico](VERIFICACION-EP42.json), [visual por fotogramas](QA-EP42.json) y [búsqueda fuera de orden](SEEK-EP42.json). La comprobación de imágenes generadas del script QA solo confirma archivos válidos; los ocho dictámenes manuales se registraron después de abrir las imágenes. No se interpreta este resultado como certificación de fluidez a velocidad normal.

## Límites que permanecen

No se pudo ver el MP4 de referencia ausente ni el original de Wikimedia que devolvió HTTP 403. No se equipara consultar una ficha con abrir su imagen. No se comprobó reproducción visual continua, aceptación por la plataforma ni vista previa en un dispositivo/cuenta reales. La referencia oficial de márgenes se consultó y abrió, pero no garantiza todos los recortes o variantes de interfaz. Las imágenes auxiliares pequeñas explican estados; no sustituyen a planos ejecutivos ni un diagnóstico técnico real.
