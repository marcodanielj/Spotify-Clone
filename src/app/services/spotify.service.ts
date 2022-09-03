import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuario';
import { SpotifyAlbumToLocalAlbum, SpotifyAlbumTrackToLocalAlbumTrack, SpotifyArtistToLocalArtist, SpotifyFullArtistToLocalFullArtist, SpotifyFullPlaylistToLocalFullPlaylist, SpotifyPlaylistToLocalPlaylist, SpotifyTrackToLocalTrack, SpotifyUserToLocalUser } from '../Common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtist } from '../interfaces/IArtist';
import { ITrack } from '../interfaces/ITrack';
import { newTrack } from '../Common/factories';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  usuario: IUsuario;


  constructor(private router: Router) { 
    this.spotifyApi = new Spotify();
  }

  async initUser() {

    if(!!this.usuario)
    return true;

    const token = localStorage.getItem('token');
    
    if(!token)
    return false;

    try  {
      await this.definirAccessToken(token);
      await this.getSpotifyUser();
      return !!this.usuario;
    } catch(ex) {
      return false; 
    }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.usuario = SpotifyUserToLocalUser(userInfo);
  }

  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const cliendId = `client_id=${SpotifyConfiguration.clientID}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + cliendId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback() {
    if (!window.location.hash)
    return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
    console.log(params);
  }

  definirAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  async getUserPlaylists(offset = 0, limit = 50): Promise<IPlaylist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.usuario.id, { offset, limit });
    return playlists.items.map(SpotifyPlaylistToLocalPlaylist);
  }

  async getTopArtists(limit = 10):Promise<IArtist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyArtistToLocalArtist);
  }

  async getSavedTracks(offset = 0, limit = 50): Promise<ITrack[]>{
    const tracks = await this.spotifyApi.getMySavedTracks({ offset, limit});
    return tracks.items.map(x => SpotifyTrackToLocalTrack(x.track));
  }

  async playTrack(trackURI: string) {
    await this.spotifyApi.queue(trackURI);
    await this.spotifyApi.skipToNext();
  }

  async getCurrentTrack(): Promise<ITrack> {
    const track = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackToLocalTrack(track.item);
  }

  async playPreviousTrack() {
    await this.spotifyApi.skipToPrevious();
  }

  async playPauseTrack() {

    const playingState = await this.spotifyApi.getMyCurrentPlaybackState();
    
    if (playingState)
    await this.spotifyApi.pause();
    else
    await this.spotifyApi.play();
  }

  async playNextTrack() {
    await this.spotifyApi.skipToNext();
  }

  async getSearchResults(query: string, type: ("album" | "artist" | "playlist" | "track")[]) {
    const queryResults = await this.spotifyApi.search(query, type);
    return queryResults;
  }

  async getPlaylistTracks(id: string, offset = 0, limit = 50) {

    const playlistSpotify = await this.spotifyApi.getPlaylist(id);

    if(!playlistSpotify)
      return null;

    const playlist = SpotifyFullPlaylistToLocalFullPlaylist(playlistSpotify);

    const tracks = await this.spotifyApi.getPlaylistTracks(id, {offset, limit});
    playlist.tracks = tracks.items.map(allTracks => SpotifyTrackToLocalTrack(allTracks.track as SpotifyApi.TrackObjectFull));
    
    return playlist;
  }

  async getArtistTopTracks(id: string, offset = 0, limit = 10) {

    const artistSpotify = await this.spotifyApi.getArtist(id);

    if(!artistSpotify)
      return null;

    const artist = SpotifyFullArtistToLocalFullArtist(artistSpotify);

    const topTracksSpotify = await this.spotifyApi.getArtistTopTracks(id, 'US', {offset, limit});
    artist.tracks = topTracksSpotify.tracks.map(x => SpotifyTrackToLocalTrack(x));

    return artist;

  }

  async getAlbumTracks(id: string, offset = 0, limit = 40) {

    const albumSpotify = await this.spotifyApi.getAlbum(id);

    if (!albumSpotify)
    return null;

    const album = SpotifyAlbumToLocalAlbum(albumSpotify);

    const albumTracksSpotify = await this.spotifyApi.getAlbumTracks(id, {offset, limit});

    // This is necessary because the album tracks does not contain themselves the album name
    // nor the id (different behavior compared to non-album related tracks)
    // but we need it to display on the table

    album.tracks = albumTracksSpotify.items.map(x => SpotifyAlbumTrackToLocalAlbumTrack(x));
    album.tracks.map(x => x.album.id = album.id);
    album.tracks.map(x => x.album.name = album.name);

    return album;
    
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
