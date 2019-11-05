// inspired by https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
import React, {useCallback, useRef, useEffect} from 'react'

export const useLifecycledRef = ({onCreate, onDestroy, onUpdate}, deps = []) => {

  const ref = useRef(null)

  const setRef = useCallback(node => {

    if (ref.current && onDestroy) {
      onDestroy(ref.current);
    }

    if (node && onCreate) {
      onCreate(node);
    }

    ref.current = node;

  }, []);

  useEffect(() => {
    // TODO skip reduntant create() + update() calls..
    if (onUpdate && ref.current) {
      onUpdate(ref.current);
    }
  }, deps);

  return [setRef, ref.current];

}
