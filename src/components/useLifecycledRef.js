// inspired by https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
import React, {useCallback, useRef, useEffect} from 'react'

export const useLifecycledRef = ({onCreate, onDestroy, onUpdate}, updateDependents = []) => {

  const ref = useRef(null)

  let onCreateCalled = false;

  const setRef = useCallback(node => {

    if (ref.current && onDestroy) {
      onDestroy(ref.current);
    }

    if (node && onCreate) {
      onCreate(node);
      onCreateCalled = true;
    }

    ref.current = node;

  }, []);

  useEffect(() => {
    if (onUpdate && !onCreateCalled && ref.current) {
      onUpdate(ref.current);
    }
  }, updateDependents);

  return [setRef, ref.current];

}
