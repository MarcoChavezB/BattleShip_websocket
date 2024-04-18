import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HistoryResponse } from '@models/History';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(
        private readonly http: HttpClient
    ) { }

    getHistory():Observable<HistoryResponse>{
        return this.http.get<HistoryResponse>(environment.historyGames)
    }
}
