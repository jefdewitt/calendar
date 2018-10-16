import { CalendarService } from './../services/calendar.service';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private calendarService: CalendarService, private elementRef: ElementRef) { }

  public weekdays = this.calendarService.weekdays;

  ngOnInit() {
    // this.addCalToPage();
  }

  public addCalToPage() {
    const cal = this.elementRef.nativeElement.querySelector('.calendar');
    cal.innerHTML = this.calendarService.buildCal();
    // this.calendarService.populateCalendarDropdown(this.twelveMonths, this.curYear);
  }

}
