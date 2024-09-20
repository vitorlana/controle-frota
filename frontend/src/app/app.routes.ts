import { HomeComponent } from './core/home/home.component';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { LoginPageComponent } from './core/login-page/login-page.component';
import { MapComponent } from './shared/map/map.component';
import { ListPointsOfInterestComponent } from './points-of-interest/components/list-points-of-interest/list-points-of-interest.component';
import { ListLicensePlatesComponent } from './license-plates/components/list-license-plates/list-license-plates.component';

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
    },
    {
        path: "map",
        title: "Map",
        component: ListPointsOfInterestComponent,
    },
    {
        path: "license-plates",
        title: "License Plates",
        component: ListLicensePlatesComponent
    
    }

];
