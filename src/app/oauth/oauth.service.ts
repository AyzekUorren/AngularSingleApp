import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OauthService {
  constructor(private http: HttpClient) { }

  getUserInfo() {
    return this.http.get('http://localhost:8010/t3');
  }
  getOauthUrl() {
    return this.http.get('http://localhost:8010/OAuth/request');
  }
}
