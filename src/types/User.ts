export type UserLoginResult = {
  username: string;
  email: string;
};

export type UserLoginPayload = {
  email: string;
  password: string;
};

export type CheckUserResult = {
  message: string;
};
