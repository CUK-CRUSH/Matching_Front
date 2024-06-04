export type OnboardintState = {
  currentPage: 'profileImage' | 'kakaoId' | 'sex' | 'location' | 'nickname' | 'birth' | 'oneLiner';
  userData: {
    profileImage: any;
    kakaoId: string;
    sex: string;
    address: string;
    location_X: number;
    location_Y: number;
    nickname: string;
    birthDate: any;
    oneLiner: string;
  };
  setCurrentPage: (page: OnboardintState['currentPage']) => void;
  setUserData: <K extends keyof OnboardintState['userData']>(
    key: K,
    value: OnboardintState['userData'][K],
  ) => void;
};
