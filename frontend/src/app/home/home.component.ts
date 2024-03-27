import { Component } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { Announcement } from '../announcement.model';
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
  //announcements: { title: string, author: string, date: string, body: string }[] = [];
  announcements: Announcement[] = [];
  companyId: number = 6;

  constructor(private announcementService: AnnouncementService) {
    
  }

  ngOnInit(): void {
    this.fetchAnnouncementsByCompanyId();
  }

  fetchAnnouncementsByCompanyId(): void {
    this.announcementService.getAnnouncementsByCompanyId(this.companyId).subscribe(
      (announcements: Announcement[]) => {
        this.announcements = announcements;
        console.log("LOGGING TEAMS: ");
        console.log(announcements);
      },
      (error: any) => {
        console.error('Error fetching teams from company:', error);
      }
    );
  }


  ngOnInit() {
    this.authService.getSelectedCompanyId().subscribe(id => this.selectedCompanyId = id);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }



}
