import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LoginState } from './store/reducers/login.reducer';
import { GetPosts } from './store/actions/post.action';
import { getPostsSelector, isPostsLoadingSelector } from './store/selectors/posts.selector';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isPostsLoading$: Observable<boolean>;

  posts$: Observable<Post[]>;

  constructor(
    private readonly store: Store,
  ) {
  }

  ngOnInit() {
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
}
