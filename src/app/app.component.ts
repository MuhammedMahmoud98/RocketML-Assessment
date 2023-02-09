import {
  Component, HostListener, OnDestroy, OnInit,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil, tap } from 'rxjs/operators';
import { GetPosts } from './store/actions/post.action';
import {
  getPostsSelector,
  hasErrorSelector,
  isCommentsLoadingSelector,
  isPostsLoadingSelector,
} from './store/selectors/posts.selector';
import { Post } from './models/post.model';
import {PostsService} from "./services/posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isPostsLoading$: Observable<boolean>;

  posts$: Observable<Post[]>;

  sideBarMode: MatDrawerMode = 'side';

  destroyed$: Subject<boolean> = new Subject<boolean>();

  isCommentsLoading$: Observable<boolean>;

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar,
    protected readonly postsService: PostsService,
  ) {
  }

  ngOnInit() {
    this.adjustSideBarOnMobileScreen();
    this.postsSelectors();
    this.loadAllPosts();
    this.hasErrorListener();
    this.selectCommentsLoading();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
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

  hasErrorListener() {
    this.store.pipe(
      select(hasErrorSelector),
      tap((hasErrorValue) => {
        if (hasErrorValue) {
          this.postsService.newPostAudio('error.mp3');
          this.snackBar.open('An Error has been occurred!', '', {
            panelClass: 'failed-snack-bar',
            duration: 2000,
          });
        }
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  selectCommentsLoading(): void {
    this.isCommentsLoading$ = this.store.select(isCommentsLoadingSelector);
  }
}
