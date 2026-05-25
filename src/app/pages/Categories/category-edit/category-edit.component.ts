import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../core/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../shared/models/categories/Category';

@Component({
  selector: 'app-category-edit',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent implements OnInit {

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute)

   form = this.fb.group({
    id: 0,
    name: ['', Validators.required],
    userId: 0
  });

   ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.findById(id)
  }

    findById(id: number) {
    this.categoryService.findById(id).subscribe(category => {
      this.form.patchValue(category);
    })
  }

    update(): void {
    this.categoryService.update(this.form.value as Category).subscribe(() => {
      this.router.navigate(['/categories']);
    });
  }

  cancelar(): void {
     this.router.navigate(['/categories']);
  }

}
