import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginFailed: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private tokenStorageService: TokenStorageService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.loginFailed = false;
    if (this.loginForm.valid) {
      const formData = new FormData();

      const usernameControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');

      if (usernameControl && passwordControl) {
        formData.append('username', usernameControl.value);
        formData.append('password', passwordControl.value);

        this.authService.login(formData).subscribe(
          (response) => {
            const token = response.token;
            this.tokenStorageService.saveToken(token);
            this.router.navigate(['/main']);
          },
          (error) => {
            console.error('Login failed', error);
            this.loginFailed = true;
          }
        );
      }
    }
  }

}
