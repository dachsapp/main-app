import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { latLng, tileLayer } from 'leaflet';

import Coins from './coins';
import { AppServiceService } from '../app-service.service';

interface LngLat {
  latitude: number;
  longitude: number;
}
class Player {
  public position: LngLat;

  constructor(position: LngLat) {
    this.position = position;
  }

  setPosition = (newPosition: LngLat) => {
    this.position = newPosition;
  };
}

//? POINTS are the *VISUAL* coins
//? COORDS are the *UNVISUAL* coordinates of those
class PointFunctions {
  private randomNumberInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  private latRange = 0.002;
  private lngRange = 0.003;

  //? used for comparing old and new position cause if old position has a point in range,
  //? witch is not in range in the new position, it SHOULD be deletet and marked as a point
  isPointInRange = (
    playerLat: number,
    playerLng: number,
    lati: number,
    long: number
  ) => {
    if (
      playerLat + this.latRange > lati &&
      playerLng + this.lngRange > long &&
      playerLat - this.latRange < lati &&
      playerLng - this.latRange < long
    )
      return true;

    return false;
  };

  createPointsCoords = (
    countOfPoints: number,
    lati: number,
    long: number,
    callback: Function
  ) => {
    let coordsArray: Object[] = []; //? returned later

    //? loop exatly the number of coins I wanna create
    for (let i = 1; i <= countOfPoints; i++) {
      coordsArray.push([
        this.randomNumberInRange(lati - this.latRange, lati + this.latRange),
        this.randomNumberInRange(long - this.lngRange, long + this.lngRange),
      ]);
    }

    callback(coordsArray);
  };

  //? The coords created here are OUTSIDE the old pos and INSIDE the new one...
  //? SO THEY'RE on the oposite side
  generateRandomCoordInShape = (
    latitude: number,
    logatude: number,
    oldPosition: number[],
    callback: Function
  ) => {
    let randomCoord = [
      this.randomNumberInRange(
        latitude - this.latRange,
        latitude + this.latRange
      ),
      this.randomNumberInRange(
        logatude - this.lngRange,
        logatude + this.lngRange
      ),
    ];
    if (
      this.isPointInRange(
        oldPosition[0],
        oldPosition[1],
        randomCoord[0],
        randomCoord[1]
      )
    )
      this.generateRandomCoordInShape(
        latitude,
        logatude,
        oldPosition,
        (calledbackCoord: number[]) => callback(calledbackCoord)
      );

    callback(randomCoord);
  };
}

@Component({
  selector: 'app-mapscreen',
  templateUrl: './mapscreen.component.html',
  styleUrls: ['./mapscreen.component.scss'],
})
export class MapscreenComponent {
  constructor(private route: Router, private service: AppServiceService) {
    this.service.emailObservable.subscribe(
      (emailObserved) => (this.email = emailObserved)
    );
    this.checkLoggedIn();
    setInterval(this.checkLoggedIn, 30000);
  }
  email: string;

  checkLoggedIn = () => {
    interface ResponseMessage {
      message: string;
    }

    this.service
      .isLoggedIn(this.email)
      .toPromise()
      .then((data: ResponseMessage) => {
        if (data.message !== 'logged-in') this.route.navigate(['/signup']);
      });
  };

  //? will hold all coordinates
  private coords = [];

  // leaflet stuff vars
  private mainPlayer: any;
  private playerIcon: any;
  private coinIcon: any;

  //? will hold score
  //TODO update it alongside the server and get info from server at first
  public coinCount = 0;

  // main map
  public map: L.Map;

  //? contains pics of coins
  coinsArray = [];

  //? When
  oldPos: number[];

  navigate = window.navigator || navigator;

  pointFunctions: PointFunctions;
  player: Player;
  coins: Coins;

  testCompatibility = (callback: Function) => {
    //? only contenue if browser supports geolocation
    if (!window.navigator.geolocation) {
      this.route.navigate(['/geolocatoin-not-supported']);
      return;
    }
    callback();
  };

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

