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

  beginnerCourses: readonly Course[];

  advancedCourses: readonly Course[];

  constructor() {

  }

  ngOnInit() {
    const http$ = createHttpObservable<CoursesResponse>('/api/courses');

    const courses$ = http$
      .pipe(
        map(resp => resp.payload)
      );

    courses$.subscribe(
      courses => {
        this.beginnerCourses = courses
          .filter(c => c.category === 'BEGINNER');
        this.advancedCourses = courses
          .filter(c => c.category === 'ADVANCED');
      },
      noop,
      () => console.log('completed')
    );
  }
}
