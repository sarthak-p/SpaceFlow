import { Component } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../team.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  teams: Team[] = [];
  companyId: number = 6;

  constructor(private authService: AuthService, private router: Router, private teamService: TeamService) {

  }

  ngOnInit(): void {
    console.log("TEAMS INIT")
    this.fetchTeamsByCompanyId();

  }

  fetchTeamsByCompanyId(): void {
    this.teamService.getTeamsByCompanyId(this.companyId).subscribe(
      (teams: Team[]) => {
        this.teams = teams;
        //console.log("LOGGING TEAMS: ");
        //console.log(teams);
      },
      (error: any) => {
        console.error('Error fetching teams from company:', error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
