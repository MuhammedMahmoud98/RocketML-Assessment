import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from '../reducers/posts.reducer';

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
