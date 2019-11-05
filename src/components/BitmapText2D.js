import React, {Suspense, useState, useRef, useEffect} from 'react';
import {extend, useUpdate, useFrame} from 'react-three-fiber';
import {BitmapText2D as PicimoBitmapText2D, Logger} from 'picimo';
import {node, number} from 'prop-types';

extend({PicimoBitmapText2D});

const log = new Logger('BitmapText2D', 0, Infinity);

export const BitmapText2DContext = React.createContext();

export const BitmapText2D = ({children, capacity, ...props}) => {

  const [bitmapText2D, setBitmapText2D] = useState(undefined);

  const onFontAtlasUpdate = bt2d => {
    log.log('onFontAtlasUpdate, fontAtlas=', bt2d.fontAtlas, bt2d);
    if (bt2d.fontAtlas != null && bt2d !== bitmapText2D) {
      setBitmapText2D(bt2d);
    }
  };

  useEffect(() => {
    log.log('create, ref.current=', ref.current);
    return () => {
      const bt2d = ref.current;
      if (bt2d) {
        log.log('off:fontAtlasUpdate', bt2d);
        bt2d.off(onFontAtlasUpdate);
      }
    }
  }, []);

  const ref = useUpdate(bt2d => {
    log.log('update, fontAtlas=', bt2d.fontAtlas, bt2d);
    if (bt2d.fontAtlas) {
      // TODO remove?
      setBitmapText2D(bt2d);
    }
    bt2d.on('fontAtlasUpdate', onFontAtlasUpdate);
  }, []);

  // TODO move suspense upwards? or just forward fallback= prop?
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
