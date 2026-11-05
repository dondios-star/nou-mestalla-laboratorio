# Revisión EP44

## Alcance de la inspección

Se inspeccionaron visualmente los doce originales del usuario mediante vistas decodificadas, la referencia de marca y la foto histórica de Commons. Se revisaron vistas de estilo, contactos y relevos a escala móvil. La revisión del MP4 se apoya en fotogramas extraídos del archivo exportado y en comprobaciones técnicas; no equivale a haber visto de forma continua toda su animación.

No se pudo abrir el vídeo de referencia de 53 segundos porque no estaba disponible en el checkout ni en el workspace. La reutilización se limita al código común accesible.

## Defectos encontrados y correcciones

| Escena / frame | Observación real | Corrección y comprobación |
|---|---|---|
| Exterior / 0–72 | Algunas caras de los escalones del graderío tenían orientación invertida y dejaban ver el cielo entre peldaños | Corregidas las caras exteriores y añadido el intradós; nueva vista 3D abierta y regeneración de las capas |
| Exterior / 30 | Un operario secundario quedaba tapado por el camión | Separada su posición; inspección del plano completo y de las ruedas apoyadas |
| Rebobinado / 680 | El rótulo de vuelta a la decisión tapaba el gancho cuando reaparecía durante la reversa | Rótulo situado entre la etiqueta de simulación y el gancho; nuevo render del bloque 0–899 y frame 680 añadido a la revisión del MP4 |
| Móvil / 1510 | La firma quedaba demasiado cerca del resumen de datos | Firma desplazada a la derecha, conservando la zona inferior de seguridad |
| Relevo / 1638 | El título anterior y el nuevo se superponían durante el crecimiento del adjunto | Salida de texto en 0–18 frames; nueva pregunta en 20–36; maqueta continua, sin cambio de orientación |
| Alternativa C / 2890 | La etiqueta de reserva ocultaba los recursos situados fuera del estadio | Trasladada al espacio vacío superior de la maqueta; camión y equipo siguen fuera de las zonas de ejecución |
| Firma / 3490 | El rectángulo de la maqueta cortaba visualmente el texto final | Modelo desplazado hacia abajo y máscara gradual, manteniendo el fondo burdeos |
| Recursos 3D | Repetir el mismo fondo en cada imagen generaba 52 MB de assets redundantes | Fondo más regiones variables, WebP sin pérdida; comparación píxel a píxel con cada origen; resolución y estados temporales intactos |
| Componente compartido | El modo detallado del teléfono podía alterar la cabecera anterior por defecto | Estilos y espacio originales conservados cuando `detailed=false`; EP44 activa el modo ampliado explícitamente |

## Verificaciones de contenido

Los mensajes son ficción identificada. La licencia de julio de 2024 es el único dato histórico fechado en pantalla. La fecha del comunicado de contratación consultado es 5 de enero de 2025, distinta del 3 de enero del prompt; se corrige en fuentes y no se añade al vídeo. No se atribuye una causa real al intervalo entre licencia y reinicio.

A/B/C parten de la misma geometría y duran siete segundos cada una. A actúa sobre casetas/acopio y exige coordinación; B muestra la condición de esta oferta global, sin generalizarla a todos los contratos; C compromete una señal y reserva recursos sin construir. El cierre mantiene beneficios/riesgos equivalentes y no revela la recomendación reservada.

## Evidencias técnicas

Resultado del MP4 final: **1080 × 1920, 60/1 fps, 59,000 s, 3540 fotogramas, H.264/yuv420p, BT.709, sin pista de audio**. Decodificación completa sin errores. Los frames 30 y 31 son distintos durante el movimiento; no se exportó una duplicación de 30 fps. Los colores burdeos/arena decodificados difieren como máximo 2 niveles RGB de sus valores objetivo.

Se abrieron las cinco hojas `contact-0…4.jpg` con **60 fotogramas del MP4 final**, incluidas las parejas vecinas de las 13 fronteras solicitadas. Se abrieron las cinco hojas `mobile-0…4.jpg` con 14 pausas a 390 px de ancho. No se observaron nuevos solapamientos ni imágenes vacías en esas muestras. Se inspeccionaron además los frames **652–659** porque el análisis de luminancia señaló un salto en 654: corresponde a la retirada inversa de la capa oscura y reaparición del teléfono, sin un frame blanco aislado. Los otros saltos mayores corresponden a los cortes previstos de 720 y 3060.

Chromium reprodujo el archivo completo a velocidad 1, silenciado, hasta `ended=true` en 59,017 s. Registró 3540 frames y 24 descartados por el reproductor del entorno durante la prueba. Este dato no elimina frames del MP4 ni valida visualmente su fluidez; no se afirma un visionado continuo.

Pasaron `npm run typecheck`, los cuatro tests, el lint de movimiento (7 archivos, cero errores/advertencias), la prueba técnica de 300 frames y `npm run verify`. Se comprobó acceso aleatorio: [60,650,0,60,2100,2700,2100] en la composición y [30,72,0,30] en ThreeCanvas; las repeticiones dieron hashes idénticos. Una ejecución de tests durante la escritura de assets detectó un archivo temporal incompleto; repetidos después de terminar el empaquetado, pasan los cuatro.

Los bloques se codificaron con los mismos parámetros y se unieron sin recodificar. Se volvió a renderizar 0–899 tras corregir el rótulo de reversa. Los bloques desde 900 no cambiaron; esa conservación consta en `rewind-fix-provenance.json` y en los informes de cada bloque. Se comprobó el MP4 unido y sus fronteras.

SHA-256: `28d84b7c758d2e9d9d11fb8354af9e3ae83637cf48d692d8cbec9b8ade75f64a`.

[Registro técnico conservado](VERIFICACION-EP44.json). Los scripts son reproducibles desde `video/`; las imágenes y el vídeo están en `video/out/ep44/`, excluido de Git. Los doce hashes originales coinciden con el inventario y no hay diferencias en código, assets o documentos de los episodios 41, 42 y 45.

## Límites

- El estadio es una reconstrucción editorial aproximada; no existe levantamiento BIM ni garantía métrica. Las zonas, acceso, vehículo y personajes son propios y simulados. El acabado es 3D ilustrativo, no fotorrealismo.
- Se inspeccionan fotogramas y transiciones muestreadas; la reproducción técnica registrada del navegador no certifica por sí sola la percepción de fluidez. No se afirma haber visto el MP4 de manera continua.
- No hay pista de audio. No se publica en redes ni se verifica la interfaz real de TikTok, Instagram o YouTube.
