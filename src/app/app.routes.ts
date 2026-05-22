import { Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { TransactionListComponent } from './pages/transactions/transaction-list/transaction-list.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
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
