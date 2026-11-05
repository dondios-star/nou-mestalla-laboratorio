import {test} from 'node:test';
import assert from 'node:assert/strict';
import {scenes,openingSourceFrame,ageAt} from '../src/episodes/ep41/timeline.ts';
test('episode 41 has no gaps and ends at 3540',()=>{
 assert.equal(scenes[0][1],0);
 scenes.forEach((s,i)=>{assert.ok(s[2]>s[1]);if(i)assert.equal(scenes[i-1][2],s[1]);});
 assert.equal(scenes.at(-1)![2],3540);
});
test('rewind evaluates the complete history backwards, including character ages',()=>{
 assert.equal(openingSourceFrame(540),539);assert.equal(openingSourceFrame(647),0);
 let prior=539;const ages=new Set<number>();
 for(let f=540;f<=647;f++){const s=openingSourceFrame(f);assert.ok(s<=prior);prior=s;ages.add(ageAt(s));}
 assert.deepEqual([...ages],[2,1,0]);
});
