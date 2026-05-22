import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransactionListComponent } from './pages/transactions/transaction-list/transaction-list.component';
import { CategoryListComponent } from './pages/categories/category-list/category-list.component';
import { CategoryCreateComponent } from './pages/categories/category-create/category-create.component';
import { CategoryEditComponent } from './pages/categories/category-edit/category-edit.component';

export const routes: Routes = [
    
    {
        path: '',
        component: HomeComponent
    },
     {
        path: 'home',
        component: HomeComponent
    },
    // ******Categorias**********
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
    {
        path: 'transactions',
        component: TransactionListComponent
    },
    {
        path: 'transactions/create',
        component: HomeComponent
    },
    {
        path: 'edit/:id',
         component: HomeComponent
    }

];
