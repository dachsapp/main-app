import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../app-service.service';

@Component({
  selector: 'app-sign-up-screen',
  templateUrl: './sign-up-screen.component.html',
  styleUrls: ['./sign-up-screen.component.scss'],
})
export class SignUpScreenComponent implements OnInit {
  email: string;

  constructor(private router: Router, private service: AppServiceService) {}

  ngOnInit() {
    this.service.emailObservable.subscribe(
      (emailObserved) => (this.email = emailObserved)
    );

    interface ResponseMessage {
      message: string;
    }
    this.service
      .isLoggedIn(this.email)
      .toPromise()
      .then((data: ResponseMessage) => {
        if (data.message === 'logged-in') this.router.navigate(['/home']);
      });
  }

  pass = '';

  isPasswordWrong = false;
  isPasswordIllegal = false;

  allAllowdChars: string[];

  setAllowedChars = ($event) => {
    this.allAllowdChars = $event;
  };

  //? SHOW PASSWORD SESSION
  showPassword = false;
  toggleShowPassword = () => {
    this.showPassword = !this.showPassword;
  };

  rightEmailInputValue = '';

  buttonDisabled = 'disabled';

  isAnyInputEmpty = false;
  isPassInputEmpty = true;
  isEmailInputEmpty = true;
  updateIsAnyInputEmpty = () =>
    (this.isAnyInputEmpty =
      this.isPassInputEmpty || this.isEmailInputEmpty ? true : false);

  //? tests if email uses illigal chars
  hasIlliglEmailChars = (string: string): boolean => {
    let allowdLetters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.@!#$%&'*+-/=?^_`{|}~";
    for (let letter of string) {
      if (!allowdLetters.includes(letter)) return true;
    }
    return false;
  };

  //? test if there's more than one @-sign
  hasJustOneAt = (string: string): boolean => {
    let stringWithoutAts = string.replace('@', '');
    return stringWithoutAts.length + 1 < string.length ? false : true;
  };

  //? tests if arrayValues are all equal
  equalValues = (array: any[]): boolean =>
    array.every((value: any) => value === array[0]);
  //? tests if email includes . after the @-sign
  missingDOTsomething = (emailString: string) =>
    !emailString.split('@')[1].includes('.') ? true : false;
  //? asigns same value to every element
  assignValueToEveryElement = (array: any[], value: any) =>
    array.map((el: any) => (el = value));

  /* 
    ? These are the warnings that you would get, if the email
    ? has illigal values or is missing something
    ? cssEmailW stands for "css email warnings"
    ? The reason is that the input is getting changed in css
  */
  cssEmailW = {
    forgot_AT: '',
    forgot_DOT: '',
    missing_words: '',
    missing_DOTsomething: '',
    illigal_chars: '',
    more_than_one_at: '',
    warning: '', //holds the status
  };

  emailClassList = 'divOverInput';

  generateEmailClassList = (listOfCSSWarnings: string[]) => {
    this.emailClassList = 'divOverInput';
    for (let warning of listOfCSSWarnings) {
      this.emailClassList = `${this.emailClassList} ${warning}`;
    }
  };

  //? runs when the the focus on the email-input was lost
  emailInputChanged = (enteredEmail: string) => {
    this.email = enteredEmail;

    this.cssEmailW.illigal_chars = this.hasIlliglEmailChars(enteredEmail)
      ? 'illigalEmailChars'
      : '';
    this.cssEmailW.more_than_one_at = !this.hasJustOneAt(enteredEmail)
      ? 'moreThanOneAt'
      : '';
    this.cssEmailW.forgot_AT = !enteredEmail.includes('@') ? 'forgotAT' : '';
    this.cssEmailW.forgot_DOT = !enteredEmail.includes('.') ? 'forgotDOT' : '';
    if (this.cssEmailW.forgot_AT === '') {
      this.cssEmailW.missing_DOTsomething = this.missingDOTsomething(
        enteredEmail
      )
        ? 'missingEnding'
        : '';
    }
    this.cssEmailW.missing_words =
      enteredEmail.includes('@.') ||
      enteredEmail.includes('.@') ||
      enteredEmail.endsWith('.') ||
      enteredEmail.endsWith('@') ||
      enteredEmail.startsWith('.') ||
      enteredEmail.startsWith('@')
        ? 'missingWords'
        : '';

    this.cssEmailW.warning = !this.equalValues(
      Object.values(this.cssEmailW).filter((value) => value !== 'warning')
    )
      ? 'warning'
      : '';

    //final part
    this.isEmailInputEmpty = false;
    if (enteredEmail === '') {
      this.isEmailInputEmpty = true;
      Object.keys(this.cssEmailW).forEach(
        (keyname) => (this.cssEmailW[keyname] = '')
      );

      this.generateEmailClassList(Object.values(this.cssEmailW));
    }
    this.updateIsAnyInputEmpty();

    this.generateEmailClassList(Object.values(this.cssEmailW));

    this.buttonDisabled = '';
    if (this.cssEmailW.warning === 'warning' || this.isAnyInputEmpty) {
      this.buttonDisabled = 'disabled';
    }
  };

  cssPassW = {
    too_short: '',
    too_long: '',
    illegal_char: '',
    wrong: '',
    illegal: '',
    warning: '',
  };

