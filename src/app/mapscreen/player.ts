import * as L from 'leaflet';

interface LngLat {
  latitude: number;
  longitude: number;
}

export default class Player {
  private playerIcon: L.Icon;

  public playerMarker: L.Marker;
  public position: LngLat;

  constructor(private map: L.Map, position: LngLat) {
    this.position = position;
    this.playerIcon = L.icon({
      iconUrl: 'assets/main-player.png',
      iconSize: [50, 50],
      className: 'playerIcon',
    });
    this.playerMarker = L.marker(
      [this.position.latitude, this.position.longitude],
      {
        title: '',
        interactive: false,
        draggable: false,
        icon: this.playerIcon,
      }
    ).addTo(map);
  }

  setPosition = (newPosition: LngLat) => {
    this.position = newPosition;
  };
}
