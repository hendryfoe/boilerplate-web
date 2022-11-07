import { Meta } from './meta.model';
import { User } from './user.model';

export interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
  user: User;
  created_at: string;
  updated_at: string;
}

export interface PostsResponse {
  data: Post[];
  meta: Meta;
}

export interface PostResponse {
  data: Post;
}
