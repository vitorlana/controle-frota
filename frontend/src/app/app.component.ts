import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { ListLicensePlatesComponent } from "./license-plates/components/list-license-plates/list-license-plates.component";
import { BrowserModule } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import {StyleClassModule} from 'primeng/styleclass';
import { BodyComponent } from './shared/components/body/body.component';
import { HomeComponent } from './core/home/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ListLicensePlatesComponent,
    RouterLink, 
    RouterOutlet,
    StyleClassModule,
    HomeComponent,],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this.primengConfig.zIndex = {
          modal: 1100,    // dialog, sidebar
          overlay: 1000,  // dropdown, overlaypanel
          menu: 1000,     // overlay menus
          tooltip: 1100   // tooltip
      };

      this.primengConfig.filterMatchModeOptions = {
        text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
        numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
        date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
    };
  }
}