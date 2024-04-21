import { Component, HostListener } from '@angular/core';
import { TableroComponent } from '@components/game/tablero/tablero.component';
import { NotificationService } from '@services/WS/notification.service';
import { TableroRivalComponent } from '@components/game/tablero-rival/tablero-rival.component';
import { Router } from '@angular/router';
import { GameInstanceService } from '@services/GameInstance/game-instance.service';
import { AuthService } from '@services/AuthService/auth.service';
import { ToastrService } from 'ngx-toastr';


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
        private router: Router,
        private gameService: GameInstanceService,
        private auth: AuthService,
    ) { }

    ngOnInit(){
    }

   leaveConfirm(){
        if(confirm("¿Estás seguro que deseas abandonar la partida?")){
            this.gameService.endGame(this.auth.getUserId().toString(), localStorage.getItem('gameId') || '').subscribe(data => {
            }, err => {console.log(err)})
            this.leaveGame()
        }
    } 
    leaveGame(){
        localStorage.removeItem('gameId');
        localStorage.removeItem('player1');
        localStorage.removeItem('player2');
        localStorage.removeItem('tablero');
        localStorage.removeItem('turn');
        this.router.navigate(['/menu']);
    }
}
