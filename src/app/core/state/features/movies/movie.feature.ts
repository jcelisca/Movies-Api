import { createFeature, createReducer, on } from "@ngrx/store";
import { ErrorData } from "src/app/core/domain/error.interface";
import { Movie, ResponseApi } from "src/app/core/domain/movies.interface";
import * as actions from '../../actions/movies.action';
import { cloneDeep } from "lodash";

export const movieInitialState: MovieState = {
  loading: false,
  error: null,
  response: null,
  movie: null,
  search: null
}

export interface MovieState {
  loading: boolean;
  error: ErrorData | null;
  response: ResponseApi | null,
  movie: Movie | null,
  search: ResponseApi | null
}

export const movieFeature = createFeature({
  name: 'movieFeature',
  reducer: createReducer(
    movieInitialState,
    on(actions.getMovies, (state) => ({
      ...state,
      loading: true,
      error: null,
      response: null
    })),
    on(actions.getMoviesSuccess, (state, action) => ({
      ...state,
      loading: false,
      error: null,
      response: action.response
    })),
    on(actions.getMoviesFailed, (state, action) => ({
      ...state,
      loading: false,
      error: action.error,
      response: null
    })),
    on(actions.getMovieById, (state) => ({
      ...state,
      loading: true,
      error: null,
      movie: null
    })),
    on(actions.getMovieByIdSuccess, (state, action) => ({
      ...state,
      loading: true,
      error: null,
      movie: action.movie
    })),
    on(actions.getMovieByIdFailed, (state, action) => ({
      ...state,
      loading: true,
      error: action.error,
      movie: null
    })),
    on(actions.getMovieByName, (state) => ({
      ...cloneDeep(state),
      loading: true,
      error: null
    })),
    on(actions.getMovieByNameSuccess, (state, action) => ({
      ...cloneDeep(state),
      loading: false,
      error: null,
      search: action.response
    })),
    on(actions.getMovieByNameFailed, (state, action) => ({
      ...cloneDeep(state),
      loading: false,
      error: action.error,
      search: null
    })),
    on(actions.getMoviePage, (state) => ({
      ...cloneDeep(state),
      loading: true,
      error: null
    })),
    on(actions.getMoviePageSuccess, (state, action) => ({
      ...cloneDeep(state),
      loading: false,
      error: null,
      response: action.response
    })),
    on(actions.getMoviePageFailed, (state, action) => ({
      ...cloneDeep(state),
      loading: false,
      error: action.error,
      response: null
    }))
  )
});

export const { name, reducer } = movieFeature;
