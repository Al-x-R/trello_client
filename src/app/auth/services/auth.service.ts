import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CurrentUserInterface } from '../types/currentUser.interface';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable()
export class AuthService {
  currentUser$ = new BehaviorSubject<CurrentUserInterface | null | undefined>(
    undefined
  );

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/user';
    return this.http.get<CurrentUserInterface>(url);
  }

  setCurrentUser(currentUser: CurrentUserInterface | null): void {
    this.currentUser$.next(currentUser);
  }

  register(registerRequest: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/register';
    return this.http.post<CurrentUserInterface>(url, registerRequest);
  }

  login(loginRequest: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login';
    return this.http.post<CurrentUserInterface>(url, loginRequest);
  }

  setToken(currentUser: CurrentUserInterface): void {
    localStorage.setItem('token', currentUser.token);
  }
}
