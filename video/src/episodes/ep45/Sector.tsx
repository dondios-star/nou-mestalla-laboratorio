import React from 'react';
import {ThreeCanvas} from '@remotion/three';
import {PCFShadowMap} from 'three';
import {CameraAt} from './Stadium';
import {Seat,Rail,Person} from './Models';
import {STRUCTURE,sectorSeats} from './layouts';
import {comparePose} from './timing';
import type {Variant} from './content';
import {lerp} from '../../shared/motion/time';

const Structure = () => <group>
  {Array.from({length:STRUCTURE.rows},(_,r)=><mesh key={r} position={[0,r*STRUCTURE.rise-.19,-r*STRUCTURE.tread]} receiveShadow castShadow><boxGeometry args={[STRUCTURE.width,.38,STRUCTURE.tread]}/><meshStandardMaterial color={r%2?'#CAC6BD':'#D0CCC3'} roughness={.95}/></mesh>)}
  <mesh position={[0,1.33,-5.76]} receiveShadow castShadow><boxGeometry args={[STRUCTURE.width,.38,2.1]}/><meshStandardMaterial color="#C5C2BA" roughness={.95}/></mesh>
  {[-4.8,-.1,4.8].map(x=><mesh key={x} position={[x,.1,-3.3]} castShadow><boxGeometry args={[.22,2.3,6.6]}/><meshStandardMaterial color="#B1B0AA" roughness={.96}/></mesh>)}
  {[-5.3,5.3].map(x=><group key={x}><Rail a={[x,.08,.55]} b={[x,2.02,-4.78]}/><Rail a={[x,.95,.55]} b={[x,2.9,-4.78]}/>{Array.from({length:6},(_,r)=><Rail key={r} a={[x,r*.38,.55-r*1.06]} b={[x,r*.38+.95,.55-r*1.06]}/>)}</group>)}
  <Rail a={[-5.3,2.45,-6.78]} b={[5.3,2.45,-6.78]}/>
  {[-5.3,-2.65,0,2.65,5.3].map(x=><Rail key={x} a={[x,1.52,-6.78]} b={[x,2.45,-6.78]}/>)}
  {Array.from({length:10},(_,r)=><mesh key={r} position={[-.7,r*.19,-r*.53]}><boxGeometry args={[.8,.18,.53]}/><meshStandardMaterial color="#DAD5C8" roughness={1}/></mesh>)}
</group>;

export const Sector = ({variant,sourceFrame,mini=false}:{variant:Variant;sourceFrame:number;mini?:boolean}) => {
  const p=comparePose(sourceFrame),base=sectorSeats('base'),final=sectorSeats(variant);
  const cut=lerp(-5.5,5.5,p.change);
  return <ThreeCanvas width={1080} height={1000} gl={{antialias:true,alpha:true}} shadows={{type:PCFShadowMap}} camera={{fov:36,near:.1,far:150,position:[13,13,17]}}>
    <CameraAt position={[13,13,17]} target={[0,.7,-2.7]}/>
    <hemisphereLight args={['#EBF1F6','#A29886',1.9]}/>
    <directionalLight position={[-4,12,8]} intensity={3} castShadow shadow-mapSize={[1536,1536]} shadow-camera-left={-11} shadow-camera-right={11} shadow-camera-top={11} shadow-camera-bottom={-11} shadow-normalBias={.025}/>
    <directionalLight position={[8,6,-8]} intensity={.8}/>
    <mesh position={[0,-1.18,-2.7]} receiveShadow><boxGeometry args={[12.5,.18,9.4]}/><meshStandardMaterial color="#DBD2C1" roughness={.96}/></mesh>
    <Structure/>
    {base.map(s=><group key={`base-${s.id}`} visible={variant==='base'||s.x>cut}><Seat {...s}/></group>)}
    {variant!=='base'&&final.map(s=>{
      const reserve=variant==='B'&&s.module==='reserve';
      return <group key={s.id} visible={s.x<=cut}><Seat {...s} ghost={reserve} opacity={reserve?.3:1}/></group>;
    })}
    {variant==='B'&&p.change>.7&&<group>
      {/* A safely finished protected zone, never an abandoned open structure. */}
      {Array.from({length:5},(_,r)=><mesh key={r} position={[3.15,r*.38+.025,-r*1.06]} receiveShadow><boxGeometry args={[4.1,.05,.99]}/><meshStandardMaterial color="#73848A" roughness={.9}/></mesh>)}
      <Rail a={[1.15,.05,.55]} b={[1.15,1.95,-4.75]} color="#43565D"/>
      <Rail a={[1.15,.95,.55]} b={[1.15,2.85,-4.75]} color="#43565D"/>
      {[0,1,2,3,4,5].map(r=><Rail key={r} a={[1.15,r*.38,.55-r*1.06]} b={[1.15,r*.38+.95,.55-r*1.06]} color="#43565D"/>)}
      {p.fence>0&&<group scale={[1,p.fence,1]}>{[1.3,2.6,3.9].map(x=><mesh key={x} position={[x,.55,.66]}><boxGeometry args={[1.25,1.1,.045]}/><meshStandardMaterial color="#C6B99D" wireframe/></mesh>)}</group>}
      {p.future>0&&sectorSeats('A').filter(s=>s.module==='reserve').map(s=><group key={`future-${s.id}`} position={[0,lerp(.45,0,p.future),0]}><Seat {...s} ghost/></group>)}
    </group>}
    {variant==='C'&&p.change>.65&&<group scale={[1,Math.max(.01,(p.change-.65)/.35),1]}>
      <mesh position={[2.45,2.14,-5.8]} castShadow><boxGeometry args={[3.5,1.2,.62]}/><meshStandardMaterial color="#838C84" roughness={.8}/></mesh>
      <mesh position={[2.45,2.77,-5.7]} castShadow><boxGeometry args={[3.65,.10,.92]}/><meshStandardMaterial color="#D3BF97" roughness={.7}/></mesh>
      <mesh position={[2.45,3.27,-6.14]}><boxGeometry args={[3.6,.55,.045]}/><meshStandardMaterial color="#444B45"/></mesh>
      {[1.2,2.4,3.6].map(x=><mesh key={x} position={[x,3.27,-6.105]}><boxGeometry args={[.55,.26,.015]}/><meshStandardMaterial color="#F2E9D6"/></mesh>)}
      {[-3.4,-1.65].map(x=><group key={x}><mesh position={[x,2.55,-5.85]} castShadow><cylinderGeometry args={[.48,.48,.07,24]}/><meshStandardMaterial color="#CFB995" roughness={.6}/></mesh><Rail a={[x,1.55,-5.85]} b={[x,2.55,-5.85]} r={.035}/></group>)}
    </group>}
    {variant==='A'&&[0,1,2,3,4,5,6,7,8,9,10,11].map((i)=>{
      const s=final[(i*7)%30];return <group key={i} visible={s.x<=cut}><Person index={i} x={s.x} y={s.y} z={s.z} sit={1} scale={.96}/></group>;
    })}
  </ThreeCanvas>;
};
