import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Canvas} from 'react-three-fiber';
import {BitmapText2D} from './src/components/BitmapText2D';
import {TextureAtlas} from './src/components/TextureAtlas';
import {BitmapText2DBlock} from './src/components/BitmapText2DBlock';
import {Stage2D} from './src/components/Stage2D';
import {Thing} from './src/Thing';

const PROJECTION = {
  width: 1500,
  height: 1500,
  fit: 'contain',
  distance: 1000,
  far: 10000,
};

const App = () => {

  const [showTextBlock, setShowTextBlock] =  useState(false);
  const [enableTextureAtlas, setEnableTextureAtlas] =  useState(true);
  const [showText, setShowText] =  useState(true);
  const [showThing, setShowThing] =  useState(true);
  const [text, setText] =  useState('MOIN MOIN');

  return (
    <>
      <Canvas>
        <Stage2D plane="xy" type="parallax" projection={PROJECTION}>

          { showThing && <Thing position={[0, 0, -100]} /> }

          { showText && (
            <BitmapText2D>
              { enableTextureAtlas && <TextureAtlas attach="fontAtlas" src="comic-schrift.json" /> }
              <BitmapText2DBlock text="WELCOME!" position={[0, 300, 0]} />
              { showTextBlock && <BitmapText2DBlock text={text} /> }
            </BitmapText2D>
          )}

        </Stage2D>
      </Canvas>

      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
      }}>
        <button
          onClick={() => setShowTextBlock(!showTextBlock)}
          className="ui"
        >{ showTextBlock ? 'hide' : 'show'} text block</button>
        <button
          onClick={() => setText(text.indexOf('MOIN') === 0 ? 'HEJ HO!' : 'MOIN MOIN')}
          className="ui"
        >change text</button>
        <button
          onClick={() => setEnableTextureAtlas(!enableTextureAtlas)}
          className="ui"
        >{ enableTextureAtlas ? 'destroy' : 'create'} texture atlas</button>
        <button
          onClick={() => setShowText(!showText)}
          className="ui"
        >{ showText ? 'hide' : 'show'} all</button>
        <button
          onClick={() => setShowThing(!showThing)}
          className="ui"
        >{ showThing ? 'hide' : 'show'} thing</button>
      </div>
    </>
  );
};

ReactDOM.render(<App/>, document.getElementById('picimo'));
