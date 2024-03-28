import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css']
})
export class UserRegistryComponent implements OnInit {
  users: User[] = [];
  selectedCompanyId?: number;
  showAddUserOverlay = false; 
  isAdmin = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router 
  ) { }
  

  toggleOverlay() {
    if (this.isAdmin) {
      this.showAddUserOverlay = !this.showAddUserOverlay;
      } else {
        console.error("You do not have permission to add users.");
      }
    }

  
  ngOnInit() {
    this.isAdmin = this.authService.isAdmin(); 
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
      this.userService.getUsersByCompanyId(this.selectedCompanyId).subscribe(users => {
        this.users = users;
        this.changeDetectorRef.detectChanges();
      }, error => console.error('Error fetching users:', error));
    } else {
      console.error('Selected Company ID is undefined.');
    }
  }

  logout() {
    this.authService.logout();
  }

  deleteUser(username: string | undefined): void {
  if (typeof username !== 'string') {
    console.error('Username is undefined, cannot delete user.');
    return;
  }
  
  if (!confirm(`Are you sure you want to delete the user: ${username}?`)) {
    return;
  }



  this.userService.deleteUser(username).subscribe({
    next: () => {
      console.log(`User ${username} deleted successfully.`);
      this.fetchUsersByCompanyId(this.selectedCompanyId!); 
    },
    error: (error) => {
      console.error(`Error deleting user: ${error}`);
    }
  });
}





}