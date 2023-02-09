import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from '../reducers/posts.reducer';
import { Post } from '../../models/post.model';

const getPostsFeatureSelector = createFeatureSelector<PostState>('postReducer');

export const getPostsSelector = createSelector(
  getPostsFeatureSelector,
  (state) => state.posts,
);

export const isPostsLoadingSelector = createSelector(
  getPostsFeatureSelector,
  (state) => state.isPostsLoading,
);

export const isDialogLoadingSelector = createSelector(
  getPostsFeatureSelector,
  (state) => state.isDialogLoading,
);

const getSelectedPostId = createSelector(getPostsFeatureSelector, (state) => state.selectedPostId);

export const getSelectedPost = createSelector(
  getPostsSelector,
  getSelectedPostId,
  (posts: Post[], postId: number) => posts.find((post) => post.id === postId),
);

export const getFetchedPostsIds = createSelector(
  getPostsFeatureSelector,
  (state) => state.fetchedPosts,
);

export const isCommentsLoadingSelector = createSelector(
  getPostsFeatureSelector,
  (state) => state.isCommentsLoading,
);
