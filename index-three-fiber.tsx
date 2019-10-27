import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import {Canvas, useFrame} from 'react-three-fiber';
import {Mesh} from 'three';
import {BitmapText2D} from './src/components/BitmapText2D';
import {TextureAtlas} from './src/components/TextureAtlas';
import {BitmapText2DBlock} from './src/components/BitmapText2DBlock';

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

    <BitmapText2D>
      <TextureAtlas attach="fontAtlas" src="comic-schrift.json" />
      <BitmapText2DBlock text="MOIN MOIN" />
    </BitmapText2D>

  </Canvas>,
  document.getElementById('picimo')
)
