import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import {Canvas, useFrame} from 'react-three-fiber';
import {Mesh} from 'three';

const Thing = () => {
  const ref = useRef<Mesh>();

  useFrame(() => {
    ref.current.rotation.z += 0.01;
  });

  return (
    <mesh
      ref={ref}
      onClick={e => console.log('click')}
      onPointerOver={e => console.log('hover')}
      onPointerOut={e => console.log('unhover')}>
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial attach="material" color="red" transparent />
    </mesh>
  );
}

ReactDOM.render(
  <Canvas>
    <Thing />
  </Canvas>,
  document.getElementById('picimo')
)
