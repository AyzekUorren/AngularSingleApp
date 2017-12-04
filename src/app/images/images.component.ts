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

  constructor(private imgagesService: ImagesService) { }

  getPhotoSets() {
    this.imgagesService.getPhotoSets().subscribe(data => {
      this.photoSets = (data as any).photosets.photoset.map(function (el) {
        console.log(el.farm);
        const size = 'b';
        return 'https://farm' + el.farm + '.staticflickr.com/' + el.server + '/' + el.primary + '_' + el.secret + '_' + size + '.jpg';
      });
    });
  }

  ngOnInit() {
  }

}
