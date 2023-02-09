import { createAction, createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';
import { Post, PostDetails } from '../../models/post.model';
import {
  ActiveSelectedPost,
  AddPost,
  AddPostFailed,
  AddPostSuccess, DeletePost, DeletePostFailed, DeletePostSuccess,
  GetPosts,
  GetPostsFailed,
  GetPostsSuccess,
  UpdatePost, UpdatePostDescription,
  UpdatePostFailed,
  UpdatePostSuccess,
} from '../actions/post.action';
import {GetComments, GetCommentsFailed, GetCommentsSuccess} from '../actions/comments.action';

export interface PostState {
  posts?: Post[];
  isPostsLoading?: boolean;
  isCommentsLoading?: boolean;
  isDialogLoading?: boolean;
  selectedPostId?: number;
  fetchedPosts?: number[];
  hasError?: boolean;
  errorMessage?: string;
}

const initialState: PostState = {
  posts: [],
  fetchedPosts: [],
  isCommentsLoading: false,
  isPostsLoading: false,
  isDialogLoading: false,
  hasError: false,
  errorMessage: '',
};

export const postReducer = createReducer(
  initialState,
  on(GetPosts, (state) => ({ ...state, isPostsLoading: true })),
  on(GetPostsSuccess, (state, action) => {
    const actionPosts = action.body;
    const newPosts = actionPosts.map((post) => ({
      ...post,
      isSelected: false,
      postDetails: {
        description: post.body,
        postId: post.id,
        comments: [],
      } as PostDetails,
    }));
    return {
      ...state,
      posts: newPosts,
      isPostsLoading: false,
    };
  }),
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
    updatedPosts.unshift({ ...newPost, id: Math.ceil(Math.random() * 102) + 100 });
    return {
      ...state,
      posts: updatedPosts,
      isDialogLoading: false,
    };
  }),
  on(AddPostFailed, (state, action) => ({ ...state, isDialogLoading: false, hasError: true, })),
  on(UpdatePost, (state) => ({ ...state, isDialogLoading: true })),
  on(UpdatePostSuccess, (state, action) => {
    const { id } = action.body;
    const newPosts = state.posts.map((post) => {
      if (post.id === id) {
        post = action.body;
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
    hasError: true,
  })),
  on(DeletePost, (state) => ({
    ...state,
    isDialogLoading: true,
  })),
  on((DeletePostSuccess), (state, action) => {
    const statePosts = state.posts;
    const filteredPosts = statePosts.filter((post) => post.id !== action.postId);
    return {
      ...state,
      posts: filteredPosts,
      isDialogLoading: false,
    };
  }),
  on(DeletePostFailed, (state, action) => ({
    ...state,
    isDialogLoading: false,
    hasError: true,
  })),
  on(ActiveSelectedPost, (state, action) => {
    const { posts } = state;
    const newPosts = posts.map((post) => ({ ...post, isSelected: post.id === action.postId }));
    return {
      ...state,
      posts: newPosts,
      selectedPostId: action.postId,
    };
  }),
  on(GetComments, (state, action) => ({
    ...state,
    isCommentsLoading: true,
  })),
  on(GetCommentsSuccess, (state, action) => {
    const { posts } = state;
    const newPosts = posts.map((post) => {
      if (post.id === action.postId) {
        post = {
          ...post,
          postDetails: {
            description: post.body,
            postId: action.postId,
            comments: [...action.comments],
          },
        };
      }
      return post;
    });
    const fetchedPosts = [...state.fetchedPosts, action.postId];
    return {
      ...state,
      posts: newPosts,
      isCommentsLoading: false,
      fetchedPosts,
    };
  }),
  on(GetCommentsFailed, (state) => ({
    ...state,
    isCommentsLoading: false,
    hasError: true,
  })),
  on(UpdatePostDescription, (state, action) => {
    const { posts } = state;
    const newPosts = posts.map((post) => {
      if (post.id === action.postId) {
        return {
          ...post,
          body: action.newDescription,
        };
      }
      return post;
    });
    return {
      ...state,
      posts: newPosts,
    };
  }),
);
