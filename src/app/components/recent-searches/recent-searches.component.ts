import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss']
})
export class RecentSearchesComponent implements OnInit {

  recentSearches = [
    'Top Brasil',
    'Top Global',
    'Esquenta Sertanejo',
    'Funk Hits',
    'Pagodin'
  ]

  selectedTopic = '';

  buttonClick(topic: string) {

    this.selectedTopic = topic;

  }

  constructor() { }

  ngOnInit(): void {
  }

}
