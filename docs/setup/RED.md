# Acceso a fuentes

Comprobado el 5 de noviembre de 2026. La política activa es restringida, con el preset de gestores de paquetes. GitHub y npm funcionan a través del proxy de la sesión. No se requieren tokens adicionales para leer los repositorios utilizados.

Las solicitudes a `noumestalla.valenciacf.com/proyecto` y al comunicado de reinicio en `www.valenciacf.com` devolvieron `Tunnel connection failed: 403 Forbidden` del proxy, incluso fuera de la restricción local de ejecución. La política activa no incluye dominios web personalizados. No se descargaron fotos del estadio.

Se guardó en el borrador de configuración esta ampliación concreta, conservando el preset:

```text
valenciacf.com
*.valenciacf.com
commons.wikimedia.org
upload.wikimedia.org
as.com
www.ondacero.es
```

Valencia CF aporta fuentes primarias y renders identificados; Wikimedia permite buscar fotografías con licencia explícita; AS y Onda Cero aportan contexto histórico citado en los prompts. Sus páginas e imágenes aún deben consultarse y clasificarse. Si una imagen redirige a otro CDN, registrar primero el host observado antes de ampliar la lista.

Guardar este borrador no lo aplica. El usuario debe revisar y guardar la configuración en los ajustes del entorno para habilitar estas fuentes y, al finalizar la preparación, publicar el entorno. Esta separación viene del flujo de la skill de onboarding. No se ha intentado sortear el bloqueo mediante otros proxies.
