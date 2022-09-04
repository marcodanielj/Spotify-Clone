import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newArtist, newTrack } from 'src/app/Common/factories';
import { IArtist } from 'src/app/interfaces/IArtist';
import { ITrack } from 'src/app/interfaces/ITrack';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit, OnDestroy {

  savedTracks: ITrack[] = [];
  currentTrack: ITrack = newTrack();
  
  subs: Subscription[] = [];

  playIcon = faPlay;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService,
    private router: Router
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

  goToArtist(artistID: string) {
    this.router.navigateByUrl(`player/list/artist/${artistID}`);
  }

  goToAlbum(albumID: string) {
    this.router.navigateByUrl(`player/list/album/${albumID}`);
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
