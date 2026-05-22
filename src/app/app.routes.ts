import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransactionListComponent } from './pages/transactions/transaction-list/transaction-list.component';
import { CategoryListComponent } from './pages/categories/category-list/category-list.component';
import { CategoryCreateComponent } from './pages/categories/category-create/category-create.component';
import { CategoryEditComponent } from './pages/categories/category-edit/category-edit.component';
import { TransactionCreateComponent } from './pages/transactions/transaction-create/transaction-create.component';
import { TransactionEditComponent } from './pages/transactions/transaction-edit/transaction-edit.component';

export const routes: Routes = [
    
    {
        path: '',
        component: HomeComponent
    },
     {
        path: 'home',
        component: HomeComponent
    },
    // ******Categories**********
    {
        path: 'categories',
        component: CategoryListComponent
    },
    {
        path: 'categories/create',
        component: CategoryCreateComponent
    },
    {
         path: 'categories/edit/:id',
        component: CategoryEditComponent
    },
    // ******Transactions**********
    {
        path: 'transactions',
        component: TransactionListComponent
    },
    {
        path: 'transactions/create',
        component: TransactionCreateComponent
    },
    {
        path: 'transactions/edit/:id',
         component: TransactionEditComponent
    }

];
