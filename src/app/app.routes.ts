import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './Views/Principal/home/home.component';
import { MenuComponent } from './Layouts/Principal/menu/menu.component';
import { AuthComponent } from './Layouts/Auth/auth/auth.component';
import { LoginComponent } from './Views/Auth/login/login.component';
import { CodeComponent } from './Views/Auth/code/code.component';
import { RegisterComponent } from './Views/Auth/register/register.component';
import { JuegoComponent } from './Views/Principal/juego/juego.component';


export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children:[
      {
        path: '',
        component: MenuComponent,
        children: [
          {
            path: 'menu',
            component: HomeComponent
          },
            {
                path: '',
                component: AuthComponent,
                children: [
                    {
                        path: '',
                        component: LoginComponent
                    },
                    {
                        path: 'verify-code',
                        component: CodeComponent
                    },
                    {
                        path: 'register',
                        component: RegisterComponent
                    }
                ]
            },
            {
                path: 'menu',
                component: MenuComponent,
                children: [
                    {
                        path: 'options',
                        component: HomeComponent
                    },
                    {
                        path: 'game',
                        component: JuegoComponent                        
                    }
                ]
            }
        ]
      }
    ]
  }
];
