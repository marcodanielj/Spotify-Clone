import { Component, OnDestroy, OnInit } from '@angular/core';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newTrack } from 'src/app/Common/factories';
import { ITrack } from 'src/app/interfaces/ITrack';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent implements OnInit, OnDestroy {

  currentTrack: ITrack = newTrack();
  subs: Subscription[] = [];

  backIcon = faStepBackward;
  nextIcon = faStepForward;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getCurrentTrack();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getCurrentTrack() {
    const sub = this.playerService.currentTrack.subscribe(track => {
      this.currentTrack = track;
    })

    this.subs.push(sub);
  }

  previousTrack() {
    this.playerService.previousTrack();
  }

  nextTrack() {
    this.playerService.nextTrack();
  }

}
