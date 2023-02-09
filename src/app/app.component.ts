import {Component, HostListener, OnInit} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetPosts } from './store/actions/post.action';
import { getPostsSelector, isPostsLoadingSelector } from './store/selectors/posts.selector';
import { Post } from './models/post.model';
import {MatDrawerMode} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isPostsLoading$: Observable<boolean>;

  posts$: Observable<Post[]>;

  sideBarMode: MatDrawerMode = 'side';

  constructor(
    private readonly store: Store,
  ) {
  }

  ngOnInit() {
    this.adjustSideBarOnMobileScreen();
    this.postsSelectors();
    this.loadAllPosts();
  }

  loadAllPosts(): void {
    this.store.dispatch(GetPosts());
  }

  postsSelectors(): void {
    this.isPostsLoading$ = this.store.pipe(select(isPostsLoadingSelector));
    this.posts$ = this.store.pipe(select(getPostsSelector));
  }

  @HostListener('window:resize', ['$event'])
  windowResizeListener(event) {
    if (event.target.innerWidth > 767) {
      this.sideBarMode = 'side';
    } else {
      this.sideBarMode = 'over';
    }
  }

  adjustSideBarOnMobileScreen() {
    if (window.innerWidth > 767) {
      this.sideBarMode = 'side';
    } else {
      this.sideBarMode = 'over';
    }
  }
}
