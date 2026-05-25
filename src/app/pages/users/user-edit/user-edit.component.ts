import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/users/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

  form = this.fb.group({
    id: 0,
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.findById(id)
  }

  findById(id: number) {
    this.userService.findById(id).subscribe(user => {
      this.form.patchValue(user);
    })
  }

  update(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.userService.update(this.form.value as User).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/categories']);
  }

}
