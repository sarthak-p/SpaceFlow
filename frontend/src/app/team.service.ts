import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from './team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'http://localhost:8080/team'; 
  constructor(private http: HttpClient) { }

  getData() {
    this.http.get<any>(this.apiUrl).subscribe(
      (data) => {
        console.log(data); 
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }

  getTeamsByCompanyId(companyId: number): Observable<Team[]> {
  return this.http.get<Team[]>(`http://localhost:8080/company/6/teams`);
  }

}