/** @docs-private */
export type Constructor<T> = new (...args: any[]) => T;

/**
 * This is a permissive type for abstract class constructors.
 * @docs-private
 */
export type AbstractConstructor<T = object> = abstract new (
  ...args: any[]
) => T;
