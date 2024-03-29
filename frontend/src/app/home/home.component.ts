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
  announcements: Announcement[] = [];
  companyId: number = 6;
  admin: boolean = false;

  constructor(private authService: AuthService, private router: Router, private announcementService: AnnouncementService) {
    
  }

  fetchAnnouncementsByCompanyId(): void {
    this.announcementService.getAnnouncementsByCompanyId(this.companyId).subscribe( // placeholder id here
      (announcements: Announcement[]) => {
        this.announcements = announcements;
        console.log("LOGGING ANNOUNCEMENTS: ");
        console.log(announcements);
      },
      (error: any) => {
          console.error('Error fetching announcements from company:', error);
      }
    );
  }

  ngOnInit() {
    this.admin = this.authService.isAdmin();  
    this.authService.getSelectedCompanyId().subscribe(id => this.selectedCompanyId = id);
    this.fetchAnnouncementsByCompanyId();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }



}
