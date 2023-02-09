import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {takeUntil, tap} from 'rxjs/operators';
import { Post } from '../../../../models/post.model';
import { PostsDialogueComponent } from '../../../../shared/components/posts-dialogue/posts-dialogue.component';
import { ActiveSelectedPost } from '../../../../store/actions/post.action';
import { GetComments } from '../../../../store/actions/comments.action';
import { getFetchedPostsIds } from '../../../../store/selectors/posts.selector';
import {Subject} from "rxjs";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit, OnDestroy {
  @Input() posts: Post[];

  searchForm: FormGroup;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly dialog: MatDialog, private readonly store: Store) { }

  ngOnInit(): void {
    this.createSearchForm();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  createSearchForm(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    });
  }

  get getSearchValue() {
    return this.searchForm.get('search').value;
  }

  openDialog(mode, post: Partial<Post> = {}) {
    const dialogRef = this.dialog.open(
      PostsDialogueComponent,
      {
        panelClass: 'custom-dialog-container',
        width: '600px',
        data: {
          dialogTitle: mode === 'add' ? 'Add post dialog' : 'Edit post dialog',
          mode,
          post,
        },
      },
    );
  }

  trackByFn(index): number {
    return index;
  }

  deletePost(post: Post, i: number, mode: string = 'delete') {
    const { id, title } = post;
    this.dialog.open(PostsDialogueComponent, {
      panelClass: 'custom-dialog-container',
      width: '600px',
      data: {
        dialogTitle: 'Delete post dialog',
        title,
        id,
        i,
        mode,
      },
    });
  }

  selectPost(postId?: number) {
    this.store.pipe(
      select(getFetchedPostsIds),
      tap((fetchedIds) => {
        this.store.dispatch(ActiveSelectedPost({ postId }));
        if (!fetchedIds.includes(postId)) {
          this.store.dispatch(GetComments({ postId }));
        }
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }
}
