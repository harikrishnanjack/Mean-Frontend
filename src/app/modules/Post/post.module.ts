import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../Auth/auth.guard';

@NgModule({
  declarations: [PostCreateComponent, PostListComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PostModule {}
