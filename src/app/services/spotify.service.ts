import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuario';
import { SpotifyArtistToLocalArtist, SpotifyFullPlaylistToLocalFullPlaylist, SpotifyPlaylistToLocalPlaylist, SpotifyTrackToLocalTrack, SpotifyUserToLocalUser } from '../Common/spotifyHelper';
import { IPlaylist } from '../interfaces/IPlaylist';
import { Router } from '@angular/router';
import { IArtist } from '../interfaces/IArtist';
import { ITrack } from '../interfaces/ITrack';

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

  async playNextTrack() {
    await this.spotifyApi.skipToNext();
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

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
