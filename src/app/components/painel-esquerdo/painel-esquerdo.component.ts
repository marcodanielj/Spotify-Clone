import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBandage, faBook, faBookAtlas, faBookBible, faChartColumn, faColumns, faFaceLaughBeam, faHeartMusicCameraBolt, faHome, faLayerGroup, faMusic, faObjectGroup, faSearch, faSwatchbook, faTableColumns, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { isThisSecond } from 'date-fns';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit {

  selectedMenu = 'Início';
  playlists: IPlaylist[] = [];
  //Icones
  homeIcon = faHome;
  searchIcon = faSearch;
  libraryIcon = faLayerGroup;
  playlistIcon = faMusic;

  constructor(private spotifyService: SpotifyService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserPlaylists();
  }


  buttonClick(button: string) {
  this.selectedMenu = button;
  this.router.navigateByUrl('player/home')
  }

  goToSearch() {
    this.selectedMenu = "Buscar"
    const searchID = ''
    this.router.navigateByUrl(`player/list/search/${searchID}`)
  }

  goToPlaylist(playlistID: string) {
    this.selectedMenu = playlistID;
    this.router.navigateByUrl(`player/list/playlist/${playlistID}`);
  }

  async getUserPlaylists() {
    this.playlists = await this.spotifyService.getUserPlaylists();
  }
}
