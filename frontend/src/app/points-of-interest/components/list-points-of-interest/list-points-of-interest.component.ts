// import { PointOfInterest } from './../../../shared/model/point-of-interest.model';
// import { Component } from '@angular/core';
// import { PointsOfInterestService } from '../../points-of-interest.service';
// import { expand, Observable } from 'rxjs';
// import { AsyncPipe, CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ListboxModule } from 'primeng/listbox';
// import { ButtonModule } from 'primeng/button';
// import { RatingModule } from 'primeng/rating';
// import { TableModule } from 'primeng/table';
// import { TagModule } from 'primeng/tag';
// import { ToastModule } from 'primeng/toast';
// import { MessageService } from 'primeng/api';
// import { MapComponent } from "../../../shared/map/map.component";

// @Component({
//   selector: 'app-list-points-of-interest',
//   standalone: true,
//   imports: [ListboxModule, FormsModule, AsyncPipe, TableModule, TagModule, ToastModule, RatingModule, ButtonModule, CommonModule, MapComponent],
//   templateUrl: './list-points-of-interest.component.html',
//   styleUrl: './list-points-of-interest.component.css',
//   providers: [PointsOfInterestService, MessageService]
// })
// export class ListPointsOfInterestComponent {

//   pointsOfInterest$!: Observable<PointOfInterest[]>;
//   listPointsOfInterest : PointOfInterest[] = [];
//   listSelectedPointsOfInterest!: PointOfInterest[];

//   expandedRows = {};

//   constructor(
//     private pointsOfInterestService: PointsOfInterestService, 
//     private messageService: MessageService
//   ) {}

//   ngOnInit() {
//     this.pointsOfInterest$ = this.pointsOfInterestService.getPointsOfInterest();

//     this.pointsOfInterest$.subscribe(pointsOfInterest => {
//       pointsOfInterest.forEach(pointOfInterest => {
//         this.listPointsOfInterest.push(new PointOfInterest(
//           pointOfInterest.id,
//           pointOfInterest.nome,
//           pointOfInterest.latitude,
//           pointOfInterest.longitude,
//           pointOfInterest.raio
//         ));
//       });
//     });
//   }

// }
