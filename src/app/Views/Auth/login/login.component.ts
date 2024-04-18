import { UserLogin } from './../../../Models/User';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { UserService } from '../../../Services/UserServices/user.service';
import {CodeComponent} from "../code/code.component";
import {LoaderTypeOneComponent} from "@components/Loaders/loader-type-one/loader-type-one.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    CodeComponent,
    LoaderTypeOneComponent
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    submitting = false;
    verifyCodeView = false;
    email = ''
    password = ''

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  onSubmit(){
    this.submitting = true;
    const form: UserLogin = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || ''
    }

    this.userService.login(form).subscribe(
      data => {
        this.email = form.email
        this.password = form.password
        this.submitting = false;
        this.verifyCodeView = true;
        console.log('Usuario logueado')
        console.log(data)
        this.router.navigate(['/menu'])
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
        }
      }
    )
  }
}
