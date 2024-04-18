import { Component } from '@angular/core';
import { TableroComponent } from '../../../Components/game/tablero/tablero.component';

import { delay } from 'rxjs';
import { NotificationService } from '../../../Services/WS/notification.service';
import { TableroRivalComponent } from '../../../Components/game/tablero-rival/tablero-rival.component';


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
        private readonly notificationService: NotificationService
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

    inicializarTablero() {
        this.tablero = Array.from({ length: 8 }, () => Array(15).fill(0));
        this.tablero_rival = Array.from({ length: 8 }, () => Array(15).fill(0));
    }
}
