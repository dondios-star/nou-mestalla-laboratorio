import React from 'react';
import {ThreeCanvas} from '@remotion/three';
import {PCFShadowMap} from 'three';
import {Seat,Person,Rail} from './Models';
import {CameraAt} from './Stadium';
import {hookPose} from './timing';
import {hookSeats,ROW_LIMITS} from './layouts';
import {lerp,progress} from '../../shared/motion/time';

export const Hero = ({sourceFrame}:{sourceFrame:number}) => {
  const p=hookPose(sourceFrame),cut=lerp(-2.6,2.5,p.replace);
  const five=hookSeats(false),four=hookSeats(true);
  return <ThreeCanvas width={1080} height={1120} camera={{fov:35,near:.05,far:100,position:[4.6,3.7,10.2]}} gl={{antialias:true,alpha:true}} shadows={{type:PCFShadowMap}}>
    <CameraAt position={[4.6,3.7,10.2]} target={[.25,.85,0]}/>
    <hemisphereLight args={['#EAF1F8','#9E8F7A',2]}/>
    <directionalLight position={[-3,8,5]} intensity={3} castShadow shadow-mapSize={[1536,1536]} shadow-camera-left={-7} shadow-camera-right={7} shadow-camera-top={7} shadow-camera-bottom={-7} shadow-normalBias={.025}/>
    <directionalLight position={[5,4,-5]} intensity={1.1}/>
    <mesh position={[.5,-.17,-.2]} receiveShadow><boxGeometry args={[7.4,.30,3.8]}/><meshStandardMaterial color="#C7C3B8" roughness={.96}/></mesh>
    <mesh position={[.5,-.32,1.85]} receiveShadow><boxGeometry args={[7.4,.30,.65]}/><meshStandardMaterial color="#B9B6AC" roughness={.96}/></mesh>
    <mesh position={[.5,-.47,2.5]} receiveShadow><boxGeometry args={[7.4,.30,.65]}/><meshStandardMaterial color="#B9B6AC" roughness={.96}/></mesh>
    {ROW_LIMITS.map(x=><mesh key={x} position={[x,.006,.15]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[.025,1.25]}/><meshStandardMaterial color="#71756F" roughness={1}/></mesh>)}
    <Rail a={[-2.1,.29,-.12]} b={[2.1,.29,-.12]} r={.038}/>
    {five.map(s=><group key={`old-${s.id}`} visible={s.x>cut}><Seat {...s}/></group>)}
    {four.map(s=><group key={`new-${s.id}`} visible={s.x<=cut}><Seat {...s}/></group>)}
    {p.replace>0&&p.replace<1&&<mesh position={[cut,.51,0]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[1.25,1.02]}/><meshBasicMaterial color="#F4EAD8" transparent opacity={.55} side={2} depthWrite={false}/></mesh>}
    {[0,1,2,3].map(i=><Person key={i} index={i} x={lerp(five[i].x,four[i].x,p.replace)} sit={progress(sourceFrame,132+i*4,186+i*4)} look={i===3?p.reaction*.3:0}/>) }
    <Person index={4} x={lerp(five[4].x,2.57,p.replace)} z={.08} look={lerp(-.22,-.95,p.reaction)} shrug={p.reaction}/>
    <Rail a={[-2.95,0,-1.36]} b={[-2.95,.95,-1.36]} r={.035}/><Rail a={[-2.95,.95,-1.36]} b={[3.4,.95,-1.36]} r={.035}/><Rail a={[3.4,.95,-1.36]} b={[3.4,0,-1.36]} r={.035}/>
  </ThreeCanvas>;
};
