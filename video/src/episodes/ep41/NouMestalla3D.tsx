import React, {useLayoutEffect, useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import * as T from 'three';
import {mergeGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {progress, lerp} from '../../shared/motion/time';

// Metres. An independently authored architectural approximation, not a surveyed model.
// Three terraced bowls, exposed floor plates and radial rakers follow the historical references.
const concrete = new T.MeshStandardMaterial({color:'#b6b2a8',roughness:.94,metalness:0});
const darkConcrete = new T.MeshStandardMaterial({color:'#8e8c85',roughness:.98});
const brick = new T.MeshStandardMaterial({color:'#a27960',roughness:1});
const steel = new T.MeshStandardMaterial({color:'#696e70',roughness:.7,metalness:.5});
const white = new T.MeshStandardMaterial({color:'#e6dfce',roughness:.85});
const ground = new T.MeshStandardMaterial({color:'#b3a28b',roughness:1});
const wine = new T.MeshStandardMaterial({color:'#4B1931',roughness:.9});
const unitBox = new T.BoxGeometry(1,1,1);
// Seeded concrete grain is a data map (linear), not an albedo in the wrong colour space.
const grainData=new Uint8Array(128*128*4);
for(let i=0;i<128*128;i++){const v=150+Math.round(40*Math.sin(i*137.17)*Math.cos(i*.713));grainData.set([v,v,v,255],i*4);}
const grain=new T.DataTexture(grainData,128,128,T.RGBAFormat);grain.wrapS=grain.wrapT=T.RepeatWrapping;grain.repeat.set(5,5);grain.needsUpdate=true;
concrete.bumpMap=grain;concrete.bumpScale=.09;darkConcrete.bumpMap=grain;darkConcrete.bumpScale=.06;
type V = [number,number,number];
const point=(rx:number,rz:number,y:number,a:number):V=>[rx*Math.cos(a),y,rz*Math.sin(a)];
function ring(rx:number,rz:number,depth:number,y:number,height:number,start=0,end=Math.PI*2,steps=144,upperRow=-1){
  const vertices:number[]=[];
  const quad=(a:V,b:V,c:V,d:V)=>vertices.push(...a,...c,...b,...a,...d,...c);
  for(let i=0;i<steps;i++){
    const a=start+(end-start)*i/steps,b=start+(end-start)*(i+1)/steps;
    // The exposed crown is scalloped, not a continuous contemporary roof.
    if(upperRow>=0 && upperRow>16+5*Math.abs(Math.sin((a+b)*18)))continue;
    const o=(h:number,t:number)=>point(rx,rz,h,t),n=(h:number,t:number)=>point(rx-depth,rz-depth,h,t);
    quad(o(y,a),o(y,b),n(y,b),n(y,a));
    quad(o(y-height,b),o(y-height,a),n(y-height,a),n(y-height,b));
    quad(o(y-height,a),o(y-height,b),o(y,b),o(y,a));
    quad(n(y-height,b),n(y-height,a),n(y,a),n(y,b));
  }
  const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(vertices,3));g.computeVertexNormals();return g;
}
function bowl(){
 const gs:T.BufferGeometry[]=[];
 [[64,46,2,18],[82,64,13,14],[98,80,23,22]].forEach(([rx,rz,y,rows])=>{
  for(let j=0;j<rows;j++)gs.push(ring(rx+j*.67,rz+j*.67,1.02,y+j*.49,.45,0,Math.PI*2,288,y===23?j:-1));
 });
 const g=mergeGeometries(gs)!;gs.forEach(x=>x.dispose());return g;
}
const bowlGeo=bowl();
const floors=mergeGeometries([4,9,14,19,24].map(y=>ring(112,94,13,y,.65)))!;
function boxes(items:{p:V;s:V;r?:number}[],material:T.Material){
 const mesh=new T.InstancedMesh(unitBox,material,items.length),o=new T.Object3D();
 items.forEach((v,i)=>{o.position.set(...v.p);o.scale.set(...v.s);o.rotation.set(0,v.r??0,0);o.updateMatrix();mesh.setMatrixAt(i,o.matrix);});
 mesh.castShadow=true;mesh.receiveShadow=true;return mesh;
}
function structure(){
 const parts:{p:V;s:V;r?:number}[]=[];
 for(let i=0;i<72;i++){
  const a=i/72*Math.PI*2;
  for(const [rx,rz,h] of [[110,92,28],[98,80,23],[82,64,13]])parts.push({p:point(rx,rz,h/2,a),s:[1.05,h,1.2],r:-a});
 }
 return boxes(parts,concrete);
}
function rakers(){
 const group=new T.Group();
 for(let i=0;i<72;i++){
  const a=i/72*Math.PI*2;
  const start=new T.Vector3(...point(96,78,22,a)),end=new T.Vector3(...point(114,96,35,a));
  const direction=end.clone().sub(start),m=new T.Mesh(new T.BoxGeometry(1.1,direction.length(),1.15),concrete);
  m.position.copy(start.add(end).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),direction.normalize());m.castShadow=true;group.add(m);
 }
 return group;
}
function siteDetails(){
 const group=new T.Group();
 const walls:{p:V;s:V;r:number}[]=[];
 for(let i=0;i<72;i++){const a=i/72*Math.PI*2;if(i%5!==0)walls.push({p:point(109,91,20.8,a),s:[1.1,3.1,5.8],r:-a});}
 group.add(boxes(walls,brick));
 // The bare field is construction ground, not a functioning pitch.
 const field=new T.Mesh(new T.BoxGeometry(112,.35,78),ground);field.position.y=.2;field.receiveShadow=true;group.add(field);
 return group;
}
export const HistoricStadium=()=>{
 const pillars=useMemo(structure,[]),ribs=useMemo(rakers,[]),detail=useMemo(siteDetails,[]);
 return <group><mesh geometry={bowlGeo} material={concrete} castShadow receiveShadow/><mesh geometry={floors} material={darkConcrete} castShadow receiveShadow/>
 <primitive object={pillars}/><primitive object={ribs}/><primitive object={detail}/></group>;
};
const Box=({p,s,material=concrete}:{p:V;s:V;material?:T.Material})=><mesh position={p} scale={s} geometry={unitBox} material={material} castShadow receiveShadow/>;
function City(){
 const city=useMemo(()=>{
  const g=new T.Group();const windows=[];
  for(let i=0;i<20;i++){
   const x=-280+i*28,h=24+(i*17%27),z=-155-(i%3)*17;
   const mat=new T.MeshStandardMaterial({color:['#b79983','#c1b5a4','#a18e7e','#c9bba9'][i%4],roughness:.95});
   const m=new T.Mesh(new T.BoxGeometry(22,h,24),mat);m.position.set(x,h/2,z);m.castShadow=true;g.add(m);
   for(let row=0;row<Math.floor(h/3.5);row++)for(let col=0;col<5;col++)windows.push({p:[x-8+col*4,3+row*3.5,z+12.1] as V,s:[1.8,1.65,.1] as V});
  }
  g.add(boxes(windows,new T.MeshStandardMaterial({color:'#606d72',roughness:.5})));
  const fence=[];for(let i=0;i<65;i++)fence.push({p:[-160+i*5,1.15,111] as V,s:[4.9,2.3,.12] as V});
  g.add(boxes(fence,steel));
  for(let i=0;i<10;i++){
   const x=-150+i*32;const tree=new T.Group();
   const trunk=new T.Mesh(new T.CylinderGeometry(.3,.5,5,6),new T.MeshStandardMaterial({color:'#6f604c'}));trunk.position.y=2.5;tree.add(trunk);
   for(let j=0;j<18;j++){const leaf=new T.Mesh(new T.IcosahedronGeometry(.9,1),new T.MeshStandardMaterial({color:j%2?'#6f795b':'#818966',roughness:1}));leaf.position.set(Math.sin(j*3)*2,5+Math.cos(j*2)*1.4,Math.cos(j*3)*1.7);tree.add(leaf);}
   tree.position.set(x,0,138);g.add(tree);
  }
  return g;
 },[]);
 return <group><Box p={[0,-.5,0]} s={[1000,1,1000]} material={ground}/><Box p={[0,.05,125]} s={[650,.15,20]} material={new T.MeshStandardMaterial({color:'#666a69',roughness:1})}/><Box p={[0,.2,143]} s={[650,.4,12]} material={white}/><primitive object={city}/>
 {[-75,30,100].map((x,i)=><group key={x} position={[x,0,124]}><Box p={[0,1,0]} s={[4.5,1.3,2]} material={i===0?wine:white}/><Box p={[0,1.9,0]} s={[2.2,.7,1.8]} material={steel}/>{[-1.4,1.4].map(q=><group key={q}><Box p={[q,.6,1]} s={[.65,.7,.2]} material={steel}/><Box p={[q,.6,-1]} s={[.65,.7,.2]} material={steel}/></group>)}</group>)}
 </group>;
}
function Camera({p,target,fov=38}:{p:V;target:V;fov?:number}){const {camera}=useThree();useLayoutEffect(()=>{camera.position.set(...p);camera.lookAt(...target);if(camera instanceof T.PerspectiveCamera){camera.fov=fov;camera.updateProjectionMatrix();}camera.updateMatrixWorld();},[camera,...p,...target,fov]);return null;}
const Lights=({exterior=false}:{exterior?:boolean})=><><hemisphereLight args={['#dbe9f0','#92816b',1.1]}/><directionalLight position={[-110,160,120]} intensity={2.8} color="#fff2dc" castShadow shadow-mapSize={[2048,2048]} shadow-camera-left={-180} shadow-camera-right={180} shadow-camera-top={160} shadow-camera-bottom={-160} shadow-camera-near={1} shadow-camera-far={500} shadow-bias={-.0005}/><ambientLight intensity={exterior?.1:.3}/></>;
export function Exterior({sourceFrame}:{sourceFrame:number}){
 const q=progress(sourceFrame,0,209);
 return <ThreeCanvas width={1080} height={1920} shadows={{type:T.PCFShadowMap}} dpr={1} gl={{antialias:true,toneMapping:T.ACESFilmicToneMapping}} camera={{near:.1,far:1500,fov:43}} style={{position:'absolute',inset:0}}>
 <color attach="background" args={['#becdd5']}/><fog attach="fog" args={['#becdd5',420,1000]}/><Camera p={[lerp(137,134,q),18,lerp(250,246,q)]} target={[0,2,0]} fov={43}/><Lights exterior/><City/><HistoricStadium/>
 </ThreeCanvas>;
}

