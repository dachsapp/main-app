export default class PointFunctions {
  private randomNumberInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  private latRange = 0.002;
  private lngRange = 0.003;

  pointInRange = (
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

  createPoints = (
    countOfPoints: number,
    lati: number,
    long: number,
    coordsArray: any[]
  ) => {
    for (let i = 1; i <= countOfPoints; i++) {
      coordsArray.push([
        this.randomNumberInRange(lati - this.latRange, lati + this.latRange),
        this.randomNumberInRange(long - this.lngRange, long + this.lngRange),
      ]);
    }
    return coordsArray;
  };

  generateRandomPointInShape = (
    latitude: number,
    logatude: number,
    oldPosition: number[]
  ) => {
    let randomPoint = [
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
      this.pointInRange(
        oldPosition[0],
        oldPosition[1],
        randomPoint[0],
        randomPoint[1]
      )
    )
      return this.generateRandomPointInShape(latitude, logatude, oldPosition);
    return randomPoint;
  };
}
