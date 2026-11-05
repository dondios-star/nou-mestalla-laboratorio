# Storyboard de producción · episodio 41

Composición `NouMestalla41Decision`; 1080×1920; 60 fps; 3540 frames; 59 s. Sin audio. El brief original se conserva íntegro en la raíz y es la fuente del texto literal.

| Frames [inicio, fin) | Plano y contenido | Movimiento / lectura |
|---|---|---|
| 0–210 | Aficionado ficticio ante una recreación 3D del Nou Mestalla. «CRECISTE TÚ», después «EL ESTADIO SEGUÍA ESPERANDO». 2009, 2017, 2024. | Tres edades con bufanda que ocluye el cambio; cámara con avance leve. Personaje 2D, escenario 3D. Rótulo «Recreación histórica». |
| 210–360 | Comentarios editoriales: @PaquitoElDelExcel, «Mi abono ya cotiza.» / @GradaEnConstruccion, «El plano tiene nietos.». | Avance en profundidad, pequeña rotación, solapamiento y acumulación periférica. Los dos principales mantienen prioridad. |
| 360–540 | «Obras paradas: 2009 → 2025». «Reanudadas el 10 de enero de 2025». | Comentarios salen lateralmente durante 18 frames; lectura fija después. |
| 540–648 | Inversión de apertura completa. | `openingSourceFrame`: 539→0 de forma monótona. Se evalúa `OpeningSceneAtFrame` con los mismos objetos y cámara. |
| 648–720 | Viaje adicional al plan de 2007. | Una máscara descubre el plano/maqueta. No se etiqueta como archivo documental ni se introduce un falso rebobinado de una obra aún no iniciada. |
| 720–900 | «AHORA DIRIGES TÚ EL NOU MESTALLA». «2007 · SIMULACIÓN». «Antes de contratar toda la obra». | Entrada en 20 frames; plano, portátil y línea de compromiso. |
| 900–1200 | Dos modelos: «MESTALLA EXISTENTE» y «NOU MESTALLA». «Venta pendiente». «Dinero previsto ≠ dinero disponible». | Cámara se eleva y frena. Línea discontinua interrumpida con incertidumbre, sin pago consumado. |
| 1200–1500 | Marta · Finanzas. «La venta sigue sin cerrar.» «Financiar toda la obra exige nuevas garantías.» | Tarjeta de venta se amplía hasta la caja del correo. Texto completo, sin máquina de escribir. Lectura estable 1224–1475. |
| 1500–1800 | Diego · Obra. «Hay fondos para terminar una primera fase.» «Incluyen protección y pausa. No la apertura.» | Pestaña persistente. Lectura estable 1524–1739; el adjunto/maqueta se amplía durante los últimos 60 frames. |
| 1800–2010 | Lucía · Tesorería. «Préstamo puente: vence en 12 meses.» «Venta: sin fecha confirmada.» | Dos líneas de plazo, una cerrada y otra abierta. Secundario: refinanciación no garantizada. Lectura desde 1824. |
| 2010–2280 | A · ASEGURAR TODA LA FINANCIACIÓN. «Más garantías · arranque posterior». | Carpeta/documentos todavía en negociación sobre el plano; no se aprueba financiación con un clic. «Menos dependencia de la venta». |
| 2280–2550 | B · AVANZAR POR FASES FINANCIADAS. «Cierre protegido · apertura posterior». | Solo un paquete de subestructura se materializa y queda protegido. «Decidir antes de la siguiente fase». Sin acceso público. |
| 2550–2820 | C · EMPEZAR CON PRÉSTAMO PUENTE. «Vence en 12 meses · venta incierta». | Se activan varios frentes y grúas en la misma huella. «Más velocidad inicial». Sin desastre ni estadio terminado. |
| 2820–3150 | «¿Cuánta obra arrancas con una venta pendiente?» Tres filas A/B/C. | Despliegue en 30 frames; cinco segundos de lectura estable. Evidencia: venta sin fecha, fase cerrable, puente a 12 meses. CTA literal. |
| 3150–3300 | «En el siguiente: qué arriesgas con A, B y C». Bufanda de retorno. | Entrada breve, sin resolución. |
| 3300–3540 | «Aprende gestión de proyectos con casos ficticios». Alberto Villa. «Más casos en la bio». | La franja burdeos se expande en 24 frames. Todo asentado después, sin fundido a negro. |

## Continuidad y cajas

Coordenadas editoriales en píxeles del lienzo 1080×1920. Venta: (95,1030,380,170) → correo: (80,430,920,900), frames 1170–1223, quintic smoothstep. El texto conserva anchura propia durante el relevo para evitar reflujo. La maqueta usa un único origen 3D; A/B/C restablecen `plan` como base lógica y tienen la misma cámara, luz y escala. La activación de cada estado no hereda construcción de la opción anterior. La salida atenúa la variante antes de entrar la siguiente.

El modelo de trabajo es una maqueta ilustrativa. La vista de los dos recintos expresa una dependencia financiera, no proximidad geográfica a escala. No hay demolición del Mestalla existente.

## Revisión editorial

Gancho: tema visible desde el frame 0, paso del tiempo mediante edad y bufanda, sin cabecera introductoria. Se conserva el gancho pedido; no se sustituyó por tres propuestas. No hay datos de audiencia ni validación de viralidad.

Caso: las cuatro condiciones necesarias aparecen antes del frame 2010. A protege financiación a costa de garantías/plazo; B limita compromiso y añade pausa/conservación; C aporta velocidad y riesgo de vencimiento. Igual tratamiento de letras, tarjetas, iluminación y escala. La solución solo está en SOLUCION-EP41.md.

Lectura: 12 palabras principales en Marta durante unos 4,2 s; 14 en Diego durante unos 3,6 s; 10 en Tesorería durante unos 2,7 s. Son decisiones de montaje, no umbrales científicos. Se reducen adornos para mantener un foco. Los comentarios periféricos no son información necesaria.

## Adaptaciones de puesta en escena

El viaje adicional de 648–719 usa una máscara que descubre la maqueta, en vez de una transformación volumétrica del estadio. El rótulo de simulación adopta su posición superior de lectura al entrar en la mesa. La escena 14 retira las filas y recupera la bufanda mediante un corte editorial, sin un plegado 3D de cada fila. El caso, los textos principales y los límites temporales se mantienen. La geometría del exterior y los dos modelos de la mesa son aproximaciones contrastadas por rasgos generales, no levantamientos arquitectónicos.

Las funciones `progress` (quintic smoothstep), `mixRect` y los intervalos del código especifican inicio, fin y estados intermedios. El repliegue de la maqueta al resumen ocurre de 2796 a 2840; se asienta antes de la lectura fija desde 2850. La cabecera del correo desaparece antes de introducir el rótulo de fase, evitando superposición de dos títulos.
