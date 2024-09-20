import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BodyComponent } from "../../shared/components/body/body.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, BodyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
