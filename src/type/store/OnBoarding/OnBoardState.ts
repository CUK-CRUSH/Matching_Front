export type OnboardintState = {
  currentPage: 'kakaoId' | 'sex' | 'location' | 'nickname' | 'birth';
  userData: {
    kakaoId: string;
    sex: string;
    address: string;
    location_X: number;
    location_Y: number;
    nickname: string;
    birthDate: any;
  };
  setCurrentPage: (page: OnboardintState['currentPage']) => void;
  setUserData: <K extends keyof OnboardintState['userData']>(
    key: K,
    value: OnboardintState['userData'][K],
  ) => void;
};
