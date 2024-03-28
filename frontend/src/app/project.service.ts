import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjectsByTeamId(teamId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`http://localhost:8080/team/${teamId}/projects`);
  }

  createProject(teamId: number, project: Project){
    this.http.post<any>(`http://localhost:8080/projects/${teamId}`, project).subscribe(
      (data) => {
        console.log(data); 
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }

  editProject(projId: number, project: Project){
    this.http.patch<any>(`http://localhost:8080/projects/${projId}`, project).subscribe(
      (data) => {
        console.log(data); 
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }

  // getProject(projId: number): Observable<Project[]>{
  //   return this.http.get<any>(`http://localhost:8080/projects/${projId}`);
  // }

}
