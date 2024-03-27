import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent {

  currentUserName: string = "CURRENT-USER"; // This should be updated by a global app variable on init
  constructor(private router: Router) { }

  goToAnnouncementPage(): void {
    this.router.navigate(['/home']);
  }
}
