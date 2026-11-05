# QA · Nou Mestalla 41 · 2026-11-05

**Entregable técnico válido, revisión visual por fotogramas completada.** No se afirma haber observado el vídeo continuo a velocidad normal: las herramientas disponibles permiten abrir imágenes y comprobar la reproducción mediante Chromium, pero no inspeccionar visualmente su movimiento continuo. El resultado se entrega con ese límite explícito, conforme al apartado 12 del brief.

## Archivo final

`outputs/ep41/Nou_Mestalla_41_Decision_59s.mp4`

- H.264, yuv420p, BT.709; 1080 × 1920 nativos.
- 60/1 fps tanto nominales como medios; 59,000000 s; 3540 frames decodificados, índices 0–3539.
- Sin pista de audio. Sin voz, narración provisional o música.
- PNG intermedio a resolución final, CRF 18, dos capturas concurrentes, Chromium/ANGLE SwiftShader por CPU. Render: 1037,069 s.
- SHA-256: `0dd2b6c8956e755ef68d337c6434f0dc0982f5b7d90cef5192b2e050e79e697d`.

`qa/technical-report.json` acredita la lectura íntegra del MP4, 3540 frames, ausencia de frames negros y distinción entre los frames móviles 53/54. No confunde esa última comprobación con movimiento nuevo en los tramos deliberadamente quietos.

## Comprobaciones ejecutadas

`npm run typecheck` y `npm test`: correctos, cinco pruebas. Incluyen continuidad de timeline, orden monótono 539→0, tres edades en el rebobinado y acceso absoluto a las curvas compartidas.

`npm run render:smoke` y `npm run verify`: correctos para la composición técnica existente, 300 frames/5 s. No se renderizaron los episodios 42, 44 o 45. Los informes de esa prueba conservan su alcance técnico; no se presentan como revisión editorial del episodio.

`node scripts/ep41-render.mjs seek`: orden 175,2440,0,175; ambos resultados de 175 tienen SHA-256 idéntico. Ejecutado con el código final, después de exportar.

`npm run verify:ep41`: inspección de contenedor, decodificación íntegra y muestras extraídas del MP4 final. Se abrieron las cinco hojas de 12 muestras (60 frames), las capturas de lectura a 390 px, las guías de margen y una tira adicional de 581–585 para investigar el detector de luminosidad. Se compararon también imágenes nativas durante la producción.

`node scripts/ep41-playback.mjs`: Chromium llegó a `ended`, tiempo 59, duración 59, velocidad 1×, 3540 frames contabilizados y sin error de media. El navegador descartó 16 frames de presentación durante esta prueba en software; el MP4 conserva los 3540 y decodifica íntegro. Este dato no se usa para afirmar fluidez perfecta. La navegación `file://` estaba bloqueada por la política del navegador; se utilizó HTTP en loopback, limitado al HTML y al MP4 de entrega, sin cambiar políticas ni publicar el archivo.

## Evidencia editorial y visual

