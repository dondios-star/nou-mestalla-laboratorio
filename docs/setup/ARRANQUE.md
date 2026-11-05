# Arranque del entorno

Trabajar en el checkout aislado existente `/workspace/nou-mestalla-laboratorio`. No crear worktrees salvo solicitud explícita del usuario. Leer AGENTS.md y README.md; conservar cambios previos.

1. Comprobar que existe `video/node_modules` y que Node es 24. Si falta la instalación, ejecutar `bash scripts/install.sh` desde la raíz.
2. Arrancar `npm run studio` desde `video/`. Si ya está en ejecución, reutilizar el proceso; no lanzar un segundo Studio.
3. Abrir la composición `BaseTecnica` en el visor disponible y ejecutar `npm run check:studio` desde `video/` para comprobar carga, fuentes y WebGL. El comprobador usa el puerto 3000.
4. Ejecutar `npm run validate` solo cuando haga falta verificar cambios de render o de dependencias. El resultado es la prueba de cinco segundos, no un episodio.
5. Para un encargo de episodio, leer su prompt completo y `docs/episodes/epXX/README.md`. La preparación por sí sola no inicia su producción.

La instantánea conserva archivos y dependencias instaladas; los procesos de Studio y Chromium deben reiniciarse en cada tarea. El render usa Chromium del sistema con ANGLE/SwiftShader por software, sin prometer GPU dedicada. No hacen falta secretos para este flujo.

La investigación requiere los dominios documentados en RED.md. Un borrador guardado no activa la red ni publica el entorno. No considerar resuelta la biblioteca de referencias hasta que las imágenes y sus fichas estén realmente disponibles.
