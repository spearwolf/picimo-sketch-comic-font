import React, {Suspense} from 'react';
import {extend, useUpdate} from 'react-three-fiber';
import {BitmapText2D as PicimoBitmapText2D} from 'picimo';
import {node} from 'prop-types';

extend({PicimoBitmapText2D});

export const BitmapText2D = ({children}) => {

  const ref = useUpdate(text2d => {
    console.log('BitmapText2D', text2d);
  });

  // TODO move suspense upwards?
  return (
    <Suspense fallback={null}>
      <picimoBitmapText2D ref={ref}>
        {children}
      </picimoBitmapText2D>
    </Suspense>
  );
}

BitmapText2D.propTypes = {
  children: node,
}
