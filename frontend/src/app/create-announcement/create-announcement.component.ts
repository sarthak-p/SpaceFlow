import { Component } from '@angular/core';
import { AnnouncementService } from '../announcement.service';
import { CompanyService } from '../company.service';
import { Announcement } from '../announcement.model';
import { Company } from '../company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent {

  currentUserName: string = "willsusername"; // This should be updated by a global app variable on init
  currentCompanyId: number = 99; // This should be updated by the dropdown menu
  title: string = "title";
  description: string = "description";

  companies: Company[] = [];
  selectedOption!: Company;

  constructor(private companyService: CompanyService, private router: Router, private announcementService: AnnouncementService) { }

  goToAnnouncementPage(): void {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.fetchCompanies();
  }

  fetchCompanies() {
    this.companyService.getCompanies().subscribe(allcompanies => {
      console.log(allcompanies); 
      for (const company of allcompanies) {
        this.companies.push(company);
      }
    }, error => console.error(error));
  }

  onDropdownChange(value: Company) {
    this.selectedOption = value;
    this.currentCompanyId = this.selectedOption.id;
    console.log("MANUAL COMPANY SELECT: ");
    console.log(this.currentCompanyId);
  }

  onSubmit() {
    console.log("SUBMIT");
    this.announcementService.createAnnouncement(this.currentCompanyId, this.currentUserName, this.title, this.description);
    this.router.navigate(['/home']);
  }
}
