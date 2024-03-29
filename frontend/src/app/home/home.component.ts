import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { Announcement } from '../announcement.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  announcements: Announcement[] = [];
  selectedCompanyId?: number;
  admin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private announcementService: AnnouncementService
  ) { }

  ngOnInit(): void {
    this.admin = this.authService.isAdmin();
    
    this.authService.getSelectedCompanyId().subscribe((companyId) => {
      if (companyId !== null) {
        this.selectedCompanyId = companyId;
        this.fetchAnnouncementsByCompanyId(companyId);
      } else {
        console.error('Company ID is missing');
      }
    });
  }

  fetchAnnouncementsByCompanyId(companyId: number): void {
    this.announcementService.getAnnouncementsByCompanyId(companyId).subscribe(
      (announcements: Announcement[]) => {
        this.announcements = announcements;
        console.log('LOGGING ANNOUNCEMENTS:', announcements);
      },
      (error: any) => {
        console.error('Error fetching announcements from company:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
