import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { MapscreenComponent } from './mapscreen/mapscreen.component';
import { UebersSpielComponent } from './uebers-spiel/uebers-spiel.component';
import { KontaktiereUnsComponent } from './kontaktiere-uns/kontaktiere-uns.component';
import { FourOFourComponent } from './four-ofour/four-ofour.component';
import { CoinsModalComponent } from './coins-modal/coins-modal.component';
import { GameModalComponent } from './game-modal/game-modal.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { InstallAppComponent } from './install-app/install-app.component';
import { GeoLocationNotSupportedComponent } from './geo-location-not-supported/geo-location-not-supported.component';
import { MenuGeneratePasswordComponent } from './menu-generate-password/menu-generate-password.component';
import { SignUpScreenComponent } from './sign-up-screen/sign-up-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    HomescreenComponent,
    MapscreenComponent,
    UebersSpielComponent,
    KontaktiereUnsComponent,
    FourOFourComponent,
    CoinsModalComponent,
    GameModalComponent,
    InstallAppComponent,
    GeoLocationNotSupportedComponent,
    MenuGeneratePasswordComponent,
    SignUpScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
