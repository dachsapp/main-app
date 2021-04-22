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

  ngOnInit() {
    // this.service.isLoggedIn();
  }
}
