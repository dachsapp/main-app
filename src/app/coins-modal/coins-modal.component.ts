import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coins-modal',
  templateUrl: './coins-modal.component.html',
  styleUrls: ['./coins-modal.component.scss'],
})
export class CoinsModalComponent {
  @Input() coinCount: number;
}
