import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-date-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, AccordionModule, CalendarModule, CardModule],
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent {
  selectedDate: Date | undefined;

  onDateSelect() {
    console.log('Selected date:', this.selectedDate);
    // Aqui você pode adicionar a lógica para fazer a requisição HTTP com a data selecionada
  }
}