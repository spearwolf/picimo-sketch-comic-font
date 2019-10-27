import React, {Suspense, useState, useRef} from 'react';
import {extend, useUpdate, useFrame} from 'react-three-fiber';
import {BitmapText2D as PicimoBitmapText2D} from 'picimo';
import {node, number} from 'prop-types';

extend({PicimoBitmapText2D});

export const BitmapText2DContext = React.createContext();

export const BitmapText2D = ({children, capacity}) => {

  const [bitmapText2D, setBitmapText2D] = useState(null);

  const ref = useUpdate(text2d => {
    if (text2d.fontAtlas) {
      setBitmapText2D(text2d.fontAtlas);
    }
    text2d.onFontAtlasUpdate = setBitmapText2D;
  }, []);

  // TODO move suspense upwards?
  return (
    <Suspense fallback={null}>
      <picimoBitmapText2D args={[{capacity}]} ref={ref}>
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
