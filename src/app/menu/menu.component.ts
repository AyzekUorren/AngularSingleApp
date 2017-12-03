import { Component, OnInit, HostListener } from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  get Width(): number {
    return this._Width;
  }
  set Width(value: number) {
    this._Width = value;
  }
  private route: string;

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }
  private _userName: string = undefined;

  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      if (location.path() !== '') {
        this.route = location.path();
      } else {
        this.route = 'Home';
      }
    });
  }

  private _Width: number;

  @HostListener('window:resize', ['$event'])
  @HostListener('window:onload')
  onResize(event) {
    this.Width = event.target.innerWidth;
    console.log( event.target.innerWidth);
    console.log(typeof this.Width);
  }

  ngOnInit() {
    this.Width = window.innerWidth;
  }
}
