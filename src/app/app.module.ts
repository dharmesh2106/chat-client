import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserService } from './shared/service/user.service';
import { ChannelService } from './shared/service/channel.service';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { MessageService } from './shared/service/message.service';

import {
  SocialLoginModule, AuthServiceConfig,

} from 'angularx-social-login';
import { myRxStompConfig } from './my-rx-stomp.config';

const config = new AuthServiceConfig([

]);

export function socialConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule
  ],
  providers: [
    UserService,
    ChannelService,
    MessageService,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
    {
      provide: AuthServiceConfig,
      useFactory: socialConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
