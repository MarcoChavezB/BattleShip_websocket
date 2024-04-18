import { Component, HostListener } from '@angular/core';
import {EchoService} from "@services/EchoService/echo.service";
import {LoaderTypeOneComponent} from "@components/Loaders/loader-type-one/loader-type-one.component";
import {NgIf} from "@angular/common";
import {GameInstanceService} from "@services/GameInstance/game-instance.service";
import {RouterLink} from "@angular/router";
import {AuthService} from "@services/AuthService/auth.service";
import {Router} from "@angular/router";
import { HistoryComponent } from '@components/game/history/history.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LoaderTypeOneComponent,
    NgIf,
    RouterLink,
    HistoryComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  load1: Boolean = false;
  load2: Boolean = false;
 showHistory: Boolean = false;
  joiningGame: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private gameInstanceService: GameInstanceService,
    private echoService: EchoService) {}

  ngOnInit() {
    this.echoService.listentest( (data) => {
      console.log("AAAAAAAAAAAA", data);
    });
    console.log('Listening to test-channel');

    this.echoService.testEndpoint().subscribe((data) => {
      console.log('Data from testEndpoint:', data);
    });
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
        localStorage.setItem('gameId', data.gameId);
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
}
