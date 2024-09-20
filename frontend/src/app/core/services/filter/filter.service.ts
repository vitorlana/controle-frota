import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterStateService {
  private selectedDateSubject = new BehaviorSubject<Date | null>(null);
  private selectedPlatesSubject = new BehaviorSubject<string[]>([]);

  selectedDate$: Observable<Date | null> = this.selectedDateSubject.asObservable();
  selectedPlates$: Observable<string[]> = this.selectedPlatesSubject.asObservable();

  setSelectedDate(date: Date | null) {
    this.selectedDateSubject.next(date);
  }

  setSelectedPlates(plates: string[]) {
    this.selectedPlatesSubject.next(plates);
  }
}