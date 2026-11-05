import React, {useLayoutEffect, useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {PCFShadowMap, PerspectiveCamera, Vector3, Object3D} from 'three';
import {buildContext, buildStadium, buildTruck, buildWorker, mats} from './models';
import {truckTravel, type Choice} from './state';
import {Img, staticFile} from 'remotion';
import {bakeLayout} from './bake-layout';

const Camera = ({map, sourceFrame}: {map:boolean;sourceFrame:number}) => {
  const {camera}=useThree();
  useLayoutEffect(()=>{
    if(map){camera.position.set(23,24,32);camera.lookAt(0,0,2.7);}
    else {camera.position.set(15,.38,24);camera.lookAt(1.5,1.6,0);}
    camera.updateProjectionMatrix();
  },[camera,map,sourceFrame]);return null;
};

const Truck = ({position, travel=0, scale=1}: {position:[number,number,number];travel?:number;scale?:number}) => {
  const truck=useMemo(()=>buildTruck(),[]);
  useLayoutEffect(()=>{truck.traverse(obj=>{if(obj.name==='wheel')obj.rotation.z=-travel/.067;});},[truck,travel]);
  return <group position={[position[0]+travel,position[1],position[2]]} scale={scale} rotation={[0,.30,0]}><primitive object={truck}/></group>;
};
const Worker=({position,variant=0,rotation=0,scale=1}:{position:[number,number,number];variant?:number;rotation?:number;scale?:number})=>{
  const model=useMemo(()=>buildWorker(variant),[variant]);
  return <primitive object={model} position={position} rotation={[0,rotation,0]} scale={scale}/>;
};
export const zoneWorld = {logistics:[-5.5,.08,12.8],storage:[4.3,.08,12.6],resources:[11,.08,15.7]} as const;
export const projectPoint=(p:readonly number[])=>{
  const cam=new PerspectiveCamera(40,1080/810,.1,200);cam.position.set(23,24,32);cam.lookAt(0,0,2.7);cam.updateMatrixWorld();
  const v=new Vector3(...p as [number,number,number]).project(cam);return {x:(v.x+1)*540,y:(1-v.y)*405};
};
export const projectPhone=(sourceFrame:number)=>{
  const cam=new PerspectiveCamera(55,1080/1920,.01,180);
  cam.position.set(15,.38,24);cam.lookAt(1.5,1.6,0);cam.updateMatrixWorld();
  const p=new Vector3(13.61,.14,21.61).project(cam);return {x:(p.x+1)*540,y:(1-p.y)*960};
};
export type WorldProps={sourceFrame?:number;map?:boolean;choice?:Choice;action?:number;width?:number;height?:number};
export const World = ({sourceFrame=0,map=false,choice='base',action=0,width=1080,height=1920}:WorldProps)=>{
  const layer=map?'map-a':'hero';
  const layout=bakeLayout[layer];
  const frame=map?Math.round(action*126):Math.min(72,Math.max(0,Math.round(sourceFrame)));
  const asset=`${layer}/${frame.toString().padStart(3,'0')}.webp`;
  return <div style={{position:'relative',width,height}}>
    <Img src={staticFile(`assets/ep44/baked/${map?'map-base':'hero-base'}.webp`)} style={{width,height,display:'block'}}/>
    {(!map||choice==='A')&&<Img src={staticFile(`assets/ep44/baked/${asset}`)} style={{position:'absolute',left:layout.x,top:layout.y,width:layout.width,height:layout.height}}/>}
  </div>;
};
export const LiveWorld = ({sourceFrame=0,map=false,choice='base',action=0,width=1080,height=1920}:WorldProps)=>{
  const stadium=useMemo(buildStadium,[]);const context=useMemo(buildContext,[]);
  const target=useMemo(()=>{const t=new Object3D();t.position.set(13.4,0,21.2);return t;},[]);
  return <ThreeCanvas width={width} height={height} camera={{fov:map?40:55,near:.01,far:180,position:map?[23,24,32]:[15,.38,24]}}
    shadows={{type:PCFShadowMap}} gl={{antialias:true,alpha:false}}>
    <color attach="background" args={[map?'#E5DBCA':'#BACFD3']}/>
    {!map&&<fog attach="fog" args={['#BACFD3',38,105]}/>}
    <hemisphereLight args={['#E1ECF3','#8C806D',1.65]}/>
    <directionalLight position={[-13,25,18]} intensity={3} castShadow shadow-mapSize={[2048,2048]}
      shadow-camera-left={-22} shadow-camera-right={22} shadow-camera-top={22} shadow-camera-bottom={-22}
      shadow-camera-near={1} shadow-camera-far={85} shadow-normalBias={.018}/>
    {!map&&<><primitive object={target}/><directionalLight position={[10.4,5,24]} target={target} intensity={1.1} castShadow shadow-mapSize={[1024,1024]}
      shadow-camera-left={-1.5} shadow-camera-right={1.5} shadow-camera-top={1.5} shadow-camera-bottom={-1.5}
      shadow-camera-near={.1} shadow-camera-far={12} shadow-normalBias={.001}/></>}
    <Camera map={map} sourceFrame={sourceFrame}/>
    <primitive object={stadium}/>
    {map?<>
      <mesh position={[0,-.18,2]} receiveShadow><boxGeometry args={[32,.35,30]}/><meshStandardMaterial color="#D3C5AF" roughness={.97}/></mesh>
      <mesh position={[0,-.39,0]} receiveShadow rotation={[-Math.PI/2,0,0]}><planeGeometry args={[200,200]}/><meshStandardMaterial color="#E5DBCA"/></mesh>
      <mesh position={[-5.5,.02,12.8]} receiveShadow><boxGeometry args={[5.8,.05,3.4]}/><meshStandardMaterial color="#A98C9A" roughness={1}/></mesh>
      <mesh position={[4.3,.02,12.6]} receiveShadow><boxGeometry args={[5,.05,3.4]}/><meshStandardMaterial color="#A98C9A" roughness={1}/></mesh>
      {choice==='A'&&action>0&&<group scale={[1,action,1]}>
        {[-6.5,-4.6].map(x=><group key={x} position={[x,0,12.6]}>
          <mesh position={[0,.42,0]} castShadow receiveShadow><boxGeometry args={[1.6,.84,1.2]}/><meshStandardMaterial color="#E6E0D3" roughness={.9}/></mesh>
          <mesh position={[0,.86,0]} castShadow><boxGeometry args={[1.7,.07,1.3]}/><meshStandardMaterial color="#7A6C69" roughness={.8}/></mesh>
          <mesh position={[0,.49,.61]}><boxGeometry args={[.53,.35,.015]}/><meshStandardMaterial color="#496169"/></mesh>
        </group>)}
        {[2.7,4.2,5.7].map(x=><mesh key={x} position={[x,.22,12.3]} castShadow><boxGeometry args={[1,.44,1.25]}/><meshStandardMaterial color="#AD9675" roughness={.9}/></mesh>)}
      </group>}
      <Truck position={[11,0,15.7]} scale={3}/>
      <Worker position={[12.1,0,16.1]} scale={3}/><Worker position={[11.6,0,16.7]} variant={1} scale={3}/>
    </>:<>
      <primitive object={context}/>
      <Truck position={[13.4,0,21.15]} travel={truckTravel(sourceFrame)}/>
      <Worker position={[13.65,0,21.57]} rotation={-.65} scale={1.05}/>
      <Worker position={[12.95,0,21.7]} rotation={.45} variant={1}/>
      <group position={[14.06,0,20.5]} rotation={[0,-.2,0]}>
        <mesh position={[0,.11,0]} castShadow material={mats.orange}><boxGeometry args={[.06,.22,.08]}/></mesh>
        <mesh position={[-.40,.18,0]} castShadow material={mats.white}><boxGeometry args={[.85,.025,.025]}/></mesh>
        {[-.1,-.3,-.5,-.7].map(x=><mesh key={x} position={[x,.18,.014]} material={mats.wine}><boxGeometry args={[.08,.026,.003]}/></mesh>)}
      </group>
    </>}
  </ThreeCanvas>;
};
