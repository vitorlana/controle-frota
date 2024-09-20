import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { BadgeModule } from 'primeng/badge';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { DateSelectorComponent } from "../../../features/components/date-selector/date-selector.component";
import { DetailsPoiComponent } from "../../../features/components/details-poi/details-poi.component";
import { MapPositionsComponent } from "../../../features/components/map-positions/map-positions.component";
import { TableDataVehicleComponent } from "../../../features/components/table-data-vehicle/table-data-vehicle.component";
import { PlateSelectorComponent } from "../../../features/components/plate-selector/plate-selector.component";
import { SomeComponent } from '../teste.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule,
    BadgeModule,
    CheckboxModule,
    DividerModule,
    GalleriaModule,
    InputNumberModule,
    InputTextModule,
    SliderModule,
    DateSelectorComponent,
    DetailsPoiComponent,
    MapPositionsComponent,
    TableDataVehicleComponent,
    PlateSelectorComponent,
    SomeComponent
]
})
export class BodyComponent {
  selectedBrand_1: string[] = [];
  rangeValues: number[] = [10, 10000];
  selectedColors: string[] = [];
  selectedSizes1: string[] = [];

  sizes = [
    { page: [{ value: 'XS' }, { value: 'S' }, { value: 'M' }, { value: 'L' }, { value: 'XL' }] },
    { page: [{ value: 'XXL' }, { value: '3XL' }, { value: '4XL' }] }
  ];

  onSizesChange(event: any): void {
    // Handle the change event if needed
    console.log('Sizes changed:', event);
  }

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor() { }

  ngOnInit() {
    // Initialize component
  }
}