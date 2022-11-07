import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { Post } from 'models/post.model';
import { ApiService } from 'services/api.service';

interface AddOrEditPostPayload {
  isEdit: boolean;
  post: Partial<Post>;
}

export function useAddOrEditPostMutation(options?: UseMutationOptions<Post, AxiosError, AddOrEditPostPayload>) {
  return useMutation(async (payload) => {
    if (payload.isEdit) {
      const result = await ApiService.PutPosts(payload.post.id!, payload.post);
      return result;
    }

    const result = await ApiService.PostPosts(payload.post);
    return result;
  }, options);
}

interface DeletePostResponse {
  data: { success: string[]; failed: string[] };
  message: string;
}

export function useDeletePostMutation(options?: UseMutationOptions<DeletePostResponse, AxiosError, string[]>) {
  return useMutation(async (payload) => {
    const result = await ApiService.DeletePosts(payload);
    return result;
  }, options);
}
