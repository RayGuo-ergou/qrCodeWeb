import http from '@/common/http';
import * as UserTypes from '@/types/User';
import { AxiosResponse } from 'axios';

const UserService = {
  login(payload: UserTypes.UserLoginPayload): Promise<AxiosResponse<UserTypes.UserLoginResult>> {
    return http.get(`/api/user/login?email=${payload.email}&password=${payload.password}`);
  },

  getUser(): Promise<AxiosResponse<UserTypes.CheckUserResult>> {
    return http.get('/api/user');
  },

  logout(): Promise<AxiosResponse<UserTypes.CheckUserResult>> {
    return http.get('/api/user/logout');
  },
};

export default UserService;
