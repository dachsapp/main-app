import { Component } from '@angular/core';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss'],
})
export class GameModalComponent {
  itemsArray = [
    { text: 'This is a cool cap!', img: 'assets/shop/cap.png' },
    { text: 'This is a coin!', img: 'assets/coin.png' },
    { text: 'This is a coin!', img: 'assets/coin.png' },
    { text: 'This is a coin!', img: 'assets/coin.png' },
    { text: 'This is a coin!', img: 'assets/coin.png' },
    { text: 'This is a coin!', img: 'assets/coin.png' },
    { text: 'This is a coin!', img: 'assets/coin.png' },
    { text: 'This is a coin!', img: 'assets/coin.png' },
    { text: 'This is a coin!', img: 'assets/coin.png' },
    { text: 'This is a coin!', img: 'assets/coin.png' },
    { text: 'This is a coin!', img: 'assets/coin.png' },
  ];

  styleOfPlayer = 'hidden';
  clicked() {
    this.styleOfPlayer = this.styleOfPlayer === 'hidden' ? 'shown' : 'hidden';
  }
}
