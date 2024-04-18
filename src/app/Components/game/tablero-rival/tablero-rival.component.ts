import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
    @Input() tablero_rival: number[][] = [];
    myTurn:boolean = false;
    ngOnInit(){
    }
    openWS(){}
    casilla_selected(fila: number, columna: number) {
        if(!this.myTurn) return;
        this.tablero_rival[fila][columna] = 2  ;
        console.log(this.tablero_rival)
        this.myTurn = false;
    }
}
