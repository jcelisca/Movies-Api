import { createFeature, createReducer, on } from "@ngrx/store";
import { ErrorData } from "../../../domain/error.interface";
import * as actions from '../../actions/user.action';

export const userInitialState: UserState = {
  loading: false,
  error: null,
  uid: null,
  login: false,
  register: false
}

export interface UserState {
   loading: boolean;
   error: ErrorData | null;
   uid: string | null,
   login: boolean,
   register: boolean
}

export const userFeature = createFeature({
  name: 'userFeature',
  reducer: createReducer(
    userInitialState,
    on(actions.createAccount, (state) => ({
      ...state,
      loading: true,
      error: null,
      uid: null,
      login: false
    })),
    on(actions.createAccountSuccess, (state, action) => ({
      ...state,
      loading: false,
      error: null,
      uid: null,
      login: false,
      register: !!action.uid
    })),
    on(actions.createAccountFailed, (state, action) => ({
      ...state,
      loading: false,
      error: action.error,
      uid: null,
      login: false
    })),
    on(actions.logInUser, (state) => ({
      ...state,
      loading: true,
      error: null,
      uid: null,
      login: false
    })),
    on(actions.logInUserSuccess, (state, action) => ({
      ...state,
      loading: false,
      error: null,
      uid: action.uid,
      login: true
    })),
    on(actions.logInUserFailed, (state, action) => ({
      ...state,
      loading: false,
      error: action.error,
      uid: null,
      login: false
    })),
    on(actions.logInWithGoogle, (state) => ({
      ...state,
      loading: true,
      error: null,
      uid: null,
      login: false
    })),
    on(actions.logInWithGoogleSuccess, (state, action) => ({
      ...state,
      loading: false,
      error: null,
      uid: action.uid,
      login: true
    })),
    on(actions.logInWithGoogleFailed, (state, action) => ({
      ...state,
      loading: false,
      error: action.error,
      uid: null,
      login: false
    })),
    on(actions.logOut, (state) => ({
      ...state,
      loading: true
    })),
    on(actions.logOutSuccess, (state) => ({
      ...state,
      loading: false,
      error: null,
      uid: null,
      login: false
    })),
    on(actions.logOutFailed, (state, action) => ({
      ...state,
      loading: false,
      error: action.error,
      uid: null,
      login: false
    })),
    on(actions.loadUser, (state, action) => ({
      ...state,
      loading: false,
      error: null,
      uid: action.uid,
      login: !!action.uid
    }))
  )
});

export const { name, reducer } = userFeature;
