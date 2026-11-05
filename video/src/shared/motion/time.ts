// Adapted from velada-laboratorio src/state.ts. No episode-specific state retained.
export const clamp = (value: number) => Math.max(0, Math.min(1, value));
export const smooth = (value: number) => {
  const q = clamp(value);
  return q * q * q * (q * (q * 6 - 15) + 10);
};
export const progress = (frame: number, from: number, to: number) => {
  if (to <= from) throw new Error('Motion interval must have positive duration');
  return smooth((frame - from) / (to - from));
};
export const lerp = (from: number, to: number, q: number) => from + (to - from) * q;
export type Rect = {x: number; y: number; w: number; h: number};
export const mixRect = (a: Rect, b: Rect, q: number): Rect => ({
  x: lerp(a.x, b.x, q), y: lerp(a.y, b.y, q),
  w: lerp(a.w, b.w, q), h: lerp(a.h, b.h, q),
});
// Same source scene for forward and backward playback. No negative playbackRate.
export const rewindFrame = (frame: number, start: number, end: number, sourceLast: number) =>
  lerp(sourceLast, 0, progress(frame, start, end));
