export type OnboardintState = {
  currentPage: 'profileImage' | 'kakaoId' | 'sex' | 'location' | 'nickname' | 'birth' | 'oneLiner';
  userData: {
    phoneNumber: string;
    code: string;
    nickname: string;
    kakaoId: string;
    sex: string;
    birth: string;
    location: [number, number];
    profileImage: string;
    comment: string;
  };
  setCurrentPage: (page: OnboardintState['currentPage']) => void;
  setUserData: <K extends keyof OnboardintState['userData']>(
    key: K,
    value: OnboardintState['userData'][K],
  ) => void;
};
