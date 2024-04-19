import { CommonModule } from '@angular/common';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Game } from '@models/History';
import { HistoryService } from '@services/Game/history.service';


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
        CommonModule,
    ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
    constructor(
        private readonly historyService: HistoryService
    ) { }

    GamesHistory: Game[] = [];
    @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

    ngOnInit() {
        this.loadHistory();
    }

  closeModal() {
    this.close.emit(true);
  }

  loadHistory() {
    this.historyService.getHistory().subscribe(
      (data) => {
        this.GamesHistory = data.games;
      },
      err => {
        console.log(err);
      }
    );
  }
}
