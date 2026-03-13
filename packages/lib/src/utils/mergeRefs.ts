import type { Ref, RefCallback, MutableRefObject } from 'react';

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  return (instance: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') {
        ref(instance);
      } else {
        (ref as MutableRefObject<T | null>).current = instance;
      }
    }
  };
}
