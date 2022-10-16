type resultData = {
  username: string;
  email: string;
};

export type UserLoginPayload = {
  email: string;
  password: string;
};

export type UserLoginResult = {
  data: resultData;
};

export type CheckUserResult = {
  message: string;
};
