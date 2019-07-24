import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, noop } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const http$: Observable<any> = Observable.create(observer => {
      fetch('/api/courses')
        .then(resp => resp.json())
        .then(body => {
          observer.next(body);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });

    http$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('completed')
    );
  }
}
