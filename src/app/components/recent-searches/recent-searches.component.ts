import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.scss']
})
export class RecentSearchesComponent implements OnInit {

  recentSearches: string[] = [];

  searchText = '';

  buttonClick(topic: string) {
    this.router.navigateByUrl(`player/list/search/${this.searchText}`);
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToSearchResults() {
    if (this.searchText !== '') {
      this.recentSearches.push(this.searchText);
    }
    this.router.navigateByUrl(`player/list/search/${this.searchText}`);
  }



}
