import { Component } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css']
})
export class UserRegistryComponent {
  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'active', 'admin', 'status'];
  showAddUserOverlay = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
    (error: any) => {
      console.error(error);
    }
  );
  }

  toggleOverlay(): void {
    this.showAddUserOverlay = !this.showAddUserOverlay;
  }
}

interface User {
  name: string;
  email: string;
  active: string;
  admin: string;
  status: string;
}
