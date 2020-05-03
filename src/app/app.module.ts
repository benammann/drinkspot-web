import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import {GraphQLModule} from './graphql.module';
import { NavigationAppBarComponent } from './components/navigation/navigation-app-bar/navigation-app-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DrinkSpotCreateComponent } from './pages/drink-spot/drink-spot-create/drink-spot-create.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    LoginPageComponent,
    ProfilePageComponent,
    NavigationAppBarComponent,
    DrinkSpotCreateComponent
  ],
  imports: [

    GraphQLModule,

    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSnackBarModule,

    // routing
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
    }),
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatSelectModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
