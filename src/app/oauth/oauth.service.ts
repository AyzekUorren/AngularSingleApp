import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OauthService {
  userData: any;

  constructor(private http: HttpClient) { }

  getOauthUrl() {
    return this.http.get('http://localhost:8010/OAuth/request');
  }
}
