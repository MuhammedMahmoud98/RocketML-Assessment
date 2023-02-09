import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, switchMap, tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { CommentsService } from '../../services/comments.service';
import { GetComments, GetCommentsSuccess } from '../actions/comments.action';
import { GetPostsFailed } from '../actions/post.action';

@Injectable()
export class CommentsEffect {
  constructor(
    private action$: Actions,
    private commentsService: CommentsService,
  ) {
  }

  getComments$ = createEffect(() => this.action$.pipe(
    ofType(GetComments),
    switchMap((action) => this.commentsService.getComments(action.postId).pipe(
      map((commentsResult) => GetCommentsSuccess({
        postId: action.postId,
        comments: commentsResult.map((comment) => ({
          ...comment,
          createdAt: new Date(),
          isSelected: false,
        })),
      })),
      tap((res) => console.log(res, 'COMMENTS')),
      catchError((err) => of(GetPostsFailed({ errorMessage: 'err' }))),
    )),
  ));
}
