import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
    @Input() tablero: number[][] = [];
    myTurn = true;

    constructor(
    ) { }

    ngOnInit(){
        if(localStorage.getItem('tablero') === null){
            this.initGame()
            return
        }
        this.tablero = JSON.parse(localStorage.getItem('tablero') || '{}')
    }
    checkBoats(){
        let boats = 0;
        this.tablero.forEach(fila => {
            fila.forEach(casilla => {
                if (casilla === 1) boats++;
            });
        });
        return boats;
    }

    initGame(){
        localStorage.removeItem('tablero')
        for (let i = 0; i < 15; i++) {
            let fila = Math.floor(Math.random() * 8);
            let columna = Math.floor(Math.random() * 15);
            this.tablero[fila][columna] = 1;
        }
        localStorage.setItem('tablero', JSON.stringify(this.tablero));
        console.log(localStorage.getItem('tablero'))
    }
}
