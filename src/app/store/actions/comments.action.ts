import { createAction, props } from '@ngrx/store';
import { Comment } from '../../models/comments.model';

export const GetComments = createAction(
  '[COMMENTS] GET COMMENTS',
  props<{postId?: number}>(),
);

export const GetCommentsSuccess = createAction(
  '[COMMENTS] GET COMMENTS SUCCESS',
  props<{postId?: number, comments?: Comment[]}>(),
);

export const GetCommentsFailed = createAction(
  '[COMMENTS] GET COMMENTS FAILED',
  props<{errorMessage?: string}>(),
);
