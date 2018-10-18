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
  public weekdays: Array<any> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
  public twelveMonths: any = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
   'August', 'September', 'October', 'November', 'December'];
  public lastDayOfMonths = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  publicmonthString = this.twelveMonths[this.curMonth - 1];
  // public weekdays = this.calen,mdarService.weekdays;
       // Find the number of days for February
  public firstDayOfMonth = new Date(this.curYear, this.curMonth - 1, 1);
  // public displayMonth = this.curMonth;
  public dayTwo = this.firstDayOfMonth.getDay() + 1;
  public day;
  public displayDays: Array<any> = [];
  public tableRows: Array<any> = [];
  public month: Array<any> = [];
  public week: Array<any> = [];
  public scanForToday = (this.curYear === this.todayDate.getFullYear() && this.curMonth === this.todayDate.getMonth() + 1 ) ?
          this.todayDate.getDate() : 0 ;

  ngOnInit() {
    this.addCalToPage();
  }

  public calcDaysInFeb() {
    return this.lastDayOfMonths[1] =
    ( ( (this.firstDayOfMonth.getFullYear() % 100 !== 0)
    && (this.firstDayOfMonth.getFullYear() % 4 === 0) )
    || (this.firstDayOfMonth.getFullYear() % 400 === 0) ) ? 29 : 28;
  }

  public addCalToPage() {
    const cal = this.elementRef.nativeElement.querySelector('.calendar');
    cal.innerHTML = this.buildCal();
    this.calcDaysInFeb();
  }

  public displayMonth: any  = (this.curMonth < 10) ? '0' + this.curMonth : this.curMonth;

  // public findDisplayDay(i) {
  //     this.displayDay = ( (i - this.dayTwo >= 0) && (i - this.dayTwo < this.lastDayOfMonths[this.curMonth - 1]) ) ? i - this.dayTwo + 1 : '&nbsp;';
  //     if (this.displayDay < 10) {
  //       this.displayDay = '0' + this.displayDay;
  //     }
  //   }
  
    public buildCal() {
      try {
        // const lastDayOfMonths = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // const firstDayOfMonth = new Date(this.curYear, this.curMonth - 1, 1);
        // const dayTwo = firstDayOfMonth.getDay() + 1;
        // const scanForToday = (this.curYear === this.todayDate.getFullYear() && this.curMonth === this.todayDate.getMonth() + 1 ) ?
        //   this.todayDate.getDate() : 0 ;
        
  
        // Find the number of days for February
        this.calcDaysInFeb();
  
        let table =
          '<div class="main"><table class="" cols="7"' +
          'cellpadding="0" border="0" cellspacing="0"><tr align="center">' +
          '<td colspan="7" align="center" class="">' + this.twelveMonths[this.curMonth - 1] +
          ' - ' + this.curYear + '</td></tr><tr align="center">';
  
        let daysOfWeek;
        for (daysOfWeek = 0; daysOfWeek < 7; daysOfWeek++) {
          table += '<td class="">' + 'SMTWTFS'.substr(daysOfWeek, 1) + '</td>';
        }
  
        table += '</tr><tr align="center">';
  
        for (let i = 1; i <= 42; i++) {
  
            this.day = ( (i - this.dayTwo >= 0) && ( i - this.dayTwo < this.lastDayOfMonths[this.curMonth - 1]) ) ? i - this.dayTwo + 1 : '&nbsp;';
            if (this.day < 10) {
              this.day = '0' + this.day;
            }
  
            if (this.day === this.scanForToday) {
              this.day = '<span class="today">' + this.day + '</span>';
            }

            this.displayDays.push(this.day)
  
            table += '<td id="' + this.curYear + '-'/* + displayMonth + '-'*/ + this.day + '" class="days">' + this.day  + '</td>';
            if ( ( i % 7 === 0 ) && ( i < 36 ) ) {
              table += '</tr><tr align="center">';
              this.tableRows.push(i);
              console.log('i', i);

              let week = [];
              week = this.displayDays;
              this.month.push(week);
              week = [];
              this.displayDays = [];

              
            }

            
          }
        console.log('this.month', this.month);
        console.log('this.tableRows', this.tableRows)
        return table += '</tr></table></div>';
      }
      catch(error) {
        console.log('Unable to build calendar ' + error.message);
      }
    }
  
  // public determineNumOfRows(i) {
  //   let count = 0;
  //   if ( ((i) % 7 === 0) && (i < 36) ) {
  //     count++;
  //     this.tableRows += count;
  //   }
  //   console.log('this.tableRows', this.tableRows)
  // }


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
