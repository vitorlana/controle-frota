import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MapComponent } from "../../shared/map/map.component";
import { ListPointsOfInterestComponent } from "../../points-of-interest/components/list-points-of-interest/list-points-of-interest.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, MapComponent, ListPointsOfInterestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
