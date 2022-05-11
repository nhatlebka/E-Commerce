export interface IUserCreateCustomer {
  username: string;
  password: string;
  email: string;
  name: string;
  phone: string;
  address: string;
}

export interface IUserCreate extends IUserCreateCustomer {
  role: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IUser {
  username: string;
  email: string;
  role: string;
  rtToken?: string;
}

export interface IUserCreateRes {
  username: string;
  password: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  role: string;
  rtToken: string;
  isVerify: boolean;
  isActive: boolean;
  emailToken: string;
  atToken: string;
}

export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
}

export interface IRes {
  status: string;
  message: string;
}

export interface IChangePass {
  currentPass: string;
  newPass: string;
}
