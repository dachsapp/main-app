import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourOFourComponent } from './four-ofour/four-ofour.component';
import { GeoLocationNotSupportedComponent } from './geo-location-not-supported/geo-location-not-supported.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { KontaktiereUnsComponent } from './kontaktiere-uns/kontaktiere-uns.component';
import { MapscreenComponent } from './mapscreen/mapscreen.component';
import { SignUpScreenComponent } from './sign-up-screen/sign-up-screen.component';
import { UebersSpielComponent } from './uebers-spiel/uebers-spiel.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';

const routes: Routes = [
  { path: 'map-app', component: MapscreenComponent },
  { path: 'home', component: HomescreenComponent },
  { path: 'uebers-spiel', component: UebersSpielComponent },
  { path: 'kontaktiere-uns', component: KontaktiereUnsComponent },

  { path: 'signup', component: SignUpScreenComponent },
  { path: 'verify-code', component: VerifyCodeComponent },

  {
    path: 'geolocation-not-supported',
    component: GeoLocationNotSupportedComponent,
  },
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: '**', component: FourOFourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
