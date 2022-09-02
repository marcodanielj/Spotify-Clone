import { Component, OnInit } from '@angular/core';
import { newArtist } from 'src/app/Common/factories';
import { IArtist } from 'src/app/interfaces/IArtist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.scss']
})
export class TopArtistaComponent implements OnInit {

  topArtist: IArtist = newArtist();

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void {
    this.getTopArtist();
  }

  async getTopArtist() {
    const artist = await this.spotifyService.getTopArtists(1);

    if(!!artist)
    this.topArtist = artist.pop();
  }

}
