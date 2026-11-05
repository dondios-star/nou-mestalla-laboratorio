import test from 'node:test';
import assert from 'node:assert/strict';
import {timeline,openingSource,branchState} from '../src/episodes/ep42/state.ts';

test('ep42 covers exactly 3540 frames without gaps or overlaps',()=>{
 assert.equal(timeline[0][1],0);
 for(let i=1;i<timeline.length;i++)assert.equal(timeline[i][1],timeline[i-1][2]);
 assert.equal(timeline.at(-1)![2],3540);
 for(const branch of ['A','B','C']){const row=timeline.find(x=>x[0]===branch)!;assert.equal(row[2]-row[1],360);}
});
test('ep42 rewind uses the same full opening time and goes backwards',()=>{
 assert.equal(openingSource(480),479);assert.equal(openingSource(580),0);
 for(let f=481;f<600;f++)assert.ok(openingSource(f)<=openingSource(f-1));
});
test('ep42 work never starts before a package is released; branches reset',()=>{
 for(let f=0;f<360;f++){
  const b=branchState('B',f);
  if(b.execution>0)assert.equal(b.zones[0],'Liberada');
  assert.equal(b.zones[2],'Pendiente');
  assert.equal(branchState('A',f).execution,0);
  assert.equal(branchState('C',f).execution,0);
 }
 for(const b of ['A','B','C'] as const){
  assert.equal(branchState(b,0).execution,0);
  assert.equal(branchState(b,0).systems,0);
  assert.deepEqual(branchState(b,0).zones,['Pendiente','Pendiente','Pendiente']);
 }
});
