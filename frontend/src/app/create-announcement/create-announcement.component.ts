import { Component } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { Announcement } from '../announcement.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent {

  currentUserName: string = "pinky"; // This should be updated by a global app variable on init
  currentCompanyId: number = 6; // This should be updated by a global app variable on init
  title: string = "title";
  description: string = "description";
  constructor(private router: Router, private announcementService: AnnouncementService) { }

  goToAnnouncementPage(): void {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    // Update user and company based on global fields
  }

  onSubmit() {
    console.log("SUBMIT");
    this.announcementService.createAnnouncement(this.currentCompanyId, this.currentUserName, this.title, this.description);
  }
}
