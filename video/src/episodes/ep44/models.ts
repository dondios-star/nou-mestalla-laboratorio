import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

// Original procedural assets. Metres/10. Observed anatomy, not measured BIM.
const material = (color: string, roughness = .8, metalness = 0) => new T.MeshStandardMaterial({color, roughness, metalness});
const grain = () => {
  const bytes=new Uint8Array(256*256*4);let seed=441;
  for(let y=0;y<256;y++)for(let x=0;x<256;x++){
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    const v=210+Math.floor((seed/4294967296)*30)+Math.round(6*Math.sin(x*.09)*Math.sin(y*.07));
    const n=(y*256+x)*4;bytes[n]=v;bytes[n+1]=v;bytes[n+2]=v;bytes[n+3]=255;
  }
  const t=new T.DataTexture(bytes,256,256);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(12,12);t.magFilter=T.LinearFilter;t.minFilter=T.LinearMipmapLinearFilter;t.generateMipmaps=true;t.colorSpace=T.SRGBColorSpace;t.needsUpdate=true;return t;
};
export const mats = {
  concrete: material('#b5b1a5', .94), concreteLight: material('#c7c4ba', .95), dark: material('#3b4244'),
  sand: material('#ad9e83', 1), road: material('#555955', .96), steel: material('#858b89', .43, .7),
  cab: material('#d5d8ce', .35), rubber: material('#202525', .95), window: material('#263c44', .16, .35),
  wood: material('#94734c'), vest: material('#d8e342'), navy: material('#354351'), skin: material('#b77c5c'),
  white: material('#f5f1df', .55), wine: material('#633047'), orange: material('#c2874b'),
};
for(const key of ['concrete','concreteLight','sand','road','wood'] as const){mats[key].map=grain();mats[key].bumpMap=mats[key].map;mats[key].bumpScale=.001;if(key==='sand'||key==='road')mats[key].map!.repeat.set(80,80);}
type Mat = keyof typeof mats;
class Builder {
  parts = new Map<Mat,T.BufferGeometry[]>();
  add(g: T.BufferGeometry, m: Mat, p: number[]=[0,0,0], r: number[]=[0,0,0], s: number[]=[1,1,1]) {
    const matrix = new T.Matrix4().compose(new T.Vector3(...p as [number,number,number]),new T.Quaternion().setFromEuler(new T.Euler(...r as [number,number,number])),new T.Vector3(...s as [number,number,number]));
    g.applyMatrix4(matrix); const a=this.parts.get(m)??[];a.push(g);this.parts.set(m,a);
  }
  box(p:number[],s:number[],m:Mat,r:number[]=[0,0,0],round=0) {this.add(round?new RoundedBoxGeometry(s[0],s[1],s[2],2,round):new T.BoxGeometry(...s as [number,number,number]),m,p,r);}
  tube(a:number[],b:number[],rad:number,m:Mat) {
    const start=new T.Vector3(...a as [number,number,number]);const end=new T.Vector3(...b as [number,number,number]);
    const g=new T.CylinderGeometry(rad,rad,start.distanceTo(end),8);g.applyQuaternion(new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),end.clone().sub(start).normalize()));g.translate(...start.add(end).multiplyScalar(.5).toArray());this.add(g,m);
  }
  build(){const root=new T.Group();for(const [m,geos] of this.parts){const merged=mergeGeometries(geos.map(g=>g.index?g.toNonIndexed():g));const mesh=new T.Mesh(merged,mats[m]);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);geos.forEach(g=>g.dispose());}return root;}
}
const ellipse = (rx:number,rz:number,y:number,width:number,height:number) => {
  const shape=new T.Shape();shape.absellipse(0,0,rx,rz,0,Math.PI*2,false,0);
  const hole=new T.Path();hole.absellipse(0,0,rx-width,rz-width,0,Math.PI*2,true,0);shape.holes.push(hole);
  const g=new T.ExtrudeGeometry(shape,{depth:height,bevelEnabled:false,curveSegments:96});g.rotateX(-Math.PI/2);g.translate(0,y,0);return g;
};
const scallopedStep=(rx:number,rz:number,y:number,width:number,height:number,j:number)=>{
  const positions:number[]=[];const normals:number[]=[];const uvs:number[]=[];
  const vert=(r:number,a:number,h:number)=>[r*Math.cos(a),h,(r/rx)*rz*Math.sin(a)];
  const quad=(a:number[],b:number[],c:number[],d:number[],normal:number[])=>{for(const p of [a,b,c,a,c,d]){positions.push(...p);normals.push(...normal);uvs.push(p[0]*.3,p[2]*.3);}};
  for(let k=0;k<720;k++){
    const a=k*Math.PI*2/720,z=(k+1)*Math.PI*2/720;
    const limit=21-3.8*(.5+.5*Math.cos((a+z)*18));if(j>limit)continue;
    const p=vert(rx,a,y),q=vert(rx,z,y),r=vert(rx-width,z,y),s=vert(rx-width,a,y);
    quad(p,s,r,q,[0,1,0]);quad(p,q,vert(rx,z,y-height),vert(rx,a,y-height),[Math.cos(a),0,Math.sin(a)]);
    quad(vert(rx,a,y-height),vert(rx,z,y-height),vert(rx-width,z,y-height),vert(rx-width,a,y-height),[0,-1,0]);
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(positions,3));g.setAttribute('normal',new T.Float32BufferAttribute(normals,3));g.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));return g;
};

