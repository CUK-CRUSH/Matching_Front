export type OnboardintState = {
  currentPage: 'kakaoId' | 'sex' | 'location' | 'nickname' | 'birth';
  setCurrentPage: (page: OnboardintState['currentPage']) => void;
};
