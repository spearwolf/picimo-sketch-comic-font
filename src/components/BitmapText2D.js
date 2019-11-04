import React, {Suspense, useState, useRef, useEffect} from 'react';
import {extend, useUpdate, useFrame} from 'react-three-fiber';
import {BitmapText2D as PicimoBitmapText2D, Logger} from 'picimo';
import {node, number} from 'prop-types';

extend({PicimoBitmapText2D});

const log = new Logger('BitmapText2D', 0, Infinity);

export const BitmapText2DContext = React.createContext();

export const BitmapText2D = ({children, capacity, ...props}) => {

  const [bitmapText2D, setBitmapText2D] = useState(undefined);

  const onFontAtlasUpdate = text2d => {
    log.log('onFontAtlasUpdate', text2d.fontAtlas);
    if (text2d !== bitmapText2D && text2d.fontAtlas) {
      setBitmapText2D(text2d);
    }
  };

  const ref = useUpdate(text2d => {
    log.log('useUpdate', text2d.fontAtlas);
    if (text2d.fontAtlas) {
      // TODO remove?
      setBitmapText2D(text2d);
    }
    text2d.on('fontAtlasUpdate', onFontAtlasUpdate);
  }, []);

  useEffect(() => () => {
    log.log('off:fontAtlasUpdate', ref.current);
    if (ref.current) {
      ref.current.off(onFontAtlasUpdate);
    }
  }, []);

  // TODO move suspense upwards?
  return (
    <Suspense fallback={null}>
      <picimoBitmapText2D args={[{capacity}]} ref={ref} {...props}>
        <BitmapText2DContext.Provider value={bitmapText2D}>
          {children}
        </BitmapText2DContext.Provider>
      </picimoBitmapText2D>
    </Suspense>
  );
}

BitmapText2D.propTypes = {
  children: node,
  capacity: number,
}

BitmapText2D.defaultProps = {
  capacity: 2048,
}
