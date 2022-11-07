import type { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { EndpointConstant } from 'constants/endpoint.constant';
import { Request } from 'utils/request.util';
import { UsersResponse, UserResponse } from 'models/user.model';
import { ApiService } from 'services/api.service';

const endpoint = EndpointConstant.USERS;

export interface UserFilter {
  page: number;
  limit: number;
  q: string;
}

export function useUsersQuery(
  filters: any,
  options?: UseQueryOptions<UsersResponse, AxiosError, UsersResponse, ['users', UserFilter]>
) {
  return useQuery(['users', filters], ({ queryKey: [, filters] }) => Request.get(endpoint, filters), {
    ...options
  });
}

export function useUserQuery(
  userId: string,
  options?: UseQueryOptions<UserResponse, AxiosError, UserResponse, ['users', string]>
) {
  return useQuery(['users', userId], ({ queryKey: [, userId] }) => ApiService.GetUser(userId), {
    ...options
  });
}
