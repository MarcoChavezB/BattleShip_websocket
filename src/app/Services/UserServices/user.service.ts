import { LoginResponseInterface, UserLogin, statusInterface,  } from '../../Models/User';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient
  ) { }

  login(data: UserLogin): Observable<LoginResponseInterface>{
    return this.http.post<LoginResponseInterface>(environment.loginURL, data)
  }

  logoutuser(): Observable<statusInterface>{
    return this.http.get<statusInterface>(environment.logoutURL)
  }

}
