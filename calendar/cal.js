
var todayDate = new Date();
var curMonth = todayDate.getMonth() + 1;
var curYear = todayDate.getFullYear();
var twelveMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
   'August', 'September', 'October', 'November', 'December'];
  monthString = twelveMonths[curMonth - 1];

function addCalToPage() {
  console.log('todayDate.getFullYear()', todayDate.getFullYear());
  const cal = document.querySelector('.calendar');
  cal.innerHTML = buildCal();
  // this.calendarService.populateCalendarDropdown(this.twelveMonths, this.curYear);
}

//   selector: any;
//   dateFromCal: string;
//   minutesFromCal: string;
//   hoursSelected: boolean;
//   options: Array<any>;



  // function addCalToPage() {
    // try {
      // buildCal();
    //   const calendar = <HTMLInputElement> document.getElementById('calendar');
    //   // Builds calendar & populates option elements
    //   calendar.innerHTML = this.buildCal(this.todayDate, this.curMonth, this.curYear, this.twelveMonths);
    //   this.populateCalendarDropdown(this.twelveMonths, this.curYear);
    //   this.addDateSpan();
    // }
    // catch(error) {
    //   console.log('Unable to add calendar to the page ' + error.message);
    // }
  // }

  /**
   *
   * @param todayDate
   * @param month
   * @param year
   * @param twelveMonths
   *
   * @todo Replace abbreviated vars with more descriptive names
   *
   * Builds a honkin' calendar, complete with a dropdown menu for the months (built
   * farther down below), month name and year as the calendar title, and weekday
   * initials shown atop the 7 columns of the calendar.
   */

   function buildCal() {
    try {
      var lastDayOfMonths = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      var firstDayOfYear = new Date(curYear, curMonth - 1, 1);
      var dayOne = firstDayOfYear.getDay() + 1;
      var scanForToday =
        (curYear === todayDate.getFullYear() && curMonth === todayDate.getMonth() + 1 ) ? todayDate.getDate() : 0 ;

      // Find the number of days for February
      lastDayOfMonths[1] =
        ( ( (firstDayOfYear.getFullYear() % 100 !== 0)
        && (firstDayOfYear.getFullYear() % 4 === 0) )
        || (firstDayOfYear.getFullYear() % 400 === 0) ) ? 29 : 28;

      let table =
        '<div class="main"><table class="" cols="7"' +
        'cellpadding="0" border="0" cellspacing="0"><tr align="center">' +
        '<td colspan="7" align="center" class="">' + twelveMonths[curMonth - 1] +
        ' - ' + curYear + '</td></tr><tr align="center">';

      let daysOfWeek;
      for (daysOfWeek = 0; daysOfWeek < 7; daysOfWeek++) {
        table += '<td class="">' + 'SMTWTFS'.substr(daysOfWeek, 1) + '</td>';
      }

      table += '</tr><tr align="center">';

      for (let i = 1; i <= 42; i++) {

          let x = ( (i - dayOne >= 0) && ( i - dayOne < lastDayOfMonths[curMonth - 1]) ) ? i - dayOne + 1 : '&nbsp;';

          if (x === scanForToday) {
            x = '<span class="today">' + x + '</span>';
          }

          let displayMonth = curMonth;
          if (displayMonth < 10) {
            displayMonth = '0' + displayMonth;
          }

          let displayDay = ( (i - dayOne >= 0) && (i - dayOne < lastDayOfMonths[curMonth - 1]) ) ? i - dayOne + 1 : '&nbsp;';
          if (displayDay < 10) {
            displayDay = '0' + displayDay;
          }

          table += '<td id="' + curYear + '-' + displayMonth + '-' + displayDay + '" class="days">' + x + '</td>';
          if ( ((i) % 7 === 0) && (i < 36) ) {
            table += '</tr><tr align="center">';
          }
      }
      return table += '</tr></table></div>';
    }
    catch(error) {
      console.log('Unable to build calendar ' + error.message);
    }
  }

  /**
   *
   * @param twelveMonths
   * @param curYear
   *
   * Provide an array of months and the current year to populate the 
   * calendar dropdown menu.
   */

  function populateCalendarDropdown(twelveMonths, curYear) {
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

  function resetCheckboxes() {
    // let minuteCheckbox = <HTMLInputElement> document.getElementById("minutes");
    // let hourCheckbox = <HTMLInputElement> document.getElementById("hours");
    // minuteCheckbox.checked = true;
    // minuteCheckbox.checked = false;
  }

  // Rebuild calendar when a new month is selected from the dropdown
  function updateCalendarMonth($event) {
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
  function addDateSpan() {
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

  addCalToPage();

