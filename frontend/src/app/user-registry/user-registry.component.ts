import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css']
})
export class UserRegistryComponent implements OnInit {
  users: User[] = [];
  selectedCompanyId?: number;


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }
  
  showAddUserOverlay = false;

  toggleOverlay(): void {
    this.showAddUserOverlay = !this.showAddUserOverlay;
  }

  
  ngOnInit() {
    this.authService.getSelectedCompanyId().subscribe(companyId => {
      if (companyId) {
        this.selectedCompanyId = companyId;
        this.fetchUsersByCompanyId(companyId);
      } else {
        console.error('Company ID is missing');
       
      }
    });
  }

  fetchUsersByCompanyId(companyId: number) {
    this.userService.getUsersByCompanyId(companyId).subscribe(users => {
      console.log(users);
      this.users = users;
    }, error => console.error(error));
  }

  fetchUsers() {
    if (this.selectedCompanyId) {
      console.log('Fetching users for company ID:', this.selectedCompanyId); // Log company ID
      this.userService.getUsersByCompanyId(this.selectedCompanyId).subscribe(users => {
        console.log('Fetched users:', users); // Log fetched users
        this.users = users;
        this.changeDetectorRef.detectChanges();
      }, error => console.error('Error fetching users:', error));
    } else {
      console.error('Selected Company ID is undefined.');
    }
  }
}