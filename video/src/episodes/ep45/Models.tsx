import React, {useMemo} from 'react';
import {CylinderGeometry, Quaternion, Vector3} from 'three';
import {loft, shell, tube} from './geometry';
import {FRIENDS} from './content';
import {lerp} from '../../shared/motion/time';

const seatBack = shell(.51,.50,.045,.09);
const seatPan = shell(.50,.43,.05,.08);
const headGeo = loft([[0,.045,.05],[.035,.09,.095],[.10,.115,.108],[.18,.12,.105],[.25,.104,.095],[.30,.065,.065],[.315,.005,.005]],32);
const shirtGeo = loft([[0,.145,.095],[.035,.17,.105],[.15,.165,.112],[.32,.205,.113],[.39,.19,.10],[.43,.095,.065],[.44,.08,.055]],32);
const shoeGeo = loft([[0,.055,.13,0,.035],[.025,.075,.15,0,.045],[.07,.072,.135,0,.03],[.11,.045,.08,0,-.015],[.12,.02,.025,0,-.02]],24);
const shortsGeo = loft([[0,.15,.09],[.045,.16,.10],[.17,.16,.095],[.18,.14,.085]],24);

export const Rail = ({a,b,r=.025,color='#3C4348'}:{a:number[];b:number[];r?:number;color?:string}) => {
  const {geometry,q,mid}=useMemo(()=>{
    const va=new Vector3(...a as [number,number,number]),vb=new Vector3(...b as [number,number,number]);
    const d=vb.clone().sub(va);return {geometry:new CylinderGeometry(r,r,d.length(),8),q:new Quaternion().setFromUnitVectors(new Vector3(0,1,0),d.normalize()),mid:va.add(vb).multiplyScalar(.5)};
  },[a.join(','),b.join(','),r]);
  return <mesh geometry={geometry} quaternion={q} position={mid} castShadow><meshStandardMaterial color={color} roughness={.5} metalness={.4}/></mesh>;
};

export const Seat = ({x=0,y=0,z=0,width=.51,opacity=1,ghost=false}:{x?:number;y?:number;z?:number;width?:number;opacity?:number;ghost?:boolean}) => <group position={[x,y,z]}>
  <mesh position={[0,.28,-.10]} castShadow><boxGeometry args={[.07,.52,.07]}/><meshStandardMaterial color="#343A3E" roughness={.55}/></mesh>
  <mesh position={[0,.025,-.09]}><boxGeometry args={[.22,.05,.22]}/><meshStandardMaterial color="#747C7E" metalness={.65} roughness={.35}/></mesh>
  <mesh geometry={seatBack} position={[0,.77,-.205]} rotation={[-.12,0,0]} scale={[width/.51,1,1]} castShadow receiveShadow>
    <meshStandardMaterial color={ghost?'#78949E':'#EA6428'} roughness={.37} metalness={0} transparent={opacity<1||ghost} opacity={ghost?.28:opacity} depthWrite={!ghost}/>
  </mesh>
  <mesh geometry={seatPan} position={[0,.50,.055]} rotation={[-Math.PI/2,0,0]} scale={[width/.51,1,1]} castShadow receiveShadow>
    <meshStandardMaterial color={ghost?'#78949E':'#F47630'} roughness={.4} transparent={opacity<1||ghost} opacity={ghost?.28:opacity} depthWrite={!ghost}/>
  </mesh>
  <mesh position={[-width/2-.012,.48,-.12]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.052,.052,.035,12]}/><meshStandardMaterial color="#343A3E"/></mesh>
  <mesh position={[width/2+.012,.48,-.12]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.052,.052,.035,12]}/><meshStandardMaterial color="#343A3E"/></mesh>
</group>;

