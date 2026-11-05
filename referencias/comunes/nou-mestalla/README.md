# Biblioteca visual del Nou Mestalla

**Estado: pendiente de acceso web.** No se han guardado fotos ni renders del estadio. Las URLs de `catalogo.json` proceden de los cuatro prompts; no se presentan como páginas verificadas en esta sesión. Dos solicitudes a fuentes oficiales fueron bloqueadas por el proxy (403); las demás permanecen pendientes.

| Carpeta | Qué admite |
| --- | --- |
| `fotos/` | Fotografías reales, con fecha de toma o incertidumbre explícita y estadio identificado |
| `renders/` | Imágenes de proyecto, con versión/fecha y etiqueta de render; nunca archivo histórico de la obra |
| `fuentes/` | Fichas documentales, metadatos, extractos y atribuciones |

Para cada imagen registrar en `imagenes` del catálogo: `id`, `tipo` (`foto_real` o `render`), `estadio`, `fecha_toma`, `fecha_publicacion`, `fecha_consulta`, `url_pagina`, `url_imagen`, `autor`, `licencia`, `uso_permitido`, `ruta_local`, `sha256`, `dimensiones`, `episodios` y `observaciones`. Usar `null` cuando el dato no conste; no sustituir la fecha de toma por la de la página.

Necesidades comunes: exterior y aérea de la estructura parada anterior a enero de 2025; estructura/interior; referencia del acceso; render oficial de interior y vista general; detalle identificado de butaca y fila. Distinguir el Nou Mestalla del Mestalla existente. La evolución de cubierta y fachada obliga a identificar la etapa.

Una foto accesible no concede permiso para insertarla en el MP4. Registrar la diferencia entre estudio visual y recurso autorizado. No quitar marcas de agua, atribuir una licencia inexistente ni utilizar imágenes generadas como evidencia del estado real de la obra.
