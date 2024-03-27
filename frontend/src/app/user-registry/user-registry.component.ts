import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';


@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css']
})
export class UserRegistryComponent {
  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'active', 'admin', 'status'];
  showAddUserOverlay = false;
  selectedCompanyId: number = 1;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchUsersByCompanyId(this.selectedCompanyId);
  }

  toggleOverlay(): void {
    this.showAddUserOverlay = !this.showAddUserOverlay;
  }

  fetchUsersByCompanyId(companyId: number): void {
    this.userService.getUsersByCompanyId(this.selectedCompanyId).subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error: any) => {
        console.error('Error fetching users for company:', error);
      }
    );
  }
}
