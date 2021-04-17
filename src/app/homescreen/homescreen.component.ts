import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.scss'],
})
export class HomescreenComponent implements OnInit {
  constructor(private route: Router) {}
  los = (routingLink: string) => {
    this.route.navigate([routingLink]);
  };

  ngOnInit(): void {}
}
