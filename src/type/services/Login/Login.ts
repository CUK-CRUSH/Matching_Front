export type AuthenticationCodeResponse = {
  status: number;
  message: string;
  data: {
    code: string;
  };
};
