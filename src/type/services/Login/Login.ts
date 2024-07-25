export type AuthenticationCodeResponse = {
  status: number;
  message: string;
  data: {
    code: string;
  };
};

export type ExistMemberResponse = {
  status: number;
  message: string;
  data: {
    exists: boolean;
  };
};

export type LoginResponse = {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type ReissueResponseData = {
  accessToken: string;
  refreshToken: string;
};
