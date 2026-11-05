import {BufferGeometry, Float32BufferAttribute, Color} from 'three';

// Original visual reconstruction, not measured/BIM geometry. Reference decisions
// and exclusions (notably the post-2025 roof supports) are in FUENTES-EP42.md.
export const outline = (a: number, offset: number): [number, number] => {
  const c = Math.cos(a), s = Math.sin(a);
  return [(57 + offset) * Math.sign(c) * Math.abs(c) ** 0.83,
    (35 + offset) * Math.sign(s) * Math.abs(s) ** 0.83];
};
class Builder {
  p: number[] = []; colors: number[] = [];
  face(a: number[], b: number[], c: number[], d: number[], shade: string) {
    const color = new Color(shade);
    for (const v of [a,c,b,a,d,c]) {this.p.push(...v); this.colors.push(color.r,color.g,color.b);}
  }
  block(a0: number, a1: number, inner: number, outer: number, y: number, thick: number, color: string) {
    const pa=outline(a0,inner), pb=outline(a1,inner), pc=outline(a1,outer), pd=outline(a0,outer);
    const p=[pa,pb,pc,pd].map(([x,z])=>[x,y,z]);
    const q=p.map(([x,h,z])=>[x,h-thick,z]);
    this.face(p[3],p[2],p[1],p[0],color);
    this.face(q[0],q[1],q[2],q[3],color);
    for(let k=0;k<4;k++) this.face(p[k],p[(k+1)%4],q[(k+1)%4],q[k],color);
  }
  box(x:number,y:number,z:number,w:number,h:number,d:number,color:string) {
    const p=[[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1],[-1,1,-1],[1,1,-1],[1,1,1],[-1,1,1]].map(([a,b,c])=>[x+a*w/2,y+b*h/2,z+c*d/2]);
    for(const [a,b,c,d] of [[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]])this.face(p[a],p[b],p[c],p[d],color);
  }
  geometry(){const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(this.p,3));g.setAttribute('color',new Float32BufferAttribute(this.colors,3));g.computeVertexNormals();g.computeBoundingSphere();return g;}
}
export const buildStadium = () => {
  const structure=new Builder();
  const rails=new Builder();
  const pi=Math.PI*2;
  const tiers=[{rows:16,r:1,y:2,rise:.43},{rows:15,r:15,y:12,rise:.52},{rows:24,r:28,y:23,rise:.57}];
  tiers.forEach((tier,t)=>{
    // Fascia below each tier. Recessed openings are bounded by real thickness.
    for(let j=0;j<160;j++){
      if(j%5===2)continue;
      structure.block(j*pi/160,(j+1)*pi/160,tier.r-.7,tier.r+.05,tier.y-.1,t===0?2:3.6,'#92948f');
    }
    for(let bay=0;bay<32;bay++)for(let s=0;s<5;s++){
      const a0=(bay+(s/5))*pi/32+.0015;
      const a1=(bay+((s+1)/5))*pi/32-.0015;
      const scallop=t===2 ? Math.round(4*Math.abs((s-2)/2)) : 0;
      for(let row=0;row<tier.rows-scallop;row++){
        // True openings in seating at the vomitories, rather than dark decals.
        if(s===2 && row>=3 && row<=6)continue;
        const r=tier.r+row*.78;
        structure.block(a0,a1,r,r+.78,tier.y+row*tier.rise,tier.rise+.22,
          ['#b9b8b2','#bfbeb7','#c5c3bc','#bcbab3'][(bay+row)%4]);
      }
      if(s===2){
        const r=tier.r+3*.78;
        structure.block(a0,a0+.005,r,r+4*.78,tier.y+5*tier.rise,1.8,'#b4b2aa');
        structure.block(a1-.005,a1,r,r+4*.78,tier.y+5*tier.rise,1.8,'#b4b2aa');
      }
    }
    // Annular concourse with depth; supports remain open to daylight.
    for(let j=0;j<128;j++) {
      const r=tier.r+tiers[t].rows*.78;
      structure.block(j*pi/128,(j+1)*pi/128,r,r+3.3,tier.y+tiers[t].rows*tier.rise-1.4,.65,'#aba99f');
      structure.block(j*pi/128,(j+1)*pi/128,r+2.8,r+3.3,tier.y+tiers[t].rows*tier.rise-1.4,5,'#a5a298');
    }
  });
  for(let i=0;i<64;i++){
    const a=i*pi/64;
    for(const r of [13,27,47]){
      const [x,z]=outline(a,r); const h=r===47?33:r===27?21:10;
      structure.box(x,h/2,z,.9,h,1.05,'#aaa9a1');
    }
    const [x,z]=outline(a,13);
    rails.box(x,9.9,z,.12,1.3,.12,'#676e6e');
  }
  // Slabs and continuous common circulation. No new white roof masts.
  for(const y of [3,9,15,21,27])for(let j=0;j<128;j++){
    const inset= y<15 ? 42 : 44;
    structure.block(j*pi/128,(j+1)*pi/128,inset,48,y,.65,'#b3b0a6');
  }
  // Ground-level entries and radial stair aisles.
  for(let bay=0;bay<32;bay++){
    const a=bay*pi/32;
    for(const tier of tiers)for(let row=0;row<tier.rows;row++){
      const r=tier.r+row*.78;
      structure.block(a-.009,a+.009,r,r+.39,tier.y+row*tier.rise+.03,.25,'#a4a49e');
      structure.block(a-.009,a+.009,r+.39,r+.78,tier.y+row*tier.rise+tier.rise/2,.25,'#a4a49e');
    }
  }
  // Site plinth: open earth, not a pitch or installed services.
  structure.box(0,-.65,0,223,1.2,182,'#c4bca9');
  return {concrete:structure.geometry(), metal:rails.geometry()};
};
