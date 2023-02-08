import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';
import { Post } from '../../models/post.model';
import {
  AddPost,
  AddPostFailed,
  AddPostSuccess,
  GetPosts,
  GetPostsFailed,
  GetPostsSuccess,
  UpdatePost,
  UpdatePostFailed,
  UpdatePostSuccess,
} from '../actions/post.action';

export interface PostState {
  posts?: Post[];
  isPostsLoading?: boolean;
  isCommentsLoading?: boolean;
  isDialogLoading?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

const initialState: PostState = {
  posts: [],
  isCommentsLoading: false,
  isPostsLoading: false,
  isDialogLoading: false,
  hasError: false,
  errorMessage: '',
};

export const postReducer = createReducer(
  initialState,
  on(GetPosts, (state) => ({ ...state, isPostsLoading: true })),
  on(GetPostsSuccess, (state, action) => ({
    ...state,
    posts: action.body,
    isPostsLoading: false,
  })),
  on(GetPostsFailed, (state, action) => ({
    ...state,
    hasError: true,
    errorMessage: action.errorMessage,
    isPostsLoading: false,
  })),
  on(AddPost, (state, action) => ({ ...state, isDialogLoading: true })),
  on(AddPostSuccess, (state, action) => {
    const newPost = action.body;
    const updatedPosts = [...state.posts];
    updatedPosts.unshift(newPost);
    return {
      ...state,
      posts: updatedPosts,
      isDialogLoading: false,
    };
  }),
  on(AddPostFailed, (state, action) => ({ ...state, isDialogLoading: false })),
  on(UpdatePost, (state) => ({ ...state, isDialogLoading: true })),
  on(UpdatePostSuccess, (state, action) => {
    const { id } = action.body;
    const newPosts = state.posts.map((post) => {
      if (post.id === id) {
        post = action.body
      }
      return post;
    });
    return {
      ...state,
      posts: newPosts,
      isDialogLoading: false,
    };
  }),
  on(UpdatePostFailed, (state) => ({
    ...state,
    isDialogLoading: false,
  })),
);
