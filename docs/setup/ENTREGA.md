# Incorporación a main y cuatro conversaciones

La base técnica funciona, pero la preparación de referencias está incompleta por dos accesos pendientes. No confundir código local, cambios en GitHub, configuración guardada e instantánea publicada.

Rama de la base: `codex/nou-mestalla-base`. El borrador de configuración se guardó correctamente con instalación y arranque probados; una copia revisable está en [environment-config.json](environment-config.json). La publicación sigue pendiente.

1. Revisar los cambios de esta base y conservarlos mediante una rama/PR del repositorio `dondios-star/nou-mestalla-laboratorio`. La incorporación a `main` requiere fusionar esa rama; no se ha autorizado una fusión automática.
2. En los ajustes del entorno, revisar y guardar el borrador de instalación, arranque y dominios. El guardado del borrador por la herramienta no habilita la nueva red.
3. Con los dominios activos, consultar las fuentes candidatas, descargar las imágenes útiles y completar `referencias/comunes/nou-mestalla/catalogo.json` con clasificación, fecha de toma, autoría/licencia, URL de imagen, ruta y hash. Prioridad: exterior y aérea históricos, interior/estructura y renders oficiales recientes. Actualmente no hay imágenes del estadio descargadas.
4. Facilitar una copia del MP4 de referencia que se pueda descargar: el adjunto supera los 32 MiB de la herramienta. El editable sí es accesible y no hace falta un ZIP. El análisis completo del ritmo queda pendiente.
5. Conservar esas referencias y sus fichas en el repositorio o mediante el mecanismo de assets autorizado; incorporar a `main` los cambios finales. Publicar el entorno ya validado. Studio se reinicia en cada tarea, no se conserva como proceso activo.
6. Abrir cuatro conversaciones usando la versión de `main` que contenga la base. Una por episodio: 41, 42, 44 y 45. Cada tarea lee su prompt completo y su carpeta de `docs/episodes/`. Verificar el commit de partida; los archivos temporales de otra tarea no se comparten por el mero hecho de usar el mismo entorno.

La prueba técnica y sus fuentes no necesitan cambios narrativos para estas conversaciones. Sí deben construir y validar el modelo reconocible del estadio, los recursos propios de cada historia y los episodios completos. Las modificaciones compartidas que aparezcan durante la producción se integran antes de que otra tarea dependa de ellas.

No se ha comprobado la restauración en una tarea nueva ni se ha publicado el entorno. No dar por disponibles commits locales en futuras tareas hasta que estén conservados en el remoto correspondiente.
