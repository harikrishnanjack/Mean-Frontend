import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
