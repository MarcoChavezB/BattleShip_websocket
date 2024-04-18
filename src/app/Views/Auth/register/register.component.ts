import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {LoaderTypeOneComponent} from "@components/Loaders/loader-type-one/loader-type-one.component";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "@services/UserServices/user.service";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        RouterLink,
        LoaderTypeOneComponent,
        NgIf
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
submitting = false;
  constructor(
    private readonly router: Router
  ) { }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit(){
    this.submitting = true;
  }
}