const Limb = ({a,b,r1,r2,color}:{a:number[];b:number[];r1:number;r2:number;color:string}) => {
  const {g,q,mid}=useMemo(()=>{
    const av=new Vector3(...a as [number,number,number]),bv=new Vector3(...b as [number,number,number]),d=bv.clone().sub(av),l=d.length();
    return {g:loft([[-l/2,.005,.005],[-l/2+.025,r1*.8,r1*.86],[-l/2+.06,r1,r1],[l*.15,lerp(r1,r2,.65),lerp(r1,r2,.65)],[l/2-.02,r2,r2],[l/2,.006,.006]],16),q:new Quaternion().setFromUnitVectors(new Vector3(0,1,0),d.normalize()),mid:av.add(bv).multiplyScalar(.5)};
  },[a.join(','),b.join(','),r1,r2]);
  return <mesh geometry={g} quaternion={q} position={mid} castShadow><meshStandardMaterial color={color} roughness={.9}/></mesh>;
};

const Hair = ({kind,color}:{kind:string;color:string}) => {
  const cap=useMemo(()=>loft([[.18,.119,.109],[.24,.123,.109],[.30,.102,.09],[.345,.056,.05],[.35,.002,.002]],24),[]);
  return <group>
    <mesh geometry={cap} position={[0,0,-.008]} castShadow><meshStandardMaterial color={color} roughness={.95}/></mesh>
    {(kind==='bob'||kind==='bun')&&<mesh position={[0,.145,-.077]} scale={[.135,.17,.067]}><sphereGeometry args={[1,24,16]}/><meshStandardMaterial color={color} roughness={.95}/></mesh>}
    {kind==='bun'&&<mesh position={[0,.30,-.12]} scale={[.073,.072,.06]}><sphereGeometry args={[1,20,12]}/><meshStandardMaterial color={color} roughness={.95}/></mesh>}
    {kind==='curly'&&Array.from({length:13},(_,i)=><mesh key={i} position={[Math.cos(i*2.4)*.09,.29+Math.sin(i*3.1)*.025,Math.sin(i*2.4)*.08]} scale={[.048,.045,.045]}><sphereGeometry args={[1,10,8]}/><meshStandardMaterial color={color} roughness={1}/></mesh>)}
    {kind==='quiff'&&<mesh position={[-.015,.315,.065]} rotation={[0,0,-.2]} scale={[.11,.065,.065]}><sphereGeometry args={[1,24,16]}/><meshStandardMaterial color={color} roughness={.9}/></mesh>}
  </group>;
};

