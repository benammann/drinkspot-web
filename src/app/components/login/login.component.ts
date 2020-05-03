import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginRequest} from '../../service/authentication.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    public authentication: AuthenticationService,
    private formBuilder: FormBuilder
  ) {

    this.loginForm = this.formBuilder.group({
      'username': '',
      'password': ''
    })

  }

  ngOnInit(): void {
    this.authentication.singedIn.subscribe({
      next: singedIn => {
        if(singedIn) {
          this.loginForm.disable()
        } else {
          this.loginForm.enable()
        }
      }
    })
  }

  /**
   *
   * @param formData
   */
  handleLoginFormSubmit(formData: LoginRequest) {
    this.loginForm.reset();
    this.authentication.login(formData);
  }

}
