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
  const [position, setPosition] =  useState([0, 400, 0]);

  return (
    <>
      <Canvas>
        <Stage2D plane="xy" type="parallax" projection={PROJECTION}>

          { showThing && <Thing /> }

          { showText && (
            <BitmapText2D position={[0, 0, 1]}>
              { enableTextureAtlas && <TextureAtlas attach="fontAtlas" src="comic-schrift.json" /> }
              <BitmapText2DBlock text="WELCOME!" position={position} />
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
        >{ showTextBlock ? 'hide' : 'show'} 2nd text line</button>
        <button
          onClick={() => {
            if (text.indexOf('MOIN') === 0) {
              setText('HEJ HO!');
              setPosition([0, 400, 0]);
            } else {
              setText('MOIN MOIN');
              setPosition([0, 300, 0]);
            }
          }}
          className="ui"
        >change text</button>
        <button
          onClick={() => setEnableTextureAtlas(!enableTextureAtlas)}
          className="ui"
        >{ enableTextureAtlas ? 'destroy' : 'create'} texture atlas</button>
        <button
          onClick={() => setShowText(!showText)}
          className="ui"
        >{ showText ? 'hide' : 'show'} all texts</button>
        <button
          onClick={() => setShowThing(!showThing)}
          className="ui"
        >{ showThing ? 'hide' : 'show'} thing</button>

        <input className="ui" type="text" value={text} onChange={event => setText(event.target.value)}/>
      </div>
    </>
  );
};

ReactDOM.render(<App/>, document.getElementById('picimo'));
