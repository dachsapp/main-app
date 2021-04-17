import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { latLng, tileLayer } from 'leaflet';

import PointFunctions from './pointFunctions';
import Player from './player';
import Coins from './coins';

@Component({
  selector: 'app-mapscreen',
  templateUrl: './mapscreen.component.html',
  styleUrls: ['./mapscreen.component.scss'],
})
export class MapscreenComponent implements OnInit {
  constructor(private route: Router) {}

  private coords = [];

  private mainPlayer: any;
  private playerIcon: any;
  private coinIcon: any;

  public coinCount = 0;
  public map: L.Map;

  coinsArray = [];
  oldPos: number[];

  navigate = window.navigator || navigator;

  pointFunctions: PointFunctions;
  player: Player;
  coins: Coins;
  ngOnInit() {
    // only contenue if browser supports geolocation
    if (!window.navigator.geolocation) {
      this.route.navigate(['/geolocatoin-not-supported']);
    }

    this.pointFunctions = new PointFunctions();
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '...',
      }),
    ],
    // default = 19
    zoom: 19,
    center: latLng(48.388549, 13.883763),
  };

  onMapReady(map: L.Map) {
    this.map = map;

    this.player = new Player(this.map, {
      latitude: 3,
      longitude: 3,
    });

    // configure L.Map
    setTimeout(() => {
      map.invalidateSize();
      map.zoomControl.remove();
      map.attributionControl.remove();
      map.scrollWheelZoom.disable(); //
      map.dragging.disable(); //
    }, 1);

    /*

    ?getPointsInRangeOfPlayer



    */
    /*
      let checkForCoin = () => {
      for (let coord in this.coords) {
        if (
          this.player.position.latitude + 0.0001 > this.coords[coord][0] &&
           this.player.position.longitude + 0.0001 > this.coords[coord][1] &&
          this.player.position.latitude - 0.0001 < this.coords[coord][0] &&
          this.player.position.longitude - 0.0001 < this.coords[coord][1]
        ) {
          this.coinCount++;

          map.removeLayer(this.coinsArray[coord]);

          this.coords = this.coords.filter(
            (el: number[]) => el !== this.coords[coord]
          );
        }
      }
    };
    checkForCoin();
*/
    this.navigate.geolocation.getCurrentPosition((pos) => {
      this.player.setPosition({
        latitude: pos.coords.latitude,
        longitude: (this.player.position.longitude = pos.coords.longitude),
      });
      this.oldPos = Array.from([
        this.player.position.latitude,
        this.player.position.longitude,
      ]);

      //!

      this.coords = this.pointFunctions.createPoints(
        500,
        this.player.position.latitude,
        this.player.position.longitude,
        this.coords
      );

      for (let coord in this.coords) {
        this.coinsArray.push(
          L.marker(this.coords[coord], {
            title: '',
            interactive: false,
            draggable: false,
            icon: this.coinIcon,
          }).addTo(map)
        );
      }

      //!
    });

    this.navigate.geolocation.watchPosition((pos) => {
      this.player.position.latitude = pos.coords.latitude;
      this.player.position.longitude = pos.coords.longitude;

      //!  checkForCoin();

      this.player.playerMarker.setLatLng(
        new L.LatLng(
          this.player.position.latitude,
          this.player.position.longitude
        )
      );
      map.setView([
        this.player.position.latitude,
        this.player.position.longitude,
      ]);
      // map.setView([48.388549, 13.883763]); //

      // deleting old point
      for (let point in this.coords) {
        if (
          !this.pointFunctions.pointInRange(
            this.coords[point][0],
            this.coords[point][1],
            this.player.position.latitude,
            this.player.position.longitude
          )
        ) {
          let newPoint = this.pointFunctions.generateRandomPointInShape(
            this.player.position.latitude,
            this.player.position.longitude,
            this.oldPos
          );
          this.coords = [...this.coords, newPoint];
          map.addLayer(
            L.marker(new L.LatLng(newPoint[0], newPoint[1]), {
              title: '',
              interactive: false,
              draggable: false,
              icon: this.coinIcon,
            })
          );
          this.coords = this.coords.filter(
            (value: number[]) => value !== this.coords[point]
          );
          map.removeLayer(this.coinsArray[point]);
        }
      }
      this.oldPos = Array.from([
        this.player.position.latitude,
        this.player.position.longitude,
      ]);
    });
  }
}
