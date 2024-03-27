import { Component } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  //teams: { teamname: string, numprojects: string, desc: string, members: string[], id: string }[] = [];
  teams: Team[] = [];
  companyId: number = 6;

  constructor(private teamService: TeamService) {

    // this.teams = [
    //   {
    //     teamname: "Team Blue",
    //     numprojects: "4",
    //     desc: "Four score and seven years ago...",
    //     members: ["Billy", "Bobby", "Kenny"],
    //     id: "1"
    //   },
    //   {
    //     teamname: "Team Red",
    //     numprojects: "2",
    //     desc: "The bee, of course, flys anyway...",
    //     members: ["Kurt", "Burt", "Blart"],
    //     id: "2"
    //   }
    // ];
  }

  ngOnInit(): void {
    this.fetchTeamsByCompanyId();
    //this.teamService.getData();

  }

  fetchTeamsByCompanyId(): void {
    this.teamService.getTeamsByCompanyId(this.companyId).subscribe(
      (teams: Team[]) => {
        this.teams = teams;
        console.log("LOGGING TEAMS: ");
        console.log(teams);
      },
      (error: any) => {
        console.error('Error fetching teams from company:', error);
      }
    );
  }

}
