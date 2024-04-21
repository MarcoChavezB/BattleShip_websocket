import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { AlertComponent } from '@components/Alerts/alert/alert.component';
import { GameInstanceService } from '@services/GameInstance/game-instance.service';
import { delay } from 'rxjs';


@Component({
  selector: 'app-tablero-rival',
  standalone: true,
  imports: [
    CommonModule
    ],
  templateUrl: './tablero-rival.component.html',
  styleUrl: './tablero-rival.component.css'
})
export class TableroRivalComponent {
    constructor(
        private readonly gameInstance : GameInstanceService
    ) { }

    tablero: number[][] = []

    ngOnInit() {
        setTimeout(() => {}, 2000);
        this.getBoard()
    }

    getBoard(){
        this.gameInstance.getEmptyBoard().subscribe((board) => {
            this.tablero = board;
        }, (error) => {
            console.error(error);
        })
    }

    selectedCell(row: number, col: number){
        // AGREGA UN VALOR 2 A LA CELDA SELECCIONADA
        this.tablero[row][col] = 2;
    }



}
