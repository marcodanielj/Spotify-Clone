import { Routes } from "@angular/router";
import { AuthenticatorGuard } from "./guards/authenticator.guard";

export const AppRotas: Routes = [

    {
        path: '',
        redirectTo: 'player',
        pathMatch: 'full'
    },

    {
        path: 'player',
        //lazyLoading: the app only loads the player module once the authenticator makes sure the user is logged in
        loadChildren: () => import('./pages/player/player.module').then(x => x.PlayerModule),
        canLoad: [AuthenticatorGuard]
    },

    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(x => x.LoginModule)
    }
]