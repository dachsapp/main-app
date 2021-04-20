import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  constructor(private http: HttpClient) {}

  sendMail = (email: string, password: string) => {
    return this.http.post(`/serverside/sendMail/`, {
      email: email,
      password: password,
    });
  };
}
