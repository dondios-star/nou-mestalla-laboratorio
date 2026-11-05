import {lerp, progress, rewindFrame} from '../../shared/motion/time';

export const BEATS = [0, 270, 570, 720, 930, 1200, 1470, 1740, 2100, 2460, 2820, 3360, 3540] as const;
// The entire previously seen visual state runs backwards: camera, seats, people,
// phone crop and comment poses all take this one source clock.
export const sourceTime = (frame: number) => frame < 570 ? frame : rewindFrame(frame, 570, 714, 569);
export const hookTime = (sourceFrame: number) => Math.min(269, Math.max(0, sourceFrame));
export const hookPose = (frame: number) => ({
  replace: progress(frame, 45, 111),
  seated: progress(frame, 132, 198),
  reaction: progress(frame, 200, 228),
});
export const comparePose = (frame: number) => ({
  // Every alternative begins from the same equipped base, with the same timing.
  change: progress(frame, 12, 84),
  future: progress(frame, 150, 180) * (1 - progress(frame, 270, 300)),
  fence: progress(frame, 132, 150) * (1 - progress(frame, 282, 306)),
});
export const sceneIndex = (frame: number) => Math.max(0, BEATS.findIndex((start, i) => i < BEATS.length - 1 && frame >= start && frame < BEATS[i + 1]));
export const slide = (frame: number, from: number, to: number, distance = 40) => lerp(distance, 0, progress(frame, from, to));
