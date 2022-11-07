import { Meta } from './meta.model';

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  gender: 'male' | 'female';
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface UsersResponse {
  data: User[];
  meta: Meta;
}

export interface UserResponse {
  data: User;
}
