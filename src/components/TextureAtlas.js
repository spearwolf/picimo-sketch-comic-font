import React from 'react';
import usePromise from 'react-promise-suspense';
import {TextureAtlas as PicimoTextureAtlas} from 'picimo';
import {string} from 'prop-types';

export const TextureAtlas = ({src, basePath, attach}) => {

  const textureAtlas = usePromise(
    () => PicimoTextureAtlas.load(src, basePath),
    [src, basePath],
  );

  return <primitive object={textureAtlas} attach={attach}></primitive>;

}

TextureAtlas.propTypes = {
  src: string.isRequired,
  basePath: string,
  attach: string.isRequired,
}

TextureAtlas.defaultProps = {
  basePath: './',
}
