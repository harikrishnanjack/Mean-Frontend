import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from '../../Auth/service/auth.service';
import { Post } from '../interfaces/post.interface';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  posts: Post[] = [];
  totalPosts: number = 10;
  postsPerPage: number = 2;
  pageSizeOptions = [1, 2, 5, 10, 15];
  currentPage = 1;

  private authStatusSub!: Subscription;
  userIsAuthenticated = false;
  userId!: string;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.postService
      .getPosts(this.postsPerPage, this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.posts = data.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getStatusAuthListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  deletePost(post: Post) {
    this.postService.deletePost(post).subscribe((data: any) => {
      this.posts = this.posts.filter((data: any) => post?._id !== data._id);
    });
  }

  onChangedPage(postData: PageEvent) {
    console.log(postData);
    this.currentPage = postData.pageIndex + 1;
    this.postsPerPage = postData.pageSize;
    this.postService
      .getPosts(this.postsPerPage, this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log(data);
        this.posts = data.posts;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
