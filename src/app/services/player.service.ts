import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { newTrack } from '../Common/factories';
import { ITrack } from '../interfaces/ITrack';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  currentTrack = new BehaviorSubject<ITrack>(newTrack());
  timerId: any = null;

  constructor(private spotifyService: SpotifyService) {
    this.getCurrentTrack();
  }

  async getCurrentTrack() {
    // Clear the timer
    clearTimeout(this.timerId);
    // Retrieve the current track
    const track = await this.spotifyService.getCurrentTrack();
    this.setCurrentTrack(track);
    // Check again in 3000ms
    this.timerId = setInterval(async () => {
      await this.getCurrentTrack()
    }, 500)
  }

  setCurrentTrack(track: ITrack) {
    this.currentTrack.next(track);
  }

  async previousTrack() {
    await this.spotifyService.playPreviousTrack();
  }

  async playPauseTrack() {
    await this.spotifyService.playPauseTrack();
  }

  async nextTrack() {
    await this.spotifyService.playNextTrack();
  }
}
