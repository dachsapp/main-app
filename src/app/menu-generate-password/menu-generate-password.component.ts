import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

let maxLength: number = 32;
let minLength: number = 6;
@Component({
  selector: 'app-menu-generate-password',
  templateUrl: './menu-generate-password.component.html',
  styleUrls: ['./menu-generate-password.component.scss'],
})
export class MenuGeneratePasswordComponent implements OnInit {
  //? UC = Upper Case
  //? LC = Lower Case
  allowdLCLettersStr = 'abcdefghijkmnopqrstuvwxyz';
  allowdUCLettersStr = 'ABCDEFGHJKMNPQRSTUVWXYZ';
  allowdSpecCharsStr = `~!@#$%^&*()_-=+{}[]|;:/?.\`'`; //? spec = special
  allowdBadChars = 'O01lI';

  allowdLCLetters = this.allowdLCLettersStr.split('');
  allowdUCLetters = this.allowdUCLettersStr.split('');
  allowdSpecChars = this.allowdSpecCharsStr.split('');
  allowdNumbers = ['2', '3', '4', '5', '6', '7', '8', '9'];

  allAllowdChars: string[] = [
    ...this.allowdLCLetters,
    ...this.allowdUCLetters,
    ...this.allowdNumbers,
    ...this.allowdSpecChars,
  ];

  // inputs
  @Input() topLeftStyling: string;
  @Input() visiblityClass: string;

  // outputs
  @Output() enteredLength = new EventEmitter<number>();
  @Output() allowedLetters = new EventEmitter<string[]>();

  passOnAllowdLetters = () => {
    this.allowedLetters.emit(this.allAllowdChars);
  };

  // onInit
  ngOnInit() {
    //? emit default allowed characters
    this.passOnAllowdLetters();
  }

  //? handle password-length input
  numberOfInput: number = 16;
  passOnPasswordLength = () => {
    this.enteredLength.emit(this.numberOfInput);
  };
  updatePasswordLength = (newPasswordLength: any) => {
    this.numberOfInput = parseInt(newPasswordLength.value);
    if (this.numberOfInput > maxLength) this.numberOfInput = maxLength;
    if (this.numberOfInput < minLength) this.numberOfInput = minLength;
    this.passOnPasswordLength();
  };
  higherNumberOfInput = () => {
    if (this.numberOfInput < maxLength) {
      this.numberOfInput = this.numberOfInput + 1;
      this.passOnPasswordLength();
    }
  };
  lowerNumberOfInput = () => {
    if (this.numberOfInput > minLength) {
      this.numberOfInput = this.numberOfInput - 1;
      this.passOnPasswordLength();
    }
  };

  //? handle allowed letters
  wantNumbers = true;
  wantLCLetters = true;
  wantUCLetters = true;
  wantSpecChars = true;
  wantBadChars = false;

  //? text of restriction
  filter = 'nofilter';
  butFilterText = '';
  justFilterText = '';

  disabledButInput = '';
  disabledJustInput = '';

  updateWantetChars = () => {
    this.allAllowdChars = [];
    if (this.wantNumbers) this.allAllowdChars.push(...this.allowdNumbers);
    if (this.wantLCLetters) this.allAllowdChars.push(...this.allowdLCLetters);
    if (this.wantUCLetters) this.allAllowdChars.push(...this.allowdUCLetters);
    if (this.wantSpecChars) this.allAllowdChars.push(...this.allowdSpecChars);
    if (this.wantBadChars) this.allAllowdChars.push(...this.allowdBadChars);

    if (this.filter !== 'nofilter') {
      if (this.filter === 'but') {
        for (let char of this.butFilterText) {
          if (this.allAllowdChars.includes(char)) {
            this.allAllowdChars = this.allAllowdChars.filter(
              (letterFiltered: string) => letterFiltered !== char
            );
          }
        }
      }

      if (this.filter === 'just') {
        this.allAllowdChars = this.justFilterText.split('');
      }
    }

    this.passOnAllowdLetters();
  };

  updateFilterText = (newText: string, filterString: string) => {
    if (newText === '') this.filter = 'nofilter';

    if (filterString == 'but') {
      this.disabledJustInput = '';
      if (newText !== '') {
        this.filter = 'but';
        this.disabledJustInput = 'disabled';
      }
      this.butFilterText = newText;
    }
    if (filterString == 'just') {
      this.disabledButInput = '';
      if (newText !== '') {
        this.filter = 'just';
        this.disabledButInput = 'disabled';
      }
      this.justFilterText = newText;
    }
    this.updateWantetChars();
  };

  changeWantNumbers = () => {
    this.wantNumbers = !this.wantNumbers;
    this.updateWantetChars();
  };
  changeWantLCLetters = () => {
    this.wantLCLetters = !this.wantLCLetters;
    this.updateWantetChars();
  };
  changeWantUCLetters = () => {
    this.wantUCLetters = !this.wantUCLetters;
    this.updateWantetChars();
  };
  changeWantSpecChars = () => {
    this.wantSpecChars = !this.wantSpecChars;
    this.updateWantetChars();
  };
  changeWantBadChars = () => {
    this.wantBadChars = !this.wantBadChars;
    this.updateWantetChars();
  };

  //? handle showing correct page
  // setShownElements = 'class1';

  // textOfRestriction = 'keine genauere Angaben';
  // chooseRadio = (radioGot: number) => {
  //   if (radioGot === 1) {
  //     this.textOfRestriction = 'keine genauere Angaben';
  //     this.filter = 'nofilter;';
  //   }
  //   if (radioGot === 2) {
  //     this.textOfRestriction = 'gestellte Zeichen außer:';
  //     this.filter = 'but';
  //   }
  //   if (radioGot === 3) {
  //     this.textOfRestriction = 'nur folgende Zeichen:';
  //   }
  //     this.filter = 'just';
  //   this.setShownElements = `class${radioGot.toString()}`;
  // };
}