export function buildStadium(){
  const b=new Builder();
  // Four exposed concourses and open radial bays; no modern white pylons or roof.
  for(const y of [.25,.95,1.65,2.35])b.add(ellipse(12.8,10.25,y,2.2,.13),'concrete');
  for(let i=0;i<72;i++){
    const a=i*Math.PI*2/72;const x=12.25*Math.cos(a),z=9.7*Math.sin(a);
    b.box([x,1.32,z],[.16,2.65,.24],'concrete',[0,-a,0]);
    b.box([10.5*Math.cos(a),1.35,8.05*Math.sin(a)],[.16,2.7,.2],'concrete',[0,-a,0]);
    // Visible inclined cantilever ribs, characteristic scalloped unfinished rim.
    const p=new T.Vector3(10.2*Math.cos(a),2.5,7.6*Math.sin(a));
    const q=new T.Vector3(13.0*Math.cos(a),4.25,10.4*Math.sin(a));
    const rib=new T.BoxGeometry(.17,p.distanceTo(q),.24);
    rib.applyQuaternion(new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),q.clone().sub(p).normalize()));rib.translate(...p.add(q).multiplyScalar(.5).toArray());b.add(rib,'concrete');
  }
  // Three independent seating tiers and circulation gaps.
  for(const [count,rx,rz,y,step,raise] of [[16,6.35,4.1,.25,.185,.083],[10,9.15,6.9,1.8,.155,.085],[22,10.3,8,2.55,.132,.077]]){
    for(let j=0;j<count;j++)b.add(count===22?scallopedStep(rx+j*step,rz+j*step,y+j*raise,step+.02,.075,j):ellipse(rx+j*step,rz+j*step,y+j*raise,step+.02,.075),j%4===0?'concrete':'concreteLight');
  }
  // Vomitory openings and stair landings remain part of the unfinished bowl.
  for(let i=0;i<28;i++){
    const a=i*Math.PI*2/28;
    b.box([11.2*Math.cos(a),3.18,8.8*Math.sin(a)],[.38,.38,.50],'concrete',[0,-a,0]);
    b.box([11.15*Math.cos(a),3.20,8.72*Math.sin(a)],[.26,.27,.46],'dark',[0,-a,0]);
  }
  b.box([0,.03,0],[11,.06,7],'sand');
  return b.build();
}

export function buildTruck(){
  const b=new Builder();
  // 8.4 m flatbed, 2.45 m wide, 3.1 m cab. Front faces +X.
  b.box([0,.105,0],[.84,.055,.21],'dark',undefined,.008);
  b.box([-.13,.163,0],[.61,.026,.245],'steel',undefined,.005);
  b.box([-.13,.184,0],[.60,.014,.23],'wood');
  b.box([.275,.223,0],[.245,.23,.245],'cab',undefined,.02);
  b.box([.335,.294,0],[.12,.095,.225],'window',[0,0,.10],.008);
  b.box([.399,.198,0],[.012,.05,.19],'dark');
  for(let i=0;i<5;i++)b.box([.406,.18+i*.01,0],[.006,.003,.18],'steel');
  b.box([.405,.14,0],[.025,.035,.25],'cab',undefined,.005);
  for(const z of [-.124,.124]){
    b.box([.275,.285,z],[.145,.085,.005],'window',undefined,.006);
    b.box([.239,.221,z*1.02],[.043,.008,.007],'dark');
    b.box([.325,.28,z*1.30],[.025,.045,.018],'dark',undefined,.005);
    b.tube([.34,.27,z],[.325,.27,z*1.3],.004,'steel');
    b.box([.408,.157,z*.73],[.008,.024,.04],'white');
    b.box([-.12,.21,z],[.59,.045,.01],'cab');
    b.box([.20,.09,z],[.1,.022,.03],'steel');
    for(let i=0;i<5;i++)b.box([-.40+i*.12,.21,z],[.008,.07,.013],'steel');
  }
  // Palletised, strapped load, not hanging over staff.
  for(const x of [-.28,-.07]){
    b.box([x,.224,0],[.16,.055,.17],'wood');
    for(let j=0;j<4;j++)b.box([x,.26+j*.021,0],[.15,.02,.16],'concreteLight');
    for(const z of [-.06,.06])b.box([x,.302,z],[.17,.003,.009],'orange');
  }
  const root=b.build(); root.name='truck-body';
  for(const x of [-.30,-.17,.285])for(const z of [-.125,.125]){
    const wheel=new T.Group();wheel.position.set(x,.067,z);wheel.name='wheel';
    const tyre=new T.Mesh(new T.CylinderGeometry(.067,.067,.045,32),mats.rubber);tyre.rotation.x=Math.PI/2;tyre.castShadow=true;wheel.add(tyre);
    const hub=new T.Mesh(new T.CylinderGeometry(.037,.037,.048,24),mats.steel);hub.rotation.x=Math.PI/2;wheel.add(hub);
    for(let i=0;i<8;i++){const lug=new T.Mesh(new T.SphereGeometry(.004,6,4),mats.dark);lug.position.set(Math.cos(i*Math.PI/4)*.026,Math.sin(i*Math.PI/4)*.026,z>0?.026:-.026);wheel.add(lug);}
    root.add(wheel);
  }
  return root;
}

