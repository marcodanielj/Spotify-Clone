import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newTrack } from 'src/app/Common/factories';
import { SpotifyTrackToLocalTrack } from 'src/app/Common/spotifyHelper';
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
  headerType = '';

  tracks: ITrack[] = [];
  currentTrack: ITrack = newTrack();
  playIcon = faPlay;
  subs: Subscription[] = [];

  pageTitle = '';

  isSearchVisible = false;
  isTableVisible = false;

  constructor(private activatedRoute: ActivatedRoute, private spotifyService: SpotifyService, private playerService: PlayerService, private router: Router) { }

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

  async getData(type?: string, id?: string) {

    
    if (type === 'playlist') {
      await this.getPlaylistData(id);
      this.isSearchVisible = false;
      this.isTableVisible = true;
    }
    else if (type === 'artist') {
      await this.getArtistData(id);
      this.isSearchVisible = false;
      this.isTableVisible = true;
    }
    else if (type === 'album') {
      await this.getAlbumData(id);
      this.isSearchVisible = false;
      this.isTableVisible = true;
    }
    else if (id !== '') {
      await this.getSearchData(id);
      this.isSearchVisible = true;
      this.isTableVisible = true;
  }
    else if (id === '') {
      this.isSearchVisible = true;
      this.isTableVisible = false;
      this.headerText = "Buscar";
      this.headerType = "";
      this.tracks = [];
      this.headerImageURL = "";
    }

  }

  async getPlaylistData(playlistID: string) {

    const playlistWithTracks = await this.spotifyService.getPlaylistTracks(playlistID);
    this.setPageData(playlistWithTracks.name, playlistWithTracks.imageURL, "PLAYLIST", playlistWithTracks.tracks);
  }

  async getArtistData(artistID: string) {

    const artistWithTopTacks = await this.spotifyService.getArtistTopTracks(artistID);
    this.setPageData(artistWithTopTacks.name, artistWithTopTacks.imageURL, "ARTIST", artistWithTopTacks.tracks);
  }

  async getAlbumData(albumID: string) {

    const albumWithTracks = await this.spotifyService.getAlbumTracks(albumID);
    this.setPageData(albumWithTracks.name, albumWithTracks.imageURL, "ALBUM", albumWithTracks.tracks);
  }

  async getSearchData(queryID: string) {
    
    const searchResults = await this.spotifyService.getSearchResults(queryID, ["track"]);
    this.setPageData("", "", "", searchResults.tracks.items.map(track => SpotifyTrackToLocalTrack(track)));
  }

  setPageData(text: string, imageURL: string, type: string, tracks: ITrack[]) {
    this.headerImageURL = imageURL;
    this.headerText = text;
    this.headerType = type;
    this.tracks = tracks;
    document.querySelector('.content').scrollTo(0,0);
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

}
