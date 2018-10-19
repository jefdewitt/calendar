import { CalendarService } from './services/calendar.service';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private calendarService: CalendarService, private elementRef: ElementRef) { }

  selector: any;
  dateFromCal: string;
  minutesFromCal: string;
  hoursSelected: boolean;
  options: Array<any>;
  public todayDate: Date = new Date();
  public curMonth: number = this.todayDate.getMonth() + 1;
  public curYear: number = this.todayDate.getFullYear();
  public weekdays: Array<any> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public twelveMonths: any = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
   'August', 'September', 'October', 'November', 'December'];
  public lastDayOfMonths = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  public monthString = this.twelveMonths[this.curMonth - 1];
  public newMonthDate = new Date(this.curYear, this.curMonth - 1, 1);
  public monthToDisplay; 
  public weekdayThatMonthStartsOn;
  public day;
  public weeks: Array<any> = [];
  public tableRows: Array<any> = [];
  public month: Array<any> = [];
  public displayMonth;
  public displayYear;
  public formattedMonth;
  public scanForToday = (this.curYear === this.todayDate.getFullYear() && this.curMonth === this.todayDate.getMonth() + 1 ) ?
          this.todayDate.getDate() : 0;
  public count = 0;

  ngOnInit() {
    this.determineWeekdayThatMonthStartsOn();
    this.monthAndYearOnDisplay(); 
    this.buildCal();
  }

  public determineWeekdayThatMonthStartsOn(year = this.curYear, month = this.curMonth) {
    let newMonthDate = new Date(year, month - 1, 1);
    this.weekdayThatMonthStartsOn = newMonthDate.getDay() + 1;
  }
 
  public setTheMonth(index) {
    this.formattedMonth = (this.curMonth < 10) ? '0' + (this.curMonth - index) : this.curMonth - index;
  }

  public monthAndYearOnDisplay(yearIndex = 0, monthIndex = 1) {
    this.displayMonth = this.twelveMonths[this.curMonth - monthIndex];
    this.displayYear = this.curYear - yearIndex;
  }

  public calcDaysInFeb() {
    return this.lastDayOfMonths[1] =
    ( ( (this.newMonthDate.getFullYear() % 100 !== 0)
    && (this.newMonthDate.getFullYear() % 4 === 0) )
    || (this.newMonthDate.getFullYear() % 400 === 0) ) ? 29 : 28;
  }

  public checkForToday(day) {
    if (day === this.scanForToday) {
      return 'today';
    } else {
      return 'days';
    }
  }

  // If the date is under 10 then add a 0 for proper date formatting
  public formatDayValues(day) {
    if (day > 0 && day < 10) {
      day = '0' + day;
    } else if (day < 1) {
      day = '00'
    }
    return day;
  }

  public buildCal(monthIndex = 1) {
    try {
      this.calcDaysInFeb();
      this.monthToDisplay = this.curMonth - monthIndex;
      this.weeks = [];
      for (let i = 1; i <= 42; i++) {

          this.day = ( (i - this.weekdayThatMonthStartsOn >= 0) && ( i - this.weekdayThatMonthStartsOn < this.lastDayOfMonths[this.monthToDisplay]) ) ? i - this.weekdayThatMonthStartsOn + 1 : '';

          // We push seven items at a time.
          this.weeks.push(this.day)

          // If the index is divisible by 7 then it's a week and we add another
          // week array to the month. Then, we clear out our weeks array.
          if ( ( i % 7 === 0 ) && ( i < 36 ) ) {
            this.tableRows.push(i);
            this.month.push(this.weeks);
            this.weeks = [];
          }
        }
    }
    catch(error) {
      console.log('Unable to build calendar ' + error.message);
    }
  }

  public prevMonth() {
    this.count++;
    this.month = [];
    this.tableRows = [];
    this.determineWeekdayThatMonthStartsOn(this.curYear, this.curMonth - this.count);
    this.monthAndYearOnDisplay(0, this.count); 
    this.buildCal(this.count);
    this.count = 0;
  }

  public nextMonth() {
    this.count--;
    this.month = [];
    this.tableRows = [];
    this.determineWeekdayThatMonthStartsOn(this.curYear, this.curMonth - this.count);
    this.monthAndYearOnDisplay(0, this.count); 
    this.buildCal(this.count);
    this.count = 0;
  }

    /**
     *
     * @param twelveMonths
     * @param curYear
     *
     * Provide an array of months and the current year to populate the 
     * calendar dropdown menu.
     */
  
    populateCalendarDropdown(twelveMonths, curYear) {
      // try {
      //   this.options = [];
      //   for (let i=0; i<12; i++) {//display option for 12 months of the year
      //     let opt = twelveMonths[i];
      //     this.options.push(opt);
      //   }
      //   return this.options;
      // }
      // catch(error) {
      //   console.log('Unable to populate calendar dropdown ' + error.message);
      // }
    }
  
    resetCheckboxes() {
      // let minuteCheckbox = <HTMLInputElement> document.getElementById("minutes");
      // let hourCheckbox = <HTMLInputElement> document.getElementById("hours");
      // minuteCheckbox.checked = true;
      // minuteCheckbox.checked = false;
    }
  
    // Rebuild calendar when a new month is selected from the dropdown
    updateCalendarMonth($event) {
      // try {
      //   var theMonth = parseInt($event.target.selectedIndex) + 1;
      //   var updatedMonth=this.buildCal(this.todayDate, theMonth, this.curYear, this.twelveMonths);
      //   document.getElementById("calendar").innerHTML = updatedMonth;
      //   this.addDateSpan();
      //   this.resetCheckboxes();
      // }
      // catch(error) {
      //   console.log('Unable to update calendar month ' + error.message);
      // }
    }
  
    // Add a span that contains the time completed for the date displayed
    addDateSpan() {
    //   try {
    //     let calendarMenu = <HTMLInputElement> document.getElementById("calendar-menu");
    //     if (calendarMenu) {
    //       const main = document.querySelector('.main:last-of-type');
    //       var selectedTrack = this.goalTrackService.findSelectedTrack();
  
    //       for (let i=0; i<selectedTrack['dates'].length; i++) {
  
    //           var recordedDate = selectedTrack['dates'][i].recordedDate;
    //           var recordedMinutes = selectedTrack['dates'][i].recordedMinutes;
    //           var dataCell = document.getElementById(recordedDate);
  
    //           if( dataCell ){
    //               var para = document.createElement("span");
    //               para.classList.add('timeStamp-' + recordedDate);
    //               var node = document.createTextNode(recordedMinutes);
    //               para.appendChild(node);
    //               dataCell.appendChild(para);
    //           }
    //         }
    //       }
    //     }
    //     catch(error) {
    //       console.log('Unable to add span to calendar cells ' + error.message);
    //     }
    }

}
