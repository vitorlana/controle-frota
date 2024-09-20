import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-details-poi',
  standalone: true,
  imports: [CommonModule, FormsModule, AccordionModule, BadgeModule, CheckboxModule, InputTextModule],
  templateUrl: './details-poi.component.html',
  styleUrl: './details-poi.component.css'
})
export class DetailsPoiComponent {
  selectedBrand_1: string[] = [];
}
