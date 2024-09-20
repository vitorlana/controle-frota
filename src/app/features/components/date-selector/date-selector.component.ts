import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { FilterStateService } from '../../../core/services/filter/filter.service';

@Component({
  selector: 'app-date-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, AccordionModule, CalendarModule, CardModule],
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent {
  selectedDate: Date | undefined;

  constructor(private filterStateService: FilterStateService) {}

  onDateSelect() {
    console.log('Selected date:', this.selectedDate);
    this.filterStateService.setSelectedDate(this.selectedDate || null);
  }

  resetDate() {
    this.selectedDate = undefined;
    this.filterStateService.setSelectedDate(null);
    console.log('Date reset');
  }
}