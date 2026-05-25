import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../core/services/category.service';
import { Router } from '@angular/router';
import { Category } from '../../../shared/models/categories/Category';

@Component({
  selector: 'app-category-create',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
    userId: 0
  });

    create() {
    if (this.form.invalid) return;

    this.categoryService.create(this.form.value as Category).subscribe(() => {
      this.router.navigate(['categories'])
    });
  }

  cancelar() {
    this.router.navigate(['categories']);
  }

}
