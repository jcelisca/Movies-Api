import { Injectable } from '@angular/core';
import * as actions from '../../actions/movies.action';
import { MovieService } from 'src/app/core/services/movie.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class MoviesEffects {
  constructor(
    private readonly movieService: MovieService,
    private readonly actions$: Actions
  ) {}

  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getMovies),
      switchMap((action) =>
        this.movieService.getMovies(action.category).pipe(
          map((response) => actions.getMoviesSuccess({ response })),
          catchError((error)=> of(actions.getMoviesFailed({ error })))
        )
      )
    )
  );

  getMovieById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getMovieById),
      switchMap((action) =>
        this.movieService.getMovieById(action.id).pipe(
          map((movie) => actions.getMovieByIdSuccess({ movie })),
          catchError((error)=> of(actions.getMovieByIdFailed({ error })))
        )
      )
    )
  );

  getMovieByName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getMovieByName),
      switchMap((action) =>
        this.movieService.getByName(action.name).pipe(
          map((response) => actions.getMovieByNameSuccess({ response })),
          catchError((error)=> of(actions.getMovieByNameFailed({ error })))
        )
      )
    )
  );

  getMoviePage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getMoviePage),
      switchMap((action) =>
        this.movieService.getMoviePage(action.page).pipe(
          map((response) => actions.getMoviePageSuccess({ response })),
          catchError((error)=> of(actions.getMoviePageFailed({ error })))
        )
      )
    )
  );
}
