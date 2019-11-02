import React, { useRef, useMemo, useEffect } from 'react';
import {extend, useThree, useFrame} from 'react-three-fiber';
import {Stage2D as PicimoStage2D, ParallaxProjection, Plane, Logger} from 'picimo';
import {node} from 'prop-types';

extend({PicimoStage2D});

const log = new Logger('Stage2D');

export const Stage2D = ({children}) => {

  const ref = useRef();

  const projection = useMemo(() => {
    const proj = new ParallaxProjection(Plane.XY, {
      width: 2000,
      height: 2000,
      fit: 'contain',
      distance: 1000,
      far: 10000,
    });
    log.log('create projection:', proj);
    return proj;
  }, []);

  const {setDefaultCamera, size: {width, height}} = useThree();

  useEffect(() => {
    const stage = ref.current;
    const {projection} = stage;
    log.log('init stage->projection', stage);
    projection.update(width, height);
    setDefaultCamera(projection.camera);
    return () => {
      log.log('bye, bye', stage);
    }
  }, []);

  useFrame(() => {
    projection.update(width, height);
  });

  return <picimoStage2D ref={ref} projection={projection}>{children}</picimoStage2D>;

}

Stage2D.propTypes = {
  children: node,
  // projection: string.isRequired,
  // basePath: string,
  // attach: string.isRequired,
}

// Stage2D.defaultProps = {
// }
