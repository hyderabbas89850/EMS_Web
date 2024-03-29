import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthGuard } from './shared/auth.guard';
import { LogoutComponent } from './components/logout/logout/logout.component';
import { AboutusComponent } from './components/aboutus/aboutus/aboutus.component';
import { HomeComponent } from './components/home/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path: 'userprofile',
        component: UserProfileComponent,
        data:{
          breadcrumb: []
        }
      },
      {
        path: 'aboutus',
        component: AboutusComponent,
        data:{
          breadcrumb: []
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}