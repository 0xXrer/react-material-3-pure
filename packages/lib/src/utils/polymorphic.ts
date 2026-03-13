import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

/**
 * Extracts the `as` prop from a set of component props,
 * defaulting to a given element type.
 */
export type AsProp<C extends ElementType> = {
  as?: C;
};

/**
 * Combines own props with the native HTML props of the resolved element,
 * omitting any keys that the own props already define.
 */
export type PolymorphicComponentProps<
  C extends ElementType,
  OwnProps = object,
> = AsProp<C> &
  OwnProps &
  Omit<ComponentPropsWithoutRef<C>, keyof OwnProps | 'as'> & {
    children?: ReactNode;
  };
