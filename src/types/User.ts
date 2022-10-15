export type UserLoginPayload = {
  email: string;
  password: string;
};

export type UserLoginResult = {
  token: string;
};
