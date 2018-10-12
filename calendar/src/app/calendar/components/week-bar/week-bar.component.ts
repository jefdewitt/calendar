import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatepickerService } from '../../../shared/datepicker/services/datepicker.service';
import { ICalendarDay } from '../../../shared/datepicker/interfaces';
import { EventClickType } from '@cdux/ng-common';
import { EventTrackingService } from '../../../shared/event-tracking/services/event-tracking.service';

@Component({
    selector: 'cdux-week-bar',
    templateUrl: './week-bar.component.html',
    styleUrls: ['./week-bar.component.scss']
})
export class WeekBarComponent {
    @Output() weekChange: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() dayChange: EventEmitter<Date> = new EventEmitter<Date>();

    @Input() selectedDate: Date;
    @Input() weekCalendar: ICalendarDay[];

    constructor(private _datePickerService: DatepickerService,
                private _eventService: EventTrackingService) {}

    public selectDate(day: ICalendarDay): void {
        this.logEvent(EventClickType.CALENDAR_WEEK_DATE_SELECTION);
        this.dayChange.emit(new Date(day.year, day.month, day.day));
    }

    public getDayName(day: ICalendarDay) {
        return this._datePickerService.getDayName(day);
    }

    public updateWeek(nextWeek: boolean): void {
        this.logEvent(nextWeek ? EventClickType.CALENDAR_NEXT_WEEK : EventClickType.CALENDAR_PREVIOUS_WEEK);
        const calendarDay = nextWeek ? this.weekCalendar[this.weekCalendar.length - 1] : this.weekCalendar[0];
        const offset = nextWeek ? 1 :  -1;
        const day = new Date(calendarDay.year, calendarDay.month, calendarDay.day);
        day.setDate(day.getDate() + offset);
        this.weekChange.emit(day);
    }

    public isSelectedDate(day: ICalendarDay): boolean {
        return day.day === this.selectedDate.getDate()
            && day.month === this.selectedDate.getMonth()
            && day.year === this.selectedDate.getFullYear();
    }

    public logEvent(event: EventClickType) {
        this._eventService.logClickEvent(event);
    }
}
