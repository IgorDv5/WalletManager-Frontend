import { Component, inject, OnInit } from '@angular/core';
import { TransactionSummaryDTO } from '../../../shared/models/transaction/transactions/TransactionSummaryDTO';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../../core/services/transaction.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  summary: TransactionSummaryDTO | null = null;

  start = new FormControl(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      .toISOString().split('T')[0]
  );
  end = new FormControl(new Date().toISOString().split('T')[0]);

  private transactionService = inject(TransactionService);

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary(): void {
    this.transactionService.getSummary(this.start.value!, this.end.value!).subscribe({
      next: (data) => this.summary = data,
      error: (err) => console.error(err)
    });
  }

}
