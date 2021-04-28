import { Component } from '@angular/core';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss'],
})
export class GameModalComponent {
  playerIcon = 'assets/main-player.png';

  shopItems = [
    {
      text: 'Ich bin COOOOL!',
      img: 'assets/shop/rare/items/thuglifebrille.png',
      cost: '699 Coins',
      isBought: false,
      buy: () => {
        this.shopItems[0].isBought = true;
      },
      equip: () => {
        this.playerIcon = this.shopItems[0].img.replace('items', 'dachs');
      },
    },
    {
      text: 'sombrero mexicano',
      img: 'assets/shop/rare/items/sombrero.png',
      cost: '399 Coins',
      isBought: false,
      buy: () => {
        this.shopItems[1].isBought = true;
      },
      equip: () => {
        this.playerIcon = this.shopItems[1].img.replace('items', 'dachs');
      },
    },
    {
      text: 'FFP999-Maske',
      img: 'assets/shop/rare/items/maske.png',
      cost: '59 Coins',
      isBought: false,
      buy: () => {
        this.shopItems[2].isBought = true;
      },
      equip: () => {
        this.playerIcon = this.shopItems[2].img.replace('items', 'dachs');
      },
    },
    {
      text: 'FBI OPEN UP!',
      img: 'assets/shop/rare/items/diebmaske.png',
      cost: '6 Coins',
      isBought: false,
      buy: () => {
        this.shopItems[3].isBought = true;
      },
      equip: () => {
        this.playerIcon = this.shopItems[3].img.replace('items', 'dachs');
      },
    },
    {
      text: 'this game aint hard',
      img: 'assets/shop/rare/items/cowboy-hut.png',
      cost: '499 Coins',
      isBought: false,
      buy: () => {
        this.shopItems[4].isBought = true;
      },
      equip: () => {
        this.playerIcon = this.shopItems[4].img.replace('items', 'dachs');
      },
    },
    {
      text: '🤡🤡🤡',
      img: 'assets/shop/rare/items/clown-set.png',
      cost: '359 Coins',
      isBought: false,
      buy: () => {
        this.shopItems[5].isBought = true;
      },
      equip: () => {
        this.playerIcon = this.shopItems[5].img.replace('items', 'dachs');
      },
    },
    {
      text: 'Animeaugen',
      img: 'assets/shop/rare/items/augen/anime.png',
      cost: '999 Coins',
      isBought: false,
      buy: () => {
        this.shopItems[6].isBought = true;
      },
      equip: () => {
        this.playerIcon = this.shopItems[6].img.replace('items', 'dachs');
      },
    },
    {
      text: 'Cartoonaugen',
      img: 'assets/shop/rare/items/augen/cartoon.png',
      cost: '999 Coins',
      isBought: false,
      buy: () => {
        this.shopItems[7].isBought = true;
      },
      equip: () => {
        this.playerIcon = this.shopItems[7].img.replace('items', 'dachs');
      },
    },
    {
      text: 'Menschenaugen',
      img: 'assets/shop/rare/items/augen/mensch.png',
      cost: '999 Coins',
      isBought: false,
      buy: () => {
        this.shopItems[8].isBought = true;
      },
      equip: () => {
        this.playerIcon = this.shopItems[8].img.replace('items', 'dachs');
      },
    },
    {
      text: 'Wackelaugen',
      img: 'assets/shop/rare/items/augen/wackel.png',
      cost: '999 Coins',
      isBought: false,
      buy: () => {
        this.shopItems[9].isBought = true;
      },
      equip: () => {
        this.playerIcon = this.shopItems[9].img.replace('items', 'dachs');
        console.log(this.playerIcon);
      },
    },
  ];

  collectedItems = [
    {
      text: 'Saudi Agal',
      img: 'assets/shop/common/items/agal.png',
      isCollected: true,
      equip: () => {
        this.playerIcon = this.collectedItems[0].img.replace('items', 'dachs');
      },
    },
    {
      text: "'ne Kappe",
      img: 'assets/shop/common/items/kappe.png',
      isCollected: true,
      equip: () => {
        this.playerIcon = this.collectedItems[1].img.replace('items', 'dachs');
      },
    },
    {
      text: 'Fez aus Syrien',
      img: 'assets/shop/common/items/fez.png',
      isCollected: true,
      equip: () => {
        this.playerIcon = this.collectedItems[2].img.replace('items', 'dachs');
      },
    },
    {
      text: 'Wirless Kopfhörer',
      img: 'assets/shop/common/items/kopfhoerer.png',
      isCollected: true,
      equip: () => {
        this.playerIcon = this.collectedItems[3].img.replace('items', 'dachs');
      },
    },
    {
      text: 'Warme Mütze',
      img: 'assets/shop/common/items/muetze.png',
      isCollected: true,
      equip: () => {
        this.playerIcon = this.collectedItems[4].img.replace('items', 'dachs');
      },
    },
    {
      text: '🤡-Nase',
      img: 'assets/shop/common/items/nase.png',
      isCollected: true,
      equip: () => {
        this.playerIcon = this.collectedItems[5].img.replace('items', 'dachs');
      },
    },
    {
      text: 'Kanst du mich eh hören??',
      img: 'assets/shop/common/items/ohren.png',
      isCollected: true,
      equip: () => {
        this.playerIcon = this.collectedItems[6].img.replace('items', 'dachs');
      },
    },
    {
      text: '❄️Schaaal❄️',
      img: 'assets/shop/common/items/schal.png',
      isCollected: true,
      equip: () => {
        this.playerIcon = this.collectedItems[7].img.replace('items', 'dachs');
      },
    },
    {
      text: 'Die Sonne blendet!',
      img: 'assets/shop/common/items/sonnenbrille.png',
      isCollected: true,
      equip: () => {
        this.playerIcon = this.collectedItems[8].img.replace('items', 'dachs');
      },
    },
    {
      text: 'Brille in blau',
      img: 'assets/shop/common/items/brille/blau.png',
      isCollected: true,
      equip: () => {
        this.playerIcon = this.collectedItems[9].img.replace('items', 'dachs');
      },
    },
    {
      text: 'Brille in gelb',
      img: 'assets/shop/common/items/brille/gelb.png',
      isCollected: true,
      equip: () => {
        this.playerIcon = this.collectedItems[10].img.replace('items', 'dachs');
      },
    },
    {
      text: 'Brille in grün',
      img: 'assets/shop/common/items/brille/gruen.png',
      isCollected: true,
      equip: () => {
        this.playerIcon = this.collectedItems[11].img.replace('items', 'dachs');
      },
    },
    {
      text: 'Brille in rot',
      img: 'assets/shop/common/items/brille/rot.png',
      isCollected: true,
      equip: () => {
        this.playerIcon = this.collectedItems[12].img.replace('items', 'dachs');
      },
    },
  ];

  styleOfPlayer = 'hidden';
  clicked() {
    this.styleOfPlayer = this.styleOfPlayer === 'hidden' ? 'shown' : 'hidden';
  }
}
