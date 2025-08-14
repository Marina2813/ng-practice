import { Component } from '@angular/core';
import { Button } from '../button/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [ RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  query: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
  }

  onSearch(event: Event) {
    event.preventDefault();
    if (!this.query.trim()) return;

    this.router.navigate(['/search'], { queryParams: { query: this.query } });
  }


}
