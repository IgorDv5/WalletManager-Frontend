import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { Transaction } from '../../../shared/models/transaction/Transaction';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-transaction-list',
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
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];

  displayedColumns: string[] = [
  'id',
  'description',
  'amount',
  'date',
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
  this.service.findAll().subscribe({
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
