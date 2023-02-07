import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { counterReducer } from './store/reducers/counter.reducer';
import { counterIncrement } from './store/actions/counter.action';
import { isLoggingIn, selectUser } from './store/selectors/login.selector';
import { LoginState } from './store/reducers/login.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 0;

  lang = 'en';

  loginState$: Observable<LoginState>;

  isLoading$: Observable<boolean>;

  constructor(
    public translate: TranslateService,
    public store: Store<any>,
  ) {
    translate.use(this.lang);
    this.fireReducer();

    this.isLoading$ = this.store.pipe(
      select(isLoggingIn),
    );

    this.loginState$ = this.store.pipe(
      select(selectUser),
      tap((loginState) => console.log(loginState)),
    );
  }

  fireReducer() {
    this.store.select('counterReducer').subscribe((res) => {
      this.title = res.counter;
    });
  }

  switchLang(): void {
    if (this.lang === 'ar') {
      this.translate.use('en');
      this.lang = 'en';
    } else {
      this.translate.use('ar');
      this.lang = 'ar';
    }
  }

  increment(): void {
    this.store.dispatch(counterIncrement({ value: 6 }));
  }
}
