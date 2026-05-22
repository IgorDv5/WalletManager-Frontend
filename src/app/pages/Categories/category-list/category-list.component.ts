import { Component, inject, ViewChild } from '@angular/core';
import { Category } from '../../../shared/models/transaction/categories/Category';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CategoryService } from '../../../core/services/category.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-list',
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
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {

  categories: Category[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'actions'
  ];

  dataSource = new MatTableDataSource<Category>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private service = inject(CategoryService);

  ngOnInit(): void {
    this.findAll();

    this.dataSource.filterPredicate = (data: Category, filter: string) => {
      return data.name.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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
        this.dataSource.data = resposta;
      }
    });
  }

  toggleDelete(id: number) {
    this.service.delete(id).subscribe(() => {
      this.findAll();
    });
  }

}
