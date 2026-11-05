# Guion y continuidad EP44

Una composición: `NouMestalla44LicenciaContratosDecision`. 1080 × 1920, 60 fps, 3540 frames (59 s). Sin voz ni pista de audio. Solo pregunta; ninguna recomendación en pantalla.

## Gancho elegido

G1: camión, operario con teléfono, barrera y gran estructura existente. La frase «Tienes permiso. La obra no arranca» conduce al mensaje de Javi. Se elige por mostrar lugar, preparación y bloqueo contractual en el mismo plano.

G2 (interior con un operario) identificaría peor el acceso; G3 (aficionado viendo una imagen terminada) desplazaría el problema hacia la promesa y repetiría EP41. No se producen estas dos alternativas. La voz editorial se aplica desde el prompt y la marca, sin afirmar una validación con audiencia.

## Timeline

Intervalos [inicio, fin), a 60 fps. El texto se anima como bloque y luego queda quieto.

| Escena | Frames | Texto / foco | Acción y lectura |
|---|---|---|---|
| 01 | 0–210 | Tienes permiso. La obra no arranca | Camión frena en 72 frames; frase entra 42–60; lectura 60–210 |
| 02 | 210–360 | Javi · Obra / Sin encargo cerrado no puedo arrancar / Encargo pendiente | El móvil existente se amplía 210–231. Lectura hasta retirada previa a comentarios |
| 03 | 360–600 | @GruaEnPracticas: La licencia no trae albañiles / @PaquitoElDelExcel: La obra está cargando... | Dos protagonistas y ocho secundarios subordinados; mismo fondo |
| 04 | 600–720 | Volvamos a la decisión | Tiempo fuente desciende de 599 a 0; mismos estados del móvil, camión y comentarios |
| 05 | 720–900 | Julio 2024 · Licencia concedida / Ahora diriges el Nou Mestalla | El mismo óvalo pasa a vista de maqueta. Objetivo: empezar trabajo útil sin contratar a ciegas |
| 06 | 900–1140 | Javi · Obra: Dos trabajos listos y separados. Podemos coordinarlos | Logística + acopio en el adjunto; marco estable, mensaje entra en 18 frames |
| 07 | 1140–1380 | Lucía · Arquitectura: El diseño del resto tarda seis semanas | Misma maqueta, resto rayado y seis bloques S1–S6. Resumen del dato anterior |
| 08 | 1380–1620 | Marta · Compras: Cuadrilla disponible. Reserva hasta mañana; señal no reembolsable | Oferta, no confirmación de reserva. Reservar ≠ ordenar la obra |
| 09 | 1620–1800 | ¿Cómo empezarías? | Adjunto mantiene orientación y se amplía durante 36 frames; tres pruebas persistentes |
| 10 | 1800–2220 | A · Contratar por partes / Empiezas por zonas · coordinas contratos | Dos encargos y un nodo de coordinación; solo casetas y acopio, no crece el estadio |
| 11 | 2220–2640 | B · Un contrato global / Centralizas coordinación · esperas al diseño | Vuelta a base; marco común. «Esta oferta exige el diseño · 6 sem.» |
| 12 | 2640–3060 | C · Reservar la cuadrilla / Proteges disponibilidad · arriesgas la señal | Base sin obra nueva. Recursos fuera de zonas; reserva y señal comprometida |
| 13 | 3060–3420 | ¿A, B o C? ¿Qué riesgo asumirías? | Tres filas equivalentes. Datos visibles. Quieto desde el frame 3090 |
| 14 | 3420–3540 | Alberto Villa / Hechos reales · decisión simulada | Firma sobre burdeos con maqueta al fondo. No respuesta |

## Transiciones y anclas

| ID / frames | Objeto persistente, salida → llegada | Ancla / máscara | Lectura |
|---|---|---|---|
| T1 / 210–231 | Teléfono junto al encargado → teléfono frontal | Proyección de la mano desde la cámara; marco único, escala uniforme; pantalla recortada | Desde 231 |
| T2 / 340–380 | Teléfono se retira; obra permanece detrás de comentarios | Opacidad de teléfono; capa oscura gradual; ningún cambio de estadio | Primer comentario asentado desde 380 |
| T3 / 600–719 | Comentarios, teléfono y camión → estados previos | Misma función `sourceTime`; sin playbackRate negativo | No lectura durante reversa |
| T4 / 720–738 | Estadio exterior → maqueta del mismo modelo | Corte de encuadre motivado por la vuelta a planificación; mantiene óvalo sin cubierta | Desde 738 |
| T5 / 900,1140,1380 + 18 | Conversación anterior → contacto correspondiente | Misma caja de teléfono; solo contenido entra; no dos marcos | Resto de cada bloque de 4 s |
| T6 / 1620–1656 | Adjunto de Marta → maqueta grande | Origen de contenido x176 y788,2; escala .575→1; borde y recorte se abren; orientación idéntica | Desde 1656 |
| T7 / 1800,2220,2640 + 150 | Base → prioridad A/B/C | Mismo modelo y cámara; primeros 24 frames de reset; acción 24–150 | 150–384 relativos |
| T8 / 3060–3090 | C → las tres prioridades | Filas con color, altura y jerarquía iguales, sin checks | 3090–3420 |
| T9 / 3420–3540 | Decisión → firma | Mismo burdeos/arena; sin flash ni audio | Dos segundos |

## Personajes y estados

Javi: encargado ficticio, casco blanco, chaleco amarillo y pantalón azul; gesto de espera mínimo y teléfono. Operario secundario: misma familia de EPI, posición y pose distinta. Lucía y Marta: avatar tipográfico, sin retratos reales. Ningún personaje representa un empleado del club o de FCC.

Las tres prioridades duran exactamente 420 frames. A no reserva toda la capacidad ni contrata el conjunto; B no empieza las zonas de A; C no ejecuta obra. La señal se compromete, no se representa perdida. No hay colores de éxito/fracaso ni recomendación por música.

## Realización editable

El 3D se construye en Three.js/ThreeCanvas con materiales y geometría propios; sus capas se prerenderizan sin pérdida a 1080 px de ancho para evitar recalcular cientos de veces estados estáticos con SwiftShader. La interfaz, las trayectorias y la lectura siguen en Remotion. El generador de las capas se conserva. No es una fotografía con un zoom presentada como modelo 3D; tampoco es una réplica BIM ni una reconstrucción fotogramétrica.
