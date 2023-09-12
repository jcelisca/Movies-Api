import { createAction, props } from "@ngrx/store";
import { User } from "../../domain/user.interface";
import { ErrorData } from "../../domain/error.interface";

export const createAccount = createAction(
  '[Auth Register Component] CreateAccount',
  props<{ user: User }>()
);

export const createAccountSuccess = createAction(
  '[Auth Register Component] CreateAccountSuccess',
  props<{ uid: string }>()
);

export const createAccountFailed = createAction(
  '[Auth Register Component] CreateAccountFailed',
  props<{ error: ErrorData }>()
);

export const logInUser = createAction(
  '[Auth LogIn Component] LogInUser',
  props<{ user: User }>()
);

export const logInUserSuccess = createAction(
  '[Auth LogIn Component] LogInUserSuccess',
  props<{ uid: string }>()
);

export const logInUserFailed = createAction(
  '[Auth LogIn Component] LogInUserFailed',
  props<{ error: ErrorData }>()
);

export const logInWithGoogle = createAction(
  '[Auth LogIn Component] LogInWithGoogle'
);

export const logInWithGoogleSuccess = createAction(
  '[Auth LogIn Component] LogInWithGoogleSuccess',
  props<{ uid: string }>()
);

export const logInWithGoogleFailed = createAction(
  '[Auth LogIn Component] LogInWithGoogleFailed',
  props<{ error: ErrorData }>()
);

export const logOut = createAction(
  '[Movies Layout Component] LogOut'
);

export const logOutSuccess = createAction(
  '[Movies Layout Component] LogOutSuccess'
);

export const logOutFailed = createAction(
  '[Movies Layout Component] LogOutFailed',
  props<{ error: ErrorData }>()
);

export const loadUser = createAction(
  '[Auth Register Component] loadUser',
  props<{ uid: string | null }>()
);
