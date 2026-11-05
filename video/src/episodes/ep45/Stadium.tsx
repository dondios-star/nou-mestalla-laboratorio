import React, {useLayoutEffect, useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {BoxGeometry, BufferGeometry, Color, DoubleSide, InstancedMesh, Matrix4, MeshStandardMaterial, Object3D, Vector3} from 'three';
import {mergeGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import {ellipseBand, tube} from './geometry';

const tiers = [{rows:18,x:69,z:45,y:1},{rows:12,x:86,z:62,y:12},{rows:18,x:98,z:74,y:21}];
const mat = (color:string,roughness=.8) => new MeshStandardMaterial({color,roughness,side:DoubleSide});

export const CameraAt = ({position,target,fov}:{position:[number,number,number];target:[number,number,number];fov?:number}) => {
  const {camera}=useThree();
  useLayoutEffect(()=>{camera.position.set(...position);camera.lookAt(new Vector3(...target));if(fov&&'fov' in camera)camera.fov=fov;camera.updateProjectionMatrix();},[camera,position.join(','),target.join(','),fov]);return null;
};

export const StadiumModel = ({roof=true}:{roof?:boolean}) => {
  const objects=useMemo(()=>{
    const concrete:BufferGeometry[]=[],dark:BufferGeometry[]=[],ribs:BufferGeometry[]=[],roofParts:BufferGeometry[]=[];
    tiers.forEach(t=>{
      for(let r=0;r<t.rows;r++){
        const x=t.x+r*.82,z=t.z+r*.82,y=t.y+r*.45;
        concrete.push(ellipseBand(x,z,x+.81,z+.81,y,y));
        concrete.push(ellipseBand(x+.81,z+.81,x+.81,z+.81,y,y+.45));
      }
      dark.push(ellipseBand(t.x-.2,t.z-.2,t.x-.2,t.z-.2,t.y-.8,t.y+.08));
    });
    dark.push(ellipseBand(85,61,85,61,8.7,11.9));
    dark.push(ellipseBand(97,73,97,73,17.1,20.9));
    // The thin membrane and radial cable system are the architectural anchor.
    for(let i=0;i<64;i++){
      const a=i/64*Math.PI*2;
      const c=Math.cos(a),s=Math.sin(a);
      ribs.push(tube([[67*c,37,43*s],[89*c,39.3,65*s],[116*c,42,92*s]],.11,12));
      ribs.push(tube([[67*c,37,43*s],[89*c,36.8,65*s],[116*c,42,92*s]],.045,12));
      if(i%2===0)ribs.push(tube([[116*c,0,92*s],[116*c,42,92*s]],.28,1));
    }
    for(let r=0;r<8;r++) roofParts.push(ellipseBand(67+r*6.1,43+r*6.1,73.1+r*6.1,49.1+r*6.1,37+r*.625,37+(r+1)*.625));
    for(const q of [0,.24,.5,.76,1]){
      const pts=Array.from({length:129},(_,i)=>{const a=i/128*Math.PI*2;return [(67+49*q)*Math.cos(a),37+5*q,(43+49*q)*Math.sin(a)];});ribs.push(tube(pts,.085,160));
    }
    const seatGeo=mergeGeometries([new BoxGeometry(.50,.42,.065).translate(0,.56,-.14),new BoxGeometry(.5,.065,.4).translate(0,.34,.02)]);
    const seatCount=tiers.reduce((sum,t)=>sum+t.rows*900,0), seats=new InstancedMesh(seatGeo,mat('#FFFFFF',.56),seatCount);
    const ob=new Object3D();let n=0;
    tiers.forEach((t,ti)=>{
      for(let r=0;r<t.rows;r++)for(let j=0;j<900;j++){
        const a=j/900*Math.PI*2, aisle=j%45<3;
        const x=(t.x+r*.82+.4)*Math.cos(a),z=(t.z+r*.82+.4)*Math.sin(a);
        ob.position.set(x,t.y+r*.45,z);ob.rotation.set(0,-a-Math.PI/2,0);ob.scale.setScalar(aisle?0:1.15);ob.updateMatrix();seats.setMatrixAt(n,ob.matrix);
        // Black seating bat silhouette on the far stand; no pasted logo bitmap.
        const poly=[[-45,25],[-34,27],[-27,24],[-15,26],[-7,22],[-4,29],[0,26],[4,29],[7,22],[15,26],[27,24],[34,27],[45,25],[36,17],[27,19],[18,12],[9,16],[5,8],[0,12],[-5,8],[-9,16],[-18,12],[-27,19],[-36,17]];
        const py=t.y+r*.45;let inside=false;
        for(let k=0,l=poly.length-1;k<poly.length;l=k++)if((poly[k][1]>py)!==(poly[l][1]>py)&&x<(poly[l][0]-poly[k][0])*(py-poly[k][1])/(poly[l][1]-poly[k][1])+poly[k][0])inside=!inside;
        const bat=z<0&&inside;
        seats.setColorAt(n,new Color(bat?'#24272B':(j%7===0?'#D96529':'#EE762F')));n++;
      }
    });seats.instanceMatrix.needsUpdate=true;seats.instanceColor!.needsUpdate=true;seats.computeBoundingSphere();
    const lineParts:BufferGeometry[]=[];
    const line=(x:number,z:number,w:number,d:number)=>lineParts.push(new BoxGeometry(w,.025,d).translate(x,.055,z));
    line(0,-34,105,.14);line(0,34,105,.14);line(-52.5,0,.14,68);line(52.5,0,.14,68);line(0,0,.14,68);
    for(const side of [-1,1]){line(side*36,0,.14,40.3);line(side*44.25,-20.15,16.5,.14);line(side*44.25,20.15,16.5,.14);line(side*47,0,.14,18.3);line(side*49.75,-9.15,5.5,.14);line(side*49.75,9.15,5.5,.14);}
    lineParts.push(tube(Array.from({length:65},(_,i)=>[Math.cos(i/64*Math.PI*2)*9.15,.06,Math.sin(i/64*Math.PI*2)*9.15]),.08,64));
    return {concrete:mergeGeometries(concrete),dark:mergeGeometries(dark),ribs:mergeGeometries(ribs),roof:mergeGeometries(roofParts),lines:mergeGeometries(lineParts),seats};
  },[]);
  return <group>
    <mesh geometry={objects.concrete}><meshStandardMaterial color="#C5C4BF" roughness={.94} side={DoubleSide}/></mesh>
    <mesh geometry={objects.dark}><meshStandardMaterial color="#30373B" roughness={.72} side={DoubleSide}/></mesh>
    <primitive object={objects.seats}/>
    {roof&&<><mesh geometry={objects.roof}><meshStandardMaterial color="#E8ECE6" roughness={.66} side={DoubleSide}/></mesh><mesh geometry={objects.ribs}><meshStandardMaterial color="#B8C5C8" roughness={.45} metalness={.25}/></mesh></>}
    <mesh position={[0,-.11,0]}><boxGeometry args={[125,.2,84]}/><meshStandardMaterial color="#487B50" roughness={1}/></mesh>
    {Array.from({length:14},(_,i)=><mesh key={i} position={[-48.75+i*7.5,.01,0]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[7.5,68]}/><meshStandardMaterial color={i%2?'#5A8A50':'#639658'} roughness={1}/></mesh>)}
    <mesh geometry={objects.lines}><meshBasicMaterial color="#E8ECE1"/></mesh>
  </group>;
};

export const StadiumBackdrop = () => <ThreeCanvas width={1080} height={1920} gl={{antialias:true,alpha:false}} camera={{fov:48,near:.1,far:1000,position:[0,22,67]}}>
  <color attach="background" args={['#C8DCE1']}/>
  <hemisphereLight args={['#ECF3F6','#7D8477',2]}/><directionalLight position={[-40,85,30]} intensity={2.4}/>
  <CameraAt position={[43,27,59]} target={[-18,18,-9]} fov={62}/>
  <StadiumModel/>
</ThreeCanvas>;
