import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { AlertComponent } from '@components/Alerts/alert/alert.component';
import { AuthService } from '@services/AuthService/auth.service';
import { EchoService } from '@services/EchoService/echo.service';
import { GameInstanceService } from '@services/GameInstance/game-instance.service';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';


@Component({
  selector: 'app-tablero-rival',
  standalone: true,
  imports: [
    CommonModule,
    ],
  templateUrl: './tablero-rival.component.html',
  styleUrl: './tablero-rival.component.css'
})
export class TableroRivalComponent {
    constructor(
        private readonly gameInstance : GameInstanceService,
        private readonly auth : AuthService,
        private alert: ToastrService,
        private echoService: EchoService
    ) { }
    turn: number = 0;
    tablero: number[][] = []

    ngOnInit() {
        this.turn = parseInt(localStorage.getItem('turn') || '0')
        setTimeout(() => {
            this.listenToChangeTurn()
        }, 2000);
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
        if(this.auth.getUserId() !== this.turn){
            this.alert.error('No es tu turno', 'Error')
            return
        }
        this.tablero[row][col] = 2;
        this.toggleTurn()
    }

    toggleTurn(){   
        this.gameInstance.toggleTurn(
            localStorage.getItem('gameId') || '',
            this.auth.getUserId()
        ).subscribe((data) => {
            console.log(data)
            localStorage.setItem('turn', data.turn)
        }, (error) => {
            console.error(error)
        })
    }

    listenToChangeTurn(){
        console.log('Listening to change turn')
        this.echoService.listenToChangeTurn((data) => {
            this.turn = data.message
            console.log("turno: ", this.turn)
            console.log("mi id: ", this.auth.getUserId())
        })
    }
}
