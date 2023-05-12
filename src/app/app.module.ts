import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ChannelComponent } from './pages/channel/channel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { messageReducer } from './state/messages/message.reducers';
import { MessageEffects } from './state/messages/message.effects';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { ErrorComponent } from './components/error/error.component';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChannelBadgeComponent } from './components/channel-badge/channel-badge.component';
import { ShortChannelPipe } from './pipes/short-channel.pipe';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { channelReducer } from './state/channels/channel.reducers';
import { ChannelEffects } from './state/channels/channel.effects';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { MessageComponent } from './components/message/message.component';
import { FullnamePipe } from './pipes/fullname.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChannelComponent,
    LoginComponent,
    ErrorComponent,
    NavbarComponent,
    SidebarComponent,
    ChannelBadgeComponent,
    ShortChannelPipe,
    HomeComponent,
    SidePanelComponent,
    MessageComponent,
    FullnamePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      { messages: messageReducer, channels: channelReducer },
      {}
    ),
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([MessageEffects, ChannelEffects]),
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatBadgeModule,
    MatTooltipModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
