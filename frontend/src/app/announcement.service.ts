import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from './announcement.model';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  constructor(private http: HttpClient) { }

  // On the backend, this is handled by the Company controller, FYI
  getAnnouncementsByCompanyId(companyId: number): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`http://localhost:8080/company/${companyId}/announcements`);
    }

  createAnnouncement(companyId: number, username: string, title: string, description: string){
    this.http.post<any>(`http://localhost:8080/announcements/${companyId}/${username}/${title}/${description}`, null).subscribe(
      (data) => {
        console.log(data); 
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }
}
