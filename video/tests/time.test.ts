import {test} from 'node:test';
import assert from 'node:assert/strict';
import {progress, rewindFrame, mixRect} from '../src/shared/motion/time.ts';

test('reverse timeline has continuous endpoints and never advances', () => {
  assert.equal(rewindFrame(120, 120, 179, 119), 119);
  assert.equal(rewindFrame(179, 120, 179, 119), 0);
  let previous = 119;
  for (let frame = 120; frame <= 179; frame += 0.25) {
    const value = rewindFrame(frame, 120, 179, 119);
    assert.ok(value <= previous && value >= 0);
    previous = value;
  }
});
test('random access does not retain state and motion clamps during reading', () => {
  const frames = [30, 70, 130, 0, 70, 30];
  const values = frames.map((frame) => progress(frame, 20, 60));
  assert.equal(values[0], values[5]); assert.equal(values[1], values[4]);
  assert.equal(values[1], 1); assert.equal(values[3], 0);
  assert.throws(() => progress(0, 3, 3));
});
test('shared rectangle handoff retains exact endpoints', () => {
  const a = {x: 90, y: 520, w: 840, h: 900};
  const b = {x: 0, y: 0, w: 1080, h: 1920};
  assert.deepEqual(mixRect(a, b, 0), a); assert.deepEqual(mixRect(a, b, 1), b);
});
