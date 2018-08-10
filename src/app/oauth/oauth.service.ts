import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OauthService {
  constructor(private http: HttpClient) {
  }
  getUserInfo() {
    return this.http.get( this.getAPIurl() + '/OAuth/userInfo');
  }
  getOauthUrl() {
    return this.http.get( this.getAPIurl() + '/OAuth/request');
  }
  getPhotoSets() {
    return this.http.get( this.getAPIurl() + '/User/PhotoSets');
  }
  getAPIurl(){
    return 'http://localhost:8010/api';
  }
}
