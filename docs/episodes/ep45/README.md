# Episodio 45 · Aforo, comodidad y ampliación

**Estado: implementado; alcance de revisión en [QA](qa.md).** Producción del [prompt](../../../Prompt_Codex_Nou_Mestalla_45_Aforo.txt). Vídeo de pregunta sin respuesta ni voz.

| Requisito | Contrato |
| --- | --- |
| Composición | `NouMestalla45AforoDecision` |
| Archivo | `video/out/ep45/Nou_Mestalla_45_Aforo_Decision_59s.mp4` |
| Formato | 1080 × 1920, 60 fps, 59 s, 3540 frames, índices 0–3539 |
| Audio | Sin voz; comprensible sin sonido; efectos opcionales separados |
| Marca | Anton / Inter, burdeos #4B1931 y arena #F4EAD8 |
| Marco temporal | Simulación de diseño anterior a fijar el sector, sin atribuir una decisión real pendiente |

Las alternativas comparten geometría, cámara, escala y luces. Los costes, la demanda y la viabilidad son supuestos educativos; no datos de decisiones pendientes del Valencia CF. Las personas son nuevas y ficticias.

Se inspeccionaron las doce imágenes aportadas y referencias externas seleccionadas. Véanse [fuentes/licencias](fuentes.md), [inventario](imagenes.json), [storyboard](storyboard.md), [skills](skills.md) y [resolución interna separada](resolucion-interna.md).

Código editable: `video/src/episodes/ep45/`. Recursos originales regenerables: `video/public/assets/ep45/`. Se conservan los demás episodios y `BaseTecnica`.

Rama propia: `codex/ep45-aforo-decision`. La base seleccionada era `eb1eaa9`; `origin/main` ya contenía `Imágenes` en `9b977f2`. Se incorporó main **a esta rama** mediante `244d431`. No se fusiona la producción a main ni se publica en redes.

## Abrir y repetir

Desde la raíz, Node 24 y lockfile conservado:

```bash
bash scripts/install.sh
cd video
npm run studio
```

Abrir `http://localhost:3000/NouMestalla45AforoDecision`. Studio no persiste entre sesiones. Chromium `/usr/bin/chromium`, WebGL por software `swangle`, concurrencia 2. Remotion 4.0.540, Three 0.187.0, R3F 9.8.2. Sin actualización de dependencias.

```bash
npm run typecheck
npm test
npm run ep45:assets
npm run ep45:checks
npm run render:ep45
npm run verify:ep45
```

Si solo cambia texto basta `render:ep45`. Si cambia geometría, personajes, cámara o tiempo 3D, regenerar assets primero. `node scripts/ep45-render.mjs frame 1380 live` inspecciona 3D directo. Los pases son props de la misma composición, no otros episodios.

El fondo es un render fijo del modelo procedural propio. La fila, personas y alternativas son pases 3D animados propios, compuestos con móvil y texto 2D. No se llama cámara 3D animada al fondo fijo ni modelo BIM al conjunto. El cambio de cinco a cuatro asientos es local y no implica un 20 % menos de aforo del estadio.

La marca, fuentes locales, funciones de tiempo, Phone y CommentStack proceden de la biblioteca común. Los recursos cacheados se conservan para abrir Studio sin esperar al render 3D. Código, documentación y recursos regenerables quedan en Git. Exportaciones y pruebas están excluidas en `video/out/`; el MP4 se entrega como archivo, sin confundirlo con un archivo versionado.
