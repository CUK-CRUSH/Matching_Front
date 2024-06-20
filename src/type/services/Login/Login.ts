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
