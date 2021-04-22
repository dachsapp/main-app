import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  sendMail = (email: string, password: string) => {
    return this.http.post(`/serverside/sendMail/`, {
      email: email,
      password: password,
    });
  };

  isLoggedIn = (email: string) => {
    return this.http.post(`/serverside/getStatus`, {
      email: email,
    });
  };
}
