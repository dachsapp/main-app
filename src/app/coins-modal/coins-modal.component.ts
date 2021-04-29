import { Component, Input, OnInit } from '@angular/core';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-coins-modal',
  templateUrl: './coins-modal.component.html',
  styleUrls: ['./coins-modal.component.scss'],
})
export class CoinsModalComponent implements OnInit {
  constructor(private service: AppServiceService) {}
  coinCount: number;
  ngOnInit() {
    this.service.coinsCountObservable.subscribe(
      (observedCoinsCount: number) => {
        this.coinCount = observedCoinsCount;
      }
    );
  }
}
