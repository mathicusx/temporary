import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  loadFormats,
  loadFormatsFailure,
  loadFormatsSuccess,
} from './formats.actions';
import { FormatsService } from 'src/app/panels/RTI/admin/formats/formats.service';

@Injectable()
export class FormatEffects {
  constructor(
    private actions$: Actions,
    private formatsService: FormatsService
  ) {}

  loadFormats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFormats),
      mergeMap(() =>
        this.formatsService.getFormats().pipe(
          map((formats) => loadFormatsSuccess({ formats: formats })),
          catchError((error) =>
            of(loadFormatsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
