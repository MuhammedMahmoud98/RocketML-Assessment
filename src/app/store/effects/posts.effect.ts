import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, delay, map, mergeMap, switchMap, tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import {
  AddPost,
  AddPostFailed,
  AddPostSuccess, DeletePost, DeletePostFailed, DeletePostSuccess,
  GetPosts,
  GetPostsFailed,
  GetPostsSuccess,
  UpdatePost,
  UpdatePostFailed,
  UpdatePostSuccess,
} from '../actions/post.action';
import { PostsService } from '../../services/posts.service';

@Injectable()
export class PostsEffect {
  constructor(
    private action$: Actions,
    private postsService: PostsService,
  ) {}

  getPosts$ = createEffect(() => this.action$.pipe(
    ofType(GetPosts),
    mergeMap((action) => this.postsService.loadPosts().pipe(
      map((allPostsResult) => GetPostsSuccess({ body: allPostsResult })),
    )),
    catchError((err) => of(GetPostsFailed({ errorMessage: 'err' }))),
  ));

  addPost$ = createEffect(() => this.action$.pipe(
    ofType(AddPost),
    switchMap((action) => this.postsService.addPost(action.body).pipe(
      map((postResponse) => AddPostSuccess({
        body: {
          ...postResponse,
          isSelected: false,
          postDetails: {
            postId: postResponse.id,
            comments: [],
            description: postResponse.body,
          },
        },
      })),
      tap((finalPostResponse) => this.postsService.closeDialog$.next(true)),
    )),
    catchError((err) => of(AddPostFailed({ errorMessage: 'err' }))),
  ));

  updatePost$ = createEffect(() => this.action$.pipe(
    ofType(UpdatePost),
    switchMap((action) => this.postsService.updatePost(action.updatePostPayload).pipe(
      map((updatePostResponse) => UpdatePostSuccess({ body: updatePostResponse })),
      tap(() => this.postsService.closeDialog$.next(true)),
    )),
    catchError((err) => of(UpdatePostFailed({ errorMessage: 'err' }))),
  ));

  deletePost$ = createEffect(() => this.action$.pipe(
    ofType(DeletePost),
    switchMap((action) => this.postsService.deletePost(action.postId).pipe(
      map((deletePostResponse) => DeletePostSuccess({ index: action.index, postId: action.postId })),
      tap(() => this.postsService.closeDialog$.next(true)),
    )),
    catchError((err) => of(DeletePostFailed({ errorMessage: 'err' }))),
  ));
}
