import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import {StyleClassModule} from 'primeng/styleclass';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, RippleModule, StyleClassModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
