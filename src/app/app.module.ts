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
import { NavbarComponent } from './pages/shared/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './pages/shared/sidebar/sidebar.component';
import { ChannelBadgeComponent } from './pages/shared/sidebar/channel-badge/channel-badge.component';
import { ShortChannelPipe } from './pipes/short-channel.pipe';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { channelReducer } from './state/channels/channel.reducers';
import { ChannelEffects } from './state/channels/channel.effects';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { MessageComponent } from './pages/channel/message/message.component';
import { FullnamePipe } from './pipes/fullname.pipe';
import { LoginEffects } from './state/login/login.effects';
import { loginReducer } from './state/login/login.reducers';
import { AdminComponent } from './pages/admin/admin.component';
import { SidePanelComponent } from './pages/shared/side-panel/side-panel.component';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminGroupsComponent } from './pages/admin/admin-groups/admin-groups.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateUserDialogComponent } from './pages/admin/admin-users/create-user-dialog/create-user-dialog.component';
import { userReducer } from './state/users/user.reducers';
import { UserEffects } from './state/users/user.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListComponent } from './pages/shared/list/list.component';
import { roleReducer } from './state/role/role.reducers';
import { DataTableComponent } from './pages/shared/data-table/data-table.component';
import { GroupViewComponent } from './pages/admin/admin-groups/group-view/group-view.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UpdateUserDialogComponent } from './pages/admin/admin-users/update-user-dialog/update-user-dialog.component';
import { AddMemberDialogComponent } from './pages/admin/admin-groups/add-member-dialog/add-member-dialog.component';
import { SearchBarComponent } from './pages/shared/search-bar/search-bar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddGroupDialogComponent } from './pages/admin/admin-groups/add-group-dialog/add-group-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { groupReducer } from './state/group/group.reducers';
import { GroupEffects } from './state/group/group.effects';
import { RoleEffects } from './state/role/role.effects';
import { MatChipsModule } from '@angular/material/chips';
import { RolePipe } from './pipes/role.pipe';

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
    MessageComponent,
    FullnamePipe,
    AdminComponent,
    SidePanelComponent,
    AdminUsersComponent,
    AdminGroupsComponent,
    CreateUserDialogComponent,
    ListComponent,
    DataTableComponent,
    GroupViewComponent,
    UpdateUserDialogComponent,
    AddMemberDialogComponent,
    SearchBarComponent,
    AddGroupDialogComponent,
    RolePipe,
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
        groups: groupReducer,
        roles: roleReducer,
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
      GroupEffects,
      RoleEffects,
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
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
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
