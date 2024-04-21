import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameInstanceService } from '@services/GameInstance/game-instance.service';
import { delay } from 'rxjs';


@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [
    CommonModule
],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent {
    tablero: number[][] = [];

    constructor(
        private readonly gameService : GameInstanceService
    ){}

    ngOnInit(){
        this.waitForConnection()
        this.getBoard()
    }

    getBoard(){

        // SI EXISTE UN TABLERO EN LOCALSTORAGE, LO CARGAMOS
        if(localStorage.getItem('board') !== null) {
            this.tablero = JSON.parse(localStorage.getItem('board') || '[]');
            return
        }

        this.gameService.getBoard().subscribe((board) => {
            this.tablero = board;
            localStorage.setItem('board', JSON.stringify(board))
        }, (error) => {
            console.error(error);
        })
    }

    waitForConnection(){
        delay(2000)
    }
}
