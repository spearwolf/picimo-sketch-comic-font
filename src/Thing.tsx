import React, {useRef} from 'react';
import {useFrame} from 'react-three-fiber';
import {Mesh} from 'three';

export const Thing = (props) => {

  const ref = useRef<Mesh>();

  useFrame(() => {
    ref.current.rotation.z += 0.01;
  });

  return (
    <mesh
      ref={ref}
      onClick={e => console.log('click')}
      onPointerOver={e => console.log('hover')}
      onPointerOut={e => console.log('unhover')}
      {...props}
    >
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshBasicMaterial attach="material" color="red" transparent />
    </mesh>
   );
};
