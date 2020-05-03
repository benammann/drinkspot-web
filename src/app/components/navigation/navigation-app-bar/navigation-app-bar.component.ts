import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../service/authentication.service';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';

@Component({
  selector: 'app-navigation-app-bar',
  templateUrl: './navigation-app-bar.component.html',
  styleUrls: ['./navigation-app-bar.component.scss']
})
export class NavigationAppBarComponent implements OnInit {

  private routeData;

  constructor(private authentication: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.routeData = data.state.root.firstChild.data;
      }
    });
  }

  /**
   * Returns the current page title
   */
  getNavigationTitle(): string {
    if(this.routeData) {
      return this.routeData["title"]
    }
  }

  /**
   * Checks if the user is logged in
   */
  isLoggedIn(): boolean {
    return this.authentication.singedIn.getValue()
  }

  redirectToHome() {
    return this.router.navigate(["/"])
  }

  /**
   * Redirects to the profile page
   */
  redirectToProfile() {
    return this.router.navigate(['/my-profile'])
  }

  /**
   * Redirects to the login page
   */
  redirectToLogin() {
    return this.router.navigate(['/login'])
  }

  redirectToCreate() {
    return this.router.navigate(['/drink-spot/create'])
  }

}
