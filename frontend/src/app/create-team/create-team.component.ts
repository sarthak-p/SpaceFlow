import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { TeamService } from '../team.service';
import { Team } from '../team.model';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent {
  newTeam: Team = {
    id: 9999, // This should be ignored by the backend
    name: "Team name not provided",
    description: "Team desc not provided",
    teammates: []
  };
  name: string = "";
  description: string = "";
  options: User[] = []; // All team members available for choosing
  entries: User[] = []; // All chosen team members
  allOptions: User[] = [];
  selectedOption!: User;
  currentUserName: string = "pinky"; // This should be updated by a global app variable on init
  currentCompanyId: number = 6; // This should be updated by a global app variable on init

  constructor(private userService: UserService, private teamService: TeamService, private router: Router)
  { 

  }

  ngOnInit() {
    // Update from global
    this.fetchUsersByCompanyId(this.currentCompanyId);
  }

  fetchUsersByCompanyId(companyId: number) {
    this.userService.getUsersByCompanyId(companyId).subscribe(users => {
      console.log(users); 
      for (const user of users) {
        this.options.push(user);
        //console.log(user.profile.firstName);
      }
      this.allOptions = [...this.options];
      console.log(this.options[0].profile.firstName); // DOES THIS WORK? Earlier after options.push, it couldn't find the fields
    }, error => console.error(error));
  }

  onDropdownChange(value: User) {
    if (value) {
      this.entries.push(value);
      this.updateOptions();
      console.log("ENTRIES: ");
      console.log(this.entries);
    }
  }

  removeEntry(entry: User) {
    const index = this.entries.indexOf(entry);
    if (index !== -1) {
      this.entries.splice(index, 1);
      this.updateOptions();
    }
  }

  updateOptions() {
    this.options = this.allOptions.filter(option => !this.entries.includes(option));
    // console.log("OPTIONS: ");
    // console.log(this.options);
    // console.log("ENTRIES: ");
    // console.log(this.entries);
  }

  onSubmit() {
    console.log("SUBMIT");
    this.newTeam.name = this.name;
    this.newTeam.description = this.description;
    this.newTeam.teammates = this.entries;
    this.teamService.createTeam(this.currentCompanyId, this.newTeam);
    this.router.navigate(['/teams']);
  }

}
