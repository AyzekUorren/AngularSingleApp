import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { OauthComponent } from './oauth/oauth.component';
import { RouterModule } from '@angular/router';
import { ImagesComponent } from './images/images.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OauthComponent,
    ImagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'images',
        component: ImagesComponent
      },
      {
        path: 'oauth',
        component: OauthComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
