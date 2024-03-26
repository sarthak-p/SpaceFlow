import { Component } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  teams: { teamname: string, numprojects: string, desc: string, members: string[], id: string }[] = [];

  constructor() {
    this.teams = [
      {
        teamname: "Team Blue",
        numprojects: "4",
        desc: "Four score and seven years ago...",
        members: ["Billy", "Bobby", "Kenny"],
        id: "1"
      },
      {
        teamname: "Team Red",
        numprojects: "2",
        desc: "The bee, of course, flys anyway...",
        members: ["Kurt", "Burt", "Blart"],
        id: "2"
      }
    ];
  }

}
