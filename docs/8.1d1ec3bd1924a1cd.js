"use strict";(self.webpackChunkangularSpotifyClone=self.webpackChunkangularSpotifyClone||[]).push([[8],{7008:(u,s,e)=>{e.r(s),e.d(s,{LoginModule:()=>p});var l=e(6895),c=e(9232),n=e(8256),a=e(1134);const g=[{path:"",component:(()=>{class o{constructor(t,r){this.spotifyService=t,this.router=r}ngOnInit(){this.verificarTokenUrlCallback()}verificarTokenUrlCallback(){const t=this.spotifyService.obterTokenUrlCallback();t&&(this.spotifyService.definirAccessToken(t),this.router.navigate(["/player/home"]))}openLoginPage(){window.location.href=this.spotifyService.obterUrlLogin()}}return o.\u0275fac=function(t){return new(t||o)(n.Y36(a.s),n.Y36(c.F0))},o.\u0275cmp=n.Xpm({type:o,selectors:[["app-login"]],decls:4,vars:0,consts:[[1,"base","flex","flex-center"],["src","/assets/images/spotify-logo-inicio.png","alt","SpotifyLogo"],[3,"click"]],template:function(t,r){1&t&&(n.TgZ(0,"div",0),n._UZ(1,"img",1),n.TgZ(2,"button",2),n.NdJ("click",function(){return r.openLoginPage()}),n._uU(3," Abrir meu spotify "),n.qZA()())},styles:["[_nghost-%COMP%]{background-color:#222;position:absolute;width:100vw;height:100vh;flex-direction:column}[_nghost-%COMP%]   .base[_ngcontent-%COMP%]{width:100%;height:100%;flex-direction:column;justify-content:space-around}[_nghost-%COMP%]   .base[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:40%}[_nghost-%COMP%]   .base[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{font-size:1rem;min-width:200px;padding:10px;border-radius:500px;background-color:#37ab00;color:#fff;border:0;cursor:pointer}"]}),o})()}];let p=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=n.oAB({type:o}),o.\u0275inj=n.cJS({imports:[l.ez,c.Bz.forChild(g)]}),o})()}}]);