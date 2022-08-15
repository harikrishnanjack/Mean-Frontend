import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authApiUri = 'http://localhost:4001/api/user/';
  private token!: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  private userId!: any;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getStatusAuthListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  createUser(payload: Auth) {
    this.http
      .post(this.authApiUri + 'signup', payload)
      .subscribe((data: any) => {
        console.log(data, 'llllll');
        this.router.navigate(['/auth/sign-in']);
      });
  }

  loginUser(payload: Auth) {
    this.http
      .post(this.authApiUri + 'login', payload)
      .subscribe((data: any) => {
        console.log(data, 'kkkkkk');
        const token = data.token;
        this.token = token;
        if (this.token) {
          const expiresInDuration = data.expiresIn;
          console.log(expiresInDuration);
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = data.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(this.token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      });
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = '';
    this.router.navigate(['/auth/sign-in']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }
}
