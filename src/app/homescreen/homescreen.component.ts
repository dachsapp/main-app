import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss'],
})
export class HomescreenComponent implements OnInit {
  constructor(private route: Router, private service: AppServiceService) {}
  los = (routingLink: string) => {
    this.route.navigate([routingLink]);
  };

  email: string;

  ngOnInit() {
    interface ResponseMessage {
      message: string;
    }

    this.service.emailObservable.subscribe(
      (emailObserved) => (this.email = emailObserved)
    );
    this.service
      .isLoggedIn(this.email)
      .toPromise()
      .then((data: ResponseMessage) => {
        if (data.message !== 'logged-in') this.route.navigate(['/signup']);
      });
  }
}
