import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  constructor(private http: HttpClient) {}

  private globalEmail = new BehaviorSubject<string>('');
  emailObservable = this.globalEmail.asObservable();

  changeEmail = (newEmail: string) => {
    this.globalEmail.next(newEmail);
  };

  private globalCoinsCount = new BehaviorSubject<number>(0);
  coinsCountObservable = this.globalCoinsCount.asObservable();

  changeCoinsCount = (newCoinsCount: number) => {
    this.globalCoinsCount.next(newCoinsCount);
    this.setUserCoins();
  };

  getUserCoins = (callback: Function) => {
    interface ResponseMessage {
      message: string;
    }
    this.emailObservable.subscribe((userEmail) => {
      this.http
        .post(`/serverside/get-user-coins`, { email: userEmail })
        .subscribe((data: ResponseMessage) => {
          callback(data.message);
        });
    });
  };
  getCollectedItems = (callback: Function) => {
    interface ResponseMessage {
      message: string;
    }
    this.emailObservable.subscribe((userEmail) => {
      this.http
        .post(`/serverside/get-collected-items`, { email: userEmail })
        .subscribe((data: ResponseMessage) => {
          callback(data.message);
        });
    });
  };
  getBoughtItems = (callback: Function) => {
    interface ResponseMessage {
      message: string;
    }
    this.emailObservable.subscribe((userEmail) => {
      this.http
        .post(`/serverside/get-bought-items`, { email: userEmail })
        .subscribe((data: ResponseMessage) => {
          callback(data.message);
        });
    });
  };

  setUserCoins = () => {
    this.emailObservable.subscribe((userEmail) => {
      this.coinsCountObservable.subscribe((coinsCount) => {
        this.http
          .post(`/serverside/set-user-coins`, {
            email: userEmail,
            coins: coinsCount,
          })
          .subscribe((err) => {
            if (err) console.error(err);
          });
      });
    });
  };

  addToCollectedItems = (newCollectedItem: number) => {
    this.emailObservable.subscribe((userEmail) => {
      this.http
        .post(`/serverside/addto-collected-items`, {
          email: userEmail,
          item: newCollectedItem,
        })
        .subscribe((err) => {
          if (err) console.error(err);
        });
    });
  };
  addToBoughtItems = (newBoughtItem: number) => {
    this.emailObservable.subscribe((userEmail) => {
      this.http
        .post(`/serverside/addto-bought-items`, {
          email: userEmail,
          item: newBoughtItem,
        })
        .subscribe((err) => {
          if (err) console.error(err);
        });
    });
  };

  signUpCheck = (email: string, password: string) => {
    return this.http.post(`/serverside/signup/`, {
      email: email,
      password: password,
    });
  };

  isLoggedIn = (email: string) => {
    return this.http.post(`/serverside/getStatus`, {
      email: email,
    });
  };

  checkVerifyCode = (codeEntered: string, callback: Function) => {
    this.emailObservable.subscribe((email: string) => {
      interface ResponseMessage {
        message: string;
      }
      this.http
        .post(`/serverside/check-verify-code`, {
          email: email,
          code: codeEntered,
        })
        .toPromise()
        .then((data: ResponseMessage) => callback(data));
    });
  };
}