  takeCoinIfNeeded = () => {
    //? for code optimization
    if (this.coords.length > 0) {
      for (let coord in this.coords) {
        if (
          this.player.position.latitude + 0.0001 > this.coords[coord][0] &&
          this.player.position.longitude + 0.0001 > this.coords[coord][1] &&
          this.player.position.latitude - 0.0001 < this.coords[coord][0] &&
          this.player.position.longitude - 0.0001 < this.coords[coord][1]
        ) {
          //? increase counter
          this.coinCount++;

          //? remove coord and poin of taken coin
          this.coords = this.coords.filter(
            (el: number[]) => el !== this.coords[coord]
          );
          this.map.removeLayer(this.coinsArray[coord]);

          console.log(this.coords.length);
        }
      }
    }
  };

  onGotPos = (pos: any) => {
    if (pos === undefined) console.error('pos in onGotPos is not defined');

    this.player.setPosition({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    });
    this.oldPos = Array.from([
      this.player.position.latitude,
      this.player.position.longitude,
    ]);

    this.map.setView([
      this.player.position.latitude,
      this.player.position.longitude,
    ]);

    this.pointFunctions.createPointsCoords(
      500,
      this.player.position.latitude,
      this.player.position.longitude,
      (coordArray: Object[]) => {
        this.coords = coordArray;

        for (let coord in this.coords) {
          this.coinsArray.push(
            L.marker(this.coords[coord], {
              title: '',
              interactive: false,
              draggable: false,
              icon: this.coinIcon,
            }).addTo(this.map)
          );
        }
      }
    );
  };

  onMove = (pos: any) => {
    this.player.position.latitude = pos.coords.latitude;
    this.player.position.longitude = pos.coords.longitude;

    this.map.setView([
      this.player.position.latitude,
      this.player.position.longitude,
    ]);

    //? updating coords
    for (let coord in this.coords) {
      if (
        !this.pointFunctions.isPointInRange(
          this.coords[coord][0],
          this.coords[coord][1],
          this.player.position.latitude,
          this.player.position.longitude
        )
      ) {
        this.pointFunctions.generateRandomCoordInShape(
          this.player.position.latitude,
          this.player.position.longitude,
          this.oldPos,
          (newPoint: number[]) => {
            //? adding new point's coord and point
            this.coords = [...this.coords, newPoint];

            this.coinsArray.push(
              L.marker(this.coords[coord], {
                title: '',
                interactive: false,
                draggable: false,
                icon: this.coinIcon,
              }).addTo(this.map)
            );

            //? removing old point's coord and point
            this.coords = this.coords.filter(
              (value: number[]) => value !== this.coords[coord]
            );
            this.map.removeLayer(this.coinsArray[coord]);
            this.coinsArray = this.coinsArray.filter(
              (value: number[]) => value !== this.coinsArray[coord]
            );
          }
        );
      }
    }

    this.takeCoinIfNeeded();

    //? If the old Position is the new one, it is the old one for the next time
    this.oldPos = Array.from([
      this.player.position.latitude,
      this.player.position.longitude,
    ]);
  };

  onInit() {
    this.testCompatibility(() => {
      this.navigate.geolocation.getCurrentPosition(this.onGotPos); //? runs when position is loaded the first time
      this.navigate.geolocation.watchPosition(this.onMove); //? runs when position is updated
    });
  }

  //? FIRST THING THAT RUNS
  onMapReady = (map: L.Map) => {
    this.map = map;

    this.player = new Player({
      latitude: 3,
      longitude: 3,
    });

    this.pointFunctions = new PointFunctions();

    this.coinIcon = L.icon({
      iconUrl: 'assets/coin.png',
      iconSize: [30, 30],
    });

    // configure L.Map
    setTimeout(() => {
      map.invalidateSize(); //? setup
      map.zoomControl.remove(); //? nozoom
      map.attributionControl.remove(); //? nozoom-controls
      map.scrollWheelZoom.disable(); //? noscrollwheelzoom
      map.dragging.disable(); //? nodragging of markers (coins/items/...)
    }, 1);

    this.onInit();
  };
}
