import {Component, Input, OnInit} from '@angular/core';
import {OauthService} from './oauth.service';

@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.less'],
  providers: [OauthService]
})
export class OauthComponent implements OnInit {
  oauthData: {};
  Width: number;
  userInfo: any;

  private static OpenConnectPage(url: any) {
    if (url !== undefined) {
      const strUrl = url;
      const regExp = new RegExp('flickr', 'g');
      if (strUrl.match(regExp)) {
        window.open(strUrl, '_top');
      }
    }
  }

  constructor(private oauthService: OauthService) {
  }

  connectToFlickt() {
  this.oauthService.getOauthUrl().subscribe( data => {
  console.log(data);
  this.oauthData = data;
  if ( data.hasOwnProperty('url') ) {
  OauthComponent.OpenConnectPage((data as any).url);
  }
});
}
  getUserinfo() {
    this.oauthService.getUserInfo().subscribe( data => {
     this.userInfo = (data as any).user;
     console.log((data as any).user);
    });
  }

  ngOnInit() {
    this.Width = window.innerWidth;
  }

}