// One coordinate system and camera for all strategies. B is a bounded substructure
// package, represented by a complete protected slab. It is NOT a partial open stadium.
export type ModelState='plan'|'A'|'B'|'C'|'historic';
const outlineGeo=new T.EdgesGeometry(mergeGeometries([ring(113,95,48,.8,.4),ring(113,95,1,32,.2),ring(82,64,1,13,.2),ring(97,79,1,22,.2)])!);
function Crane({x,z,q}:{x:number;z:number;q:number}){
 const mat=new T.MeshStandardMaterial({color:'#b49a68',roughness:.65,metalness:.2});
 return <group position={[x,0,z]} scale={[1,Math.max(.01,q),1]}><Box p={[0,18,0]} s={[1.1,36,1.1]} material={mat}/><Box p={[11,35,0]} s={[35,.8,.8]} material={mat}/><Box p={[22,25,0]} s={[.14,20,.14]} material={steel}/><Box p={[-6,35,0]} s={[4,2.8,2.5]} material={steel}/></group>;
}
function Scheme({state,activation=1}:{state:ModelState;activation?:number}){
 const q=activation;
 return <group>
 <Box p={[0,-2,0]} s={[270,3,230]} material={white}/>
 <lineSegments geometry={outlineGeo}><lineBasicMaterial color="#71665f" transparent opacity={.76}/></lineSegments>
 {[0,1,2,3,4,5,6,7].map(i=>{const a=i/8*Math.PI*2;return <mesh key={i} position={point(110,92,16,a)} geometry={new T.BoxGeometry(.4,31,.4)} material={darkConcrete}/>;})}
 {state==='historic'&&<HistoricStadium/>}
 {state==='B'&&<group scale={[1,Math.max(.01,q),1]}><Box p={[0,2.8,72]} s={[104,5.5,28]}/><Box p={[0,5.7,72]} s={[106,.5,30]} material={white}/><Box p={[0,7,88]} s={[111,2,.4]} material={wine}/><Box p={[-55,7,72]} s={[.4,2,32]} material={wine}/><Box p={[55,7,72]} s={[.4,2,32]} material={wine}/><Box p={[0,7,56]} s={[110,2,.4]} material={wine}/></group>}
 {state==='C'&&<group><mesh geometry={ring(110,92,16,2+5*q,1)} material={concrete} receiveShadow castShadow/>{Array.from({length:24},(_,i)=>{const a=i/24*Math.PI*2;return <Box key={i} p={point(106,88,5*q,a)} s={[2,10*q,2]}/>;})}{[0,1,2].map(i=><Crane key={i} x={[-75,75,0][i]} z={[-38,-38,60][i]} q={q}/>)}</group>}
 {state==='A'&&[-35,0,35].map((x,i)=><group key={x} position={[x,1,55]} scale={Math.max(.001,q)} rotation={[0,i*.12,0]}><Box p={[0,0,0]} s={[27,.5,37]} material={white}/>{[0,1,2,3].map(j=><Box key={j} p={[0,.3,-8+j*5]} s={[18,.1,.5]} material={darkConcrete}/>)}</group>)}
 </group>;
}
function ExistingMestalla(){
 const orange=new T.MeshStandardMaterial({color:'#b57842',roughness:1});
 return <group><Box p={[0,.2,0]} s={[103,.5,66]} material={new T.MeshStandardMaterial({color:'#667c5b',roughness:1})}/>
 {[0,1,2,3].map(i=><group rotation={[0,i*Math.PI/2,0]} key={i}>{Array.from({length:18},(_,j)=><Box key={j} p={[0,2+j*.9,38+j*.65]} s={[i%2?70:110,.7,.85]} material={orange}/>)}</group>)}
 <Box p={[-66,21,0]} s={[26,1.2,116]} material={white}/>
 </group>;
}
export function Maquette({state='plan',activation=1,two=false,frame=720}:{state?:ModelState;activation?:number;two?:boolean;frame?:number}){
 const q=progress(frame,900,959);
 return <ThreeCanvas width={1080} height={700} dpr={1} shadows={{type:T.PCFShadowMap}} camera={{near:.1,far:2000,fov:36}} gl={{antialias:true,alpha:true,toneMapping:T.ACESFilmicToneMapping}} style={{width:1080,height:700}}>
 <Camera p={two?[130,lerp(260,310,q),440]:[175,260,310]} target={[0,0,0]} fov={two?35:36}/><Lights/>
 <mesh rotation={[-Math.PI/2,0,0]} position={[0,-4,0]} receiveShadow><planeGeometry args={[900,900]}/><shadowMaterial transparent opacity={.18}/></mesh>
 {two?<><group position={[-105,0,0]} scale={.65}><ExistingMestalla/></group><group position={[105,0,0]} scale={.65}><Scheme state="plan"/></group></>:<Scheme state={state} activation={activation}/>}
 </ThreeCanvas>;
}
