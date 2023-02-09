export class Comment {
  postId?: number;

  id?: number;

  name?: string;

  email?: string;

  body?: string;

  createdAt = new Date();

  isSelected = false;
}
