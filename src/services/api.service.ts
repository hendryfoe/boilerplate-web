import { EndpointConstant } from 'constants/endpoint.constant';
import { Post } from 'models/post.model';
import { Request } from 'utils/request.util';

const PostVerify = (): Promise<{ access_token: string; expired_at: number }> => Request.post(EndpointConstant.VERIFY);
const PostSignin = (payload: { email: string; password: string }) => Request.post(EndpointConstant.LOGIN, payload);
const GetPosts = (payload?: any) => Request.get(EndpointConstant.POSTS, payload);
const GetPost = (postId: string) => Request.get(`${EndpointConstant.POSTS}/${postId}`);
const PostPosts = (payload: Partial<Post>) => Request.post(EndpointConstant.POSTS, payload);
const PutPosts = (postId: string, payload: Partial<Post>) =>
  Request.put(`${EndpointConstant.POSTS}/${postId}`, payload);
const DeletePosts = (payload: string[]) => Request.delete(EndpointConstant.POSTS, payload);
const GeUsers = (payload?: any) => Request.get(EndpointConstant.USERS, payload);
const GetUser = (userId: string) => Request.get(`${EndpointConstant.USERS}/${userId}`);
const PosUsers = (payload: Partial<Post>) => Request.post(EndpointConstant.USERS, payload);
const PutUsers = (userId: string, payload: Partial<Post>) =>
  Request.put(`${EndpointConstant.USERS}/${userId}`, payload);

export const ApiService = {
  PostVerify,
  PostSignin,
  GetPosts,
  GetPost,
  PostPosts,
  PutPosts,
  DeletePosts,
  GeUsers,
  GetUser,
  PosUsers,
  PutUsers
};
