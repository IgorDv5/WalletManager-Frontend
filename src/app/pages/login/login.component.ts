import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginRequest } from '../../shared/models/auth/LoginRequest';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  hidePassword = true;

  loading = false;

  loginForm = this.fb.group({
    email: ['',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: ['',
      [
        Validators.required
      ]
    ]
  });

  onSubmit(): void {

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const payload: LoginRequest = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    };

    this.authService.login(payload)
      .subscribe({

        next: (response) => {

          localStorage.setItem(
            'token',
            response.token
          );

          this.snackBar.open(
            'Login realizado com sucesso!',
            'Fechar',
            {
              duration: 3000
            }
          );

          this.loading = false;

          this.router.navigate(['/home']);
        },

        error: () => {

          this.snackBar.open(
            'Usuário ou senha inválidos',
            'Fechar',
            {
              duration: 3000
            }
          );

          this.loading = false;
        }
      });
  }


}