export const Person = ({index,sit=0,look=0,shrug=0,x=0,y=0,z=0,rotation=0,scale=1}:{index:number;sit?:number;look?:number;shrug?:number;x?:number;y?:number;z?:number;rotation?:number;scale?:number}) => {
  const p=FRIENDS[index%5];
  const hip=lerp(.91,.58,sit),hz=lerp(.44,.04,sit),chest=hip+.11;
  const headY=chest+.46;
  const brow=useMemo(()=>tube([[-.04,0,0],[0,.009,0],[.037,.002,0]],.008,8),[]);
  const smile=useMemo(()=>tube([[-.026,0,0],[0,-.006,.004],[.027,0,0]],.004,8),[]);
  return <group position={[x,y,z]} rotation={[0,rotation,0]} scale={scale*p.height}>
    {[-1,1].map(side=>{
      const knee=[side*.105,.48,lerp(.44,.48,sit)],ankle=[side*.105,.12,lerp(.45,.54,sit)];
      return <group key={side}>
        <Limb a={[side*.095,hip,hz]} b={knee} r1={.097} r2={.072} color={p.trousers}/>
        <Limb a={knee} b={ankle} r1={.075} r2={.052} color={p.trousers}/>
        <mesh geometry={shoeGeo} position={[side*.105,.015,ankle[2]+.065]} castShadow><meshStandardMaterial color={index===1?'#D2C9BA':'#F0ECE2'} roughness={.75}/></mesh>
        <mesh position={[side*.105,.025,ankle[2]+.09]} scale={[.078,.018,.15]}><sphereGeometry args={[1,16,8]}/><meshStandardMaterial color="#484B4D" roughness={.8}/></mesh>
      </group>;
    })}
    <mesh geometry={shortsGeo} position={[0,hip-.1,hz]} castShadow><meshStandardMaterial color={p.trousers} roughness={.9}/></mesh>
    <group position={[0,chest,hz]} rotation={[lerp(-.035,.055,sit),0,0]}>
      <mesh geometry={shirtGeo} castShadow><meshStandardMaterial color={p.shirt} roughness={.98}/></mesh>
      <mesh position={[0,.405,.005]} scale={[.081,.035,.064]}><sphereGeometry args={[1,20,12]}/><meshStandardMaterial color={index===4?'#CE784C':'#CFBFA7'} roughness={.9}/></mesh>
      {index===3&&<mesh position={[0,.25,.115]}><boxGeometry args={[.065,.29,.01]}/><meshStandardMaterial color="#3C4144"/></mesh>}
      {index===0&&<mesh position={[.1,.32,.10]} rotation={[0,0,.1]}><boxGeometry args={[.045,.34,.014]}/><meshStandardMaterial color="#C46B36"/></mesh>}
    </group>
    {[-1,1].map(side=>{
      const sh=[side*.19,chest+.32+shrug*.035,hz];
      const el=[side*(.245+shrug*.045),chest+.10+shrug*.04,hz+lerp(.02,.12,sit)];
      const wrist=[side*(.23+shrug*.07),lerp(chest-.10,chest+.015,sit)+shrug*.13,hz+lerp(.05,.33,sit)];
      return <group key={side}>
        <Limb a={sh} b={el} r1={.085} r2={.066} color={p.shirt}/>
        <Limb a={el} b={wrist} r1={.054} r2={.037} color={p.skin}/>
        <mesh position={[wrist[0],wrist[1]-.035,wrist[2]+.01]} scale={[.04,.07,.025]} rotation={[sit*.7,0,side*.15]} castShadow><sphereGeometry args={[1,16,12]}/><meshStandardMaterial color={p.skin} roughness={.8}/></mesh>
      </group>;
    })}
    <group position={[0,headY,hz]} rotation={[0,look,-shrug*.075]}>
      <mesh position={[0,-.015,0]}><cylinderGeometry args={[.052,.06,.10,16]}/><meshStandardMaterial color={p.skin} roughness={.8}/></mesh>
      <mesh geometry={headGeo} castShadow><meshStandardMaterial color={p.skin} roughness={.78}/></mesh>
      <Hair kind={p.hairstyle} color={p.hair}/>
      {[-1,1].map(side=><group key={side}>
        <mesh position={[side*.118,.155,-.005]} scale={[.025,.045,.025]}><sphereGeometry args={[1,16,10]}/><meshStandardMaterial color={p.skin}/></mesh>
        <mesh position={[side*.047,.19,.096]} scale={[.026,.011,.014]}><sphereGeometry args={[1,16,10]}/><meshStandardMaterial color="#F2ECE3"/></mesh>
        <mesh position={[side*.047-.004,.189,.109]} scale={[.009,.01,.005]}><sphereGeometry args={[1,12,8]}/><meshStandardMaterial color="#302A28" roughness={.45}/></mesh>
        <mesh geometry={brow} position={[side*.048,.219+(side===-1?shrug*.012:0),.099]} scale={[.67,1,1]} rotation={[0,0,side*.08]}><meshStandardMaterial color={p.hair}/></mesh>
      </group>)}
      <mesh position={[0,.148,.107]} scale={[.023,.033,.032]}><sphereGeometry args={[1,16,12]}/><meshStandardMaterial color={p.skin} roughness={.75}/></mesh>
      <mesh geometry={smile} position={[0,.092,.096]}><meshStandardMaterial color="#805548"/></mesh>
      {index===3&&[-1,1].map(side=><mesh key={side} position={[side*.05,.191,.116]} scale={[1,.85,1]}><torusGeometry args={[.032,.005,5,20]}/><meshStandardMaterial color="#3D3732"/></mesh>)}
    </group>
  </group>;
};
