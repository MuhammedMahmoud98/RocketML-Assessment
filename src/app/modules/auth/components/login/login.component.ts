import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, Validators,
} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import { LoginService } from '../../../../services/login.service';
import { loginReducer, LoginState } from '../../../../store/reducers/login.reducer';
import {startLogin} from "../../../../store/actions/login.action";
import {selectUser} from "../../../../store/selectors/login.selector";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  showPassword = false

  constructor(
    public formBuilder: FormBuilder,
    private loginService: LoginService,
    private store: Store<{loginReducer: LoginState}>,
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    console.log(this.loginForm.value, 'VALUE');
    this.store.dispatch(startLogin(this.loginForm.value));
  }
}
