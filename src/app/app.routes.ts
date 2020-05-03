import { Routes } from '@angular/router';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {LoginGuardGuard} from './guard/login-guard.guard';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {DrinkSpotCreateComponent} from './pages/drink-spot/drink-spot-create/drink-spot-create.component';

export const appRoutes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'my-profile',
    component: ProfilePageComponent,
    data: {
      title: 'My Profile'
    },
    canActivate: [LoginGuardGuard]
  },
  {
    path: 'drink-spot/create',
    component: DrinkSpotCreateComponent,
    data: {
      title: 'New Drink Spot'
    },
    canActivate: [LoginGuardGuard]
  }
];
