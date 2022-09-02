import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newTrack } from 'src/app/Common/factories';
import { ITrack } from 'src/app/interfaces/ITrack';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnInit, OnDestroy {

  headerImageURL = '';
  headerText = '';

  tracks: ITrack[] = [];
  currentTrack: ITrack = newTrack();
  playIcon = faPlay;
  subs: Subscription[] = [];

  pageTitle = '';

  constructor(private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getTracks();
    this.getCurrentTrack();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe);
  }

  getCurrentTrack() {
    const sub = this.playerService.currentTrack.subscribe(track => {
      this.currentTrack = track;
    });

    this.subs.push(sub);
  }

  getTracks() {
    const sub = this.activatedRoute.paramMap.subscribe(async params => {
      const type = params.get('type');
      const id = params.get('id');
      await this.getData(type, id);
    })

    this.subs.push(sub);
  }

  async getData(type: string, id: string) {
    if (type === 'playlist')
    await this.getPlaylistData(id);
    else
    await this.getArtistData(id);
  }

  async getPlaylistData(playlistID: string) {
    const playlistTracks = await this.spotifyService.getPlaylistTracks(playlistID);
    this.setPageData(playlistTracks.name, playlistTracks.imageURL, playlistTracks.tracks);
  }

  getArtistData(artistID: string) {

  }

  setPageData(text: string, imageURL: string, tracks: ITrack[]) {
    this.headerImageURL = imageURL;
    this.headerText = text;
    this.tracks = tracks;
  }

  getArtists(track: ITrack) {
    return track.artists.map(x => x.name).join(', ');
  }

  async playTrack(track: ITrack) {
    this.playerService.setCurrentTrack(track);
    await this.spotifyService.playTrack(track.uri);
  }

}
