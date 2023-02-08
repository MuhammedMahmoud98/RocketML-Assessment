import { createAction, props } from '@ngrx/store';
import { AddPostPayload, Post, UpdatePostPayload } from '../../models/post.model';

export type AddPostType = Pick<Post, 'userId' | 'title' | 'body'>;

// **** GET POST START **** //
export const GetPosts = createAction(
  '[POSTS] GET POSTS',
);

export const GetPostsSuccess = createAction(
  '[POSTS] GET POSTS SUCCESS',
  props<{body: Post[]}>(),
);

export const GetPostsFailed = createAction(
  '[POSTS] GET POSTS FAILED',
  props<{errorMessage?: string}>(),
);
// **** GET POST END **** //

// **** ADD POST START **** //
export const AddPost = createAction(
  '[POSTS] ADD POST',
  props<{body?: AddPostPayload}>(),
);

export const AddPostSuccess = createAction(
  '[POSTS] ADD POST SUCCESS',
  props<{body?: Post}>(),
);

export const AddPostFailed = createAction(
  '[POSTS] ADD POST FAILED',
  props<{errorMessage?: string}>(),
);
// **** ADD POST END **** //

// **** UPDATE POST START **** //
export const UpdatePost = createAction(
  '[POSTS] UPDATE POST',
  props<{updatePostPayload: UpdatePostPayload}>(),
);

export const UpdatePostSuccess = createAction(
  '[POSTS] UPDATE POST SUCCESS',
  props<{body?: Post}>(),
);

export const UpdatePostFailed = createAction(
  '[POSTS] UPDATE POST FAILED',
  props<{errorMessage?: string}>(),
);
// **** UPDATE POST END **** //
