import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPlatesComponent } from './features/list-plates/list-plates.component';
import {MapComponent} from "./shared/components/map/map.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Button} from "primeng/button";
import {provideHttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ListPlatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    Button
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
