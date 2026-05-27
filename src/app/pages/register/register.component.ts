import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  register(): void {

    if (this.form.invalid) return;

    const payload = this.form.value;

    this.authService.register(payload as any).subscribe({
      next: () => {
        this.snackBar.open('Conta criada com sucesso!', 'Fechar', {
          duration: 3000
        });

        this.router.navigate(['/login']);
      },

      error: () => {
        this.snackBar.open('Erro ao criar conta', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/login']);
  }
}