| Criterio | Resultado y evidencia decodificada |
|---|---|
| Gancho desde el inicio | f0 ya muestra personaje, estructura, año y frase. f47/61/100/128/175 muestran las tres edades; la bufanda ocluye los cambios en f53/57 y f119/123. |
| Identidad y época | Forjados abiertos, tres bancos de grada y coronación inacabada contrastados con la referencia de 2013. Reconstrucción aproximada; no se certifica precisión arquitectónica. No se introduce el anillo blanco de 2026. |
| Historia y ficción | «Recreación histórica» en f0; reinicio 10-01-2025 visible en f440; «2007 · SIMULACIÓN» en f780 y durante el caso; casos ficticios en f3420. |
| Comentarios | Principales completos en f250 y f320, con nombres inventados y contadores separados. Fuente implementa profundidad/rotación y acumulación, no scroll. Tarjetas periféricas pueden quedar cortadas de forma intencionada. |
| Rebobinado | Estados f539/540/600/647 y pruebas de código confirman la inversión de la misma escena, cámara y edades. f648/680/719 muestran el viaje adicional por máscara hasta el plan. |
| Dos estadios y dinero | f1090 distingue Mestalla existente del Nou, con venta pendiente, vínculo discontinuo y «Dinero previsto ≠ dinero disponible». Son modelos esquemáticos, no un mapa geográfico. |
| Condiciones previas | f1350: venta sin cerrar y nuevas garantías. f1630: fase financiada, protección/pausa y ausencia de apertura. f1900: puente a 12 meses, venta sin fecha y refinanciación no garantizada. |
| A/B/C | f2170/2440/2710: misma cámara, luz, escala y estilo; ventajas y costes visibles. B representa paquete protegido sin público; C muestra frentes/grúas y vencimiento, sin desastre ni final terminado. |
| Respuesta reservada | f3000: tres filas iguales, pregunta y CTA literales; ninguna selección ni señal de ganadora. SOLUCION-EP41.md no se importa en el render. |
| Lectura y márgenes | Mensajes, estrategias y pregunta leídos a 390 px de ancho. Guías revisadas en f0/1630/3000/3539: esenciales dentro de x80–930/y150–1580. Los pies del personaje y el pie secundario de autor pueden salir de esa guía. |
| Sin sonido y cierre | El contenido necesario aparece en texto/objetos. f3420/3539 mantienen marca, firma y CTA, sin fundido a negro. Lectura temporal completa por una persona a velocidad real no observada. |

Los tiempos de lectura y los estados de entrada/salida están en STORYBOARD-EP41.md y en el código. La prueba por muestras no permite detectar todos los defectos de movimiento entre ellas.

## Luminosidad y correcciones

Un único salto de media de luminancia ≥40/255: **f583, +40,49**. La tira 581–585 confirma que coincide con las tarjetas arena que vuelven a cubrir el exterior durante la inversión acelerada de la salida de comentarios. Es un cambio previsto de composición, no un asset faltante ni un frame negro. No se usa este detector como certificación de seguridad de destellos.

Correcciones antes del máster: normales de geometría, remate superior del estadio contrastado con la foto histórica, fondo transparente de la maqueta, solapamiento en la tarjeta de venta, posición del portátil pequeño, relevo entre cabeceras del correo/fase, retirada de documentos A y reducción continua de la maqueta al resumen. El código final fue el usado en el render completo; los hashes están en production-manifest.json.

## Conservación y límites

- Se incorporó `origin/main` `9b977f27fa8cb5bd550f4bd346c0070604bb4c17` a la rama propia. Nueva consulta remota confirmó que seguía siendo main. Los doce SHA-256 de `Imágenes/` coinciden con el inventario; prompts y otros episodios, sin cambios.
- Todas las imágenes aportadas se abrieron. Fotografías, esquema/render y marca se clasificaron por separado. Las fotos son referencias; no se reutilizan sus píxeles en el vídeo sin licencia confirmada.
- Exterior y entorno son una recreación procedural aproximada, con acabado de visualización 3D, no una reconstrucción fotogramétrica ni un plano exacto. Aficionado generado como capa 2D; maqueta B ilustrativa, sin validación estructural real.
- El viaje a 2007 usa una máscara; no se implementó una transformación volumétrica completa del edificio. El teaser usa corte editorial y bufanda, sin plegado físico de cada fila. Adaptaciones registradas en el storyboard.
- El MP4 completo de referencia de La Velada no estaba accesible y **no se analizó**. Sí se reutilizaron marca, fuentes, curvas y pose de comentarios disponibles en el proyecto.
- No se observó reproducción visual continua ni se realizó previsualización/publicación en una red social. No se certifica aceptación de plataforma o retención de audiencia.

Evidencias pequeñas conservadas en `qa/`; las exportaciones pesadas están en `outputs/ep41/` y se excluyen de Git. El ZIP editable incorpora las imágenes de entrega, además de los fuentes y documentos. El estado de conservación remota se registra en el mensaje de entrega, sin confundirlo con una fusión a main.
