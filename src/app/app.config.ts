import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptorProvider } from '@interceptors/Auth/auth.interceptor';
import {provideToastr} from "ngx-toastr";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    provideToastr({autoDismiss:  true, timeOut: 3000}),
    authInterceptorProvider
  ]
};

