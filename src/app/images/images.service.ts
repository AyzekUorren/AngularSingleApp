import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ImagesService {
  constructor(private http: HttpClient) { }

  getPhotoSets() {
    return this.http.get('http://localhost:8010/User/PhotoSets');
  }
}
