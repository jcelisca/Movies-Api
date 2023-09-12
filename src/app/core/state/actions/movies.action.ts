import { createAction, props } from "@ngrx/store";
import { Movie, ResponseApi } from "../../domain/movies.interface";
import { ErrorData } from "../../domain/error.interface";

export const getMovies = createAction(
  '[Movies List Component] GetMovies'
);

export const getMoviesSuccess = createAction(
  '[Movies List Component] GetMoviesSuccess',
  props<{ response: ResponseApi }>()
);

export const getMoviesFailed = createAction(
  '[Movies List Component] GetMoviesFailed',
  props<{ error: ErrorData }>()
);

export const getMovieById = createAction(
  '[Movies Movie Component] GetMovieById',
  props<{ id: number }>()
);

export const getMovieByIdSuccess = createAction(
  '[Movies Movie Component] GetMovieByIdSuccess',
  props<{ movie: Movie }>()
);

export const getMovieByIdFailed = createAction(
  '[Movies Movie Component] GetMovieByIdFailed',
  props<{ error: ErrorData }>()
);

export const getMovieByName = createAction(
  '[Movies Search Component] GetMovieByname',
  props<{ name: string }>()
);

export const getMovieByNameSuccess = createAction(
  '[Movies Search Component] GetMovieByNameSuccess',
  props<{ response: ResponseApi }>()
);

export const getMovieByNameFailed = createAction(
  '[Movies Search Component] GetMovieByNameFailed',
  props<{ error: ErrorData }>()
);

export const getMoviePage = createAction(
  '[Movies List Component] GetMoviePage',
  props<{ page: number }>()
);

export const getMoviePageSuccess = createAction(
  '[Movies List Component] GetMoviePageSuccess',
  props<{ response: ResponseApi }>()
);

export const getMoviePageFailed = createAction(
  '[Movies List Component] GetMoviePageFailed',
  props<{ error: ErrorData }>()
);
