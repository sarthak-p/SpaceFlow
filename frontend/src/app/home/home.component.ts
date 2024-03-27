import { Component } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { Announcement } from '../announcement.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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


}
