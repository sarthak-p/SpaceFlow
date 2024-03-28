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

//   getUsersByCompanyId(companyId: number): Observable<User[]> {
//     return this.http.get<User[]>(`http://localhost:8080/company/${companyId}/users`);
//   }

//   addUserToCompany(companyId: number, user: any): Observable<any> {
//   return this.http.post(`http://localhost:8080/users/${companyId}`, user);
  // }
  
  getUsersByCompanyId(companyId: number): Observable<User[]> {
  const url = `http://localhost:8080/company/${companyId}/users`;
  return this.http.get<User[]>(url);
}

addUserToCompany(companyId: number, user: any): Observable<any> {
  const url = `http://localhost:8080/users/${companyId}`;
  return this.http.post(url, user);
}


}