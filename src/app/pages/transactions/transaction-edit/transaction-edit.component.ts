import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TransactionService } from '../../../core/services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionType } from '../../../shared/models/transaction/enums/transaction-type.enum';
import { Transaction } from '../../../shared/models/transaction/transactions/Transaction';

@Component({
  selector: 'app-transaction-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './transaction-edit.component.html',
  styleUrl: './transaction-edit.component.css'
})
export class TransactionEditComponent implements OnInit {

  private fb = inject(FormBuilder);
  private service = inject(TransactionService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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

  form: FormGroup = this.fb.group({
    id: 0,
    amount: [null, [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    date: ['', Validators.required],
    type: ['', Validators.required],
    categoryId: [null, Validators.required],
    userId: 0
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.findById(id)
  }

  findById(id: number) {
    this.service.findById(id).subscribe(transaction => {
      transaction.date = this.formatDate(transaction.date);
      this.form.patchValue(transaction);
    });
  }

  update(): void {
    this.service.update(this.form.value as Transaction).subscribe(() => {
      this.router.navigate(['/transactions']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/transactions']);
  }


  private formatDate(date: string): string {

    const data = new Date(date);
    const year = data.getFullYear();
    const month = String(data.getMonth() + 1).padStart(2, '0');
    const day = String(data.getDate()).padStart(2, '0');
    const hours = String(data.getHours()).padStart(2, '0');
    const minutes = String(data.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

} 
