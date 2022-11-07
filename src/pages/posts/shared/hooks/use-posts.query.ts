import type { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { PostsResponse, PostResponse } from 'models/post.model';
import { ApiService } from 'services/api.service';

export interface PostFilter {
  page: number;
  limit: number;
  q: string;
}

export function usePostsQuery(
  filters: any,
  options?: UseQueryOptions<PostsResponse, AxiosError, PostsResponse, ['posts', PostFilter]>
) {
  return useQuery(['posts', filters], ({ queryKey: [, filters] }) => ApiService.GetPosts(filters), {
    ...options
  });
}

export function usePostQuery(
  postId: string,
  options?: UseQueryOptions<PostResponse, AxiosError, PostResponse, ['posts', string]>
) {
  return useQuery(['posts', postId], ({ queryKey: [, postId] }) => ApiService.GetPost(postId), {
    ...options
  });
}
