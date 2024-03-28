import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();
  private selectedCompanyId = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:8080/users/login', credentials).pipe(
      tap(user => this.currentUserSubject.next(user))
    );
  }

  setSelectedCompanyId(companyId: number): void {
    this.selectedCompanyId.next(companyId);
  }

  getSelectedCompanyId(): Observable<number | null> {
    return this.selectedCompanyId.asObservable();
  }

  getCurrentUserId(): number | null {
    return this.currentUserSubject.value?.id || null;
  }


  logout(): void {
    this.currentUserSubject.next(null);
    this.selectedCompanyId.next(null);
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.admin || false;
  }


}
