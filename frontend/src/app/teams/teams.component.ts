import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../team.model';
import { AuthService } from '../auth.service';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  companyId?: number;
  admin: boolean = false; 
  numberOfProjectsMap: Map<number, number> = new Map();

  constructor(
    private authService: AuthService,
    private router: Router,
    private teamService: TeamService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    console.log("TEAMS INIT")
    this.determineUserRoleAndFetchTeams();
  }

  determineUserRoleAndFetchTeams(): void {
    this.authService.getSelectedCompanyId().subscribe(companyId => {
       this.companyId = companyId !== null ? companyId : undefined;
      this.admin = this.authService.isAdmin(); 
      
      if (!this.admin) {
        this.fetchTeamsByCompanyId();
      } else {
        this.fetchAllTeams();
      }
    });
  }

  fetchTeamsByCompanyId(): void {
    if (!this.companyId) return;

    this.teamService.getTeamsByCompanyId(this.companyId).subscribe(
      teams => {
        this.teams = teams;
        this.teams.forEach(team => this.fetchAndSetNumberOfProjectsForTeam(team.id));
      },
      error => console.error('Error fetching teams:', error)
    );
  }

  fetchAllTeams(): void {
    this.teamService.getAllTeams().subscribe(
      teams => {
        this.teams = teams;
        this.teams.forEach(team => this.fetchAndSetNumberOfProjectsForTeam(team.id));
      },
      error => console.error('Error fetching all teams:', error)
    );
  }

  fetchAndSetNumberOfProjectsForTeam(teamId: number): void {
    this.projectService.getProjectsByTeamId(teamId).subscribe(
      projects => {
        this.numberOfProjectsMap.set(teamId, projects.length);
      },
      error => console.error(`Error fetching projects for team ${teamId}:`, error)
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
