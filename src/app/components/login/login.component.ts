import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginRequest} from '../../service/authentication.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginPending: boolean = true;

  public loginForm: FormGroup;

  public hidePassword: boolean = true;

  constructor(
    public authentication: AuthenticationService,
    private formBuilder: FormBuilder
  ) {

    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this.authentication.singedIn.subscribe({
      next: singedIn => {
        if(singedIn) {
          this.loginForm.reset();
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

    if(!this.loginForm.valid) {
      return
    }

    this.authentication.login(formData);
  }

}
