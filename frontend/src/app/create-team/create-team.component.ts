import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Team } from '../team.model';
import { User } from '../user.model';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent {
  newTeam: Team = {
    id: 9999, // This should be ignored by the backend
    name: "Name",
    description: "Desc",
    teammates: []
  };
  name: string = "";
  description: string = "";
  teammates: any[] = [];
  options: string[] = ["Select a team member"];
  entries: string[] = [];
  allOptions: string[] = [];
  currentUserName: string = "pinky"; // This should be updated by a global app variable on init
  currentCompanyId: number = 6; // This should be updated by a global app variable on init

  constructor(private userService: UserService)
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
        // Access user.profile.firstName and add it to the options array
        this.options.push(user.profile.firstName);
      }
      this.allOptions = [...this.options];
    }, error => console.error(error));
  }

  onDropdownChange(value: string) {
    if (value) {
      this.entries.push(value);
      this.updateOptions();
    }
  }

  removeEntry(entry: string) {
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

  generateTeammatesDtoList() {

  }

  onSubmit() {
    console.log("SUBMIT");
    this.newTeam.name = this.name;
    this.newTeam.description = this.description;
    this.generateTeammatesDtoList();
    this.newTeam.teammates = this.teammates;
    //this.teamService.createTeam(this.currentCompanyId, newTeam);
  }

}
