import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ChannelComponent } from './pages/channel/channel.component';
import { UserGuard } from './guards/user/user.guard';
import { HomeComponent } from './pages/home/home.component';
import { MemberGuard } from './guards/member/member.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminUsersComponent } from './pages/admin/admin-users/admin-users.component';
import { AdminGroupsComponent } from './pages/admin/admin-groups/admin-groups.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'channels/:id',
    component: ChannelComponent,
    canActivate: [MemberGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [UserGuard, AdminGuard],
    children: [
      {
        path: 'users',
        component: AdminUsersComponent,
      },
      {
        path: 'groups',
        component: AdminGroupsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