  passClassList = 'divOverInput';
  generatePassClassList = (listOfCSSWarnings: string[]) => {
    this.passClassList = 'divOverInput';
    for (let warning of listOfCSSWarnings) {
      this.passClassList = `${this.passClassList} ${warning}`;
    }
  };

  handlePassWornings = () => {
    this.cssPassW.warning = !this.equalValues(
      Object.values(this.cssPassW).filter((value) => value !== 'warning')
    )
      ? 'warning'
      : '';
  };

  //? tests passwordd
  testPasswordRequirements = (passwordValue: string) => {
    this.cssPassW.wrong = '';
    this.cssPassW.illegal = '';

    this.cssPassW.too_short = passwordValue.length < 6 ? 'tooShort' : '';
    this.cssPassW.too_long = passwordValue.length > 32 ? 'tooLong' : '';
    for (let letter of passwordValue) {
      if (
        !"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()_-=+{}[]|;:/?.`'".includes(
          letter
        )
      ) {
        this.cssPassW.illegal_char = 'illigalChar';
        break;
      } else {
        this.cssPassW.illegal_char = '';
      }
    }

    this.handlePassWornings();

    this.isPassInputEmpty = false;
    if (passwordValue == '') {
      this.isPassInputEmpty = true;
      Object.keys(this.cssPassW).forEach(
        (keyname) => (this.cssPassW[keyname] = '')
      );
      this.generatePassClassList(Object.values(this.cssPassW));
    }
    this.updateIsAnyInputEmpty();

    this.generatePassClassList(Object.values(this.cssPassW));

    this.buttonDisabled = '';
    if (this.cssPassW.warning === 'warning' || this.isAnyInputEmpty) {
      this.buttonDisabled = 'disabled';
    }
  };

  //? runs when the the focus on the password-input was lost
  passwordInputChanged = (enteredPassword: string) => {
    this.testPasswordRequirements(enteredPassword);
    this.pass = enteredPassword;
  };

  lengthOfPassword = 16;

  //? gets a random element of an array
  getRandomInArray = (array: any[]): any => {
    let last = array.length;
    let rand = Math.floor(Math.random() * last);
    return array[rand];
  };

  //? generates a random password
  generateRandom = (allowdSymbols: string[]): string => {
    let returnedArray: string[] = [];
    for (let i = 0; i < this.lengthOfPassword; i++) {
      returnedArray.push(this.getRandomInArray(allowdSymbols));
    }
    return returnedArray.join('');
  };

  //? this variable is needed to check for double-click
  clickedDBL = false;

  passwordFieldValue = '';

  //? generate random password
  generateRandomPassword = () => {
    if (!this.showPassword) {
      this.toggleShowPassword();
      setTimeout(() => {
        this.toggleShowPassword();
      }, 1000);
    }

    this.passwordFieldValue = this.generateRandom(this.allAllowdChars);
    this.passwordInputChanged(this.passwordFieldValue);
  };

  positionOfFurtherGRPOptions = 'top: 5px; left: 10px';

  //? this handles the visiblility of the furtherGRPOptions (further generate random password options)
  visiblityClass = 'hidden';
  focusBody = () => {
    this.visiblityClass = 'hidden';
  };
  activate = () => {
    this.visiblityClass = 'visible';
  };

  showFurtherGRPOptions = (e: MouseEvent) => {
    //? no need to fire normal click action, cause double-click was fired
    e.preventDefault();
    //? show
    this.activate();

    //? setting position with css-styling-string
    this.positionOfFurtherGRPOptions = `top: ${e.y}px; left: ${e.x}px`;
  };

  //? updates the length according to the furtherGRPOption selection
  updatePasswordLength = ($event: number) => {
    this.lengthOfPassword = $event;
  };

  // handle registration
  handleRegistration = () => {
    this.buttonDisabled = 'disabled';
    interface ResponseMessage {
      message: string;
    }

    this.service
      .signUpCheck(this.email, this.pass)
      .toPromise()
      .then((data: ResponseMessage) => {
        if (data.message === 'login-success') {
          this.service.changeEmail(this.email);
          this.isPasswordWrong = false;
          this.router.navigate(['/home']);
        }
        if (data.message === 'login-nosuccess') {
          this.cssPassW.wrong = 'passwordWrong';
          this.handlePassWornings();
          this.generatePassClassList(Object.values(this.cssPassW));
        }
        if (data.message === 'register-pass-illegal') {
          this.cssPassW.illegal = 'passwordIllegal';
          this.handlePassWornings();
          this.generatePassClassList(Object.values(this.cssPassW));
        }
        if (data.message === 'verify-code-waiting') {
          this.service.changeEmail(this.email);
          this.router.navigate(['verify-code']);
        }
        if (data.message === 'email-not-sent') {
          alert(
            'Es konnte Ihnen keine Bestätigungsemail geschickt werden... Sind Sie sich sicher, dass sie Ihre Emailadresse richtig eingegeben haben?'
          );
        }
        if (data.message === 'user-not-added') {
          alert(
            'Der User konnte nicht gespeichert werden... Wahrscheinlich ist es ein Bug'
          );
        }
        this.buttonDisabled = '';
      });
  };
}
