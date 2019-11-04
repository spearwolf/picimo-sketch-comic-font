import React, {useContext, useEffect} from 'react';
import {extend, useUpdate} from 'react-three-fiber';
import {BitmapText2DBlock as PicimoBitmapText2DBlock, Logger} from 'picimo';
import {oneOf, arrayOf, number, string} from 'prop-types';
import {BitmapText2DContext} from './BitmapText2D';

extend({PicimoBitmapText2DBlock});

const log = new Logger('BitmapText2DBlock', 0, Infinity);

export const BitmapText2DBlock = ({text, position, maxWidth, hAlign, vAlign}) => {

  const bitmapText2D = useContext(BitmapText2DContext);

  const ref = useUpdate(textBlock => {
    log.log('update', textBlock);
    textBlock.update(text);
    // TODO update position, maxWidth, *align, ..
  }, [bitmapText2D, text]);

  useEffect(() => () => {
    const textBlock = ref.current;
    log.log('clear:', textBlock);
    if (textBlock) {
      textBlock.clear();
    }
  }, [])

  if (!bitmapText2D) return null;

  return (
    <picimoBitmapText2DBlock
      ref={ref}
      args={[
        bitmapText2D,
        position,
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
