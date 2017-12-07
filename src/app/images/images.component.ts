import { Component, OnInit } from '@angular/core';
import {ImagesService} from './images.service';


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.less'],
  providers: [ImagesService]
})
export class ImagesComponent implements OnInit {
  photoSets: any;
  private Width: number;

  constructor(private imgagesService: ImagesService) {

  }

  getPhotoSets() {
    this.imgagesService.getPhotoSets().subscribe(data => {
      this.photoSets = (data as any).photosets.photoset.map(function (el) {
        const size = 'h';
        const url = 'https://farm' + el.farm + '.staticflickr.com/' + el.server + '/' + el.primary + '_' + el.secret;
        const id = el.id;
        const title = el.title._content;
        const description = el.description._content;
        const value = {url, id, title, description};
        console.log(el);
        console.log(value);
        return value;
      });
    });
  }

  ngOnInit() {
    this.Width = window.innerWidth;
  }

}
