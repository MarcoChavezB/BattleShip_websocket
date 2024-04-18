import { UserLogin } from './../../../Models/User';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { UserService } from '../../../Services/UserServices/user.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    submitting = false;

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
        console.log(data)
        this.router.navigate(['/menu'])
      }
    )
  }
}
