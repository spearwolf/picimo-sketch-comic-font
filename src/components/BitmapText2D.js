import React, {Suspense, useState} from 'react';
import {extend} from 'react-three-fiber';
import {BitmapText2D as PicimoBitmapText2D, Logger} from 'picimo';
import {node, number} from 'prop-types';
import {useLifecycledRef} from './useLifecycledRef';

extend({PicimoBitmapText2D});

const log = new Logger('BitmapText2D', 0, Infinity);

export const BitmapText2DContext = React.createContext();

export const BitmapText2D = ({children, capacity, fallback, ...props}) => {

  const [bitmapText2DContext, setBitmapText2DContext] = useState(undefined);

  const onFontAtlasUpdate = bt2d => {
    log.log('onFontAtlasUpdate, fontAtlas=', bt2d.fontAtlas, bt2d);
    if (bt2d.fontAtlas != null && bt2d !== bitmapText2DContext) {
      setBitmapText2DContext(bt2d);
    }
  };

  const [ref] = useLifecycledRef({
    onCreate(bitmapText2d) {
      log.log('create, fontAtlas=', bitmapText2d.fontAtlas, bitmapText2d);
      if (bitmapText2d.fontAtlas) {
        setBitmapText2DContext(bitmapText2d);
      }
      bitmapText2d.on('fontAtlasUpdate', onFontAtlasUpdate);
    },
    onDestroy(bitmapText2d) {
      log.log('destroy, off:fontAtlasUpdate', bitmapText2d);

      bitmapText2d.off(onFontAtlasUpdate);

      // TODO bitmapText2d.dispose();
      if (bitmapText2d.geometry) {
        bitmapText2d.geometry.dispose();
      }
      bitmapText2d.disposeMaterial();
    },
  });

  return (
    <Suspense fallback={fallback}>
      <picimoBitmapText2D args={[{capacity}]} ref={ref} {...props}>
        <BitmapText2DContext.Provider value={bitmapText2DContext}>
          {children}
        </BitmapText2DContext.Provider>
      </picimoBitmapText2D>
    </Suspense>
  );
}

BitmapText2D.propTypes = {
  children: node,
  capacity: number,
  fallback: node,
  fontSize: number,
  lineGap: number,
}

BitmapText2D.defaultProps = {
  capacity: 2048,
  fallback: null,
  fontSize: 0,
  lineGap: 0,
}
