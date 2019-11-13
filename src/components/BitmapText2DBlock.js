import React, {useContext} from 'react';
import {extend} from 'react-three-fiber';
import {BitmapText2DBlock as PicimoBitmapText2DBlock, Logger} from 'picimo';
import {oneOf, arrayOf, number, string} from 'prop-types';
import {BitmapText2DContext} from './BitmapText2D';
import { useLifecycledRef } from './useLifecycledRef';

extend({PicimoBitmapText2DBlock});

const log = new Logger('BitmapText2DBlock', 0, Infinity);

export const BitmapText2DBlock = ({text, position, maxWidth, fontSize, lineGap, hAlign, vAlign}) => {

  const bitmapText2D = useContext(BitmapText2DContext);

  const [ref] = useLifecycledRef({
    onCreate(textBlock) {
      log.log('create', text, position, maxWidth, fontSize, lineGap, hAlign, vAlign, textBlock);
      textBlock.update(text);
    },
    onDestroy(textBlock) {
      log.log('destroy', textBlock);
      textBlock.clear();
    },
    onUpdate(textBlock) {
      log.log('update', text, position, maxWidth, fontSize, lineGap, hAlign, vAlign, textBlock);
      textBlock.update(text);
    }
  }, [text, position, maxWidth, fontSize, lineGap, hAlign, vAlign]);

  if (!bitmapText2D) return null;

  return (
    <picimoBitmapText2DBlock
      ref={ref}
      args={[bitmapText2D, [0, 0, 0]]}
      position={position}
      maxWidth={maxWidth}
      fontSize={fontSize}
      lineGap={lineGap}
      hAlign={hAlign}
      vAlign={vAlign}
    ></picimoBitmapText2DBlock>
  );
}

BitmapText2DBlock.propTypes = {
  text: string.isRequired,
  position: arrayOf(number),
  maxWidth: number,
  hAlign: oneOf(['left', 'center', 'right']),
  vAlign: oneOf(['top', 'baseline', 'center', 'bottom']),
  fontSize: number,
  lineGap: number,
}

BitmapText2DBlock.defaultProps = {
  basePath: './',
  hAlign: 'center',
  vAlign: 'center',
  position: [0, 0, 0],
  maxWidth: 0,
  fontSize: 0,
  lineGap: 0,
}
