import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Transaction } from '../../../shared/models/transaction/transactions/Transaction';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
  selector: 'app-transaction-list-deleted',
  imports: [
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './transaction-list-deleted.component.html',
  styleUrl: './transaction-list-deleted.component.css'
})
export class TransactionListDeletedComponent {

  transactions: Transaction[] = [];

  displayedColumns: string[] = [
    'id',
    'description',
    'amount',
    'date',
    'deletedAt',
    'type',
    'actions'
  ];

  dataSource = new MatTableDataSource<Transaction>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private service = inject(TransactionService);

  ngOnInit(): void {
    this.findAll();

    this.dataSource.filterPredicate = (data: Transaction, filter: string) => {
      return data.description.toLowerCase().includes(filter);
    };
  }

  getTypeLabel(type: string): string {
    return type === 'INCOME' ? 'Ganho' : 'Gasto';
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAll() {
    this.service.findAllDeleted().subscribe({
      next: (resposta) => {
        this.dataSource = new MatTableDataSource(resposta);
        this.dataSource.paginator = this.paginator;

        this.dataSource.filterPredicate = (data: Transaction, filter: string) => {
          return data.description.toLowerCase().includes(filter);
        };
      }
    });
  }

  toggleDelete(id: number) {
    this.service.toggleSoftDelete(id).subscribe(() => {
      this.findAll();
    });
  }


}
