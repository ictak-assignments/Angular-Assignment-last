import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class MyserviceService {
  constructor(private _http: HttpClient) {}
  submitRegister(user: any) {
    return this._http.post('http://localhost:3000/register', { user: user });
  }
}
