// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';

// import { LoadingService } from '../../shared/loading/services/loading.service';
// import { CalendarDataService, ICalendarEvent } from '@cdux/ng-common';
// import { CduxArrayUtil, CduxDateUtil } from '../../shared/common/utils';
// import { ICalendarMap } from '../interfaces';
// import { PostTimeCalendar } from '../classes/post-time-calendar';

// // @Injectable()
// export class CalendarBusinessService {
//     private isAnimationLoading: boolean = false;

//     constructor(
//         private _calendarDataService: CalendarDataService,
//         private _loadingService: LoadingService
//     ) {}

//     /**
//      * Makes a single request for calendar data for the given date
//      * @param date
//      * @returns {Observable<PostTimeCalendar[]>}
//      */
//     public getCalendarData(date: Date, groupBy: keyof ICalendarEvent = 'postTime'): Observable<PostTimeCalendar[]> {
//         return this._calendarDataService.getCalendarData(CduxDateUtil.convertDateToWSFormat(date)).map((calendarEvents) => {
//             const groupedCalendar = CduxArrayUtil.groupBy(calendarEvents, groupBy);
//             return this.compileCalendar(groupedCalendar);
//         }).catch(() => {
//             return Observable.of(null);
//         });
//     }

//     private compileCalendar(calendarMap: ICalendarMap): PostTimeCalendar[] {
//         const calendarList: PostTimeCalendar[] = [];
//         // Loop over map and populate calendar list with post time calendars
//         for (const key of Object.keys(calendarMap)) {
//             const postTimeCalendar = new PostTimeCalendar(key, calendarMap[key]);
//             calendarList.push(postTimeCalendar);
//         }
//         return calendarList.sort((a, b) => a.label < b.label ? -1 : 1);
//     }

//     public toggleRouteAnimation(timeout?: number): void {
//         if (!this.isAnimationLoading) {
//             this.isAnimationLoading = true;
//             this._loadingService.register('routeLoader');
//         } else {
//             this.isAnimationLoading = false;
//             this._loadingService.resolve('routeLoader', !!timeout ? timeout : 500, 'void');
//         }
//     }
// }
