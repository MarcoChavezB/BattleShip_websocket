import { Component, HostListener } from '@angular/core';
import {EchoService} from "@services/EchoService/echo.service";
import {LoaderTypeOneComponent} from "@components/Loaders/loader-type-one/loader-type-one.component";
import {NgIf} from "@angular/common";
import {GameInstanceService} from "@services/GameInstance/game-instance.service";
import {RouterLink} from "@angular/router";
import {AuthService} from "@services/AuthService/auth.service";
import {Router} from "@angular/router";
import { HistoryComponent } from '@components/game/history/history.component';
import {ToastrService} from "ngx-toastr";
import {environment} from "@environments/environment";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LoaderTypeOneComponent,
    NgIf,
    HistoryComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  load1: Boolean = false;
  load2: Boolean = false;
  joiningGame: Boolean = false;
    showHistory: Boolean = false;
    userName: string = ''
  eventSource: EventSource | null = null;


  constructor(
    private authService: AuthService,
    private router: Router,
    private gameInstanceService: GameInstanceService,
    private echoService: EchoService,
    private toast: ToastrService
) {}

  ngOnInit() {
    this.userName = this.authService.getUserName()
    this.sseOpenConnection();
  }

  ngOnDestroy(){
    this.sseCloseConnection();
  }

    closeHistory(){
        this.showHistory = false;
    }

    openHistory(){
        this.showHistory = true;
    }

  startQueue() {
    this.load1 = true;
    this.gameInstanceService.startQueue().subscribe(
      data => {
      },
      err =>{

      });
  }

  joinRandomGame() {
    this.load2 = true;
    this.joiningGame = true;
    this.tryJoinRandomGame();
  }

  tryJoinRandomGame() {
    if (!this.joiningGame) {
      return;
    }
    this.gameInstanceService.joinRandomGame().subscribe(
      data => {
        console.log('Joined game:', data);
        localStorage.setItem('gameId', data.gameId);
        localStorage.setItem('turn', data.turn);
        if (!data.game_found) {
          setTimeout(() => {
            this.tryJoinRandomGame();
          }, 2500);
        }
      },
      err => {
        if (err.error.game_found == false) {
          setTimeout(() => {
            this.tryJoinRandomGame();
          }, 2500);
        }
      }
    );
  }

  logout(){
    this.authService.logout().then((res) => {
      if(res){
        this.toast.success('Sesion cerrada. Hasta pronto!', 'Success')
        this.router.navigate(['/'])
      }
    })
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.load1) {
      this.load1 = false;
      this.gameInstanceService.dequeueGame().subscribe(data => {
        console.log('Dequeued game:', data);
        localStorage.removeItem('gameId');
      });
    }else if (event.key === 'Escape' && this.load2) {
      this.load2 = false;
      this.joiningGame = false;
    }
  }

  sseOpenConnection(){
    this.eventSource = new EventSource(environment.sseURL);

    this.eventSource.addEventListener('game_found', (e) => {
      const data = JSON.parse(e.data);
      console.log('Game found:', data);
      if (this.authService.getUserId() == data.players[0] || this.authService.getUserId() == data.players[1]) {
        localStorage.setItem('gameId', data.gameId);
        localStorage.setItem('player1', data.players[0]);
        localStorage.setItem('player2', data.players[1]);
        this.load1 = false;
        this.load2 = false;
        this.router.navigate(['/mark/game']);
      }
    })
  }

  sseCloseConnection(){
    this.eventSource?.close();
  }
}
