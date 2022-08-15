import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private router: Router) {}

  postUri: string = 'http://localhost:4001/api/posts';

  getPosts(postsPerPage: number, currentPage: number): Observable<Post[]> {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<Post[]>(this.postUri + queryParams);
  }

  getPost(id: string) {
    return this.http.get<Post>(this.postUri + '/' + id);
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    return this.http.post<Post>(this.postUri, postData);
  }

  deletePost(posts: Post) {
    return this.http.delete(this.postUri + '/' + posts._id);
  }

  updatePost(id: string, title: string, content: string, image: File) {
    let postData: Post | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        _id: id,
        title: title,
        content: content,
        imagePath: image,
      };
      console.log(postData, 'kkkkkkkkkk');
    }
    return this.http.put(this.postUri + '/' + id, postData);
  }
}
