import { Component } from '@angular/core';
import { TableroComponent } from '../../../Components/game/tablero/tablero.component';

import { delay } from 'rxjs';
import { NotificationService } from '../../../Services/WS/notification.service';
import { TableroRivalComponent } from '../../../Components/game/tablero-rival/tablero-rival.component';
import { Router } from '@angular/router';
import { GameInstanceService } from '@services/GameInstance/game-instance.service';


@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [
        TableroComponent,
        TableroRivalComponent
    ],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})
export class JuegoComponent {
    constructor(
        private readonly notificationService: NotificationService,
        private router: Router,
        private gameService: GameInstanceService
    ) { }

    ngOnInit(){
        this.inicializarTablero();
        this.listenToNotify();
    }

    listenToNotify(){
        this.notificationService.lsitenToEvent((eventData) => {
      });
    }

    tablero: number[][] = []
    tablero_rival: number[][] = []

    disparos: number[][] = [] 
    barcos: number[][] = [] 

    inicializarTablero() {
        this.tablero = Array.from({ length: 8 }, () => Array(15).fill(0));
        this.tablero_rival = Array.from({ length: 8 }, () => Array(15).fill(0));
    }

    leaveConfirm(){
        if(confirm("¿Estás seguro que deseas abandonar la partida?")){
            this.gameService.endGame(localStorage.getItem('gameId') || '').subscribe(data => {console.log(data)}, err => {console.log(err)})
            this.leaveGame()
        }
    }

    checkBoats(tablero: number[][]) {
         console.log("donde me dispararon",tablero);
        this.disparos = tablero;
    }

    mostrarTablero(tablero: number[][]){
        console.log("mi tablero", tablero)
        this.barcos = tablero;
        console.log("Matices combinadas" ,this.actualizarMatrices(this.barcos, this.disparos))
        this.tablero = this.actualizarMatrices(this.barcos, this.disparos)
    }

actualizarMatrices(matriz1: number[][], matriz2: number[][]): number[][] {
  if (matriz1.length !== matriz2.length || matriz1[0].length !== matriz2[0].length) {
    throw new Error('Las matrices deben tener la misma longitud');
  }

  for (let i = 0; i < matriz1.length; i++) {
    for (let j = 0; j < matriz1[0].length; j++) {
      if (matriz1[i][j] === 0 && matriz2[i][j] === 2) {
        matriz1[i][j] = 2;
      } else if (matriz1[i][j] === 1 && matriz2[i][j] === 2) {
        matriz1[i][j] = 3;
        this.sendNotify();
      }
    }
  }
  return matriz1;
}

sendNotify(){
    this.gameService.sendAlert().subscribe(data => {})
}


    leaveGame(){
        localStorage.removeItem('gameId');
        localStorage.removeItem('player1');
        localStorage.removeItem('player2');
        localStorage.removeItem('tablero');
        this.router.navigate(['/menu']);
    }



}
