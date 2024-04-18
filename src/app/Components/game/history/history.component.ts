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
    
    history: Game[] = [];
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
        this.history = data.games.map(game => {
          const parsedCreatedAt = new Date(game.created_at);
          const formattedCreatedAt = parsedCreatedAt.toISOString().split('T')[0];
          return { ...game, created_at: formattedCreatedAt };
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
