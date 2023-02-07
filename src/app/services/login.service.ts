import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserPayload } from '../models/user.model';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) { }

  login(userPayload: UserPayload): Observable<{user: User, token: string}> {
    return this.http.post<{user: User, token: string}>('http://localhost:8080/User/login', userPayload);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
