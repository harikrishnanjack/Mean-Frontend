import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { PostService } from '../modules/Post/services/post.service';

export function postTitleValidator(posts: PostService): AsyncValidatorFn {
  const postsPerPage = 2;
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return posts.getPosts(postsPerPage, 1).pipe(
      map((posts: any) => {
        const currentPost = posts.posts;
        const post = currentPost.find(
          (post: any) =>
            post.title.toLocaleLowerCase() === control.value.toLocaleLowerCase()
        );
        return post ? { titleExist: true } : null;
      })
    );
  };
}
