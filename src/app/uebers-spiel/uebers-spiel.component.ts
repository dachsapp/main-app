import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-uebers-spiel',
  templateUrl: './uebers-spiel.component.html',
  styleUrls: ['./uebers-spiel.component.scss'],
})
export class UebersSpielComponent implements OnInit {
  constructor(private updates: SwUpdate) {}

  ngOnInit(): void {
    this.updates.available.subscribe(() => {
      this.updates.activateUpdate().then(() => document.location.reload());
    });
  }
}
