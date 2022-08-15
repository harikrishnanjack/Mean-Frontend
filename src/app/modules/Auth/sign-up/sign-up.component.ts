import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;
    const payload = {
      email,
      password,
    };
    console.log(payload);
    this.authService.createUser(payload);
  }
}
