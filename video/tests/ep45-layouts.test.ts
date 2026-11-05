import {test} from 'node:test';
import assert from 'node:assert/strict';
import {hookSeats, ROW_LIMITS, sectorSeats, STRUCTURE} from '../src/episodes/ep45/layouts.ts';

test('the five-to-four illustration fits the same fixed concrete limits', () => {
  const a=hookSeats(false),b=hookSeats(true);
  assert.equal(a.length,5); assert.equal(b.length,4);
  for(const row of [a,b]) for(let i=0;i<row.length;i++) {
    const s=row[i];
    assert.ok(s.x-s.width/2>ROW_LIMITS[0]&&s.x+s.width/2<ROW_LIMITS[1]);
    if(i) assert.ok(s.x-s.width/2>row[i-1].x+row[i-1].width/2);
  }
  assert.ok(b.every(s=>s.width>a[0].width));
});

test('all alternatives retain terraces and a clear stair route, with no overlapping chairs', () => {
  const original=JSON.stringify(STRUCTURE);
  for(const v of ['base','A','B','C'] as const) {
    const points=sectorSeats(v);
    assert.equal(new Set(points.map(s=>s.id)).size,points.length);
    for(const s of points) {
      assert.ok([s.x,s.y,s.z,s.width].every(Number.isFinite));
      assert.ok(Math.abs(s.x)+s.width/2<STRUCTURE.width/2);
      assert.ok(s.x+s.width/2<STRUCTURE.stairX-.4 || s.x-s.width/2>STRUCTURE.stairX+.4);
      assert.equal(s.y,-s.z/STRUCTURE.tread*STRUCTURE.rise);
      for(const other of points) if(s.id!==other.id&&s.y===other.y)
        assert.ok(Math.abs(s.x-other.x)>(s.width+other.width)/2);
    }
  }
  assert.equal(JSON.stringify(STRUCTURE),original);
});

test('the base is a preserved subset of expansion; extra services sacrifice actual seats', () => {
  const base=sectorSeats('base'),a=sectorSeats('A'),b=sectorSeats('B'),c=sectorSeats('C');
  assert.deepEqual(a,b);
  assert.deepEqual(a.filter(s=>s.module==='base'),base);
  assert.ok(c.length<base.length&&base.length<a.length);
  assert.ok(c.every(s=>s.width>a[0].width));
});
