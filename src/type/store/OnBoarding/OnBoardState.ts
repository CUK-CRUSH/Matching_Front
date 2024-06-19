export type OnboardintState = {
  currentPage: 'profileImage' | 'kakaoId' | 'sex' | 'location' | 'nickname' | 'birth' | 'oneLiner';
  userData: {
    phoneNumber: string;
    code: string;
    profileImage: string | null;
    kakaoId: string;
    sex: string;
    address: string;
    location: [number, number];
    nickname: string;
    birth: any;
    comment: string;
  };
  setCurrentPage: (page: OnboardintState['currentPage']) => void;
  setUserData: <K extends keyof OnboardintState['userData']>(
    key: K,
    value: OnboardintState['userData'][K],
  ) => void;
};
