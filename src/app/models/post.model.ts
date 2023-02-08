export class Comment {
  postId?: number;

  id?: number;

  name?: string;

  email?: string;

  body?: string;

  createdAt = new Date();

  isSelected = false;
}

export interface PostDetails {
  comments: Comment[];
  description?: string;
  postId?: number;
}

export class Post {
  userId?: number;

  id?: number;

  title?: string;

  body?: string;

  isSelected = false;

  postDetails?: PostDetails;
}

export class AddPostPayload {
  title?: string;

  body?: string;

  userId = 1;
}

export class UpdatePostPayload extends Post {
  title?: string;

  body?: string;

  userId = 1;

  id?: number;

  postDetails: PostDetails;

  isSelected = false
}
