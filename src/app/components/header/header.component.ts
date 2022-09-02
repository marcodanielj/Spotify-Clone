import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  imageURL = '';

  @Input()
  title = '';

  @Input()
  type = '';

  @Input()
  hideImage = false;

  @Input()
  hideHeader = false;

  constructor() { }

  ngOnInit(): void {
  }

}
