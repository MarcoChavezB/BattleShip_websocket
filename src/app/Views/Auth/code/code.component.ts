import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserLoginCode} from "@models/User";
import {UserService} from "@services/UserServices/user.service";
import {AuthService} from "@services/AuthService/auth.service";
import {Router} from "@angular/router";
import {LoaderTypeOneComponent} from "@components/Loaders/loader-type-one/loader-type-one.component";


@Component({
  selector: 'app-code',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoaderTypeOneComponent,
],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css'
})
export class CodeComponent {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  submitting = false;
  
  @Input() email: string = '';
  @Input() password: string = '';
  

  ngOnInit(){
    if(this.email === '' || this.password === ''){
    }
  }
  codeForm = new FormGroup({
    code: new FormControl('', [Validators.required])
  });

  
  verifyCode(){
    this.submitting = true;
    const user: UserLoginCode = {
      email: this.email,
      password: this.password,
      codigo: this.codeForm.value.code || ''
    }

    this.userService.login(user).subscribe(
      res => {
        this.submitting = false;
        setTimeout(() => {
          this.authService.saveTokenResponse(res.jwt, res.data)
          this.router.navigate(['/menu'])
        }, 50)
      },
      err => {
        this.submitting = false;
        if (err.error.errors){
        }else if(err.status == 401){
          console.log('Usuario o contraseña incorrectos')
        }else if(err.status == 403){
          console.log('Usuario no verificado')
        }else if (err.status == 404) {
          console.log('Usuario no encontrado')
        }else if (err.status  == 405){
          console.log(err.error.message)
        }
      }
    );
  }
  
}
