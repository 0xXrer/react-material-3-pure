'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Fires `handler` when a pointer-down event occurs outside **all** provided
 * ref targets. Commonly used by Menu, Select, and Dialog to close on
 * outside clicks.
 */
export function useClickOutside(
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  handler: () => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return;

    const targets = Array.isArray(refs) ? refs : [refs];

    const listener = (e: MouseEvent) => {
      const target = e.target as Node;
      const isInside = targets.some(
        (ref) => ref.current && ref.current.contains(target),
      );
      if (!isInside) handler();
    };

    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [refs, handler, enabled]);
}
