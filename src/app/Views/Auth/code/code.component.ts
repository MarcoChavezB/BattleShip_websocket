import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeComponent {
  constructor(
  ) { }

  code = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: ""
  };
  hasError: boolean = false;
  diableButtonEmail: boolean = false;
  success: boolean = false;
  disabledSumbitButton: boolean = false;
  codigo: string = "";
  loadingResend: boolean = false
  loadingVerify: boolean = false

  
  @ViewChild('code1') code1: ElementRef | undefined;
  @ViewChild('code2') code2: ElementRef | undefined;
  @ViewChild('code3') code3: ElementRef | undefined;
  @ViewChild('code4') code4: ElementRef | undefined;
  @ViewChild('code5') code5: ElementRef | undefined;
  @ViewChild('code6') code6: ElementRef | undefined;

  
  @Input() email: string = '';
  @Input() password: string = '';
  

  ngOnInit(){
    if(this.email === '' || this.password === ''){
  
    }
  }

  message: string = 'Usuario no existe';
  mostrarAlerta: boolean = false;

  resetInputs(){
    this.code = {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: ""
    }
  }
}
