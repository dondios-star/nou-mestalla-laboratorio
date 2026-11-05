import React, {useLayoutEffect, useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {BufferGeometry, Float32BufferAttribute, PCFShadowMap, Vector3} from 'three';
import {buildStadium, outline} from './geometry';
import {branchState, type Branch} from './state';
import {lerp, progress} from '../../shared/motion/time';
import {Img, staticFile} from 'remotion';

const Camera = ({mode, frame}:{mode:'inside'|'overview'|'detail';frame:number})=>{
  const {camera}=useThree();
  useLayoutEffect(()=>{
    if(mode==='inside'){
      const q=progress(frame,0,35);
      camera.position.set(lerp(43,41.5,q),30,63);
      camera.lookAt(-12,3,-19);
    } else if(mode==='detail'){
      camera.position.set(16,18,24);camera.lookAt(0,2.4,0);
    } else {camera.position.set(155,164,205);camera.lookAt(0,10,0);}
    camera.updateProjectionMatrix();
  },[camera,mode,frame]);
  return null;
};
const Lights=({detail=false}:{detail?:boolean})=><>
  <hemisphereLight args={['#e1ecf0','#958976',1.05]}/>
  <directionalLight position={detail?[12,25,15]:[-70,120,10]} intensity={2.3} castShadow
    shadow-mapSize={[2048,2048]} shadow-camera-left={detail?-22:-135} shadow-camera-right={detail?22:135}
    shadow-camera-top={detail?22:135} shadow-camera-bottom={detail?-22:-135}
    shadow-camera-near={1} shadow-camera-far={350} shadow-normalBias={.1}/>
</>;
export const StadiumModel=()=>{
  const g=useMemo(()=>buildStadium(),[]);
  return <group dispose={null}>
    <mesh geometry={g.concrete} receiveShadow castShadow><meshStandardMaterial vertexColors roughness={.96}/></mesh>
    <mesh geometry={g.metal}><meshStandardMaterial vertexColors roughness={.75} metalness={.25}/></mesh>
  </group>;
};
const DesignLines=({opacity}:{opacity:number})=>{
  const geometry=useMemo(()=>{
    const p:number[]=[];
    for(const [r,y] of [[13,8],[27,19],[47,36]])for(let j=0;j<128;j++){
      const a=outline(j*Math.PI*2/128,r),b=outline((j+1)*Math.PI*2/128,r);
      p.push(a[0],y,a[1],b[0],y,b[1]);
    }
    for(let j=0;j<32;j++){
      const a=outline(j*Math.PI*2/32,1),b=outline(j*Math.PI*2/32,47);
      p.push(a[0],2,a[1],b[0],36,b[1]);
    }
    const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(p,3));return g;
  },[]);
  return <lineSegments geometry={geometry}><lineBasicMaterial color="#f4ead8" transparent opacity={opacity} depthTest={false}/></lineSegments>;
};
const Box=({p,s,c='#bab8ae'}:{p:[number,number,number];s:[number,number,number];c?:string})=><mesh position={p} castShadow receiveShadow><boxGeometry args={s}/><meshStandardMaterial color={c} roughness={.92}/></mesh>;
const Person=({x,z,vest='#c9b783'}:{x:number;z:number;vest?:string})=><group position={[x,0,z]}>
  <Box p={[-.12,.43,0]} s={[.16,.78,.2]} c="#3e4548"/><Box p={[.12,.43,0]} s={[.16,.78,.2]} c="#3e4548"/>
  <Box p={[0,1.12,0]} s={[.48,.65,.28]} c={vest}/>
  <mesh position={[0,1.65,0]}><sphereGeometry args={[.21,12,8]}/><meshStandardMaterial color="#e1b99a"/></mesh>
  <mesh position={[0,1.8,0]}><sphereGeometry args={[.25,12,8,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color="#f4eee0"/></mesh>
  <Box p={[.3,1.05,.12]} s={[.13,.55,.16]} c={vest}/>
</group>;
type StadiumProps={frame?:number;inside?:boolean;width?:number;height?:number;blueprint?:number};
export const LiveStadiumView=({frame=0,inside=false,width=1080,height=900,blueprint=0}:StadiumProps)=><ThreeCanvas
  width={width} height={height} camera={{fov:inside?77:42,near:.1,far:1200}}
  shadows={{type:PCFShadowMap}} gl={{antialias:true,alpha:false}}>
  <color attach="background" args={[inside?'#b6cbd5':'#ddd9ce']}/>
  <Lights/><Camera mode={inside?'inside':'overview'} frame={frame}/><StadiumModel/>
  {blueprint>0 && <DesignLines opacity={blueprint}/>}
  {inside && <>
    <Person x={12} z={28}/><Person x={14} z={29}/>
    {Array.from({length:6},(_,i)=><Box key={i} p={[-27,.3+i*.3,9]} s={[12,.24,1.8]} c="#bcbab3"/>)}
  </>}
</ThreeCanvas>;

// Lossless, native-resolution caches of the actual editable ThreeCanvas scene.
// Only a settled camera is cached. Moving frames are rendered in 3D at 60 fps.
export const StadiumView=(props:StadiumProps)=>{
  const {frame=0,inside=false,width=1080,height=900,blueprint=0}=props;
  if(inside && frame<35)return <LiveStadiumView {...props}/>;
  const name=inside?'inside-base':`overview-${height}`;
  return <div style={{width,height,position:'relative'}}>
    <Img src={staticFile(`assets/ep42/${name}.png`)} style={{width,height,position:'absolute',inset:0}}/>
    {inside&&blueprint>0&&<Img src={staticFile('assets/ep42/inside-lines.png')} style={{width,height,position:'absolute',inset:0,opacity:blueprint}}/>}
  </div>;
};

// Enlarged didactic vestibule of the same structural vocabulary. It explains
// work packages, not the real location/layout of three official stadium sectors.
type WorkBayProps={branch:Branch;frame:number;width?:number;height?:number};
export const WorkBays=(props:WorkBayProps)=>props.frame>=120
  ? <Img src={staticFile(`assets/ep42/workbay-${props.branch}.png`)} style={{width:props.width??920,height:props.height??560}}/>
  : <LiveWorkBays {...props}/>;
export const LiveWorkBays=({branch,frame,width=920,height=560}:WorkBayProps)=>{
  const state=branchState(branch,frame);
  return <ThreeCanvas width={width} height={height} camera={{fov:40,near:.1,far:150}} shadows={{type:PCFShadowMap}} gl={{antialias:true,alpha:false}}>
    <color attach="background" args={['#ddd9ce']}/><Lights detail/><Camera mode="detail" frame={0}/>
    <Box p={[0,-.3,0]} s={[25,.6,13]} c="#bcb6a8"/>
    {[-8,0,8].map((x,i)=><group key={x} position={[x,0,0]}>
      <Box p={[0,.05,0]} s={[7.7,.12,7]} c={i===0&&state.execution>0?'#d5c7ad':'#c5c1b7'}/>
      {[-3.7,3.7].flatMap(px=>[-3,3].map(z=><Box key={`${px}-${z}`} p={[px,2.4,z]} s={[.55,4.8,.55]}/>))}
      <Box p={[0,4.7,-3]} s={[8,.6,.6]}/>
      <Box p={[0,4.7,3]} s={[8,.6,.6]}/>
      <Box p={[0,2,-3.15]} s={[6.8,4,.22]} c="#afa99e"/>
      {i===0&&state.execution>0 && <Box p={[-2+state.execution*2,1,-2.98]} s={[4*state.execution,2,.15]} c="#e7ddc7"/>}
      {/* Physical boundaries and numbered packages are editorial, not approvals. */}
      <Box p={[0,.1,3.7]} s={[7.4,.08,.13]} c="#59474a"/>
      <Person x={-1.4} z={branch==='B'&&i===0&&state.execution>0?.3:5}/>
      {branch==='B'&&i===1&&frame>76&&<Person x={1.1} z={4.9} vest="#d9c9aa"/>}
    </group>)}
    {/* A continuous common corridor remains between all three work packages. */}
    <Box p={[0,.07,4.7]} s={[24,.12,1.8]} c="#aba69a"/>
    {branch==='C' && <group>
      <Box p={[0,3.65,2.3]} s={[24*state.systems,.12,.12]} c="#967553"/>
      <Box p={[0,3.95,1.9]} s={[24*state.systems,.12,.12]} c="#596b77"/>
      {[-8,0,8].map(x=><group key={x}>
        <Box p={[x,3.65,.2]} s={[.12,.12,4.2*state.systems]} c="#967553"/>
        <Box p={[x+.6,3.95,.2]} s={[.12,.12,3.4*state.systems]} c="#596b77"/>
      </group>)}
    </group>}
  </ThreeCanvas>;
};
