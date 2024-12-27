import { Subject } from 'rxjs';
import { Directive, OnDestroy } from '@angular/core';
import { AbstractConstructor, Constructor } from './constructor';

/** @docs-private */
export interface CanBeDestroyed {
  /** Whether the component is destroyed. */
  destroy$: Subject<void>;
}

type CanBeDestroyedCtor = Constructor<CanBeDestroyed> &
  AbstractConstructor<CanBeDestroyed>;

/** Mixin to augment a directive with a `destroyed` property. */
export function mixinCanBeDestroyed<T extends AbstractConstructor>(
  base: T
): CanBeDestroyedCtor & T;
export function mixinCanBeDestroyed<T extends Constructor<object>>(
  base: T
): CanBeDestroyedCtor & T {
  @Directive()
  class BeDestroyed extends base implements OnDestroy {
    destroy$ = new Subject<void>();

    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  return BeDestroyed;
}
