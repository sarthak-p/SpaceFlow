import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.css']
})
export class UserRegistryComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }
  
  showAddUserOverlay = false;

  toggleOverlay(): void {
    this.showAddUserOverlay = !this.showAddUserOverlay;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const companyId = +params['companyId'];
      if (companyId) {
        this.fetchUsersByCompanyId(companyId);
      } else {
        console.error('Company ID is missing');
      }
    });
  }

  fetchUsersByCompanyId(companyId: number): void {
    this.userService.getUsersByCompanyId(companyId).subscribe(
      users => this.users = users,
      error => console.error('Error fetching users:', error)
    );
  }
}