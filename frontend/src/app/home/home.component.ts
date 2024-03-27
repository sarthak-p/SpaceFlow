import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   selectedCompanyId?: number | null;

  announcements: { title: string, author: string, date: string, body: string }[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.announcements = [
      {
        title: 'First Announcement',
        author: 'John Doe',
        date: '2024-03-25',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      {
        title: 'Second Announcement',
        author: 'Jane Smith',
        date: '2024-03-26',
        body: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ];
  }

  ngOnInit() {
    this.authService.getSelectedCompanyId().subscribe(id => this.selectedCompanyId = id);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }



}
