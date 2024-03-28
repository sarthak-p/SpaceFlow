import { Component } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../team.model';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { Observable } from 'rxjs';
import { Project } from '../project.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  teams: Team[] = [];
  companyId: number = 6;
  userId: number = 21; // Should be updated depending on who is logged in
  admin: boolean = false; // Should be updated depending on who is logged in
  numberOfProjectsMap: Map<number, number> = new Map<number, number>();


  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router, private teamService: TeamService, private userService: UserService, private projectService: ProjectService) {}


  ngOnInit(): void {
    console.log("TEAMS INIT")
    if (this.admin === false) {
      this.fetchTeamsByUserId();
    }
    else {
      this.fetchAllTeams();
    }
  }


  // fetchTeamsByCompanyId(): void {
  //   this.teamService.getTeamsByCompanyId(this.companyId).subscribe(
  //     (teams: Team[]) => {
  //       this.teams = teams;
  //       //console.log("LOGGING TEAMS: ");
  //       //console.log(teams);
  //     },
  //     (error: any) => {
  //       console.error('Error fetching teams from company:', error);
  //     }
  //   );
  // }

  fetchTeamsByUserId(): void {
    this.userService.getTeamsByUserId(this.userId).subscribe(
      (teams: Team[]) => {
        this.teams = teams;
        for (let team of teams) {
          console.log("LOOP");
          let count = 0;
          this.fetchProjectsByTeamId(team.id).subscribe((projects: Project[]) => {
            count = projects.length;
            this.numberOfProjectsMap.set(team.id, count);
            console.log("UPDATED MAPPING");
          });
        }
        console.log("PROJECTS MAP");
        console.log(this.numberOfProjectsMap);
      },
      (error: any) => {
        console.error('Error fetching teams from company:', error);
      }
    );
  }

  fetchAllTeams(): void {
    this.teamService.getAllTeams().subscribe(
      (teams: Team[]) => {
        this.teams = teams;
        for (let team of teams) {
          console.log("LOOP");
          let count = 0;
          this.fetchProjectsByTeamId(team.id).subscribe((projects: Project[]) => {
            count = projects.length;
            this.numberOfProjectsMap.set(team.id, count);
            console.log("UPDATED MAPPING");
          });
        }
        console.log("PROJECTS MAP");
        console.log(this.numberOfProjectsMap);
      },
      (error: any) => {
        console.error('Error fetching all teams:', error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  fetchProjectsByTeamId(teamId: number): Observable<Project[]> {
    return this.projectService.getProjectsByTeamId(teamId);
  }
      

}
