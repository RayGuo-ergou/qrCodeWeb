export type QRGenerateData = {
  dataImage: string;
  username: string;
  number: number;
  type: number;
};

export type QRData = {
  _id: string;
  userId: string;
  number: number;
  image: string;
  type: number;
  lastUsedDate?: Date;
  isActive: boolean;
  nonce: string;
  token: string;
  createdAt: Date;
};

export type QRVerifyData = {
  message: string;
  user: string;
  number: number;
  type: number;
  isActive: boolean;
  email: string;
};

export type QRUpdateData = {
  message: string;
  stateNow: boolean;
  changeDate: Date;
};

export type QRFindManyPayload = {
  query: {
    email: string;
  };
};

export type QRFindOnePayload = {
  id: number;
  query: {
    email: string;
  };
};

export type QRGeneratePayload = {
  body: {
    type: number;
    email: string;
  };
};

export type QRUpdatePayload = {
  id: number;
  body: {
    email: string;
  };
};

export type QRVerifyPayload = {
  body: {
    token: string;
  };
};
