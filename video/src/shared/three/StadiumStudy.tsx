import React, {useLayoutEffect, useRef} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {InstancedMesh, Object3D, PCFShadowMap, Vector3} from 'three';
import {useVideoConfig} from 'remotion';
import {progress, lerp} from '../motion/time';

// Technical geometry study only. Not a measured reconstruction of Nou Mestalla.
// Keep this component separate from the future, reference-validated master model.
const Columns = () => {
  const mesh = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    const item = new Object3D();
    for (let i = 0; i < 48; i++) {
      const angle = i * Math.PI * 2 / 48;
      item.position.set(13.2 * Math.cos(angle), 2, 9.7 * Math.sin(angle));
      item.rotation.set(0, -angle, 0); item.updateMatrix();
      mesh.current!.setMatrixAt(i, item.matrix);
    }
    mesh.current!.instanceMatrix.needsUpdate = true;
    mesh.current!.computeBoundingSphere();
  }, []);
  return <instancedMesh ref={mesh} args={[undefined, undefined, 48]} castShadow receiveShadow>
    <boxGeometry args={[0.36, 4, 0.5]}/><meshStandardMaterial color="#ADAAA3" roughness={0.94}/>
  </instancedMesh>;
};
const Camera = ({sourceFrame}: {sourceFrame: number}) => {
  const {camera} = useThree();
  useLayoutEffect(() => {
    const q = progress(sourceFrame, 0, 90);
    camera.position.set(lerp(26, 23, q), lerp(25, 22, q), 30);
    camera.lookAt(new Vector3(0, 1, 0)); camera.updateProjectionMatrix();
  }, [camera, sourceFrame]);
  return null;
};
export const StadiumStudy = ({sourceFrame}: {sourceFrame: number}) => {
  const {width, height} = useVideoConfig();
  return <ThreeCanvas width={width} height={height} camera={{fov: 38, near: 0.1, far: 200, position: [26, 25, 30]}}
    shadows={{type: PCFShadowMap}} gl={{antialias: true, alpha: false}}>
    <color attach="background" args={['#E7E2D9']}/>
    <hemisphereLight args={['#DAE6EE', '#A19A87', 1.3]}/>
    <directionalLight position={[12, 25, 15]} intensity={2.5} castShadow shadow-mapSize={[1024, 1024]}
      shadow-camera-left={-25} shadow-camera-right={25} shadow-camera-top={25} shadow-camera-bottom={-25}
      shadow-camera-near={1} shadow-camera-far={80} shadow-normalBias={0.08}/>
    <Camera sourceFrame={sourceFrame}/>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]} receiveShadow>
      <planeGeometry args={[100, 100]}/><meshStandardMaterial color="#C5C0B4" roughness={1}/>
    </mesh>
    <mesh position={[0, 0, 0]} receiveShadow><boxGeometry args={[17, 0.16, 10]}/><meshStandardMaterial color="#ACB19F" roughness={1}/></mesh>
    <Columns/>
    {Array.from({length: 16}, (_, i) => {
      const r = 8.4 + i * 0.32;
      return <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.35 + i * 0.25, 0]} scale={[1.35, 1, 1]} castShadow receiveShadow>
        <ringGeometry args={[r, r + 0.31, 96]}/>
        <meshStandardMaterial color={i % 2 ? '#B9B5AC' : '#C3BFB7'} roughness={0.93} side={2}/>
      </mesh>;
    })}
    <mesh position={[0, 0.6, 7.5]} rotation={[0, -0.25 * progress(sourceFrame, 0, 90), 0]} castShadow>
      <boxGeometry args={[1.2, 1.2, 0.24]}/><meshStandardMaterial color="#D26E31" roughness={0.48}/>
    </mesh>
  </ThreeCanvas>;
};
