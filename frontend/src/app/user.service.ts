import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users'; 
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUsersByCompanyId(companyId: number): Observable<User[]> {
  return this.http.get<User[]>(`http://localhost:8080/company/${companyId}/users`);
}
}
