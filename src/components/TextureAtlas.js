import React from 'react';
import {extend} from 'react-three-fiber';
import usePromise from 'react-promise-suspense';
import {TextureAtlas as PicimoTextureAtlas, Texture, PowerOf2Image} from 'picimo';
import {string} from 'prop-types';

extend({PicimoTextureAtlas});

export const TextureAtlas = ({src, basePath, attach}) => {

  const args = usePromise(async () => {
    const atlas = await fetch(`${basePath}${src}`).then(response => response.json());
    const image = await new PowerOf2Image(`${basePath}${atlas.meta.image}`).loaded;
    const baseTexture = new Texture(image);
    return [baseTexture, atlas];
  }, [src, basePath]);

  return <picimoTextureAtlas args={args} attach={attach}></picimoTextureAtlas>;

}

TextureAtlas.propTypes = {
  src: string.isRequired,
  basePath: string,
  attach: string.isRequired,
}

TextureAtlas.defaultProps = {
  basePath: './',
}
