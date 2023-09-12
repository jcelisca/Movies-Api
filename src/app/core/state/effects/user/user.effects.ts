import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import * as actions from '../../actions/user.action';

@Injectable()
export class UserEffects {
  constructor(
    private readonly userService: UserService,
    private readonly actions$: Actions
  ) {}

  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createAccount),
      switchMap((action) =>
        this.userService.register(action.user).then(
          (response) => actions.createAccountSuccess({ uid: response.user.uid })
          )
          .catch( error => actions.createAccountFailed({ error}))
      )
    )
  );

  logInUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.logInUser),
      switchMap((action) =>
        this.userService.logIn(action.user).then(
          (response) => actions.logInUserSuccess({ uid: response.user.uid })
          )
          .catch( error => actions.logInUserFailed({ error }))
      )
    )
  );

  loginWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.logInWithGoogle),
      switchMap(() =>
        this.userService.lonInGoogle().then(
          (response) => actions.logInWithGoogleSuccess({ uid: response.user.uid })
          )
          .catch( error => actions.logInWithGoogleFailed({ error}))
      )
    )
  );

  logOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.logOut),
      switchMap(() =>
        this.userService.logOut().then(() => actions.logOutSuccess()
          )
          .catch( error => actions.logOutFailed({ error}))
      )
    )
  );
}
