import { Injectable } from '@angular/core';
import { UserService } from '../UserServices/user.service';
import {catchError, map, Observable, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly userservice: UserService
  ) { }

saveTokenResponse(jwt: string, user: any) {
  if (typeof window !== 'undefined') {
    const userString = JSON.stringify(user)
    localStorage.setItem('user', userString)
    localStorage.setItem('access_token', jwt)
  }
}
  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();
    if (!token) {
      return of(false);
    }
    return this.userservice.authenticate().pipe(
      map(() => true),
      catchError(() => {
        return of(false);
      })
    );
  }

getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token')
  }
  return null
  }

  resetAll(){
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  }

  logout(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (typeof window !== 'undefined') {
        this.userservice.logoutuser().subscribe(
          (res: any) => {
            if (res.status === true) {
              localStorage.removeItem('access_token');
              localStorage.removeItem('user');
              resolve(true);
            } else {
              resolve(false);
            }
          },
          error => {
            resolve(false);
          }
        );
      } else {
        resolve(false);
      }
    });
  }
}
