import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //dependency injection occurs here, were declaring a singleton service to talk to spotify
  constructor(private spotifyService: SpotifyService,
    private router: Router) { }

  ngOnInit(): void {
    this.verificarTokenUrlCallback();
  }

  verificarTokenUrlCallback() {
    const token = this.spotifyService.obterTokenUrlCallback();
    if(!!token) {
      this.spotifyService.definirAccessToken(token);
      this.router.navigate(['/player/home']);
    }

  }

  openLoginPage() {
    window.location.href = this.spotifyService.obterUrlLogin()
  }

}
