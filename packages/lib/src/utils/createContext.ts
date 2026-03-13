import { createContext as reactCreateContext, useContext } from 'react';

/**
 * Creates a typed context that throws if used outside its provider.
 * Use for contexts that MUST have a provider ancestor (compound components).
 */
export function createSafeContext<T>(displayName: string) {
  const Context = reactCreateContext<T | undefined>(undefined);
  Context.displayName = displayName;

  function useSafeContext(): T {
    const ctx = useContext(Context);
    if (ctx === undefined) {
      throw new Error(
        `use${displayName} must be used within a <${displayName}Provider>`
      );
    }
    return ctx;
  }

  return [Context.Provider, useSafeContext] as const;
}

/**
 * Creates a typed context with a fallback default value.
 * Use for contexts that work with or without a provider.
 */
export function createOptionalContext<T>(displayName: string, defaultValue: T) {
  const Context = reactCreateContext<T>(defaultValue);
  Context.displayName = displayName;

  function useOptionalContext(): T {
    return useContext(Context);
  }

  return [Context.Provider, useOptionalContext] as const;
}
