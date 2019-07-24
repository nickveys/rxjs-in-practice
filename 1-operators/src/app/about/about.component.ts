import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, timer, fromEvent } from 'rxjs';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const interval$ = timer(3000, 1000);
    interval$.subscribe(val => console.log(`Stream 1: ${val}`));

    const click$ = fromEvent(document, 'click');
    click$.subscribe(val => console.log(val));
  }
}
