import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { TransactionListComponent } from './pages/transactions/transaction-list/transaction-list.component';
import { TransactionCreateComponent } from './pages/transactions/transaction-create/transaction-create.component';
import { TransactionEditComponent } from './pages/transactions/transaction-edit/transaction-edit.component';

import { CategoryListComponent } from './pages/categories/category-list/category-list.component';
import { CategoryCreateComponent } from './pages/categories/category-create/category-create.component';
import { CategoryEditComponent } from './pages/categories/category-edit/category-edit.component';

import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserCreateComponent } from './pages/users/user-create/user-create.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';

import { LoginComponent } from './pages/login/login.component';

import { authGuard } from './core/auth/authGuard';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: '', component: HomeComponent },
            { path: 'transactions', component: TransactionListComponent },
            { path: 'transactions/create', component: TransactionCreateComponent },
            { path: 'transactions/edit/:id', component: TransactionEditComponent },
            { path: 'categories', component: CategoryListComponent },
            { path: 'users', component: UserListComponent }
        ]
    }
];