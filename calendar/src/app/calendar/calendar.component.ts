import { CalendarService } from './../services/calendar.service';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private calendarService: CalendarService, private elementRef: ElementRef, private renderer: Renderer2) { }

  public calendar = this.elementRef.nativeElement.classList.contains();
  // public jsCal = this.renderer.
  todayDate: Date = new Date();
  // Calculate correct month on 0-based numbering
  curMonth: number = this.todayDate.getMonth() + 1;
  curYear: number = this.todayDate.getFullYear();
  twelveMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  ngOnInit() {
    console.log('inside OnInit');
    this.addCalToPage();
  }

  public addCalToPage() {
    console.log('inside addCalToPage');
    this.calendar.innerHTML = this.calendarService.buildCal(this.todayDate, this.curMonth, this.curYear, this.twelveMonths);
    this.calendarService.populateCalendarDropdown(this.twelveMonths, this.curYear);
  }

}
