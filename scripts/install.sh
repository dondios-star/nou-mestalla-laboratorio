#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root/video"

node -e 'if (Number(process.versions.node.split(".")[0]) !== 24) { throw new Error("Este proyecto requiere Node 24"); }'
for binary in npm python3 ffmpeg ffprobe; do
  command -v "$binary" >/dev/null || { echo "Falta $binary en el entorno" >&2; exit 1; }
done
browser_path="${REMOTION_BROWSER_EXECUTABLE:-/usr/bin/chromium}"
test -x "$browser_path" || { echo "Falta Chromium. Configura REMOTION_BROWSER_EXECUTABLE con su ruta." >&2; exit 1; }

# Conservar el lockfile; sin instalaciones globales ni descarga automática de navegador.
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run typecheck
npm test
