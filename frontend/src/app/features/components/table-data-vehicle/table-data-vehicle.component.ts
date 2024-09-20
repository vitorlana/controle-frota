import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-table-data-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule, AccordionModule, BadgeModule, CheckboxModule, InputTextModule],
  templateUrl: './table-data-vehicle.component.html',
  styleUrl: './table-data-vehicle.component.css'
})
export class TableDataVehicleComponent {
  selectedBrand_1: string[] = [];


}
