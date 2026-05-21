import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

 menuOpen = false;

 private router = inject(Router);

 toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

 logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
