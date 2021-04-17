import * as L from 'leaflet';

interface LngLat {
  latitude: number;
  longitude: number;
}

export default class Coins {
  visualCoins = [];
  coordinatesOfCoins = [];

  coinIcon: L.Icon;

  constructor(private map: L.Map) {
    this.coinIcon = L.icon({
      iconUrl: 'assets/coin.png',
      iconSize: [20, 20],
    });
  }

  addPoint = (visualPositionOfPoint: LngLat) => {
    let arrayOfVisualPositionOfPoint = L.latLng(
      visualPositionOfPoint.latitude,
      visualPositionOfPoint.longitude
    );
    this.visualCoins.push(
      L.marker(arrayOfVisualPositionOfPoint, {
        title: '',
        interactive: false,
        draggable: false,
        icon: this.coinIcon,
      }).addTo(this.map)
    );
    this.coordinatesOfCoins.push(arrayOfVisualPositionOfPoint);
  };

  deletePoint = (visualPositionOfPoint: LngLat) => {
    let arrayOfVisualPositionOfPoint = L.latLng(
      visualPositionOfPoint.latitude,
      visualPositionOfPoint.longitude
    );
    let indexOfDeletedPoint = this.coordinatesOfCoins.indexOf(
      arrayOfVisualPositionOfPoint
    );
    if (indexOfDeletedPoint !== -1) {
      this.coordinatesOfCoins.splice(indexOfDeletedPoint, 1);
      this.map.removeLayer(this.visualCoins[indexOfDeletedPoint]);
    } else {
      console.error(new Error('The position is cannot be found in coins!'));
    }
  };
}
