import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AppState } from '../../state/App.state';
import { Store } from '@ngrx/store';
import { login } from '../../state/login/login.action';
import { loginError } from '../../state/login/login.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });
  loginError$ = this.store.select(loginError);

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(login({ user: this.form.value }));
    }
  }
}
