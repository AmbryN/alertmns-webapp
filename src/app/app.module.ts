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
import { ChannelSidePanelComponent } from './pages/channel/channel-side-panel/channel-side-panel.component';
import { MessageComponent } from './components/message/message.component';
import { FullnamePipe } from './pipes/fullname.pipe';
import { LoginEffects } from './state/login/login.effects';
import { loginReducer } from './state/login/login.reducers';
import { AdminComponent } from './pages/admin/admin.component';
import { SidePanelComponent } from './pages/admin/side-panel/side-panel.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminGroupsComponent } from './pages/admin/admin-groups/admin-groups.component';
import { MatTableModule } from '@angular/material/table';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './pages/admin/dialog/dialog.component';
import { userReducer } from './state/users/user.reducers';
import { UserEffects } from './state/users/user.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    ChannelComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    ChannelBadgeComponent,
    ShortChannelPipe,
    HomeComponent,
    ChannelSidePanelComponent,
    MessageComponent,
    FullnamePipe,
    AdminComponent,
    SidePanelComponent,
    AdminUsersComponent,
    AdminGroupsComponent,
    IconButtonComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        messages: messageReducer,
        channels: channelReducer,
        login: loginReducer,
        users: userReducer,
      },
      {}
    ),
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([
      MessageEffects,
      ChannelEffects,
      LoginEffects,
      UserEffects,
    ]),
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
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
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
