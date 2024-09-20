import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ListboxModule } from 'primeng/listbox';
import { Observable } from 'rxjs';
import { LicensePlate } from '../../../shared/model/license-plate.model';
import { LicensePlatesService } from '../../../license-plates/license-plates.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-plate-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, AccordionModule, ListboxModule, CardModule],
  templateUrl: './plate-selector.component.html',
  styleUrls: ['./plate-selector.component.css']
})
export class PlateSelectorComponent implements OnInit {
  licensePlates$!: Observable<string[]>;
  filteredPlates: LicensePlate[] = [];
  selectedPlates: LicensePlate[] = [];

  constructor(private licensePlatesService: LicensePlatesService) {}

  ngOnInit() {
    this.loadPlates();
  }

  loadPlates() {
    this.licensePlates$ = this.licensePlatesService.getLicensePlates();

    this.licensePlates$.subscribe(licensePlates => {
      this.filteredPlates = licensePlates.map(plate => new LicensePlate(plate));
    });
  }

  onPlateSelect(event: any) {
    console.log('Selected plates:', this.selectedPlates);
    // Here you can add any additional logic needed when plates are selected
  }
}