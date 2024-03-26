import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://your-backend-url/api/companies';

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
