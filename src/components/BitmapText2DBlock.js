import React, {useContext} from 'react';
import {extend, useUpdate} from 'react-three-fiber';
import {BitmapText2DBlock as PicimoBitmapText2DBlock} from 'picimo';
import {oneOf, arrayOf, number, string} from 'prop-types';
import {BitmapText2DContext} from './BitmapText2D';

extend({PicimoBitmapText2DBlock});

export const BitmapText2DBlock = ({text, position, maxWidth, hAlign, vAlign}) => {

  const bitmapText2D = useContext(BitmapText2DContext);

  const ref = useUpdate(textBlock => {
    console.log('BitmapText2DBlock', textBlock);
    textBlock.update(text);
    // TODO update position, maxWidth, *align, ..
  }, [bitmapText2D, text]);

  if (bitmapText2D == null) return null;

  // TODO clean / destroy / remove from BitmapText2D

  return (
    <picimoBitmapText2DBlock
      ref={ref}
      args={[
        bitmapText2D,
        position[0],
        position[1],
        position[2],
        maxWidth,
        hAlign,
        vAlign,
      ]}
    ></picimoBitmapText2DBlock>
  );
}

BitmapText2DBlock.propTypes = {
  text: string.isRequired,
  position: arrayOf(number),
  maxWidth: number,
  hAlign: oneOf(['left', 'center', 'right']),
  vAlign: oneOf(['top', 'baseline', 'center', 'bottom']),
}

BitmapText2DBlock.defaultProps = {
  basePath: './',
  hAlign: 'center',
  vAlign: 'center',
  position: [0, 0, 0],
  maxWidth: 0,
}
