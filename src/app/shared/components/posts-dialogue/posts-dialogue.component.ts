import {
  AfterViewInit, ChangeDetectorRef,
  Component, Inject, OnDestroy, OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { AddPost, DeletePost, UpdatePost } from '../../../store/actions/post.action';
import { PostsService } from '../../../services/posts.service';
import { isDialogLoadingSelector } from '../../../store/selectors/posts.selector';
import { Post, UpdatePostPayload } from '../../../models/post.model';

@Component({
  selector: 'app-posts-dialogue',
  templateUrl: './posts-dialogue.component.html',
  styleUrls: ['./posts-dialogue.component.scss'],
})

export class PostsDialogueComponent implements OnInit, OnDestroy, AfterViewInit {
  postForm: FormGroup;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  isDialogLoading$: Observable<boolean>;

  mode: string = 'add';

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: DialogData,
    private snackBar: MatSnackBar,
    private readonly store: Store,
    private readonly dialogRef: MatDialogRef<PostsDialogueComponent>,
    private postService: PostsService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.createPostForm();
    this.dialogListener();
    this.selectDialogLoaderState();
  }

  ngAfterViewInit(): void {
    this.mode = this.data.mode;
    if (this.data.mode === 'edit') {
      const { title, body } = this.data.post;
      this.postForm.patchValue({ title, body });
      this.cdRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  createPostForm(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }

  openSnackBar(cssClass: string, message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: cssClass,
    });
  }

  addPost() {
    const postPayload = { ...this.postForm.value, userId: 1 };
    this.store.dispatch(AddPost({ body: postPayload }));
  }

  updatePost() {
    const postPayload: UpdatePostPayload = {
      ...this.postForm.value,
      userId: 1,
      id: this.data.post.id,
      isSelected: false,
      postDetails: {},
    };
    this.store.dispatch(UpdatePost({ updatePostPayload: postPayload }));
  }

  deletePost() {
    const { id, i } = this.data;
    this.store.dispatch(DeletePost({ postId: id, index: i }));
  }

  dialogListener(): void {
    this.postService.closeDialog$.pipe(
      tap((dialogValue) => {
        if (dialogValue) {
          this.dialogRef.close();
          if (this.mode === 'add') {
            this.openSnackBar('success-snack-bar', 'Post has been added successfully');
          } else if (this.mode === 'edit') {
            this.openSnackBar('success-snack-bar', 'Post has been updated successfully');
          } else {
            this.openSnackBar('success-snack-bar', 'Post has been deleted successfully');
          }
          this.postService.closeDialog$.next(false);
        }
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  selectDialogLoaderState(): void {
    this.isDialogLoading$ = this.store.pipe(select(isDialogLoadingSelector));
  }
}

interface DialogData {
  dialogTitle?: string;
  mode?: string;
  post?: Post,
  title?: string;
  id?: number;
  i?: number;
}
