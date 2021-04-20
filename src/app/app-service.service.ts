import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  constructor(private http: HttpClient) {}

  sendMail = (email: string) => {
    console.log('Email in service: ' + email);
    return this.http.get(`/serverside/sendMail/${email}`);
  };
}
