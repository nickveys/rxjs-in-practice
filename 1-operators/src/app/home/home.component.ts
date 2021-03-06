import {Component, OnInit} from '@angular/core';
import {interval, Observable, of, timer, noop} from 'rxjs';
import {catchError, delayWhen, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { CoursesResponse, Course } from '../model/course';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor() {

  }

  ngOnInit() {
    const http$ = createHttpObservable<CoursesResponse>('/api/courses');

    const courses$ = http$
      .pipe(
        tap(() => console.log('HTTP request executed')),
        map(resp => resp.payload),
        shareReplay()
      );

    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category === 'BEGINNER'))
      );

    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses.filter(course => course.category === 'ADVANCED'))
      );
  }
}
