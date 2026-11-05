# Fuentes y recursos del EP44

Consulta e inspección: 5 de noviembre de 2026. El adjunto del usuario coincide byte por byte con el prompt del repositorio. La petición vigente autoriza producir solo el vídeo de pregunta EP44; los demás prompts son fuentes conservadas, no encargos activos.

## Repositorio actualizado

El entorno arrancó en `codex/nou-mestalla-base`, commit `eb1eaa9`. Tras `git fetch origin --prune`, `origin/main` estaba en `9b977f2`, que incorporaba doce archivos en `Imágenes/`. La base Remotion aún no estaba en main. Se creó `codex/ep44-licencia-contratos` desde la base y se incorporó `origin/main` mediante merge sin conflictos. No se fusionó ni se publicó main. No se creó otro worktree.

## Hechos documentales

| Hecho | Fuente primaria consultada | Tratamiento |
|---|---|---|
| El club recibió la licencia de obras de la parcela de Cortes Valencianas el 12/07/2024 | [Comunicado oficial](https://www.valenciacf.com/comunicado-oficial-valencia-cf1) | Contexto «JULIO 2024 · LICENCIA CONCEDIDA» |
| El club comunicó un contrato con FCC y una reanudación prevista para el 10/01/2025 | [Construcción Nou Mestalla](https://www.valenciacf.com/comunicado-oficial-construccion-nou-mestalla) | La página consultada fecha el comunicado **05/01/2025**, no el 03/01 del prompt. Se registra la discrepancia; no aparece esa fecha en el vídeo |
| Reanudación comunicada el 10/01/2025 | [Reanudación](https://www.valenciacf.com/el-valencia-cf-reanuda-la-construccion-del-nou-mestalla-e-inicia-la-cuenta-atras-para-trasladarse-a-su-nuevo-estadio-en-verano-de-2027) | Verifica el marco histórico; no se añade una promesa de terminación |

Estas fechas no acreditan que un problema contractual concreto causara el intervalo entre licencia y reinicio. El vídeo no presenta esa inferencia. No se utilizan las fotografías oficiales: las páginas consultadas excluyen la reutilización de fotografías de Lázaro de la Peña.

## Imágenes del usuario: inspección visual

Se abrieron los doce archivos con Pillow; los AVIF y WEBP se decodificaron correctamente. Se inspeccionaron sus imágenes decodificadas, no solo sus nombres. Se conserva en `inventario-imagenes.json` la dimensión, formato, SHA-256 y EXIF disponible. Las vistas de inspección están en `video/out/ep44/inspection/`. Ningún original se movió, borró o sobrescribió.

La identificación de lugar se apoya en la repetición de la misma geometría y entorno, y en su contraste con la fotografía documentada de Commons. No equivale a una certificación geográfica independiente de cada imagen sin metadatos. «Posterior al reinicio» es una clasificación visual por los elementos incorporados; no inventa una fecha de toma exacta.

| Archivo original | Qué se ve realmente | Tipo / periodo | Uso y derechos |
|---|---|---|---|
| `Esquema.png` | Perspectiva dibujada de la parcela, óvalo y cubierta completa | Esquema/render de proyecto; versión y fecha no acreditadas | Solo anatomía general. La cubierta no se traslada a 2024. No aparece en MP4 |
| `Exterior 2013.jpg` | Estructura de hormigón abierta, borde superior dentado, cuatro niveles, calle y coches | Foto real; coincide visualmente con el recorte de la foto de Ravave tomada el 18/03/2013 | Referencia principal histórica; la miniatura de 330 px no se amplía para el vídeo |
| `Exterior nuevo 2ç.webp` | Detalle de gradas y nuevos pilares blancos y viga perimetral | Foto real de avance posterior, día exacto no acreditado | Excluida como estado 2024; referencia comparativa, licencia no aportada |
| `Exterior nuevo 3.avif` | Aérea oblicua con grúa amarilla, estructura y rótulo FCC | Foto real de obra reanudada, fecha exacta no acreditada | Anatomía general; no incorporar actividad o marcas a la simulación |
| `Exterior nuevo.jfif` | Vista vertical del óvalo con pilares blancos exteriores | Foto real posterior al reinicio; baja resolución | Excluida como estado 2024 |
| `Exterior.avif` | La misma aérea de `Exterior nuevo 3.avif` | Duplicado **idéntico por SHA-256** | Conservado; no se elimina ni se usa dos veces |
| `Interior 2.jpg` | Personas con EPI en gradas, cables y estructura de cubierta | Foto real de avance posterior | Excluida para 2024; no se reutilizan retratos |
| `Interior 3.jpg` | Obra activa interior, grúa, encofrados amarillos, materiales y cables | Foto real posterior al reinicio; fecha exacta no acreditada | Excluida como estado 2024 |
| `Interior 4.jpeg` | Interior con grúa y elementos metálicos suspendidos, gradas al fondo | Foto real; EXIF `DateTimeOriginal=2026:09:04 08:59:11`; edición 09:35:41 | Claramente fuera del periodo; EXIF es metadato aportado, no peritaje de autenticidad |
| `Interior 5.jpg` | La misma vista interior de encofrados que `Interior 3.jpg`, con distinta codificación | Foto real; equivalencia visual, hashes diferentes | Conservado; no duplicar uso |
| `Interior.avif` | Gradas de hormigón vacías, huecos de circulación y terreno interior sin cubierta nueva | Foto real, aspecto compatible con fase anterior; fecha exacta y autor sin verificar | Seleccionada **solo para anatomía** de tres niveles, no como prueba fechada de julio de 2024 |
| `Vista superior.jpg` | Aérea del estadio con grandes pilares blancos y obra activa | Foto real posterior al reinicio; día sin verificar | Seleccionada para estudiar proporción del óvalo; se excluyen los elementos nuevos |

No hay una fotografía específica de acceso operativo histórico acreditada. Se crea un acceso genérico coherente con cerramiento y calle; no es un plano de seguridad ni una representación del acceso real de aquel día.

## Referencia web añadida

[Nou Mestalla 2013, Ravave — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Nou_Mestalla_2013.jpg). Toma: **18/03/2013**; subida: **21/03/2013**. Original 4000 × 3000; descargado y abierto visualmente en `referencias/episodios/ep44/web/Nou_Mestalla_2013_Ravave.jpg`. Fotografía real del Nou Mestalla, exterior desde la calle. Licencia [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Se conserva sin cambios, con esta atribución. Se usa para estudiar estructura, huecos, soportes y cerramiento; **no se inserta en el MP4**. No se presenta como una foto tomada en 2024.

## Material que aparece en el vídeo

- Geometría de estadio, camión, dos operarios, barrera, casetas, acopio y entorno: creación procedural de este episodio en `models.ts` y `World.tsx`. Escala visual aproximada, no BIM ni documentación ejecutiva. El edificio se basa en referencias observadas; el acceso, las zonas y los personajes son ficticios.
- Materiales y textura de grano: generados con semilla fija por el código; sin fotografías externas incrustadas. Goma, metal, hormigón, terreno y ropa tienen materiales diferenciados.
- Las capas `public/assets/ep44/baked/` son renders propios sin pérdida de ese modelo, no fotos reales ni renders comerciales. No se añaden cubierta terminada, césped, público o escudos.
- Anton e Inter: archivos locales ya existentes y sus licencias OFL, conservadas en `public/fonts/`.
- Marca: `referencia-marca-alberto.png`, suministrada por el usuario y abierta visualmente. Aplicados los tokens vigentes #4B1931 / #F4EAD8 y Anton / Inter. La lámina no se incrusta como una diapositiva.
- Componentes `Phone`, `CommentStack`, tokens y funciones de tiempo: adaptación común del proyecto; procedencia previa en `docs/setup/reuse-manifest.json`. Se amplía `Phone` con opciones que mantienen su aspecto anterior por defecto.
- No se utiliza audio, música comercial, logotipos de constructoras ni personas reales.

## Vídeo de referencia

Se buscó un MP4/MOV/WEBM en el checkout y en el workspace. No hay una copia utilizable del vídeo `Velada_Visibilidad_3D_53s.mp4`. El registro común explica que su anterior adjunto excedía 32 MiB; en esta tarea no se recibió aquel adjunto ni se abrió el MP4. **No se afirma haberlo visto.**

Sí se leyeron y reutilizaron los componentes comunes disponibles, cuya procedencia editable está documentada en el commit `a7e302ced8efb0ccb7dbadc493c42f6c069ff74d` de `dondios-star/velada-laboratorio`. Ese repositorio no se modificó.

Tres aciertos aprovechables del **código disponible**, no un análisis audiovisual del MP4: estado consultable hacia atrás, comentarios con una jerarquía central y teléfono con caja compartida. Tres límites corregidos para EP44: geometría técnica sin identidad histórica suficiente, cabecera de teléfono sin avatar/estado y ausencia de datos específicos de contratación. No se atribuyen juicios sobre ritmo o calidad del vídeo inaccesible.

## Supuestos del ejercicio

Son ficción: camión esperando, mensajes, nombres, comentarios, zonas autónomas, capacidad de coordinación, seis semanas de diseño, oferta que vence mañana, señal no reembolsable y condiciones del contrato global. La financiación está prevista y todas las alternativas respetan permisos, revisiones y seguridad. Reservar no ordena ejecutar. El espectador elige qué activar primero; las medidas pueden combinarse después.
