import { HomeComponent } from './core/home/home.component';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { LoginPageComponent } from './core/login-page/login-page.component';

export const routes: Routes = [
    
    {
        path: 'home',
        title: 'Home',
        component: HomeComponent,
    },
    {
        path: '',
        title: 'Home',
        redirectTo: 'login', 
        pathMatch: 'full'
    },
    {
        path: 'login',
        title: 'Login',
        component: LoginPageComponent,
    }

];
