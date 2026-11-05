# EP44 · Licencia y contratos antes de movilizar

Vídeo de pregunta implementado en la rama `codex/ep44-licencia-contratos`. Los episodios 41, 42 y 45 se conservan. No incluye la resolución.

- Composición: `NouMestalla44LicenciaContratosDecision`.
- Exportación: `video/out/ep44/Nou_Mestalla_44_Licencia_Contratos_Decision_59s.mp4`.
- Formato: 1080 × 1920, 60 fps nativos, 3540 fotogramas, 59 segundos, H.264, sin voz ni pista de audio.
- Marca: Anton / Inter locales, burdeos #4B1931 y arena #F4EAD8.
- Periodo: ejercicio situado en julio de 2024. Personajes, mensajes, acceso y condiciones de contratación simulados.

## Abrir y editar

Desde la raíz del repositorio, Node 24 y dependencias del lockfile existente:

```bash
bash scripts/install.sh
cd video
npm run studio
```

Abrir `http://localhost:3000/NouMestalla44LicenciaContratosDecision`. En este entorno el Studio se ha iniciado en el puerto 3000. El código principal está en `src/episodes/ep44/Episode.tsx`; textos y estados en `state.ts`; geometría en `models.ts`; cámara, luces y composición de capas en `World.tsx`.

## Render comprobado

Desde `video/`:

```bash
node scripts/ep44-render.mjs final
python3 scripts/ep44-qa.py
node scripts/ep44-playback.mjs
```

El comando `final` renderiza los cuatro bloques necesarios y los une sin recodificar. Reutiliza los bloques revisados cuando sus fuentes no han cambiado; una modificación de fuentes o parámetros invalida esa reutilización. El MP4 final se verifica completo, incluidos los puntos de unión.

El renderer usa el Chromium instalado en `/usr/bin/chromium` con ANGLE/SwiftShader. La última orden comprueba reproducción técnica completa a velocidad normal y sin sonido: no sustituye una revisión visual humana continua. En el sandbox de Codex, Chromium necesita la capacidad de red local habilitada.

Los recursos necesarios para renderizar están en `public/assets/ep44/baked/`; no dependen de archivos temporales. Son capas de 3D propio a resolución nativa, guardadas sin pérdida mediante fondo y rectángulos de diferencias. El empaquetado compara cada píxel contra el render de origen. La interfaz y el movimiento se calculan a 60 fps. No se convirtió un vídeo de 30 fps.

Tras cambiar modelos, luces o cámara, regenerar primero las capas:

```bash
node scripts/ep44-render.mjs live
node scripts/ep44-bake.mjs
node scripts/ep44-render.mjs final
```

`live` produce dos vistas para inspección; `ep44-bake.mjs` regenera los assets y `bake-layout.ts`. Tras cambiar solo textos o interfaces basta el render final.

Otras comprobaciones:

```bash
npm run typecheck
npm test
node scripts/ep44-render.mjs seek
node scripts/ep44-render.mjs hook
node scripts/ep44-render.mjs evidence
node scripts/ep44-render.mjs options
```

`hook`, `evidence` y `options` exportan 0–15, 15–30 y 30–51 segundos. `stills` acepta una lista opcional de frames separados por comas. Las exportaciones pesadas quedan en `out/`, excluido de Git.

## Documentación de entrega

- [Guion, textos y continuidad](GUION-Y-TIMELINE-EP44.md).
- [Fuentes, fechas, selección de imágenes y permisos](FUENTES-EP44.md).
- [Skills realmente aplicadas](SKILLS-EP44.md).
- [Revisión del MP4 y limitaciones](REVISION-EP44.md).
- [Respuesta reservada para otra entrega](RESPUESTA-EP44.md), sin importación desde la composición.

El MP4 de referencia de 53 segundos no estaba disponible en el workspace. Se reutilizaron los componentes comunes disponibles, sin afirmar haber visto aquel vídeo. La reconstrucción es una ilustración 3D aproximada basada en referencias, no BIM ni fotogrametría. Los doce originales de `Imágenes/` se conservan sin cambios y no aparecen incrustados en el vídeo.
