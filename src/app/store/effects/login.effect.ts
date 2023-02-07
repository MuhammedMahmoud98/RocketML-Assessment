import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, delay, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginService } from '../../services/login.service';
import {loginFailed, loginSuccess, logOut, startLogin} from '../actions/login.action';
import {Router} from "@angular/router";

@Injectable()
export class LoginEffects {
  constructor(private action$: Actions, private loginService: LoginService, private router: Router) {}

  // START LOGIN
  startLogin$ = createEffect(() => this.action$.pipe(
    ofType(startLogin),
    mergeMap((action) => this.loginService.login({ userName: action.userName, password: action.password }).pipe(
      delay(3000),
      map((loginResponse) => loginSuccess({ user: loginResponse.user, token: loginResponse.token })),
      tap((finalResult) => {
        this.loginService.saveToken(finalResult.token);
        this.router.navigate(['/point-of-sale']);
      }),
      catchError((err) => of(loginFailed({ message: err.message }))),
    )),
  ));

  logout$ = createEffect(() => this.action$.pipe(
    ofType(logOut),
    tap(() => {
      this.loginService.logOut();
    }),
  ), {dispatch: false});
}
