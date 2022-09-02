import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newTrack } from 'src/app/Common/factories';
import { ITrack } from 'src/app/interfaces/ITrack';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  savedTracks: ITrack[] = [];
  currentTrack: ITrack = newTrack();
  
  subs: Subscription[] = [];

  playIcon = faPlay;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
    ) { }

  ngOnInit(): void {
    this.getSavedTracks(); 
    this.getCurrentTrack();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async getSavedTracks() {
    this.savedTracks = await this.spotifyService.getSavedTracks();
  }

  getArtists(track: ITrack) {
    return track.artists.map(x => x.name).join(', ');
  }

  async playTrack(track: ITrack) {
    this.playerService.setCurrentTrack(track);
    await this.spotifyService.playTrack(track.uri);
  }

  getCurrentTrack() {
    const sub = this.playerService.currentTrack.subscribe(track => {
      this.currentTrack = track;
    });

    this.subs.push(sub);
  }
}
