import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/users/login';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();
  private selectedCompanyId = new BehaviorSubject<number | undefined>(undefined);

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(user => this.currentUserSubject.next(user))
    );
  }

  setSelectedCompanyId(id: number): void {
    this.selectedCompanyId.next(id);
  }

  getSelectedCompanyId(): Observable<number | undefined> {
    return this.selectedCompanyId.asObservable();
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }
}
