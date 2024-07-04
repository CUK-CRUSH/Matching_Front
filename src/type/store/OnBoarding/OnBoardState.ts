export type OnboardintState = {
  currentPage: 'profileImage' | 'kakaoId' | 'sex' | 'location' | 'nickname' | 'birth' | 'oneLiner';
  userData: {
    phoneNumber: string;
    verificationCode: string;
    name: string;
    kakaoId: string;
    gender: string;
    birthDate: string;
    location: [number, number];
    profileImage: string;
    oneLineIntroduction: string;
  };
  userExist: boolean;
  isSubmitted: boolean;
  setCurrentPage: (page: OnboardintState['currentPage']) => void;
  setUserData: <K extends keyof OnboardintState['userData']>(
    key: K,
    value: OnboardintState['userData'][K],
  ) => void;
  setUserExist: (exists: boolean) => void;
  setIsSubmitted: (sub: boolean) => void;
};
