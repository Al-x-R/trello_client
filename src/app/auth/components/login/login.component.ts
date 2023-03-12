import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    const formData = this.form.getRawValue() as LoginRequestInterface;

    this.authService.login(formData).subscribe({
      next: (currentUser) => {
        this.authService.setToken(currentUser);
        this.authService.setCurrentUser(currentUser);
        this.errorMessage = null;
        this.router.navigateByUrl('/');
      },
      error: (err: HttpErrorResponse) => this.errorMessage = err.error.emailOrPassword
    });
  }
}
