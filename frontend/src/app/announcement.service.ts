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
}
