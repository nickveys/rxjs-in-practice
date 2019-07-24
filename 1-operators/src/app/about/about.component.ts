import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, noop } from 'rxjs';
import { createHttpObservable } from '../common/util';
import { map } from 'rxjs/operators';

interface Course {
  id: number;
  description: string;
  iconUrl: string;
  courseListIcon: string;
  longDescription: string;
  category: string;
}

declare type Courses = readonly Course[];

interface CoursesResponse {
  payload: Courses;
}

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const http$ = createHttpObservable<CoursesResponse>('/api/courses');

    const courses$ = http$
      .pipe(
        map(resp => resp.payload)
      );

    courses$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('completed')
    );
  }
}
