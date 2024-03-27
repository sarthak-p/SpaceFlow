import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:8080/company';
  
  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}/list-for-user`); // Adjust the endpoint as needed
  }

  getCompanyDetails(companyId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${companyId}`);
  }
}
