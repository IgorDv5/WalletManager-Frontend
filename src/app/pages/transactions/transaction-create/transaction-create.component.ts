import { Component, inject, OnInit } from '@angular/core';
import { Transaction } from '../../../shared/models/transaction/transactions/Transaction';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionType } from '../../../shared/models/transaction/enums/transaction-type.enum';
import { Router } from '@angular/router';
import { TransactionService } from '../../../core/services/transaction.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-transaction-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './transaction-create.component.html',
  styleUrl: './transaction-create.component.css'
})
export class TransactionCreateComponent implements OnInit {

 
  private fb = inject(FormBuilder);
  private service = inject(TransactionService);
  private router = inject(Router);
  private categoryService = inject(CategoryService);

    transactionTypes = [
    {
      label: 'Ganho',
      value: TransactionType.INCOME
    },
    {
      label: 'Gasto',
      value: TransactionType.EXPENSE
    }
  ];

  categories: any[] = [];

  form: FormGroup = this.fb.group({
    amount: [null, [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    date: ['', Validators.required],
    type: ['', Validators.required],
    categoryId: [null, Validators.required]
  });

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.findAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error(err)
    });
  }

  create(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const transaction: Transaction = {
      id: 0,
      ...this.form.value,
      userId: 1
    };

    this.service.create(transaction).subscribe({
      next: () => {
        this.router.navigate(['/transactions']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/transactions']);
  }

}
