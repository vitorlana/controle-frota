import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { LicensePlate } from '../../../shared/model/license-plate.model';
import { LicensePlatesService } from '../../license-plates.service';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list-license-plates',
  standalone: true,
  imports: [ListboxModule, FormsModule, AsyncPipe],
  templateUrl: './list-license-plates.component.html',
  styleUrl: './list-license-plates.component.css'
})

export class ListLicensePlatesComponent {

  licensePlates$!: Observable<String[]>;
  listLicensePlates : LicensePlate[] = [];
  selectedLicensePlates!: LicensePlate[];

  constructor(private licensePlatesService: LicensePlatesService) {}

  ngOnInit() {
    this.licensePlates$ = this.licensePlatesService.getLicensePlates();

    this.licensePlates$.subscribe(licensePlates => {
      licensePlates.forEach(licensePlate => {
        this.listLicensePlates.push(new LicensePlate(licensePlate));
      });
    });
  }


}
