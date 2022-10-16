import http from '@/common/http';
import { UserLoginPayload, UserLoginResult, CheckUserResult } from '@/types/User';

const UserService = {
  login(payload: UserLoginPayload): Promise<UserLoginResult> {
    return http.get(`/api/user/login?email=${payload.email}&password=${payload.password}`);
  },
  getUser(): Promise<CheckUserResult> {
    return http.get('/api/user');
  },
  logout(): Promise<CheckUserResult> {
    return http.get('/api/user/logout');
  },
};

export default UserService;
