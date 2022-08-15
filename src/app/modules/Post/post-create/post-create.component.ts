import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { mimeType } from 'src/app/validators/mimetype-validator';
// import { postTitleValidator } from 'src/app/validators/post-title-validators';
import { postTitleValidator } from '../../../validators/post-title-validators';
import { Post } from '../interfaces/post.interface';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  postForm!: FormGroup;
  imagePreview!: any;
  private mode = 'create';
  private postId!: any;
  post!: Post;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
        // asyncValidators: [postTitleValidator(this.postService)],
      }),
      content: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        console.log(this.postId, 'iddddddd');
        this.postService.getPost(this.postId).subscribe((data: any) => {
          this.post = {
            title: data.title ?? '',
            content: data.content ?? '',
            imagePath: data.imagePath ?? '',
          };
          this.postForm.patchValue({
            title: this.post.title ?? '',
            content: this.post.content ?? '',
            image: this.post.imagePath ?? '',
          });
          this.imagePreview = this.post.imagePath;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  get f() {
    return this.postForm.controls;
  }

  onImagePicked(event: Event) {
    const file = (event?.target as HTMLInputElement | any)?.files[0];
    this.postForm.patchValue({ image: file });
    this.postForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmitPost = () => {
    this.postForm.markAllAsTouched();
    if (this.postForm.invalid) {
      return;
    }
    const { title, content, image } = this.postForm.value;
    if (this.mode === 'create') {
      this.postService.addPost(title, content, image).subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/']);
      });
    } else {
      this.postService
        .updatePost(this.postId, title, content, image)
        .subscribe((data: any) => {
          this.router.navigate(['/']);
        });
    }
  };
}
