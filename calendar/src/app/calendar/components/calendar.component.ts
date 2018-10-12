import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplatePortal } from '@angular/cdk/portal';

import { Subscription } from 'rxjs';

import { enumTrackType, EventClickType, ICalendarEvent, StringSlugifyPipe } from '@cdux/ng-common';

import { CalendarBusinessService } from '../services';
import { DatepickerLiteService } from '../../shared/datepicker-lite';
import { DatepickerService } from '../../shared/datepicker/services/datepicker.service';
import { ICalendarDay } from '../../shared/datepicker/interfaces';
import { ICalendarResolvedData } from '../interfaces';
import { PostTimeCalendar } from '../classes/post-time-calendar';
import { RaceDateService } from '../../shared/common/services';
import { CduxDateUtil } from '../../shared/common/utils';

@Component({
    selector: 'cdux-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
    public calendarDate: Date;
    public toteDate: Date;
    public isToteDay: boolean;
    public isPastDay: boolean;
    public isFutureDay: boolean;
    public postTimeCalendars: PostTimeCalendar[];
    public weekCalendar: ICalendarDay[];
    public trackType = enumTrackType;
    // Expose EventClickType so we can use it in the template for click events
    public eventClickType = EventClickType;
    public isDatepickerVisible = false;
    public weekRange: string;

    private dropupSub: Subscription;
    private toggleSub: Subscription;
    private toteDateSub: Subscription;

    @ViewChild('datePicker')
    public calendarRef: TemplatePortal<any>;

    constructor(
        private _calendarBusinessService: CalendarBusinessService,
        private _changeDetector: ChangeDetectorRef,
        private _datePickerService: DatepickerService,
        private _raceDateService: RaceDateService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _stringSlugify: StringSlugifyPipe,
        private datepickerLiteService: DatepickerLiteService,
    ) {}

    ngOnInit() {
        const calendarInitialData: ICalendarResolvedData = this._route.snapshot.data['calendarData'];
        this.calendarDate = calendarInitialData.calendarDate;
        this.postTimeCalendars = calendarInitialData.calendar;
        this.weekCalendar = this.createWeekCalendar(this.calendarDate);
        this.weekRange = this.getWeekRange();

        this.dropupSub = this.datepickerLiteService.initDropup(this.calendarRef);
        this.toggleSub = this.datepickerLiteService.toggleStateSubject.subscribe(
            (toggleTo) => this.isDatepickerVisible = toggleTo
        );
        this.toteDateSub = this._raceDateService.getToteDate().subscribe((date) => {
            this.toteDate = date;
            this.isToteDay = CduxDateUtil.isSameDay(this.calendarDate, this.toteDate);
            this.isPastDay = CduxDateUtil.isBeforeDay(this.calendarDate, this.toteDate);
            this.isFutureDay = CduxDateUtil.isAfterDay(this.calendarDate, this.toteDate);
        });
    }

    ngOnDestroy() {
        if (this.dropupSub) {
            this.dropupSub.unsubscribe();
        }
        if (this.toggleSub) {
            this.toggleSub.unsubscribe();
        }
        if (this.toteDateSub) {
            this.toteDateSub.unsubscribe();
        }
        this.datepickerLiteService.toggleState(false);
    }

    private createWeekCalendar(startDate: Date): ICalendarDay[] {
        return this._datePickerService.buildWeeklyCalendar(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    }

    public changeWeek(date: Date): void {
        // This is a bit ridiculous, but here's a fix for DE11422.
        // iOS Plus devices are artifacting on the week range label.
        // The way around it is to empty it, update the UI, then populate it.
        this.weekRange = '';
        this._changeDetector.detectChanges();
        this.weekCalendar = this.createWeekCalendar(date);
        this.weekRange = this.getWeekRange();
        this._changeDetector.detectChanges();
    }

    public changeDay(date: Date) {
        this.datepickerLiteService.closeDropup();
        this.calendarDate = date;
        if (this.toteDate) {
            this.isToteDay = CduxDateUtil.isSameDay(date, this.toteDate);
            this.isPastDay = CduxDateUtil.isBeforeDay(date, this.toteDate);
            this.isFutureDay = CduxDateUtil.isAfterDay(date, this.toteDate);
        }
        if (!this.inWeekRange(date)) {
            this.weekCalendar = this.createWeekCalendar(date);
        }
        this.assignCalendarEvents(date);

        this.weekRange = this.getWeekRange();
    }

    public getWeekRange(): string {
        const start = this.weekCalendar[0];
        const end = this.weekCalendar[this.weekCalendar.length - 1];

        if (this._datePickerService.getMonthName(start.month) === this._datePickerService.getMonthName(end.month)) {
            return this._datePickerService.getMonthName(start.month) + ' ' + start.day + '-' + end.day;
        } else {
            return this._datePickerService.getMonthName(start.month) + ' ' + start.day + ' - '
                + this._datePickerService.getMonthName(end.month) + ' ' +  end.day;
        }
    }

    private inWeekRange(date: Date): boolean {
        const monday = this.weekCalendar[0];
        const sunday = this.weekCalendar[this.weekCalendar.length - 1];

        if (date >= new Date(monday.year, monday.month, monday.day) && date <= new Date(sunday.year, sunday.month, sunday.day)) {
            return true;
        }
        return false;
    }

    public toggleDatepicker(): void {
        this.datepickerLiteService.toggleState();
    }

    public assignCalendarEvents(date: Date): void {
        this.postTimeCalendars = [];
        this._calendarBusinessService.toggleRouteAnimation();
        this._calendarBusinessService.getCalendarData(date, this.isPastDay ? 'meetName' : 'postTime').take(1)
            .subscribe(data => {
                this.postTimeCalendars = data;
                this._calendarBusinessService.toggleRouteAnimation();
            }, error => {
                this._calendarBusinessService.toggleRouteAnimation();
            });
    }

    public programNavigate(event: ICalendarEvent) {
        this._router.navigate(['/program', this._stringSlugify.transform(event.meetName), event.brisCode, event.trackType]);
    }

    public resultsNavigate(event: ICalendarEvent, raceDate = this.calendarDate, raceNumber = 1) {
        this._router.navigate(['/results', this._stringSlugify.transform(event.meetName), raceDate.toISOString().substr(0, 10), event.brisCode, event.trackType, raceNumber]);
    }
}
