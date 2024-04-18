import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../../environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameInstanceService {

  constructor(
    private http: HttpClient
  ) {
  }

  startQueue(): Observable<any> {
    return this.http.post<any>(environment.queueGameURL, {player1_id: 1});
  }

  joinRandomGame(): Observable<any> {
    return this.http.put<any>(environment.joinRandomGameURL, {player2_id: 2});
  }

  endGame(): Observable<any> {
    return this.http.put<any>(environment.endGameURL, {});
  }

  dequeueGame(): Observable<any> {
    return this.http.post<any>(environment.dequeueGameURL, {gameId: localStorage.getItem('gameId')});
  }

  cancelRandomQueue(): Observable<any> {
    return this.http.post<any>(environment.cancelRandomQueueURL, {player_id: 2});
  }

}
