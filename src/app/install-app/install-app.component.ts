import { Component } from '@angular/core';

@Component({
  selector: 'app-install-app',
  templateUrl: './install-app.component.html',
  styleUrls: ['./install-app.component.scss'],
})
export class InstallAppComponent {
  event: any;
  styleState = 'hidden';

  constructor() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.event = e;
      this.styleState = 'shown';
    });
  }

  installPWA() {
    this.event.prompt();
    this.event.userChoice.then((result) => {
      if (result.outcome === 'accepted') {
        console.log('hi');
      }
    });
  }
}
