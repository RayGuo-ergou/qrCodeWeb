import http from '@/common/http';
import { UserLoginPayload, UserLoginResult } from '@/types/User';

const UserService = {
  login(payload: UserLoginPayload): Promise<UserLoginResult> {
    return http.get(`/api/user?email=${payload.email}&password=${payload.password}`, {
      withCredentials: true,
    });
  },
  test(payload: any) {
    return http.post('/api/qr', payload, {
      withCredentials: true,
    });
  },
};

export default UserService;
