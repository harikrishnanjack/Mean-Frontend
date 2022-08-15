import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;
    const payload = {
      email,
      password,
    };
    console.log(payload);
    this.authService.loginUser(payload);
  }
}
