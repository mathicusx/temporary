import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app/app.state';
import { login } from 'src/app/store/auth/auth.actions';

interface Form {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-desktop',
  templateUrl: './login-desktop.page.html',
  styleUrl: './login-desktop.page.scss',
})
export class LoginDesktopPage implements OnInit {
  loginForm: FormGroup;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initForm();
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Login Data:', { username, password });
      this.store.dispatch(login({ username: username, password: password }));
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid');
    }
  }

  private initForm() {
    this.loginForm = new FormGroup<Form>({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
}
