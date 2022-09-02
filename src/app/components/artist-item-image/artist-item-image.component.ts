import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-artist-item-image',
  templateUrl: './artist-item-image.component.html',
  styleUrls: ['./artist-item-image.component.scss']
})
export class ArtistItemImageComponent implements OnInit {

  @Input()
  imageSrc = '';

  @Output()
  click = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.click.emit();
  }

}