export function buildWorker(variant=0){
  const b=new Builder();
  for(const side of [-1,1]){
    const x=side*.024;
    b.box([x,.009,.01],[.028,.018,.054],'dark',undefined,.006);
    b.tube([x,.025,0],[x,.086,-.003],.012,'navy');
    b.box([x,.045,0],[.025,.01,.028],'white');
  }
  b.add(new T.CapsuleGeometry(.025,.045,6,12),'navy',[0,.115,0],undefined,[1,.85,.65]);
  b.box([0,.116,.002],[.057,.059,.035],'vest',undefined,.01);
  b.box([0,.099,.022],[.057,.009,.002],'white');
  for(const x of [-.018,.018])b.box([x,.125,.022],[.007,.04,.002],'white');
  b.add(new T.SphereGeometry(.018,16,12),'skin',[0,.16,.001],undefined,[.82,1.12,.88]);
  // Helmet dome, solid brim and straps. No floating protection.
  b.add(new T.SphereGeometry(.021,16,12,0,Math.PI*2,0,Math.PI/2),'white',[0,.17,0]);
  b.add(new T.CylinderGeometry(.025,.025,.004,20),'white',[0,.17,.002],undefined,[1,1,1.12]);
  b.box([0,.186,0],[.004,.008,.027],'white',undefined,.002);
  b.tube([-.03,.137,0],[-.04,.104,.026],.009,'navy');
  b.tube([-.04,.104,.026],[-.018,.12,.047],.008,'skin');
  b.box([-.011,.126,.052],[.02,.034,.005],'dark',[.15,0,0],.002);
  if(variant===0){b.tube([.03,.137,0],[.045,.117,.015],.009,'navy');b.tube([.045,.117,.015],[.05,.14,.047],.007,'skin');b.box([.05,.15,.048],[.014,.022,.007],'skin',undefined,.003);}
  else {b.tube([.03,.137,0],[.035,.08,.009],.009,'navy');b.add(new T.SphereGeometry(.009,8,8),'skin',[.035,.076,.009]);}
  return b.build();
}

export function buildContext(){
  const b=new Builder();
  b.box([0,-.09,0],[90,.18,90],'sand');
  b.box([0,-.003,15.0],[70,.06,7],'road');
  for(let i=-20;i<35;i+=2)b.box([i,.031,17.2],[.8,.003,.04],'white');
  b.box([0,.055,11.3],[38,.11,.65],'concreteLight');
  // Generic recreated gate: discontinuity is intentional at the access, not operational data.
  for(let x=-20;x<20;x+=.55){if(x>8&&x<10.8)continue;
    b.box([x,.14,11.7],[.54,.27,.035],'steel');
    b.box([x-.27,.18,11.7],[.018,.36,.018],'dark');}
  for(let i=0;i<16;i++){
    const x=-27+i*3.5, h=2.1+(i%4)*.45;
    b.box([x,h/2,-16],[2.8,h,2.6],i%2?'concrete':'orange');
    for(let y=.25;y<h;y+=.33)for(let xx=-.9;xx<=.9;xx+=.6)b.box([x+xx,y,-14.68],[.35,.21,.015],'window');
  }
  return b.build();
}
