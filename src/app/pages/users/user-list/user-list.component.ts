import { Component, inject, ViewChild } from '@angular/core';
import { User } from '../../../shared/models/users/User';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from '../../../core/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
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
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  categories: User[] = [];

  displayedColumns: string[] = [
    'id',
    'nome',
    'email',
    'role',
    'actions'
  ];

  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private service = inject(UserService);

  ngOnInit(): void {
    this.findAll();

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      return data.nome.toLowerCase().includes(filter);
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
    this.service.toggleSoftDelete(id).subscribe(() => {
      this.findAll();
    });
  }

}
