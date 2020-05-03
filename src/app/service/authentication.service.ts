import {Injectable, OnInit} from '@angular/core';
import {LoginRequest, LoginResponse, RegisterRequest, RenewTokenRequest, RenewTokenResponse} from './authentication.types';
import {environment} from '../../environments/environment';

import jwtDecode from 'jwt-decode';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // holds the login state
  public singedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // holds the jwt token
  public jwtToken: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // holds the jwt token renewal timeout
  // this is based on the token expiration date delivered by the server
  private jwtTokenRenewalTimeout: any = null;

  /**
   * @param httpClient
   * @param snackBar
   */
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {

    // subscribes to a jwt token change
    // to initialize the renewal timeout
    this.jwtToken.subscribe(jwtToken => {

      // clear the timeout if there is any
      if(this.jwtTokenRenewalTimeout) {
        clearTimeout(this.jwtTokenRenewalTimeout)
      }

      // check if a jwt token has been set
      if(!jwtToken || jwtToken === '') {
        return;
      }

      // extract the expiration timestamp
      const {exp} = jwtDecode<{exp: number}>(jwtToken);

      // renew 30 seconds before expiration
      const timeUtilRenewal = ((exp - (Date.now() / 1000)) - 30) * 1000;

      // renews the JWT token
      this.jwtTokenRenewalTimeout = setTimeout(this.renewToken.bind(this), timeUtilRenewal)

    })

  }

  public register(request: RegisterRequest) {

  }

  /**
   * Performs a login action
   * @param request
   */
  public login(request: LoginRequest) {

    this.httpClient.post<LoginResponse>(`${environment.authEndpoint}/login`, request)
      .subscribe({
        next: this.handleTokenizedResponse.bind(this),
        error: this.handleHTTPError.bind(this)
      });

  }

  /**
   * Renews the current JWT token
   */
  public renewToken() {

    const requestBody: RenewTokenRequest = {token: this.jwtToken.value};
    this.httpClient.post<RenewTokenResponse>(`${environment.authEndpoint}/renew-token`, requestBody)
      .subscribe({
        next: this.handleTokenizedResponse.bind(this),
        error: this.handleHTTPError.bind(this)
      });

  }

  /**
   * Handles a response including a token
   * @param response
   */
  private handleTokenizedResponse(response: RenewTokenResponse|LoginResponse) {

    // deconstructing
    const {error, token} = response;

    // check if the response is successful
    if(!error && token) {

      // show the notification in case the user was not singed in
      if(!this.jwtToken.value || !this.singedIn.value) {
        this.snackBar.open("You are now singed in")
      }

      // set the new JWT token
      this.jwtToken.next(token);

      // update the login variable only if it really changes
      // this allows to subscribe to change events
      if(!this.singedIn.value) {
        this.singedIn.next(true);
      }

    }

    // otherwise logout the user
    if(error && !token) {

      this.jwtToken.next("");

      // update the login variable only if it really changes
      // this allows to subscribe to change events
      if(this.singedIn.value) {
        this.singedIn.next(false);
      }

    }

  }


  /**
   *
   * @param error
   */
  private handleHTTPError(error) {
    this.snackBar.open(error.error.error, 'close', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
    this.jwtToken.next("");
    this.singedIn.next(false)
  }

}
